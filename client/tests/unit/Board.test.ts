import { Board, containsCoord } from "../../src/chess_logic/Board";
import { BoardState, BoardRow, SquareData, BoardCoord } from "../../src/types/Types2.d";
import { initial_board_state } from "../../src/utils/chess_setup_utils";
import { King } from "../../src/chess_logic/King";
import { Queen } from "../../src/chess_logic/Queen";
import { Pawn } from "../../src/chess_logic/Pawn";
import { Rook } from "../../src/chess_logic/Rook";
import { Knight } from "../../src/chess_logic/Knight";
import { Bishop } from "../../src/chess_logic/Bishop";
import { Piece } from "../../src/chess_logic/Piece";

let emptyBoard: Board;        
let startingBoard: Board;
let sparseBoard: Board;


beforeEach(() => {
    let emptyRow: BoardRow = [
        0, 0, 0, 0, 0, 0, 0, 0
    ];
    let emptyBoardState: BoardState = [
        emptyRow, emptyRow, emptyRow, emptyRow,
        emptyRow, emptyRow, emptyRow, emptyRow
    ]
    let emptyBoard = new Board(emptyBoardState);

    let startingBoardState: BoardState = initial_board_state();
    startingBoard = new Board(startingBoardState);


    /**
     * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
     */

    // Sparse Board:
    /*
        *  -  ♜  -  ♞  ♜  ♚  -
        ♟  ♝  -  ♟  -  *  ♟  ♟
        *  ♛  *  -  ♟  ♟  *  -
        -  ♟  -  *  ♞  ♙  -  * 
        *  -  *  ♙  *  -  *  ♖ 
        ♙  *  -  ♗  -  *  ♘  *
        *  -  *  -  *  -  ♙  ♙
        ♖  *  ♗  ♕  -  *  ♔  *

        '*' = white
        '-' = black
    */

    let sparseBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 0, 0, new King('w', {r: 0, c: 6}), 0],
        [0, 0, 0, 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, new Bishop('w', {r: 2, c: 3}), 0, 0, new Knight('w', {r:2, c: 6}), 0],
        [0, 0, 0, new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, 0, new Knight('b', {r: 4, c: 4}), new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), 0, 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]

    sparseBoard = new Board(sparseBoardState);
});

describe('unobstructed path', () => {
    it('throws an error when src and tgt are not on a line', () => {
        let f1 = () => {
            sparseBoard.unobstructedPath(
                {r: 0, c: 0}, {r: 1, c: 3}
            );
        };
        expect(f1).toThrow(Error);
        let f2 = () => {
            sparseBoard.unobstructedPath(
                {r: 3, c: 4}, {r: 2, c: 7}
            )
        };
        expect(f2).toThrow(Error);
    });
    test('unobstructed path from bottom left', () => {
        expect(sparseBoard.unobstructedPath(
            {r: 0, c: 0}, {r: 2, c: 0}
        )).toEqual(true);
        expect(sparseBoard.unobstructedPath(
            {r: 0, c: 0}, {r: 3, c: 0}
        )).toEqual(false);
        expect(sparseBoard.unobstructedPath(
            {r: 0, c: 0}, {r: 3, c: 3}
        )).toEqual(true);
        expect(sparseBoard.unobstructedPath(
            {r: 0, c: 0}, {r: 4, c: 4}
        )).toEqual(false);
        expect(sparseBoard.unobstructedPath(
            {r: 0, c: 0}, {r: 0, c: 1}
        )).toEqual(true);
        expect(sparseBoard.unobstructedPath(
            {r: 0, c: 0}, {r: 0, c: 7}
        )).toEqual(false);
    });
    test('unobstructed path from center', () => {
        expect(sparseBoard.unobstructedPath(
            {r: 3, c: 3}, {r: 6, c: 3}
        )).toEqual(true);
        expect(sparseBoard.unobstructedPath(
            {r: 3, c: 3}, {r: 7, c: 3}
        )).toBe(false);
        expect(sparseBoard.unobstructedPath(
            {r: 3, c: 3}, {r: 3, c: 7}
        )).toBe(true);
        expect(sparseBoard.unobstructedPath(
            {r: 3, c: 3}, {r: 5, c: 5}
        )).toBe(false);
        expect(sparseBoard.unobstructedPath(
            {r: 3, c: 3}, {r: 1, c: 1}
        )).toBe(true);
    });
});

