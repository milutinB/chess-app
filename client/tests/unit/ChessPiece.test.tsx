import ChessPiece from "../../src/components/ChessPiece";
import { BoardCoord, ColIndex, PlayerColor, RowIndex, SquareData } from "../../src/types/Types2.d";
import { Piece } from "../../src/chess_logic/Piece";
import { Knight } from "../../src/chess_logic/Knight";
import { King } from "../../src/chess_logic/King";
import { Queen } from "../../src/chess_logic/Queen";
import { Pawn } from "../../src/chess_logic/Pawn";
import { Bishop } from "../../src/chess_logic/Bishop";
import { Rook } from "../../src/chess_logic/Rook";
import { BoardSizeContext } from "../../src/BoardSizeContext";
import * as renderer from 'react-test-renderer';
import { render, cleanup, screen } from '@testing-library/react';

afterEach(cleanup);

let boardSize = 800;

it('renders correctly', () => {
    let pawn: SquareData = new Pawn('w', {r: 1, c: 0});
    const tree: any = renderer.create(
        <BoardSizeContext.Provider value={boardSize}>
            <ChessPiece piece={pawn}/>
        </BoardSizeContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

let wKnightPath: string = "Chess_nlt45.svg"
let wRookPath: string = "Chess_rlt45.svg";
let wBishopPath: string = "Chess_blt45.svg";
let wPawnPath: string = "Chess_plt45.svg"
let wKingPath: string = "Chess_klt45.svg";
let wQueenPath: string = "Chess_qlt45.svg";
let bKnightPath: string = "Chess_ndt45.svg";
let bRookPath: string = "Chess_rdt45.svg";
let bBishopPath: string = "Chess_bdt45.svg";
let bPawnPath: string = "Chess_pdt45.svg";
let bKingPath: string = "Chess_kdt45.svg";
let bQueenPath: string = "Chess_qdt45.svg";


describe('Piece Component', () => {
    it('renders white pawn correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Pawn('w', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(wPawnPath);
    });

    it('renders white rook correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Rook('w', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(wRookPath);
    });

    it('renders white bishop correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Bishop('w', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(wBishopPath);
    });

    it('renders white Knight correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Knight('w', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(wKnightPath);
    });

    it('renders white king correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new King('w', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(wKingPath);
    });

    it('renders white Queen correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Queen('w', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(wQueenPath);
    });

    it('renders black pawn correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Pawn('b', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(bPawnPath);
    });

    it('renders black rook correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Rook('b', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(bRookPath);
    });

    it('renders black bishop correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Bishop('b', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(bBishopPath);
    });

    it('renders black Knight correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Knight('b', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(bKnightPath);
    });

    it('renders black king correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new King('b', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(bKingPath);
    });

    it('renders black Queen correctly', () => {
        render(
            <BoardSizeContext.Provider value={boardSize}>
                    <ChessPiece piece={new Queen('b', {r: 1, c: 0})}/>
            </BoardSizeContext.Provider>
        );

        expect(screen.getByRole('piece-image').getAttribute("href"))
        .toEqual(bQueenPath);
    });
});
