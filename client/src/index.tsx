import { ChangeEvent, useEffect, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { useContext } from "react";
import { io, Socket } from "socket.io-client";
import { BoardSizeContext } from './BoardSizeContext';
import Square from './components/Square';
import { LandingProps, Landing } from './components/Landing';
// import { SquareProps, BoardRow, BoardData, SquareData } from './types/Board';
import { AppState } from './types/App.d';
import './index.css';
import Game from './Game';
import { JoiningPage } from './components/JoiningPage';
const domNode = document.getElementById('app');
const root = createRoot(domNode);

let socket: Socket;

export function JoinForm(props: {submitCode: (code: string) => void}): JSX.Element {
    const [code, setCode] = useState('');

    function updateCode(e: ChangeEvent<HTMLInputElement>) {
        setCode(e.target.value);
    };

    return ( 
        <div className='joining-form'>
            <div className='code-input'>
                <span>
                    code:
                </span>
                <input id='code-input' value={code} onChange={e=>{updateCode(e)}}></input>
            </div>
            <button className="join-button" onClick={() => {props.submitCode(code)}}>join</button>
        </div>
    )
}

export function App(): JSX.Element {

    const [state, setState] = useState<AppState>({
        phase: 'landing',
        code: '' 
    });

    function createGame() : void {
        fetch('/new_game')
        .then((res) => {
            return res.json()
        }).then((json) => { 
            socket = io('/', {
                query: {
                    code: json.code
                }
            });
            socket.on('code', (code) => {
                setState(s => {return {
                    ...s,
                    code: code
                }})
            });
            socket.on('ready', () => {
                setState(s => {return {
                    ...s,
                    phase: 'game',
                    activePlayer: 'w'
                }})
            })
            setState(s => {return{
                ...s,
                phase: 'waiting',
                socket: socket
            }});
        });
    }

    function submitCode(code: string): void {
        socket = io('/', {
            query: {
                code: code
            }
        });
        socket.on('ready', () => {
            setState(s => {return {
                ...s,
                phase: 'game',
                socket: socket,
                activePlayer: 'b'
            }})
        });
    }

    function finish(socket: Socket) {
        socket.emit('finish');
        setState({
            phase: 'landing',
            code: ''
        });
    }

    if (state.phase == 'landing') {
        return (
            <Landing 
                createGame={createGame}
                joinGame={() => {setState(s => {return {...s, phase: 'joining'}})}}
            />
        );
    }

    if (state.phase == 'waiting') {
        return(
            <div className='waiting'>
                <h2>waiting for player...</h2>
                <h2>game code: <span className="code">{state.code}</span></h2>
            </div>
        );
    }

    if (state.phase == 'joining') {
        return ( 
            <JoiningPage
                submitCode={submitCode}
                back={() => {setState(s => { return {...s, phase: 'landing'}})}}
            />
        )
    }

    if (state.phase == 'game')
        return (
            <Game 
                socket={state.socket} 
                activePlayer={state.activePlayer}
                finish={(socket: Socket) => {finish(socket)}}
            />)
        ;
}


root.render(<App/>)
