// import { BoardData, BoardCoord, PieceIndex, RowIndex, ColIndex, PlayerColor } from "../types/Board";
// import { PieceMap, PieceName } from "../types/Pieces.d";

// function self_occupied(
//     boardState: BoardData, 
//     querySpace: BoardCoord,
//     player: PlayerColor): boolean {
//     if (boardState[querySpace.rowIndex][querySpace.colIndex] === 0)
//         return false;
//     return (
//             boardState[querySpace.rowIndex][querySpace.colIndex] as PieceIndex
//         )[0] == player;
// }

// export function knight_moves(
//     player: PlayerColor,
//     boardState: BoardData,
//     position: BoardCoord
// ) : BoardCoord[] {

//     let rowIndex: RowIndex = position.rowIndex;
//     let colIndex: ColIndex = position.colIndex;
//     let colNum: number = colIndex.charCodeAt(0) - 'A'.charCodeAt(0);
//     let output: BoardCoord[] = [];

//     [1, 2].map((verticalDist: number) => {
//         [1, -1].map((vertSign: number) => {
//             [1, -1].map((horSign: number) => {
//                 let horizontalDist: number = verticalDist == 1 ? 2 : 1;
//                 if ((rowIndex + vertSign * verticalDist) in Array.from(Array(8).keys())) {
//                     let newRow: RowIndex 
//                         = rowIndex + vertSign * verticalDist as RowIndex;
//                     if ((colNum + horSign * horizontalDist) in Array.from(Array(8).keys())) {
//                         let newCol: ColIndex 
//                         = String.fromCharCode(colNum 
//                             + horSign * horizontalDist + 'A'.charCodeAt(0)) as ColIndex;
//                         let qSpace: BoardCoord = {
//                             rowIndex: newRow,
//                             colIndex: newCol
//                         }
//                         if (!self_occupied(boardState, qSpace, player)) {
//                             output.push(qSpace);
//                         } 
//                     } 
//                 }
//             })
//         })
//     })

//     return output;
// }

// export function pawn_moves(
//     playerColor: 'w',
//     boardState: BoardData,
//     position: BoardCoord
// ) : BoardCoord[] {
//     return [];
// }

// export function rook_moves(
//     playerColor: 'w',
//     boardState: BoardData,
//     position: BoardCoord
// ) : BoardCoord[] {
//     return [];
// }

// export function bishop_moves(
//     playerColor: 'w',
//     boardState: BoardData,
//     position: BoardCoord
// ) : BoardCoord[] {
//     return [];
// }

// export function king_moves(
//     playerColor: 'w',
//     boardState: BoardData,
//     position: BoardCoord
// ) : BoardCoord[] {
//     return [];
// }

// export function queen_moves(
//     playerColor: 'w',
//     boardState: BoardData,
//     position: BoardCoord
// ) : BoardCoord[] {
//     return [];
// }

// export function get_legal_moves(
//     movingPiece: PieceIndex, 
//     boardState: BoardData,
//     position: BoardCoord,
//     pieceMap: PieceMap) : BoardCoord[] {
//         let pieceName: PieceName = pieceMap[movingPiece[0]][movingPiece[1]];

//         switch (pieceName) {
//             case "queen":
//                 break;
//             case "king":
//                 break;
//             case "rook":
//                 break;
//             case "knight":
//                 break;
//             case "bishop":
//                 break;
//             case "pawn":
//                 break;
//         }

//         return [];
//     } 