import { PlayerColor, BoardCoord, BoardState, PieceSym } from "../types/Types2.d";
var board_config = require("./../board_config.json");
export const RELATIVE_CHESS_ASSEST_DIR: string = "../chess_assets/";

export abstract class Piece {
    constructor(color: PlayerColor, position: BoardCoord) {
        this.position = position;
        this.color = color;
    }

    position: BoardCoord;
    path: string;
    color: PlayerColor;

    abstract getSym() : PieceSym;
    abstract legalMoves() : BoardCoord[];
};

// export class NullPiece extends Piece {
//     constructor(color: PlayerColor, position: BoardCoord) {
//         super(color, position)
//     }

//     legalMoves() : BoardCoord[] {
//         return [];
//     }
// }