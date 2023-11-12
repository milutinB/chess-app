import { Piece, RELATIVE_CHESS_ASSEST_DIR } from "./Piece";
import { PieceSym, PlayerColor, BoardCoord, BoardState, RowIndex, ColIndex } from "../types/Types2.d";
import board_config from "./../board_config.json";
// var board_config = require("./../board_config.json");


export class Pawn extends Piece {
    constructor(color: PlayerColor, position: BoardCoord) {
        super(color, position);
        this.path = require("../chess_assets/"
        + board_config["pieces"][color]["pawn"]); 
    }

    getSym() : PieceSym {
        return this.color + 'p' as PieceSym;
    }

    legalMoves() : BoardCoord[] {
        let r: RowIndex = this.position.r;
        let c: ColIndex = this.position.c;
        let rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let cols: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let output: BoardCoord[] = [];
        let yDir: number = this.color == 'w' ? 1 : -1;


        if (rows.includes(r + yDir)) {
            output.push({
                r: r + yDir as RowIndex,
                c: c
            });
            if (cols.includes(c + 1))
                output.push({
                    r: r + yDir as RowIndex,
                    c: c + 1 as ColIndex
                })
            if (cols.includes(c - 1))
                output.push({
                    r: r + yDir as RowIndex,
                    c: c - 1 as ColIndex
                })
        }
        if ((this.color == 'w' && this.position.r == 1) ||
            (this.color == 'b' && this.position.r == 6))
            output.push({
                r: r + 2 * yDir as RowIndex,
                c: c
            });
        
        return output;
    }
}