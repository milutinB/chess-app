import { GameStateContext } from "../GameStateContext";
import { GameState } from "../types/App.d";
import { useContext } from "react";
import { PieceSym } from "../types/Types2.d";
import ChessPiece from "./ChessPiece";
import { symToPiece } from "../chess_logic/Board";

export type PromotionMenueProps = {
    width: number,
    height: number,
    x: number,
    y: number,
    selectPromotion: (sym: PieceSym) => void
};

export default function PromotionMenue(props: PromotionMenueProps) : JSX.Element {

    let state: GameState = useContext(GameStateContext);
    let width: number = props.width;
    let height: number = props.height;
    let xMargin: number = width/10;
    let yMargin: number = xMargin;

    let pieceSymbols: PieceSym[] = state.activePlayer == 'w' ?
    ['wkn', 'wr', 'wb', 'wq'] :
    ['bkn', 'br', 'bb', 'bq'];
    
    if (state.currentAction !== 'SELECTING PROMOTION')
        return (<div></div>);

    return (
        // <div className={'promotion-menue'}>
            <svg 
                width={width} 
                height={height}
                x={props.x}
                y={props.y}
                // viewBox={`${props.x} ${props.y} ${width} ${height}`}
            >
                <rect rx={20}  width={width} 
                height={height} fill='white'/>
             {
                pieceSymbols.map((sym: PieceSym) => {
                    let i: number = pieceSymbols.indexOf(sym);
                    return (
                        <svg 
                            key={i.toString()}
                            width={(width-xMargin)/4} 
                            height={(width-xMargin)/4}
                            x={(xMargin/2) + i*((width-xMargin)/4)}
                            y={yMargin / 2}
                            onClick={() => {props.selectPromotion(sym)}}
                        >
                            <ChessPiece size={(width-xMargin)/4} piece={symToPiece(sym, {r: 0, c:0})}/>
                        </svg>
                    );
                })
                }
            </svg>
        // </div>
    );

}