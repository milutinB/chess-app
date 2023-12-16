# chess-app

Source code for a pvp chess web app written in TypeScript and React. This repository currently contains a very basic websocket-based backend I have used for development and testing. It is not robust enough to be deployed in its current state. 

## Running locally

Clone this repo and cd to the newly create chess-app directory then run the following: 

```bash
cd client
npm run build
cd ..
npm run start
```

Navigate to localhost:3000 in your browser of choice and click 'create game'. Open another tab at localhost:3000 and click 'join game'.

<img src="readme_images/joining.jpeg" width="400">

Enter the code from the first tab and click 'join'. A chess game will begin in both tabs.

<img src="readme_images/starting.jpeg" width="400">

## Features

Legal move highlighting:


<img src="readme_images/legal_moves.jpeg" width="300">

Captured pieces:

<img src="readme_images/captured_pieces.jpeg" width="300">

"forward" and "back" arrows to allow cycling through previous moves:

<img src="readme_images/prev_moves.gif" width="300">
