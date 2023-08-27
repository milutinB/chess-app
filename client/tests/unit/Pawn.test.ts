import { Pawn } from "../../src/chess_logic/Pawn";
import { BoardCoord } from "../../src/types/Types2.d";

describe('legal moves', () => {
    it('finds correct moves for white pawn from start', () => {
        let pawn: Pawn = new Pawn('w', {r: 1, c: 3});
        let legal: BoardCoord[] = pawn.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 2, c: 3}, {r: 3, c: 3}, 
            {r: 2, c: 2}, {r: 2, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(4);
    });

    it('finds correct moves for white pawn from leftmost start', () => {
        let pawn: Pawn = new Pawn('w', {r: 1, c: 0});
        let legal: BoardCoord[] = pawn.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 2, c: 0}, {r: 3, c: 0}, 
            {r: 2, c: 1}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(3);
    });

    it('finds correct moves for white pawn from center', () => {
        let pawn: Pawn = new Pawn('w', {r: 3, c: 3});
        let legal: BoardCoord[] = pawn.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 4, c: 3}, {r: 4, c: 2}, {r: 4, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(3);
    });

    it('finds correct moves for black pawn from start', () => {
        let pawn: Pawn = new Pawn('b', {r: 6, c: 3});
        let legal: BoardCoord[] = pawn.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 5, c: 3}, {r: 4, c: 3}, 
            {r: 5, c: 2}, {r: 5, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(4);
    });

    it('finds correct moves for black pawn from leftmost start', () => {
        let pawn: Pawn = new Pawn('b', {r: 6, c: 7});
        let legal: BoardCoord[] = pawn.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 5, c: 7}, {r: 4, c: 7}, 
            {r: 5, c: 6}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(3);
    });

    it('finds correct moves for black pawn from center', () => {
        let pawn: Pawn = new Pawn('b', {r: 3, c: 3});
        let legal: BoardCoord[] = pawn.legalMoves();
        let expectedMoves: BoardCoord[] = [
            {r: 2, c: 3}, {r: 2, c: 2}, {r: 2, c: 4}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(legal).toContainEqual(bc);
        });
        expect(legal.length).toEqual(3);
    });
});