describe('feasible moves', () => {
    test('white pawn starting', () => {
        let feasible: BoardCoord[] = startingBoard.feasibleMoves({r: 1, c: 3});
        let expectedMoves: BoardCoord[] = [
            {r: 2, c: 3}, {r: 3, c: 3}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(2);
    });
    test('black pawn starting', () => {
        let feasible: BoardCoord[] = startingBoard.feasibleMoves({r: 6, c: 3});
        let expectedMoves: BoardCoord[] = [
            {r: 5, c: 3}, {r: 4, c: 3}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(2);
    });

    test('white pawn non-starting', () => {
        let feasible: BoardCoord[] = sparseBoard.feasibleMoves({r: 3, c: 3});
        let expectedMoves: BoardCoord[] = [
            {r: 4, c: 3}, {r: 4, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(2);
    });

    test('black pawn non-starting', () => {
        let feasible: BoardCoord[] = sparseBoard.feasibleMoves({r: 5, c: 5});
        expect(feasible.length).toEqual(0);
    });

    test('black pawn en passant', () => {
    /**
     * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
     */

    // Special Board:
    /*
        *  -  ♜  -  ♞  ♜  ♚  -
        ♟  ♝  -  ♟  -  *  ♟  ♟
        *  ♛  *  -  *  ♟  *  -
        -  ♟  -  ♙  -  *  -  * 
        *  -  *  -  ♟  ♙  *  ♖ 
        ♙  *  -  ♗  -  *  ♘  *
        *  -  *  -  *  -  ♙  ♙
        ♖  *  ♗  ♕  -  *  ♔  *

        '*' = white
        '-' = black
    */

    let specialBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 0, 0, new King('w', {r: 0, c: 6}), 0],
        [0, 0, 0, 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, new Bishop('w', {r: 2, c: 3}), 0, 0, new Knight('w', {r:2, c: 6}), 0],
        [0, 0, 0, 0, new Pawn('b', {r: 3, c: 4}), new Pawn('w', {r: 3, c: 5}), 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, new Pawn('w', {r: 4, c: 3}), 0, 0, 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, 0, new Pawn('b', {r: 5, c: 5}), 0, 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ];

        let specialBoard: Board = new Board(specialBoardState);
        let feasible: BoardCoord[] = specialBoard.feasibleMoves({r: 3, c: 4});
        let expectedMoves: BoardCoord[] = [
            {r: 2, c: 3}, {r: 2, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(2);
        specialBoard.lastMove = {
            src: {r: 1, c: 5},
            tgt: {r: 3, c: 5}
        };
        feasible = specialBoard.feasibleMoves({r: 3, c: 4});
        expectedMoves.push({r: 2, c: 5});
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(3);
    });

    test('white pawn en passant', () => {
    /**
     * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
     */

    // Special Board:
    /*
        *  -  ♜  -  ♞  ♜  ♚  -
        ♟  ♝  -  ♟  -  *  ♟  ♟
        *  ♛  *  -  *  ♟  *  -
        -  ♟  -  ♙  ♟  ♙  -  * 
        *  -  *  -  *  -  *  ♖ 
        ♙  *  -  ♗  -  *  ♘  *
        *  -  *  -  *  -  ♙  ♙
        ♖  *  ♗  ♕  -  *  ♔  *

        '*' = white
        '-' = black
    */

    let specialBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 0, 0, new King('w', {r: 0, c: 6}), 0],
        [0, 0, 0, 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, new Bishop('w', {r: 2, c: 3}), 0, 0, new Knight('w', {r:2, c: 6}), 0],
        [0, 0, 0, 0, 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, new Pawn('w', {r: 4, c: 3}), new Pawn('b', {r: 4, c: 4}), new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, 0, new Pawn('b', {r: 5, c: 5}), 0, 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ];

        let specialBoard: Board = new Board(specialBoardState);
        let feasible: BoardCoord[] = specialBoard.feasibleMoves({r: 4, c: 3});
        expect(feasible).toContainEqual({r: 5, c: 3});
        expect(feasible.length).toEqual(1);
        specialBoard.lastMove = {
            src: {r: 6, c: 4},
            tgt: {r: 4, c: 4}
        };
        feasible = specialBoard.feasibleMoves({r: 4, c: 3});
        let expectedMoves: BoardCoord[] = [
            {r: 5, c: 3}, {r: 5, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(2);
    });

    test('rook', () => {
        let feasible: BoardCoord[] = sparseBoard.feasibleMoves({r: 0, c: 0});
        let expectedMoves: BoardCoord[] = [
            {r: 1, c: 0}, {r: 0, c: 1}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc)
        });
        expect(feasible.length).toEqual(2);
        
        feasible = sparseBoard.feasibleMoves({r: 7, c: 2});
        expectedMoves = [
            {r: 7, c: 0}, {r: 7, c: 1}, {r: 7, c: 3},
            {r: 6, c: 2}, {r: 5, c: 2}, {r: 4, c: 2},
            {r: 3, c: 2}, {r: 2, c: 2}, {r: 1, c: 2},
            {r: 0, c: 2}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(10);
    });
    test('knight', () => {
        let feasible: BoardCoord[] = sparseBoard.feasibleMoves({r: 2, c: 6});
        let expectedMoves: BoardCoord[] = [
            {r: 0, c: 5}, {r: 0 , c: 7}, {r: 4, c: 7},
            {r: 3, c: 4}, {r: 1, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(5);
        feasible = sparseBoard.feasibleMoves({r: 4, c: 4});
        expectedMoves = [
            {r: 6, c: 5}, {r: 5, c: 6}, {r: 3, c: 6},
            {r: 2, c: 5}, {r: 3, c: 2}, {r: 5, c :2},
            {r: 2, c: 3}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(7);
    });
    test('bishop', () => {
        let feasible: BoardCoord[] = sparseBoard.feasibleMoves({r: 2, c: 3});
        let expectedMoves: BoardCoord[] = [
            {r: 1, c: 2}, {r: 0, c: 1},
            {r: 3, c: 4}, {r: 1, c: 4}, {r: 0, c: 5},
            {r: 3, c: 2}, {r: 4, c: 1}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(7);
        feasible = sparseBoard.feasibleMoves({r: 6, c: 1});
        expectedMoves = [
            {r: 7, c: 0}, {r: 5, c: 0}, {r: 5, c: 2},
            {r: 4, c: 3}, {r: 3, c: 4}, {r: 2, c: 5},
            {r: 1, c: 6}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(7);
    });
    test('king', () => {
        /**
         * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
         */

        // special board:
        /*
            *  -  ♜  -  ♞  ♜  ♚  -
            ♟  ♝  -  ♟  -  *  ♟  *
            *  ♛  *  -  ♟  ♟  *  -
            -  ♟  -  *  ♞  ♙  -  * 
            *  -  *  ♙  *  -  *  ♖ 
            ♙  *  -  ♗  -  *  ♘  *
            *  -  *  -  *  -  *  ♙
            ♖  *  ♗  ♕  -  *  ♔  *

            '*' = white
            '-' = black
        */
        let specialBoardState: BoardState = [
            [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 0, 0, new King('w', {r: 0, c: 6}), 0],
            [0, 0, 0, 0, 0, 0, 0, new Pawn('w', {r:1, c: 7})],
            [new Pawn('w', {r: 2, c: 0}), 0, 0, new Bishop('w', {r: 2, c: 3}), 0, 0, new Knight('w', {r:2, c: 6}), 0],
            [0, 0, 0, new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
            [0, new Pawn('b', {r: 4, c: 1}), 0, 0, new Knight('b', {r: 4, c: 4}), new Pawn('w', {r: 4, c: 5}), 0, 0],
            [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), 0, 0],
            [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), 0],
            [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
        ]
    
        let specialBoard: Board = new Board(specialBoardState);

        let feasible: BoardCoord[] = specialBoard.feasibleMoves({r: 0, c: 6});
        let expectedMoves: BoardCoord[] = [
            {r: 1, c: 5}, {r: 0, c: 5}, {r: 1, c: 6}, {r: 0, c: 7}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(4);

        feasible = specialBoard.feasibleMoves({r: 7, c: 6});
        expectedMoves = [
            {r: 6, c: 5}, {r: 6, c: 7}, {r: 7, c: 7}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(3);
    });
    test('queen', () => {
        let feasible: BoardCoord[] = sparseBoard.feasibleMoves({r: 0, c: 3});
        let expectedMoves: BoardCoord[] = [
            {r: 0, c: 4}, {r: 0, c: 5}, 
            {r: 1, c: 2}, {r: 2, c: 1}, {r: 3, c: 0},
            {r: 1, c: 3}, {r: 1, c: 4}, {r: 2, c: 5},
            {r: 3, c: 6}, {r: 4, c: 7}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(10);
        feasible = sparseBoard.feasibleMoves({r: 5, c: 1});
        expectedMoves = [
            {r: 5, c: 0}, {r: 5, c: 2}, {r: 5, c: 3},
            {r: 4, c: 0}, {r: 4, c: 2}, {r: 3, c: 3},
            {r: 6, c: 2}, {r: 7, c: 3}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(feasible).toContainEqual(bc);
        });
        expect(feasible.length).toEqual(8);
    });
});

describe('get attacking piece', () => {
    /**
     * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
     */

    // Special Board:
    /*
        *  -  ♜  -  ♞  ♜  ♚  -
        ♟  ♝  -  ♟  -  *  ♟  ♟
        *  ♛  *  -  *  ♟  *  -
        -  ♟  -  *  ♞  ♙  -  * 
        *  -  *  -  *  -  *  ♖ 
        ♙  ♕  -  ♗  -  *  ♘  *
        *  -  *  -  *  -  ♙  ♙
        ♖  *  ♗  *  -  *  ♔  *

        '*' = white
        '-' = black
    */

    let specialBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), 0, 0, 0, new King('w', {r: 0, c: 6}), 0],
        [0, 0, 0, 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), new Queen('w', {r: 2, c: 1}), 0, new Bishop('w', {r: 2, c: 3}), 0, 0, new Knight('w', {r:2, c: 6}), 0],
        [0, 0, 0, 0, 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, 0, new Knight('b', {r: 4, c: 4}), new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, 0, new Pawn('b', {r: 5, c: 5}), 0, 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]
    
    let specialBoard: Board = new Board(specialBoardState);

    test('white king attacked by queen', () => {
        let res: undefined | BoardCoord = specialBoard.getAttackingPiece('w');
        expect(res).toBeDefined();
        expect(specialBoard.getData(res)).toBeInstanceOf(Queen);
    });
    test('white king not threatened', () => {
        let res: undefined | BoardCoord = sparseBoard.getAttackingPiece('w');
        expect(res).toBeUndefined();
    });
    test('black king attacked by queen', () => {
        let res: undefined | BoardCoord = specialBoard.getAttackingPiece('b');
        expect(res).toBeDefined();
        expect(specialBoard.getData(res)).toBeInstanceOf(Queen);
    });
    test('black king not threatened', () => {
        let res: undefined | BoardCoord = sparseBoard.getAttackingPiece('b');
        expect(res).toBeUndefined();
    });
});

describe('king exposing move', () => {
    /**
     * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
     */

    // Special Board:
    /*
        *  -  ♜  -  ♞  ♜  ♚  -
        ♟  ♝  -  ♟  -  *  ♟  ♟
        *  ♛  *  -  ♟  ♟  ♘  -
        -  ♟  -  *  -  ♙  -  * 
        *  -  ♗  ♙  *  -  *  ♖ 
        ♙  *  -  *  -  *  ♞  *
        *  -  *  -  *  -  ♙  ♙
        ♖  *  ♗  ♕  -  *  ♔  *

        '*' = white
        '-' = black
    */

    let specialBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 0, 0, new King('w', {r: 0, c: 6}), 0],
        [0, 0, new Bishop('w', {r: 1, c: 2}), 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, 0, 0, 0, new Knight('b', {r:2, c: 6}), 0],
        [0, 0, new Bishop('w', {r: 3, c: 2}), new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, 0, 0, new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), new Knight('w', {r: 5, c: 6}), 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]

    let specialBoard: Board = new Board(specialBoardState);

    test('white exposing move', () => {
        let res: boolean = specialBoard.kingExposingMove(
            {r: 3, c: 3}, {r: 4, c: 3}
        );
        expect(res).toEqual(true);
        res = specialBoard.kingExposingMove(
            {r: 0, c: 6}, {r: 0, c: 7}
        );
        expect(res).toEqual(true);
    });
    test('white non-exposing move', () => {
        let res: boolean = specialBoard.kingExposingMove(
            {r: 1, c: 7}, {r: 2, c: 7}
        );
        expect(res).toEqual(false);
    });

    test('black exposing move', () => {
        let res: boolean = specialBoard.kingExposingMove(
            {r: 5, c: 4}, {r: 4, c: 4}
        );
        expect(res).toEqual(true);
        res = specialBoard.kingExposingMove(
            {r: 7, c: 6}, {r: 7, c: 7}
        );
        expect(res).toEqual(true);
    });

    test('black non-exposing move', () => {
        let res: boolean = specialBoard.kingExposingMove(
            {r: 6, c: 7}, {r: 5, c: 7}
        );
        expect(res).toEqual(false);
    });
});

describe('legal moves', () => {
    /**
     * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
     */

    // Special Board:
    /*
        *  -  ♜  -  ♞  ♜  ♚  -
        ♟  ♝  -  ♟  -  *  ♟  ♟
        *  ♛  *  -  ♟  ♟  ♘  -
        -  ♟  -  *  -  ♙  -  * 
        *  -  ♗  ♙  *  -  *  ♖ 
        ♙  *  -  *  -  *  ♞  *
        *  -  *  -  *  -  ♙  ♙
        ♖  *  ♗  ♕  -  *  ♔  *

        '*' = white
        '-' = black
    */

    let specialBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, new Bishop('w', {r: 0, c: 2}), new Queen('w', {r: 0, c: 3}), 0, 0, new King('w', {r: 0, c: 6}), 0],
        [0, 0, new Bishop('w', {r: 1, c: 2}), 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, 0, 0, 0, new Knight('b', {r:2, c: 6}), 0],
        [0, 0, new Bishop('w', {r: 3, c: 2}), new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, 0, 0, new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), new Knight('w', {r: 5, c: 6}), 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]

    let specialBoard: Board = new Board(specialBoardState);

    it('correctly fins no legal moves for pawn defending king', () => {
        let legal: BoardCoord[] = specialBoard.legalMoves({r: 3, c: 3});
        expect(legal.length).toEqual(0);
    });

    it('finds legal moves for rook', () => {
        let legal: BoardCoord[] = specialBoard.legalMoves({r: 0, c: 0});
        let expectedMoves: BoardCoord[] = [
            {r: 0, c: 1}, {r: 1, c: 0}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(2);
    });
});

describe('threatened square', () => {
    test('knight threatened square', () => {
        expect(sparseBoard.threatenedSquare({r: 0, c: 5}, 'w'))
        .toBe(true);
        expect(sparseBoard.threatenedSquare({r: 0, c: 5}, 'b'))
        .toBe(false);
    });
});

describe('special castle move', () => {
    /**
     * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
     */

    // Special Board:
    /*
        *  -  ♜  -  ♞  ♜  ♚  -
        ♟  ♝  -  ♟  -  *  ♟  ♟
        *  ♛  *  -  ♟  ♟  ♘  -
        -  ♟  -  *  -  ♙  -  * 
        *  -  ♗  ♙  *  -  *  ♖ 
        ♙  *  -  *  ♞  *  -  *
        *  -  *  -  *  -  ♙  ♙
        ♖  *  -  *  ♔  *  -  *

        '*' = white
        '-' = black
    */

    let specialBoardState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, 0, 0, new King('w', {r: 0, c: 4}), 0, 0, 0],
        [0, 0, new Bishop('w', {r: 1, c: 2}), 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, 0, 0, 0, new Knight('b', {r:2, c: 6}), 0],
        [0, 0, new Bishop('w', {r: 3, c: 2}), new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, 0, 0, new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), new Knight('w', {r: 5, c: 6}), 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]

    let specialBoard: Board = new Board(specialBoardState);

    let specialBoardQAttackState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, 0, 0, new King('w', {r: 0, c: 4}), 0, 0, 0],
        [0, 0, new Bishop('w', {r: 1, c: 2}), 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, 0, 0, 0, new Knight('b', {r:2, c: 6}), 0],
        [0, 0, new Bishop('w', {r: 3, c: 2}), new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, 0, 0, 0, 0, new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), new Knight('w', {r: 5, c: 6}), 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]

    let specialQAttackBoard: Board = new Board(specialBoardQAttackState);

    let specialBoardKnightAttackState: BoardState = [
        [new Rook('w', {r: 0, c: 0}), 0, 0, 0, new King('w', {r: 0, c: 4}), 0, 0, 0],
        [0, 0, new Bishop('w', {r: 1, c: 2}), 0, 0, 0, new Pawn('w', {r: 1, c: 6}), new Pawn('w', {r:1, c: 7})],
        [new Pawn('w', {r: 2, c: 0}), 0, 0, 0, new Knight('b', {r:2, c: 4}), 0, 0, 0],
        [0, 0, new Bishop('w', {r: 3, c: 2}), new Pawn('w', {r: 3, c: 3}), 0, 0, 0, new Rook('w', {r: 3, c: 7})],
        [0, new Pawn('b', {r: 4, c: 1}), 0, 0, 0, new Pawn('w', {r: 4, c: 5}), 0, 0],
        [0, new Queen('b', {r: 5, c: 1}), 0, 0, new Pawn('b', {r: 5, c: 4}), new Pawn('b', {r: 5, c: 5}), new Knight('w', {r: 5, c: 6}), 0],
        [new Pawn('b', {r: 6, c: 0}), new Bishop('b', {r: 6, c: 1}), 0, new Pawn('b', {r: 6, c: 3}), 0, 0, new Pawn('b', {r: 6, c: 6}), new Pawn('b', {r: 6, c: 7})],
        [0, 0, new Rook('b', {r: 7, c: 2}), 0, new Knight('b', {r: 7, c: 4}), new Rook('b', {r: 7, c: 5}), new King('b', {r: 7, c: 6}), 0]
    ]

    let specialBoardKnightAttack: Board = new Board(specialBoardKnightAttackState);

    it('can castle when path not threatened', () => {
        let legal: BoardCoord[] = specialBoard.legalMoves({r: 0, c: 4});
        expect(legal).toContainEqual({r: 0, c: 2});
    });

    it('can not castle when path threatened', () => {
        let legal: BoardCoord[] = specialQAttackBoard.legalMoves({r: 0, c: 4});
        expect(containsCoord(legal, {r: 0, c: 1})).toBe(false);
    });

    it('can not castle when path threatened by knight', () => {
        expect(specialBoardKnightAttack.threatenedSquare({r: 0 , c: 3}, 'b')).toBe(true);
        let legal: BoardCoord[] = specialBoardKnightAttack.legalMoves({r: 0, c: 4});
        expect(containsCoord(legal, {r: 0, c: 1})).toBe(false);
    });

});