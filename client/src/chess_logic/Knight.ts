import { Piece, RELATIVE_CHESS_ASSEST_DIR } from "./Piece";
import { PieceSym, PlayerColor, BoardCoord, BoardState, RowIndex, ColIndex } from "../types/Types2.d";
import board_config from "./../board_config.json";
// var board_config = require("./../board_config.json");

export class Knight extends Piece {
    constructor(color: PlayerColor, position: BoardCoord) {
        super(color, position);
        this.path = require("../chess_assets/"
        + board_config["pieces"][color]["knight"]); 
    }

    getSym() : PieceSym {
        return this.color + 'kn' as PieceSym;
    }

    legalMoves() : BoardCoord[] {
        let r: number = this.position.r;
        let c: number = this.position.c;
        let rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let cols: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let output: BoardCoord[] = [];
        [1, -1].map((xDir: 1 | -1) => {
            [1, -1].map((yDir: 1 | -1) => {
                [1, 2].map((xDist: 1 | 2) => {
                    let yDist: 1 | 2 = xDist == 1 ? 2 : 1;
                    if (rows.includes(r + yDist * yDir)) 
                        if (cols.includes(c + xDist * xDir))
                            output.push({
                                r: r + yDist * yDir as RowIndex,
                                c: c + xDist * xDir as ColIndex
                        });
                })
            })
        })
        return output;
    }
}