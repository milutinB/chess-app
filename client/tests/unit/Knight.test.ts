import { Knight } from "../../src/chess_logic/Knight";
import { BoardCoord } from "../../src/types/Types2.d";

describe('legal moves', () => {
    it('finds correct moves from corner', () => {
        let knight: Knight = new Knight('w', {r: 0, c: 0});
        let legal: BoardCoord[] = knight.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 2, c: 1}, {r: 1, c: 2}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        })
        expect(legal.length).toEqual(2);
    });

    it('finds correct moves from the center', () => {
        let knight: Knight = new Knight('w', {r: 3, c: 3});
        let legal: BoardCoord[] = knight.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 5, c: 2}, {r: 5, c: 4},
            {r: 4, c: 1}, {r: 4, c: 5},
            {r: 2, c: 1}, {r: 2, c: 5},
            {r: 1, c: 2}, {r: 1, c: 4}

        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        })
        expect(legal.length).toEqual(8);
    });
});