import { Piece, RELATIVE_CHESS_ASSEST_DIR } from "./Piece";
import { PieceSym, PlayerColor, BoardCoord, BoardState, RowIndex, ColIndex } from "../types/Types2.d";
var board_config = require("./../board_config.json");


export class Queen extends Piece {
    constructor(color: PlayerColor, position: BoardCoord) {
        super(color, position);
        this.path = require("../chess_assets/" 
        + board_config["pieces"][color]["queen"]); 
    }
    
    getSym() : PieceSym {
        return this.color + 'q' as PieceSym;
    }

    legalMoves() : BoardCoord[] {
        let r: RowIndex = this.position.r;
        let c: ColIndex = this.position.c;
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
        for (var i = 0; i < 8; ++i) {
            if (i != r)
                output.push({r: i as RowIndex, c: c});
            if (i != c)
                output.push({r: r, c: i as ColIndex});
        }
        return output;
    }
}