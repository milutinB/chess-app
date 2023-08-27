test('place holder', () => {
    expect(true).toEqual(true);
})

// import { BoardData, BoardRow, BoardCoord } from "../../src/types/Board";
// import { PieceMap } from "../../src/types/Pieces.d";
// import { initial_piece_map, initial_board } from "../../src/utils/chess_setup_utils";
// import { bishop_moves, 
//         king_moves, 
//         knight_moves, 
//         pawn_moves, 
//         rook_moves, 
//         queen_moves,
//         get_legal_moves } from "./../../src/utils/LegalMoves";


// let emptyBoard: BoardData;        
// let pieceMap: PieceMap;
// let startingBoard: BoardData;
// let sparseBoard: BoardData;


// beforeEach(() => {
//     let emptyRow: BoardRow = {
//         'A': 0, 'B': 0, 'C': 0, 'D': 0,
//         'E': 0, 'F': 0, 'G': 0, 'H': 0
//     };
//     emptyBoard = [
//         emptyRow, emptyRow, emptyRow, emptyRow,
//         emptyRow, emptyRow, emptyRow, emptyRow
//     ]
//     pieceMap = initial_piece_map();
//     startingBoard = initial_board();


//     /**
//      * ♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟
//      */

//     // Sparse Board:
//     /*
//         *  -  ♜  -  ♞  ♜  ♚  -
//         ♟  ♝  -  ♟  -  *  ♟  ♟
//         *  ♛  *  -  ♟  ♟  *  -
//         -  ♟  -  *  ♞  ♙  -  * 
//         *  -  *  ♙  *  -  *  ♖ 
//         ♙  *  -  ♗  -  *  ♘  *
//         *  -  *  -  *  -  ♙  ♙
//         ♖  *  ♗  ♕  -  *  ♔  *

//         '*' = white
//         '-' = black
//     */

//     sparseBoard = [
//         {
//             'A': ['w', 0], 'B': 0, 'C': ['w', 2], 'D': ['w', 3],
//             'E': 0, 'F': 0, 'G': ['w', 4], 'H': 0,
//         },
//         {
//             'A': 0, 'B': 0, 'C': 0, 'D': 0,
//             'E': 0, 'F': 0, 'G': ['w', 14], 'H': ['w', 15],
//         },
//         {
//             'A': ['w', 8], 'B': 0, 'C': 0, 'D': ['w', 2],
//             'E': 0, 'F': 0, 'G': ['w', 6], 'H': 0,
//         },
//         {
//             'A': 0, 'B': 0, 'C': 0, 'D': ['w', 11],
//             'E': 0, 'F': 0, 'G': 0, 'H': ['w', 7],
//         },
//         {
//             'A': 0, 'B': ['b', 9], 'C': 0, 'D': 0,
//             'E': ['b', 6], 'F': ['w', 13], 'G': 0, 'H': 0,
//         },
//         {
//             'A': 0, 'B': ['b', 3], 'C': 0, 'D': 0,
//             'E': ['b', 12], 'F': ['b', 13], 'G': 0, 'H': 0,
//         },
//         {
//             'A': ['b', 8], 'B': ['b', 2], 'C': 0, 'D': ['b', 11],
//             'E': 0, 'F': 0, 'G': ['b', 14], 'H': ['b', 15],
//         },
//         {
//             'A': 0, 'B': 0, 'C': ['b', 0], 'D': 0,
//             'E': ['b', 1], 'F': ['b', 7], 'G': ['b', 4], 'H': 0
//         }
//     ];
// })

// test('knight moves', () => {
//     let middlePos: BoardCoord = {rowIndex: 4, colIndex: 'D'};
//     let legalMoves: BoardCoord[] = knight_moves('w', emptyBoard, middlePos);
//     [
//         {rowIndex: 6, colIndex: 'C'},
//         {rowIndex: 6, colIndex: 'E'},
//         {rowIndex: 5, colIndex: 'B'},
//         {rowIndex: 5, colIndex: 'F'},
//         {rowIndex: 2, colIndex: 'C'},
//         {rowIndex: 2, colIndex: 'E'},
//         {rowIndex: 3, colIndex: 'B'},
//         {rowIndex: 3, colIndex: 'F'}
//     ].map((bc: BoardCoord) => {
//         expect(legalMoves).toContainEqual(bc);
//     })
//     expect(legalMoves.length).toEqual(8);

//     legalMoves = knight_moves('b', sparseBoard, {rowIndex: 4, colIndex: 'E'});

//     [
//         {rowIndex: 6, colIndex: 'F'},
//         {rowIndex: 5, colIndex: 'G'},
//         {rowIndex: 3, colIndex: 'G'},
//         {rowIndex: 2, colIndex: 'F'},
//         {rowIndex: 2, colIndex: 'D'},
//         {rowIndex: 5, colIndex: 'C'},
//         {rowIndex: 3, colIndex: 'C'}
//     ].map((bc: BoardCoord) => {
//         expect(legalMoves).toContainEqual(bc);
//     })
//     expect(legalMoves.length).toEqual(7);

// });


// test('rook moves', () => {

// });