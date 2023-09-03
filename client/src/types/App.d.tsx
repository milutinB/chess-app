// import { PlayerColor, PieceIndex, BoardData, BoardCoord } from "./Board";
// import { PieceMap } from "./Pieces.d";
import { Socket } from "socket.io-client";
import { Board } from "../chess_logic/Board";
import { Piece } from "../chess_logic/Piece";
import { PlayerColor, BoardCoord, PieceSym } from "./Types2.d";

export type Action = "SELECTING_PIECE" | "SELECTING_MOVE" 
| "AWAITING RESPONSE" | "SELECTING PROMOTION" | "END";

export class MockSocket {
    lastEmit: [type: string, data: any];
    emit(type: string, data: string): void {
        this.lastEmit = [type, data];
    }
    on(tpye: string, callback: (data?: any) => void) {}
}

export type GameState = {
    currentAction: Action,
    activePlayer: PlayerColor,
    board: Board,
    candidateMoves: BoardCoord[],
    candidatePiece: BoardCoord | undefined
    socket?: Socket | MockSocket,
    previousBoards?: Board[],
    historyIndex?: number
};

export type GameProps = {
    socket: Socket,
    activePlayer: PlayerColor,
    finish: (socket: Socket) => void
}

export type HistoryButtonProps = {
    historyClick: (timeTravelDir: number) => void,
    timeTravelDir: number
};

export type AppState = {
    phase: 'landing' | 'waiting' | 'joining' | 'game',
    socket?: Socket,
    code: string,
    activePlayer?: PlayerColor
};

export type GameStateAction = {
    type: "board click" | "select move" | "update board" | "select promotion" | "history click",
    selectedSquare?: BoardCoord,
    data?: any,
    newPiece?: PieceSym,
    timeTravelDir?: 1 | -1

}

export type CandidateMove = {
    candidateDestinations: BoardCoord[],
    candidatePiece: BoardCoord | undefined
}

export type SetCandidateAction = {
    coord: BoardCoord
};
