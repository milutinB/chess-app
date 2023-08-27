import { useContext } from "react";
import { BoardSizeContext } from "../BoardSizeContext";
import { Piece } from "../chess_logic/Piece";
import { GraveyardProps } from "../types/Types2.d";
import ChessPiece from "./ChessPiece";


export default function Graveyard(props: GraveyardProps) : JSX.Element {

    let pieceSize: number = useContext(BoardSizeContext) / 16;

    return (
        <svg 
            // viewBox={`${props.x} ${props.y} ${useContext(BoardSizeContext)} ${pieceSize}`}
            height={pieceSize} width={"100%"}
            x={props.x} y={props.y}
        > 
            {
                props.pieces.map((piece: Piece) => {
                    let i: number = props.pieces.indexOf(piece);
                    let pos: number = props.reverse ? (pieceSize) * (16 - i - 1) :  (pieceSize) * i;
                    return (
                        <svg key={i + piece.getSym()} 
                            x={pos} width={pieceSize} height={pieceSize}
                            // viewBox={`${pos} ${props.y} ${pieceSize} ${pieceSize}`}
                        >
                            <ChessPiece piece={piece} size={pieceSize}/>
                        </svg>
                    );
                })
            }
        </svg>
    )
}