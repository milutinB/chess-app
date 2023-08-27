import { Piece, RELATIVE_CHESS_ASSEST_DIR } from "./Piece";
import { PieceSym, PlayerColor, BoardCoord, BoardState, RowIndex, ColIndex } from "../types/Types2.d";
var board_config = require("./../board_config.json");


export class Rook extends Piece {
    constructor(color: PlayerColor, position: BoardCoord) {
        super(color, position);
        this.path = require("../chess_assets/" 
        + board_config["pieces"][color]["rook"]); 
    }

    getSym() : PieceSym {
        return this.color + 'r' as PieceSym;
    }

    legalMoves() : BoardCoord[] {
        let r: RowIndex = this.position.r;
        let c: ColIndex = this.position.c;
        let output: BoardCoord[] = [];

        for (var i = 0; i < 8; ++i) {
            if (i != r)
                output.push({r: i as RowIndex, c: c});
            if (i != c)
                output.push({r: r, c: i as ColIndex});
        }
        return output;
    }

    hasMoved: boolean = false;
}