// import Piece from "../components/ChessPiece";
import { Piece } from "./Piece";
import { BoardCoord, BoardState, ColIndex, RowIndex, SquareData, SquareDataSym, BoardMove, PlayerColor, BoardServerData, BoardRowSym, BoardStateSym, PieceSym } from "../types/Types2.d";
import { Pawn } from "./Pawn";
import { Knight } from "./Knight";
import { Queen } from "./Queen";
import { King } from "./King";
import { Rook } from "./Rook";
import { Bishop } from "./Bishop";
import { fireEvent } from "@testing-library/dom";

export function coordEqual(a: BoardCoord, b: BoardCoord): boolean {
    return a.r == b.r && a.c == b.c;
}

export function containsCoord(coordArray: BoardCoord[], query: BoardCoord) : boolean {
    let result: boolean = false;
    coordArray.map((bc: BoardCoord) => {
        result = result || coordEqual(bc, query);
    })
    return result;
}

export function symToPiece(sym: PieceSym, pos: BoardCoord): Piece {
    let newPiece: Piece;
    let color: PlayerColor = sym[0] as PlayerColor;
    let piece: String = sym.slice(1, sym.length);
    switch(piece) {
        case 'p':
            newPiece = new Pawn(color, pos);
            break;
        case 'r':
            newPiece = new Rook(color, pos);
            break;
        case 'b':
            newPiece = new Bishop(color, pos);
            break;
        case 'kn':
            newPiece = new Knight(color, pos);
            break;
        case 'k':
            newPiece = new King(color, pos);
            break;
        case 'q':
            newPiece = new Queen(color, pos);
            break;
    }

    return newPiece;
}

export class Board {
    constructor(boardState: BoardState, currentPlayer?: PlayerColor,
        capturedByWhite?: Piece[], CapturedByBlack?: Piece[]) {
        [0, 1, 2, 3, 4, 5, 6, 7].map((r: RowIndex) => {
            [0, 1, 2, 3, 4, 5, 6, 7].map((c: ColIndex) => {
                let data: SquareData = boardState[r][c];
                if (data !== 0) {
                    if (data instanceof Pawn) {
                        this.boardState[r][c] = new Pawn(data.color, data.position);
                    }
                    if (data instanceof Rook) {
                        this.boardState[r][c] = new Rook(data.color, data.position);
                    }
                    if (data instanceof Bishop) {
                        this.boardState[r][c] = new Bishop(data.color, data.position);
                    }
                    if (data instanceof Knight) {
                        this.boardState[r][c] = new Knight(data.color, data.position);
                    }
                    if (data instanceof Queen) {
                        this.boardState[r][c] = new Queen(data.color, data.position);
                    }
                    if (data instanceof King) {
                        this.boardState[r][c] = new King(data.color, data.position);
                        if (data.color == 'w')
                            this.whiteKingPosition = {r: r, c: c};
                        if (data.color  == 'b')
                            this.blackKingPosition = {r: r, c: c};
                    }
                }
            });
        });
        this.validateBoard();
    }

    validateBoard() {
        [0, 1, 2, 3, 4, 5, 6, 7].map((r: RowIndex) => {
            [0, 1, 2, 3, 4, 5, 6, 7].map((c: ColIndex) => {
                let data: SquareData = this.boardState[r][c];
                if (typeof data != 'number') {
                    if (data.position.r != r || data.position.c != c)
                        throw new Error("piece position does not match position on board.");
                }
            });
        });
    }

    toJson() : BoardServerData {
        return {
            state: this.boardState.map(row => {
                return row.map(data => {
                    if (data === 0)
                        return 0;
                    else
                        return data.getSym();
                }) as BoardRowSym
            }) as BoardStateSym,
            currentPlayer: this.currentPlayer,
            capturedByWhite: this.capturedByWhite.map((p: Piece) => p.getSym()),
            capturedByBlack: this.capturedByBlack.map((p: Piece) => p.getSym()),
            lastMove: this.lastMove,
            whiteRookMoved: this.whiteRookMoved,
            blackRookMoved: this.blackRookMoved,
            blackKingMoved: this.blackKingMoved,
            whiteKingMoved: this.whiteKingMoved
        };
    }

