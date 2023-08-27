import { Rook } from "../../src/chess_logic/Rook";
import { BoardCoord } from "../../src/types/Types2.d";


describe('legal moves', () => {
    it('finds correct moves from corner', () => {
        let rook: Rook = new Rook('w', {r: 0, c: 0});
        let legal = rook.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 1, c: 0}, {r: 2, c: 0}, {r: 3, c: 0}, {r: 4, c: 0},
            {r: 5, c: 0}, {r: 6, c: 0}, {r: 7, c: 0},
            {r: 0, c: 1}, {r: 0, c: 2}, {r: 0, c: 3}, {r: 0, c: 4},
            {r: 0, c: 5}, {r: 0, c: 6}, {r: 0, c: 7},
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        })
        expect(legal.length).toEqual(14);
    });

    it('finds correct moves from inner space', () => {
        let rook: Rook = new Rook('w', {r: 3, c: 2});
        let legal = rook.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 0, c: 2}, {r: 1, c: 2}, {r: 2, c: 2}, {r: 4, c: 2},
            {r: 5, c: 2}, {r: 6, c: 2}, {r: 7, c: 2},
            {r: 3, c: 0}, {r: 3, c: 1}, {r: 3, c: 3}, {r: 3, c: 4},
            {r: 3, c: 5}, {r: 3, c: 6}, {r: 3, c: 7},
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        })
        expect(legal.length).toEqual(14);
    });
})