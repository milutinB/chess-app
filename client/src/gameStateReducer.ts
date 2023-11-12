import { Action, GameState, GameStateAction } from "./types/App.d";
import { BoardCoord, SquareData, RowIndex, BoardMove, BoardServerData } from "./types/Types2.d";
import { coordEqual, Board, symToPiece } from "./chess_logic/Board";
import { Piece
 } from "./chess_logic/Piece";
import { Pawn } from "./chess_logic/Pawn";

export default function gameStateReducer(state: GameState, action: GameStateAction) : GameState {
    switch (action.type) {
        case "board click":
            console.log(state);
            if (state.board.currentPlayer != state.activePlayer) {
                return state;
            }
            
            if (state.historyIndex != state.previousBoards.length - 1) {
                return state;
            }

            let data: SquareData = state.board.getData(action.selectedSquare);

            if (state.currentAction == "SELECTING_PIECE") {
                if (typeof data === "number") 
                    return state;
                if (data.color == state.board.currentPlayer) {
                    return {
                        ...state,
                        currentAction: "SELECTING_MOVE",
                        candidatePiece: action.selectedSquare,
                        candidateMoves: state.board.legalMoves(data.position)
                    }
                }
            }
            else if (state.currentAction == "SELECTING_MOVE") {
                if (typeof data === "number" || (data instanceof Piece && 
                    data.color != (state.board.getData(state.candidatePiece) as Piece).color)) {
                    let isLegal: boolean = false;
                    state.candidateMoves.map(move => {
                        isLegal = isLegal || coordEqual(move, action.selectedSquare)
                    })
                    if (isLegal) {
                        let last: RowIndex = state.activePlayer == 'w' ?
                        7 : 0;
                        if (state.board.getData(state.candidatePiece) instanceof Pawn
                        && action.selectedSquare.r == last) {
                            state.board.processMove(state.candidatePiece, action.selectedSquare);
                            return {
                                ...state,
                                currentAction: 'SELECTING PROMOTION'
                            };
                        }

                        state.board.processMove(state.candidatePiece, action.selectedSquare);
                        
                        let previousBoards: Board[] = state.previousBoards;
                        previousBoards.push(state.board);

                        let serverData: BoardServerData[] = [];
                        previousBoards.map((b: Board) => {serverData.push(b.toJson())});

                        state.socket.emit('update', serverData);
                        return {
                            ...state,
                            currentAction: "AWAITING RESPONSE",
                            previousBoards: previousBoards,
                            historyIndex: previousBoards.length
                        }
                    }

                    return {
                        ...state,
                        currentAction: "SELECTING_PIECE",
                        candidatePiece: undefined,
                        candidateMoves: []
                    };
                }
                if (state.candidatePiece.r == action.selectedSquare.r && 
                    state.candidatePiece.c == action.selectedSquare.c) {
                        return {
                            ...state,
                            candidatePiece: undefined,
                            currentAction: "SELECTING_PIECE",
                            candidateMoves: []
                        }
                    }
                if (data.color == state.board.currentPlayer) {
                    return {
                        ...state,
                        candidatePiece: action.selectedSquare,
                        candidateMoves: state.board.legalMoves(data.position)
                    }
                }
            }
            break;
        case 'update board':
            console.log(action.data[action.data.length - 1]);
            let newBoard: Board = Board.fromJson(action.data[action.data.length - 1]);
            console.log(newBoard);
            let newAction: Action;
            if (newBoard.checkmate('w') || newBoard.checkmate('b')
            || newBoard.stalemate())
                newAction = 'END';
            else
                newAction = 'SELECTING_PIECE';
            // let previousBoards: Board[] = state.previousBoards;
            // if (!state.board.equal(Board.fromJson(action.data[action.data.length -1]))) {
            //     previousBoards.push(state.board);
            //     console.log("new board!!")
            // } else
            //     console.log("equal!")

            let previousBoards: Board[] = action.data.map((json: BoardServerData) => Board.fromJson(json));

            return {
                ...state,
                board: Board.fromJson(action.data[action.data.length -1]),
                candidateMoves: [],
                candidatePiece: undefined,
                currentAction: newAction,
                previousBoards: previousBoards,
                historyIndex: previousBoards.length - 1
            }
        case "select promotion":
            if (!action.newPiece)
                throw new Error("promotion undefined");
            let pos: BoardCoord= (state.board.lastMove as BoardMove).tgt;
            state.board.boardState[pos.r][pos.c] = symToPiece(action.newPiece, pos);
            state.previousBoards[state.previousBoards.length - 1] = state.board;

            previousBoards = state.previousBoards;
            let serverData: BoardServerData[] = [];
            previousBoards.map((b: Board) => {serverData.push(b.toJson())});

            state.socket.emit('update', serverData);
            return {
                ...state,
                currentAction: 'AWAITING RESPONSE'
            };
        case "history click":
            if (action.timeTravelDir == 1 && state.historyIndex < state.previousBoards.length-1)
                return {
                    ...state,
                    historyIndex: state.historyIndex + 1
                }
            if (action.timeTravelDir == -1 && state.historyIndex > 0)
                return {
                    ...state,
                    historyIndex: state.historyIndex - 1
                }
            return state;
    }
    return state;
}