    static fromJson(data: BoardServerData) : Board {
        let newState: BoardState = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        [0, 1, 2, 3, 4, 5, 6, 7].map((r: RowIndex) => {
            [0, 1, 2, 3, 4, 5, 6, 7].map((c: ColIndex) => {
                let sym: SquareDataSym = data.state[r][c];
                if (sym === 0)
                    newState[r][c] = 0;
                else {
                    let pos: BoardCoord = {r: r, c: c};
                    let newPiece: Piece = symToPiece(sym, pos);
                    newState[r][c] = newPiece;
                }
            });
        });
        let newBoard: Board = new Board(newState);
        newBoard.capturedByWhite = data.capturedByWhite.map((sym: PieceSym) => {
            return symToPiece(sym, {r: 0, c: 0});
        });
        newBoard.capturedByBlack = data.capturedByBlack.map((sym: PieceSym) => {
            return symToPiece(sym, {r: 0, c: 0});
        });
        newBoard.currentPlayer = data.currentPlayer
        newBoard.lastMove = data.lastMove;
        newBoard.whiteKingMoved = data.whiteKingMoved;
        newBoard.blackKingMoved = data.blackKingMoved;
        newBoard.whiteRookMoved = data.whiteRookMoved;
        newBoard.blackRookMoved = data.blackRookMoved;
        return newBoard;
    }

    getData(coord: BoardCoord) : SquareData {
        return this.boardState[coord.r][coord.c];
    }

    /**
     * 
     * @param src 
     * @param tgt 
     * @returns true if the straight line from src to tgt
     * is blocked by another piece, false otherwise
     */
    unobstructedPath(src: BoardCoord, tgt: BoardCoord) : boolean {
        if ((src.r != tgt.r) && 
            (src.c != tgt.c) &&
            (Math.abs(src.r - tgt.r) != Math.abs(src.c - tgt.c)))
                throw new Error('src and tgt must lie on the' +
                'same vertical, horzontal or diagonal line');
    
        let result = true;

        if (src.r == tgt.r) {
            for (var i = 1 + Math.min(src.c, tgt.c); 
            i < Math.max(src.c, tgt.c); ++i) {
                result &&= this.getData({r: src.r, c: i as ColIndex}) === 0;
            }
        } else if (src.c == tgt.c) {
            for (var i = 1 + Math.min(src.r, tgt.r); 
            i < Math.max(src.r, tgt.r); ++i) {
                result &&= this.getData({r: i as RowIndex, c: src.c}) === 0;
            }
        } else {
            let dx = src.c > tgt.c ? -1 : 1;
            let dy = src.r > tgt.r ? -1 : 1;
            let n = Math.abs(src.c - tgt.c);
            for (var i = 1; i < n; ++i) {
                result &&= this.getData({
                    r: src.r + i*dy as RowIndex, 
                    c: src.c + i*dx as ColIndex}) === 0;
            }
        }

        return result;
    }

    /**
     * 
     * @param color 
     * @returns True if there are legal moves available to 
     * player whose color matches the argument, false otherwise.
     */
    movesAvailabe(color: PlayerColor) : boolean {
        let result = false;
        [0, 1, 2, 3, 4, 5, 6, 7].map((r: RowIndex) => {
            [0, 1, 2, 3, 4, 5, 6, 7].map((c: ColIndex) => {
                let data: SquareData = this.getData({r: r, c: c});
                if (data instanceof Piece)
                    if (data.color == color)
                        if (this.legalMoves({r: r, c: c}).length > 0)
                            result = true;
            });
        });
        return result;
    };

    /**
     * 
     * @param color 
     * @returns True if player color is currently in checkmate,
     * false otherwise.
     */
    checkmate(color: PlayerColor) : boolean {
        return this.currentPlayer === color &&
        this.getAttackingPieces(color).length > 0 
        && !this.movesAvailabe(color);
    }

