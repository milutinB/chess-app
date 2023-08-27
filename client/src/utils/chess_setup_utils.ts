import { Knight } from "../chess_logic/Knight";
import { King } from "../chess_logic/King";
import { Queen } from "../chess_logic/Queen";
import { Pawn } from "../chess_logic/Pawn";
import { Rook } from "../chess_logic/Rook";
import { Bishop } from "../chess_logic/Bishop";
import { BoardState, BoardRow, SquareData, BoardCoord } from "../types/Types2.d";


export function initial_board_state(): BoardState {
    let emptyRow: BoardRow = [
        0, 0, 0, 0,
        0, 0, 0, 0
    ]

    let whiteRow1: BoardRow = [
        new Rook('w', {r: 0, c: 0}), new Knight('w', {r: 0, c: 1}), 
        new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 
        new King('w', {r: 0, c: 4}), new Bishop('w', {r: 0, c: 5}), 
        new Knight('w', {r: 0, c: 6}), new Rook('w', {r: 0, c: 7})
    ]

    let whiteRow2: BoardRow = [
        new Pawn('w', {r: 1, c: 0}), new Pawn('w', {r: 1, c: 1}), 
        new Pawn('w', {r: 1, c: 2}), new Pawn('w', {r: 1, c: 3}), 
        new Pawn('w', {r: 1, c: 4}), new Pawn('w', {r: 1, c: 5}), 
        new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r: 1, c: 7})
    ]

    let blackRow1: BoardRow = [
        new Pawn('b', {r: 6, c: 0}), new Pawn('b', {r: 6, c: 1}), 
        new Pawn('b', {r: 6, c: 2}), new Pawn('b', {r: 6, c: 3}), 
        new Pawn('b', {r: 6, c: 4}), new Pawn('b', {r: 6, c: 5}), 
        new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})
    ]

    let blackRow2: BoardRow = [
        new Rook('b', {r: 7, c: 0}), new Knight('b', {r: 7, c: 1}), 
        new Bishop('b', {r: 7, c: 2}), new Queen('b', {r: 7, c: 3}), 
        new King('b', {r: 7, c: 4}), new Bishop('b', {r: 7, c: 5}), 
        new Knight('b', {r: 7, c: 6}), new Rook('b', {r: 7, c: 7})
    ]

    let initBoardState: BoardState = [
        whiteRow1, whiteRow2, emptyRow, emptyRow,
        emptyRow, emptyRow, blackRow1, blackRow2
    ]

    let sparseBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 0, 0, new King('w', {r: 0, c: 6}), 0],
        [0, 0, 0, 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, new Bishop('w', {r: 2, c: 3}), 0, 0, new Knight('w', {r:2, c: 6}), 0],
        [0, 0, 0, new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, 0, new Knight('b', {r: 4, c: 4}), new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), 0, 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]

    // return sparseBoardState;

    return initBoardState
}