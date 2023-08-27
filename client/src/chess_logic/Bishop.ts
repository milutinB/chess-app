import { Piece, RELATIVE_CHESS_ASSEST_DIR } from "./Piece";
import { PlayerColor, BoardCoord, BoardState, RowIndex, ColIndex, PieceSym } from "../types/Types2.d";
var board_config = require("./../board_config.json");

export class Bishop extends Piece {
    constructor(color: PlayerColor, position: BoardCoord) {
        super(color, position);
        this.path = require("../chess_assets/"
        + board_config["pieces"][color]["bishop"]); 
    }

    getSym() : PieceSym {
        return this.color + 'b' as PieceSym;
    }

    legalMoves(): BoardCoord[] {
        let r: number = this.position.r;
        let c: number = this.position.c;
        let rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let cols: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let output: BoardCoord[] = [];
        [1, -1].map((xDir) => {
            [1, -1].map((yDir) => {
                for (var i = 1; i < 8; ++i) {
                    if (rows.includes(r + yDir * i) 
                    && cols.includes(c + xDir * i)) {
                        output.push({
                            r: r + yDir * i as RowIndex,
                            c: c + xDir * i as ColIndex
                        })
                    }
                }
            });
        })
        return output;
    }
}