    /**
     * 
     * @returns True if the game has reached stalemate, false
     * otherwise.
     */
    stalemate() : boolean {
        return this.getAttackingPieces(this.currentPlayer).length == 0 
        && !this.movesAvailabe(this.currentPlayer);
    };

    /**
     * 
     * @param position 
     * @returns true if the piece at position is a threatened
     * king or a piece threatening a king.
     */
    checkEngadgement(position: BoardCoord) :  boolean {
        let whiteAttacking: BoardCoord[] = this.getAttackingPieces('w');
        let blackAttacking: BoardCoord[] = this.getAttackingPieces('b');

        if (coordEqual(position, this.whiteKingPosition) 
        && whiteAttacking.length > 0)
            return true;

        if (coordEqual(position, this.blackKingPosition) 
        && blackAttacking.length > 0)
            return true;

        return containsCoord(whiteAttacking, position)
        || containsCoord(blackAttacking, position);
    };

    /**
     * 
     * @param kingColor 
     * @returns Array of board coordinates containing pieces which are attacking
     * the king of color kingColor
     */
    getAttackingPieces(kingColor: PlayerColor) : BoardCoord[] {
        let output: BoardCoord[] = [];
        let kingCoord: BoardCoord = kingColor == 'w' ?  
        this.whiteKingPosition :  this.blackKingPosition;
        [0, 1, 2, 3, 4, 5, 6, 7].map((r: RowIndex) => {
            [0, 1, 2, 3, 4, 5, 6, 7].map((c: ColIndex) => {
                let data: SquareData = this.getData({r: r, c: c});
                    if (data !== 0) {
                        if (data.color != kingColor) {
                            let moves: BoardCoord[] = this.feasibleMoves({r: r, c: c});
                            moves.map((m: BoardCoord) => {
                                if (coordEqual(m, kingCoord))
                                    output.push({r: r, c: c});
                            });
                        }
                    }
            });
        });
        return output;
    }

    /**
     * 
     * @param kingColor 
     * @returns Returns the coordinate of a piece
     * attacking the king of the specified color. 
     * Returns undefined if there is not such coordinate.
     */
    getAttackingPiece(kingColor: PlayerColor) :  undefined | BoardCoord {
        let output: undefined | BoardCoord = undefined;
        let kingCoord: BoardCoord = kingColor == 'w' ?  
        this.whiteKingPosition :  this.blackKingPosition;
        [0, 1, 2, 3, 4, 5, 6, 7].map((r: RowIndex) => {
            [0, 1, 2, 3, 4, 5, 6, 7].map((c: ColIndex) => {
                let data: SquareData = this.getData({r: r, c: c});
                    if (data !== 0) {
                        if (data.color != kingColor) {
                            let moves: BoardCoord[] = this.feasibleMoves({r: r, c: c});
                            moves.map((m: BoardCoord) => {
                                if (coordEqual(m, kingCoord))
                                    output = {r: r, c: c};
                            });
                        }
                    }
            });
        });
        return output;
    }

    /**
     * 
     * @param src 
     * @param tgt 
     * @returns true if moving a piece from src to tgt exposes
     * the king of the acting player. Returns false otherwise.
     */
    kingExposingMove(src: BoardCoord, tgt: BoardCoord) : boolean {
        let data: SquareData = this.getData(src);
        if (data === 0)
            throw new Error("There must be a piece at src");
        let color: PlayerColor = data.color;
        let testBoard: Board = new Board(this.boardState);
        testBoard.processMove(src, tgt);
        return testBoard.getAttackingPiece(color) !== undefined;
    }

    /**
     * Filter's out invalid moves from a list of candidate
     * moves from a given position on the board.
     * @param src 
     * @param candidateMoves 
     */
    filterMoves(src: BoardCoord, candidateMoves: BoardCoord[]): BoardCoord[] {
        return [];
    }

