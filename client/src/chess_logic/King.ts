import { Piece, RELATIVE_CHESS_ASSEST_DIR } from "./Piece";
import { PlayerColor, BoardCoord, BoardState, RowIndex, ColIndex, PieceSym } from "../types/Types2.d";
import board_config from "./../board_config.json";
// var board_config = require("./../board_config.json");

export class King extends Piece {
    constructor(color: PlayerColor, position: BoardCoord) {
        super(color, position);
        this.path = require("../chess_assets/" 
        + board_config["pieces"][color]["king"]); 
    }

    getSym() : PieceSym {
        return this.color + 'k' as PieceSym;
    }

    legalMoves() : BoardCoord[] {
        let r: RowIndex = this.position.r;
        let c: ColIndex = this.position.c;
        let rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let cols: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
        let output: BoardCoord[] = [];
        [-1, 0, 1].map((dx: number) => {
            [-1, 0, 1].map((dy: number) => {
                let newR: number = r + dy;
                let newC: number = c + dx;
                if (newC != c || newR != r) {
                    if (rows.includes(newC) && cols.includes(newR)) {
                        output.push({
                            r: newR as RowIndex,
                            c: newC as ColIndex
                        })
                    }
                }
            });
        });
        return output;
    }

    hasMoved: boolean = false;
}