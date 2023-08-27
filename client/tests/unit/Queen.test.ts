import { Queen } from "../../src/chess_logic/Queen";
import { BoardCoord } from "../../src/types/Types2.d";

describe('legal moves', () => {
    it('finds correct moves from corner', () => {
        let queen: Queen = new Queen('w', {r: 0, c: 0});
        let legal = queen.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 1, c: 1}, {r: 2, c: 2}, {r: 3, c: 3}, {r: 4, c: 4},
            {r: 5, c: 5}, {r: 6, c: 6}, {r: 7, c: 7},
            {r: 1, c: 0}, {r: 2, c: 0}, {r: 3, c: 0}, {r: 4, c: 0},
            {r: 5, c: 0}, {r: 6, c: 0}, {r: 7, c: 0},
            {r: 0, c: 1}, {r: 0, c: 2}, {r: 0, c: 3}, {r: 0, c: 4},
            {r: 0, c: 5}, {r: 0, c: 6}, {r: 0, c: 7}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(21);
    });

    it('finds correct moves from center', () => {
        let queen: Queen = new Queen('w', {r: 3, c: 3});
        let legal = queen.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 0, c: 0}, {r: 1, c: 1}, {r: 2, c: 2}, {r: 4, c: 4},
            {r: 5, c: 5}, {r: 6, c: 6}, {r: 7, c: 7},
            {r: 6, c: 0}, {r: 5, c: 1}, {r: 4, c: 2}, {r: 2, c: 4},
            {r: 1, c: 5}, {r: 0, c: 6},
            {r: 0, c: 3}, {r: 1, c: 3}, {r: 2, c: 3}, {r: 4, c: 3},
            {r: 5, c: 3}, {r: 6, c: 3}, {r: 7, c: 3},
            {r: 3, c: 0}, {r: 3, c: 1}, {r: 3, c: 2}, {r: 3, c: 4},
            {r: 3, c: 5}, {r: 3, c: 6}, {r: 3, c: 7}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(27);
    });
});