    /**
     * 
     * @param position 
     * @param color 
     * @returns true the square at 'position' is threatened by a piece 
     * whose color matches the 'color' argument, false otherwise.
     */
    threatenedSquare(position: BoardCoord, color: PlayerColor) : boolean {
        let result: boolean = false;
        [0, 1, 2, 3, 4, 5, 6, 7].map((r: RowIndex) => {
            [0, 1, 2, 3, 4, 5, 6, 7].map((c: ColIndex) => {
                let data: SquareData = this.getData({r: r, c: c});
                if (data instanceof Piece)
                    if (data.color == color) {
                        let feasible: BoardCoord[] = this.feasibleMoves({r: r, c: c});
                        let contains: boolean = containsCoord(feasible, position);
                        if (contains)
                            result = true;
                    }
            });
        });
        return result;
    }

    /**
     * 
     * @param color
     * @param position 
     * @returns False if there is a piece at position
     * whose color matches the 'color' argument
     */
    friendlyFilter(color: PlayerColor, position: BoardCoord): boolean {
        let data: SquareData = this.getData(position);
        if (typeof data == 'number')
            return true;
        else 
            return color != data.color;
    }


    /**
     * 
     * @param position A board coordinate. An exception is raised 
     * if there is no piece at this position.
     * @returns An array of board coordinates corresponding to
     * feasible moves of the piece at 'position'. Some of the returned
     * moves may not be legal as they may expose the active player's king
     * to attack.
     */
    feasibleMoves(position: BoardCoord) : BoardCoord[] {
        let piece: SquareData = this.getData(position);

        if (typeof piece == 'number')
            throw new Error("The board must contain a piece at position");

        let candidateMoves: BoardCoord[] = piece.legalMoves();
        let color: PlayerColor = piece.color;
        let feasibleMoves: BoardCoord[] = [];

        if (piece instanceof Pawn) {
            let yDir: number = color == 'w' ? 1 : -1;
            let start: number = color == 'w' ? 1 : 6;

            let rows: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
            let cols: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

            if (position.r == start && this.getData({r: position.r+yDir as RowIndex, c: position.c}) === 0)
                if (this.getData({r: start + 2*yDir as RowIndex, c: position.c}) === 0)
                    feasibleMoves.push({r: start + 2*yDir as RowIndex, c: position.c})
            
            if (rows.includes(position.r + yDir))
                if (this.getData({r: position.r + yDir as RowIndex, c: position.c}) === 0)
                    feasibleMoves.push({r: position.r + yDir as RowIndex, c: position.c});

            [1, -1].map((xDir: number) => {
                if (cols.includes(position.c + xDir) && rows.includes(position.r + yDir)) {
                    let data: SquareData = this.getData(
                        {
                            r: position.r + yDir as RowIndex, 
                            c: position.c + xDir as ColIndex
                        }
                    );
                    if (typeof data != 'number') {
                        if (data.color != color)
                            feasibleMoves.push(
                                {
                                    r: position.r + yDir as RowIndex, 
                                    c: position.c + xDir as ColIndex
                                }
                            );
                    } 
                    else {
                        let adjData: SquareData = this.getData(
                            {
                                r: position.r, 
                                c: position.c + xDir as ColIndex
                            }
                        );
                        if (rows.includes(position.r + 2*yDir))
                            if (adjData instanceof Pawn)
                                if (this.lastMove !== 0) {
                                    if (coordEqual(this.lastMove.src, 
                                        {
                                            r: position.r + 2*yDir as RowIndex, 
                                            c: position.c + xDir as ColIndex
                                        }
                                    ))
                                            if (coordEqual(this.lastMove.tgt, 
                                                {
                                                    r: position.r, 
                                                    c: position.c + xDir as ColIndex
                                                }
                                            )) {
                                                    feasibleMoves.push(
                                                        {
                                                            r: position.r + yDir as RowIndex, 
                                                            c: position.c + xDir as ColIndex
                                                        }
                                                    );
                                                }
                                }
                    }
                }
            });
        } else if (piece instanceof Knight) {
            feasibleMoves = piece.legalMoves().filter(move => 
                this.friendlyFilter(color, move)   
            );
        } else {
            feasibleMoves = candidateMoves.filter(move => 
                this.unobstructedPath(position, move))
                .filter(move => 
                    this.friendlyFilter(color, move)  
                );
        }

        if (piece instanceof King) {
            feasibleMoves = candidateMoves.filter(move => 
            this.unobstructedPath(position, move))
            .filter(move => 
                this.friendlyFilter(color, move)  
            );
            let oppColor: PlayerColor = piece.color == 'w' ? 'b' : 'w';
            let startRow: RowIndex = piece.color == 'w' ? 0 : 7;
            let moved: boolean = piece.color == 'w' ? this.whiteKingMoved : this.blackKingMoved;
            if (coordEqual(piece.position, {r: startRow, c: 4}) && !moved) {
                [0, 7].map((c: 0 | 7) => {
                    let cornerData: SquareData = this.getData({r: startRow, c: c});
                    if (cornerData instanceof Rook) {
                        let cornerMoved: boolean = cornerData.color == 'w' ? this.whiteRookMoved[c] :
                        this.blackRookMoved[c];  
                        if (!cornerMoved) {
                            let tgtCol: ColIndex = c == 0 ? 2 : 6;
                            if (this.getData({r: startRow, c: tgtCol}) === 0
                            && this.unobstructedPath(position, {r: startRow, c: tgtCol}))
                                feasibleMoves.push({r: startRow, c: tgtCol});
                        }
                    }
                })
            }
        }
        return feasibleMoves;
    }

