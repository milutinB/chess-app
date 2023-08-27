import { Piece } from "../chess_logic/Piece";
import { Board } from "../chess_logic/Board";
import { Socket } from "socket.io-client";

export type PlayerColor = 'w' | 'b';

export type RowIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ColIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type BoardCoord = {
    r: RowIndex;
    c: ColIndex;
}

export type SquareData = 0 | Piece;

export type BoardRow = [
    SquareData, SquareData, SquareData, SquareData,
    SquareData, SquareData, SquareData, SquareData
]

export type BoardState = [
    BoardRow, BoardRow, BoardRow, BoardRow,
    BoardRow, BoardRow, BoardRow, BoardRow
]

export type BoardMove = {
    src: BoardCoord,
    tgt: BoardCoord
}

export type ChessPieceProps = {
    piece: Piece,
    size?: number
}

export type SquareProps = {
    position: BoardCoord,
    data: SquareData,
    boardClick: (coord: BoardCoord) => void
}

export type GraveyardProps = {
    pieces: Piece[],
    reverse: boolean,
    x?: number,
    y?: number
}

export type SquareColor = 'light' | 'dark';
export type SquareState = 'active' | 'candidate' | 'confrontation' | 'last-move' | '';

export type BoardProps = {
    board: Board,
    boardClick: (coord: BoardCoord) => void,
    selectPromotion: (sym: PieceSym) => void
}

export type PieceSym = 'wp' | 'wb' | 'wr' | 'wkn' | 'wk' | 'wq' |
'bp' | 'bb' | 'br' | 'bkn' | 'bk' | 'bq';

export type SquareDataSym = 0 | PieceSym;

export type BoardRowSym = [
    SquareDataSym, SquareDataSym, SquareDataSym, SquareDataSym,
    SquareDataSym, SquareDataSym, SquareDataSym, SquareDataSym
];

export type BoardStateSym = [
    BoardRowSym, BoardRowSym, BoardRowSym, BoardRowSym,
    BoardRowSym, BoardRowSym, BoardRowSym, BoardRowSym 
];

export type BoardServerData = {
    state: BoardStateSym,
    capturedByWhite: PieceSym[],
    capturedByBlack: PieceSym[],
    currentPlayer: PlayerColor,
    lastMove: 0 | BoardMove,
    whiteRookMoved: {0: boolean, 7: boolean},
    blackRookMoved: {0: boolean, 7: boolean},
    whiteKingMoved: boolean,
    blackKingMoved: boolean
};