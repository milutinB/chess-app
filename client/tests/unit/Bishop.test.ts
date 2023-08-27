import { Bishop } from "../../src/chess_logic/Bishop";
import { BoardCoord } from "../../src/types/Types2.d";

describe('legal moves', () => {
    it('finds correct moves from corner', () => {
        let bishop: Bishop = new Bishop('w', {r:0, c: 0});
        let legal: BoardCoord[] = bishop.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 1, c: 1}, {r: 2, c: 2}, {r: 3, c: 3},
            {r: 4, c: 4}, {r: 5, c: 5}, {r: 6, c: 6},
            {r: 7, c: 7}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        })
        expect(legal.length).toEqual(7);
    });

    it('finds correct moves from center', () => {
        let bishop: Bishop = new Bishop('w', {r: 3, c: 3});
        let legal: BoardCoord[] = bishop.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 0, c: 0}, {r: 1, c: 1}, {r: 2, c: 2},
            {r: 4, c: 4}, {r: 5, c: 5}, {r: 6, c: 6},
            {r: 7, c: 7},
            {r: 4, c: 2}, {r: 5, c: 1}, {r: 6, c: 0},
            {r: 2, c: 4}, {r: 1, c: 5}, {r: 0, c: 6}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        })
        expect(legal.length).toEqual(13);
    });
});