    /**
     * 
     * @param position 
     * @returns Returns all legal moves of the piece storred at
     * position.
     */
    legalMoves(position: BoardCoord) : BoardCoord[] {
        let feasibleMoves: BoardCoord[] = this.feasibleMoves(position);
        if (this.getData(position) !== 0) {
            let piece: Piece = this.getData(position) as Piece;
            if (piece instanceof King) {
                let oppColor: PlayerColor = piece.color == 'w' ? 'b' : 'w';
                let leftCastleValid: boolean = true;
                let rightCastleValid: boolean = true;
                let startRow: RowIndex = piece.color == 'w' ? 0 : 7;
                [0, 7].map((rCol: ColIndex) => {
                    let rPos: SquareData = this.getData({r: startRow, c: rCol});
                    if (rPos instanceof Rook) {
                        let cols: ColIndex[] = rCol == 0 ? [0, 1, 2, 3, 4]
                        : [4, 5, 6, 7];
                        cols.map((c: ColIndex) => {
                            if (this.threatenedSquare({r: startRow, c: c}, oppColor)) {
                                if (rCol == 0)
                                    leftCastleValid = false;
                                else
                                    rightCastleValid = false;
                            }
                        });
                    } else {
                        if (rCol == 0)
                            leftCastleValid = false;
                        else
                            rightCastleValid = false;
                    };
                });
                if (!leftCastleValid) {
                    feasibleMoves = feasibleMoves.filter(move => !coordEqual(move, {r: startRow, c: 2}));
                }
                if (!rightCastleValid) {
                    feasibleMoves = feasibleMoves.filter(move => !coordEqual(move, {r: startRow, c: 7}));
                }
            }
        }
        feasibleMoves = feasibleMoves.filter(move => !this.kingExposingMove(position, move));
        return feasibleMoves;
    }

