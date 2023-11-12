import { SquareData, ChessPieceProps, 
    SquareProps, BoardCoord, 
    PlayerColor, SquareColor, SquareState } from "../types/Types2.d";
import { useContext } from "react";
import { BoardSizeContext } from "../BoardSizeContext";
import { ActivePlayerContext } from "../BoardDataContext";
import { GameStateContext } from "../GameStateContext";
import ChessPiece from "./ChessPiece";
import { Piece } from "../chess_logic/Piece";
import { GameState } from "../types/App.d";
import { coordEqual, Board, containsCoord } from "../chess_logic/Board";
import { King } from "../chess_logic/King";

const board_config = require("../board_config.json");

export default function Square(props: SquareProps) : JSX.Element {
    let size: number = useContext(BoardSizeContext) / 8;
    let activePlayer: PlayerColor = useContext(ActivePlayerContext);
    let position: BoardCoord = props.position;
    let color: SquareColor  = (position.r + position.c) % 2 == 0 ? "dark"
    : "light";
    let squareState: SquareState = '';

    let x: number = activePlayer == 'w' ? position.c * size
    : (7 - position.c) * size;
    let y: number = activePlayer == 'w' ? (7 - position.r) * size
    : position.r * size;

    let state: GameState = useContext(GameStateContext);
    let board: Board = state.previousBoards[state.historyIndex];
     
        
    if (board.lastMove !== 0) {
        if (coordEqual(position, board.lastMove.src) ||
            coordEqual(position, board.lastMove.tgt))
                if ((board.getData(board.lastMove.tgt) as Piece).color 
                != state.activePlayer)
                    squareState = 'last-move';
    }

    if (board.checkEngadgement(position))
        squareState = 'confrontation';

    if (state.candidatePiece != undefined &&   
    state.candidatePiece.r == props.position.r
    && state.candidatePiece.c == props.position.c) {
        // color = 'active';
        // squareState = 'active';
        squareState = 'candidate';
    } 

    state.candidateMoves.map(move => {
        if (coordEqual(move, props.position))
            // color = 'candidate';
            squareState = 'candidate';
    })

    let firstRow: boolean = (state.activePlayer == 'w' && position.r == 0)
    || (state.activePlayer == 'b' && position.r == 7);
    let firstCol: boolean = (state.activePlayer == 'w' && position.c == 0)
    || (state.activePlayer == 'b' && position.c == 7);

    let colLabel: string = '';
    if (firstCol)
        colLabel = String.fromCharCode('A'.charCodeAt(0) + position.c);

    if (props.data instanceof Piece)
    return (
        <svg 
            width={size} 
            height={size} 
            x={x}
            y={y}
            role={'square-container'}
            onClick={()=>props.boardClick(position)}
        > 
                <rect 
                    // x={size/20}
                    // y={size/20}
                    width={size} 
                    height={size} 
                    className={`${color} ${squareState}`}
                    role={'square'} 
                />
                <ChessPiece piece={props.data}/>
                <svg x={8 * size/10} y={9 * size/10} width={size/10} height={size/10}>
                    <text x={0} y={0} className="label" lengthAdjust={'spacingAndGlyphs'}>{colLabel}</text>
                </svg>
        </svg>
    );
    else 
        return (
            <svg 
            width={size} 
            height={size} 
            x={x}
            y={y}
            role={'square-container'}
            onClick={()=>props.boardClick(position)}
        > 
        <rect 
            // x={size/20}
            // y={size/20}
            width={size} 
            height={size} 
            className={`${color} ${squareState}`}
            role={'square'} 
        />
        </svg>
        );
}