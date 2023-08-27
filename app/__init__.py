import os
from os import environ
import random
from flask import Flask, request, send_from_directory # type: ignore
from requests import get
from typing import Tuple, Any
from flask_socketio import SocketIO, join_room, rooms as rms
import json

IS_DEV = environ["FLASK_ENV"] == "development"
WEBPACK_DEV_SERVER_HOST = "http://localhost:3000"

# code to enable hot-reloading with react
# taken from the following blogpost: 
# https://ajhyndman.medium.com/hot-reloading-with-react-and-flask-b5dae60d9898
def proxy(host, path) -> Tuple[bytes, int, dict]:
    response = get(f"{host}{path}")
    excluded_headers = [
        "content-encoding",
        "content-length",
        "transfer-encoding",
        "connection",
    ]
    headers = {
        name: value
        for name, value in response.raw.headers.items()
        if name.lower() not in excluded_headers
    }
    return (response.content, response.status_code, headers)

app = Flask(__name__, instance_relative_config=True, 
static_folder='../client/build', static_url_path="/app")

rooms = {}
codes = []

def generate_code() -> str:
    code: str = ''
    for i in range(6):
        if random.random() > 0.5:
            code += chr(ord('a') + int(random.random() * 26))
        else:
            code += str(int(random.random()*9))
    return code

@app.route('/new_game')
def new_game():
    game_code: str = generate_code()
    while game_code in codes:
        game_code = generate_code()
    codes.append(game_code)
    rooms[game_code] = 0
    return {'code': game_code}

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    print('home')
    if IS_DEV:
        return proxy(WEBPACK_DEV_SERVER_HOST, request.path)
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        print(app.static_folder + '/' + path)
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

socketio = SocketIO(app)

@socketio.on('disconnect')
def handle_disconnect():
    room_list = rms(request.sid)
    if len(room_list) > 1:
        room_code: str
        if len(room_list[0]) == 6:
            room_code = room_list[0]
        else:
            room_code = room_list[1]
        codes.remove(room_code)
        rooms.pop(room_code)
        socketio.emit('player disconnected', to=room_code)
        socketio.close_room(room_code)   


@socketio.on('update')
def handle_update(data):
    room_list = rms(request.sid)
    if len(room_list) != 2:
        raise Exception('User must be in exactly two rooms to update state')
    room_code: str
    if len(room_list[0]) == 6:
        room_code = room_list[0]
    else:
        room_code = room_list[1]    
    socketio.emit('update', data, to=room_code)

@socketio.on('connect')
def handle_connection(data):
    game_code = request.args.get('code')
    join_room(game_code)
    socketio.emit('code', game_code, to=game_code)
    rooms[game_code] += 1
    if rooms[game_code] > 1:
        socketio.emit('ready', to=game_code)
    

@socketio.on('board state')
def handle_state(data):
    f = open('initial_state.json', 'w')
    f.write(json.dumps(data))

if __name__ == '__main__':
    socketio.run(app, port=8080)