    processMove(src: BoardCoord, tgt: BoardCoord) : void {
        let data: SquareData = this.getData(src);
        let tgt_data: SquareData = this.getData(tgt);
        if (data === 0)
            throw new Error("src position must contain a piece");
        if (data instanceof King) {
            if (data.color == 'w')
                this.whiteKingPosition = tgt;
            if (data.color == 'b')
                this.blackKingPosition = tgt;
        }
        if (tgt_data instanceof Piece) {
            if (tgt_data.color == data.color)
                throw new Error('cannot attack own piece')
            
            switch (data.color) {
                case 'w':
                    this.capturedByWhite.push(tgt_data);
                    break;
                case 'b':
                    this.capturedByBlack.push(tgt_data);
                    break;
            }
        } else if (data instanceof Pawn) {
            let yDir: number = data.color == 'w' ? 1 : -1;
            let oppStart: RowIndex = data.color == 'w' ? 6 : 1;
            let pos: BoardCoord = data.position;
            [1, -1].map((xDir: number) => {
                if ([0, 1, 2, 3, 4, 5, 6, 7].includes(pos.c + xDir) 
                && pos.r == oppStart - 2*yDir) {
                    let adjData: SquareData = this.getData(
                        {r: pos.r, c: pos.c + xDir as ColIndex});
                    if (adjData instanceof Pawn && this.lastMove !== 0
                        && (
                            coordEqual(this.lastMove.src, {r: oppStart, c: pos.c + xDir as ColIndex})
                            && coordEqual(this.lastMove.tgt, {r: pos.r, c: pos.c + xDir as ColIndex})
                        )) {
                            switch ((data as Pawn).color) {
                                case 'w':
                                    this.capturedByWhite.push(adjData);
                                    break;
                                case 'b':
                                    this.capturedByBlack.push(adjData);
                                    break; 
                            }
                            this.boardState[pos.r][pos.c + xDir] = 0;
                    }
                }
            })
        } else if (data instanceof King) {
            let startRow: RowIndex = data.color == 'w' ? 0 : 7;
            if (coordEqual(data.position, {r: startRow, c: 4})) {
                let leftRookPos: BoardCoord = {r: startRow, c: 0};
                let rightRookPos: BoardCoord = {r: startRow, c: 7};
                if (coordEqual(tgt, {r: startRow, c: 2})) {
                    let leftRook: SquareData = this.getData(leftRookPos);
                    if (!(leftRook instanceof Rook))
                        throw new Error("Invalid move");
                    this.boardState[startRow][0] = 0
                    leftRook.position = {r: startRow, c: 3};
                    this.boardState[startRow][3] = leftRook;
                }
                if (coordEqual(tgt, {r: startRow, c: 6})) {
                    let rightRook: SquareData = this.getData(rightRookPos);
                    if (!(rightRook instanceof Rook))
                        throw new Error("Invalid move");
                    this.boardState[startRow][7] = 0
                    rightRook.position = {r: startRow, c: 5};
                    this.boardState[startRow][5] = rightRook;
                }
            }
        }

        this.lastMove = {src: src, tgt: tgt};
        data.position = tgt;
        if (data instanceof King) {
            if (data.color == 'w')
                this.whiteKingMoved = true;
            else
                this.blackKingMoved = true;
        }
        if (data instanceof Rook) {
            if (data.color == 'w') {
                if (data.position.c == 0) 
                    this.whiteRookMoved[0] = true;
                if (data.position.c == 7)
                    this.whiteRookMoved[7] = true;
            }
            else if (data.color == 'b') {
                if (data.position.c == 0) 
                    this.blackRookMoved[0] = true;
                if (data.position.c == 7)
                    this.blackRookMoved[7] = true;
            }
                
        }
        this.boardState[tgt.r][tgt.c] = data;
        this.boardState[src.r][src.c] = 0;
        this.currentPlayer = data.color == 'w' ? 'b' : 'w';
    }

    boardState: BoardState = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    lastMove: 0 | BoardMove = 0;
    whiteKingPosition: BoardCoord;
    blackKingPosition: BoardCoord;
    currentPlayer: PlayerColor = 'w';
    capturedByWhite: Piece[] = [];
    capturedByBlack: Piece[] = [];
    whiteRookMoved: {0: boolean, 7: boolean} = {0: false, 7: false};
    blackRookMoved: {0: boolean, 7: boolean} = {0: false, 7: false};
    whiteKingMoved: boolean = false;
    blackKingMoved: boolean = false;
}