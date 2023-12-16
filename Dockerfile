# syntax=docker/dockerfile:1
FROM node:18.13.0

# install
COPY client/ chess/client/
RUN cd chess/client; npm install; npm run build

# configuration
