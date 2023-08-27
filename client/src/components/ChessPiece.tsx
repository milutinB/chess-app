import { useContext } from "react";
// import { PieceMapContext } from "../PieceMapContext";
import { BoardSizeContext } from "../BoardSizeContext";
// import { PieceIndex, PieceNumber, SquareData } from "../types/Board";
import { ChessPieceProps } from "../types/Types2.d";
import { Piece } from "../chess_logic/Piece";
// import { PieceName, PieceProps, PieceMap } from "../types/Pieces.d";



export default function ChessPiece(props: ChessPieceProps) : JSX.Element {
    let size: number = useContext(BoardSizeContext) / 8;

    if (props.size)
        size = props.size;

    return (
        <svg>
            <image 
                role='piece-image' 
                width={size} 
                height={size} 
                href={props.piece.path}
            />
         </svg>
    );
}


// var board_config = require("./../board_config.json");

// const DRook: string = require("../chess_assets/" + board_config["pieces"]["b"]["rook"]);
// const DKing: string = require("../chess_assets/" + board_config["pieces"]["b"]["king"]);
// const DQueen: string = require("../chess_assets/" + board_config["pieces"]["b"]["queen"]);
// const DBishop: string = require("../chess_assets/" + board_config["pieces"]["b"]["bishop"]);
// const DKnight: string = require("../chess_assets/" + board_config["pieces"]["b"]["knight"]);
// const DPawn: string = require("../chess_assets/" + board_config["pieces"]["b"]["pawn"]);
// const LRook: string = require("../chess_assets/" + board_config["pieces"]["w"]["rook"]);
// const LKing: string = require("../chess_assets/" + board_config["pieces"]["w"]["king"]);
// const LQueen: string = require("../chess_assets/" + board_config["pieces"]["w"]["queen"]);
// const LBishop: string = require("../chess_assets/" + board_config["pieces"]["w"]["bishop"]);
// const LKnight: string = require("../chess_assets/" + board_config["pieces"]["w"]["knight"]);
// const LPawn: string = require("../chess_assets/" + board_config["pieces"]["w"]["pawn"]);


// export default function ChessPiece(props: PieceProps) : JSX.Element {
//     let size: number = useContext(BoardSizeContext) / 8;
//     let pieceMap: PieceMap = useContext(PieceMapContext);
//     let data: SquareData = props.data;
    
//     if (data === 0)
//         return (null);

//     let piece: PieceName = data[0] == 'w' ? pieceMap.w[data[1]] :
//     pieceMap.b[data[1]];

//     let path: string;

//     switch(piece) {
//         case "rook":
//             path = data[0] == 'w' ? LRook : DRook;
//             break;
//         case "knight":
//             path = data[0] == 'w' ? LKnight :DKnight;
//             break;
//         case "king":
//             path = data[0] == 'w' ? LKing :DKing;
//             break;
//         case "queen":
//             path = data[0] == 'w' ? LQueen :DQueen;
//             break;
//         case "bishop":
//             path = data[0] == 'w' ? LBishop :DBishop;
//             break;
//         case "pawn":
//             path = data[0] == 'w' ? LPawn : DPawn;
//             break;
//     }

//     return (
//         <svg>
//             <image role='piece-image' width={size} height={size} href={path}/>
//         </svg>
//     );
// }