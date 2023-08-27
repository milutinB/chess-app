import { King } from "../../src/chess_logic/King";
import { BoardCoord } from "../../src/types/Types2.d";

describe('legal moves', () => {
    it('finds correct moves from corner', () => {
        let king: King = new King('w', {r: 0, c: 0});
        let legal: BoardCoord[] = king.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 1, c: 0}, {r: 1, c: 1}, {r: 0, c: 1}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(3);
    });

    it('finds correct moves from center', () => {
        let king: King = new King('w', {r: 3, c: 3});
        let legal: BoardCoord[] = king.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 4, c: 3}, {r: 3, c: 4}, {r: 2, c: 3}, {r: 3, c: 2},
            {r: 4, c: 4}, {r: 4, c: 2}, {r: 2, c: 4}, {r: 2, c: 2}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(8);
    });

    
});