// import { BoardData, BoardProps, ColIndex, RowIndex } from "../types/Board";
import { BoardState, BoardCoord, BoardProps, RowIndex, ColIndex } from "../types/Types2.d";
import { useContext } from "react";
import { BoardSizeContext } from "../BoardSizeContext";
import Square from "./Square";
import Graveyard from "./Graveyard";
import { GameState } from "../types/App.d";
import { GameStateContext } from "../GameStateContext";
import { Piece } from "../chess_logic/Piece";
import PromotionMenue from "./PromotionMenue";

export default function BoardComponent(props: BoardProps): JSX.Element {
    let size: number = useContext(BoardSizeContext);
    let state: GameState = useContext(GameStateContext);

    let rowIndices: RowIndex[] = [
        0, 1, 2, 3, 4, 5, 6, 7
    ];

    let colIndices: ColIndex[] = [
        0, 1, 2, 3, 4, 5, 6, 7
    ]

    let capturedByOpponent: Piece[] = state.activePlayer == 'w' ? state.board.capturedByBlack : state.board.capturedByWhite;
    let captured: Piece[] = state.activePlayer == 'w' ? state.board.capturedByWhite : state.board.capturedByBlack;

    let promoWidth: number = size * .6;
    let promoHeight: number = size * .2;

    let boardMargin: number = size / 20;

    return (
        <div className='board'>
            {/* <svg width={size} height={9 * size / 8}> */}
            <svg viewBox={`0 0 ${size + boardMargin} ${9 * size / 8 + boardMargin}`}>
                <Graveyard x={boardMargin} y={0} reverse={true} pieces={capturedByOpponent}/>
                {/* <svg x={0} y={size/16} width={size} height={size}> */}
                <svg>
                {   
                    [1, 2, 3, 4, 5, 6, 7, 8].map(row => {
                        if (state.activePlayer == 'b')
                            return <text x={0} y={(size - (8 - row)*size/8)}>{row.toString()}</text>;
                        else
                            return <text x={0} y={((9 - row)*size/8)}>{row.toString()}</text>;
                    })
                }
                </svg>
                <svg 
                    // viewBox={`0 ${size/16} ${size} ${size}`}
                    x={boardMargin} y={size/16} width={size} height={size}
                >
                    {
                        rowIndices.map((r) => {
                            return colIndices.map((c) => {
                                return (
                                    <Square
                                        position={{r: r, c: c}}
                                        data={props.board.boardState[r][c]}
                                        key={r.toString() + c.toString()}
                                        boardClick={props.boardClick}
                                    />
                                )
                            });
                        })
                    }
                    <PromotionMenue 
                        width={promoWidth} 
                        height={promoHeight} 
                        x={(size - promoWidth) / 2} 
                        y={(size - promoHeight) / 2}
                        selectPromotion={props.selectPromotion}
                    />
                </svg>
                <svg>
                {   
                    [1, 2, 3, 4, 5, 6, 7, 8].map(col => {
                        if (state.activePlayer == 'b')
                            return <text x={(8 - col)*size/8 + size/10} y={35 * size / 32}>
                                {String.fromCharCode("A".charCodeAt(0) + col - 1)}
                            </text>;
                        else
                            return <text x={size - (8 - col)*size/8 - boardMargin/2} y={35 * size / 32}>
                                {String.fromCharCode("A".charCodeAt(0) + col - 1)}
                            </text>;
                    })
                }
                </svg>
                <Graveyard x={boardMargin} y={size + size/16 + boardMargin} reverse={false} pieces={captured}/>
            </svg>
        </div>
    );
}