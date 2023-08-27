import { useEffect, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { useContext } from "react";
import { BoardSizeContext } from './BoardSizeContext';
import Square from './components/Square';
import { ActivePlayerContext } from './BoardDataContext';
import { GameStateContext } from './GameStateContext';
import BoardComponent from './components/Board';
import { Board } from './chess_logic/Board';
import './index.css';
import { initial_board_state } from './utils/chess_setup_utils';
import { GameState, CandidateMove, GameProps } from './types/App.d';
import { BoardCoord, PieceSym, PlayerColor } from './types/Types2.d';
import gameStateReducer from './gameStateReducer';
import PromotionMenue from './components/PromotionMenue';
import { Socket } from 'socket.io-client';

type OutcomeMessageProps = {
    finish: (socket: Socket) => void,
    socket: Socket
};

function OutcomeMessage(props: OutcomeMessageProps) : JSX.Element {
    let state: GameState = useContext(GameStateContext);

    if (state.currentAction != 'END')
        return (<div></div>);

    let message: string;

    let oppColor: PlayerColor = state.activePlayer == 'w' ? 'b' : 'w';

    if (state.board.checkmate(oppColor))
        message = 'Checkmate, you win!';
    else if (state.board.checkmate(state.activePlayer))
        message = 'Checkmate';
    else
        message = 'Stalemate';

    return(
        <div className='outcome'>
            <div>
                {message}
            </div>
            {/* <button className='outcome-button'>ok</button> */}
            <button className='outcome-button' onClick={() => props.finish(props.socket)}>ok</button>
        </div>
    );;
}

export default function Game(props: GameProps) : JSX.Element {
    let initialState: GameState = {
        board: new Board(initial_board_state()),
        currentAction: "SELECTING_PIECE",
        activePlayer: props.activePlayer,
        candidateMoves: [],
        candidatePiece: undefined,
        socket: props.socket
    };

    const [state, dispatch] = useReducer(gameStateReducer, initialState);

    function boardClick(coord: BoardCoord) {
        dispatch({
            type: "board click",
            selectedSquare: coord
        });
    }

    function updateState(data: any) {
        dispatch({
            type: 'update board',
            data: data
        });
    }

    function selectPromotion(newPiece: PieceSym): void {
        dispatch({
            type: 'select promotion',
            newPiece: newPiece
        });
    };

    // state.socket.on('update', (data) => {
        // console.log(data)
        // updateState(data);
    // });

    useEffect(() => {
        state.socket.on('update', (data) => {
            updateState(data);
        });
        state.socket.on('disconnect', () => {
            alert('player disconnected');
        })
        state.socket.emit('board state', state.board.toJson());
    }, [props.socket]);
    
    // useEffect(() => {
    //     let socket = io()
    //     socket.on('connect', function() {
    //         socket.emit('message', {data: 'I\'m connected!'});
    //     });
    //     setSocket(s => { return {
    //         ...s,
    //         socket: socket
    //     }})
    // }, [])

    let turnMessage: string = state.activePlayer == state.board.currentPlayer ? 'Your move...' : "Opponent's move..."; 
    let boardSize: number = 600;
    return (
            <GameStateContext.Provider value={state}>
                <ActivePlayerContext.Provider value={state.activePlayer}>
                    <BoardSizeContext.Provider value={boardSize}>
                        <div className='game'>
                            <BoardComponent 
                                board={state.board} 
                                boardClick={boardClick}
                                selectPromotion={selectPromotion}
                            />
                            <div>{turnMessage}</div>
                            <OutcomeMessage socket={props.socket} finish={props.finish}/>
                        </div>
                    </BoardSizeContext.Provider>
                </ActivePlayerContext.Provider>
            </GameStateContext.Provider>
    );
}