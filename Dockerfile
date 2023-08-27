# syntax=docker/dockerfile:1
FROM python:3

#install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install flask==2.1
RUN pip install flask-socketio
RUN pip install requests

# install
COPY app/__init__.py chess/app/__init__.py
COPY client/build/ chess/client/build

# configuration
ENV FLASK_ENV=productions
CMD cd chess; flask run --host=0.0.0.0 --port=8080