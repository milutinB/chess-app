import * as renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import { BoardSizeContext } from '../../src/BoardSizeContext';
import Square from "../../src/components/Square";
import { GameState } from '../../src/types/App.d';
import { initial_board_state } from '../../src/utils/chess_setup_utils';
import { ActivePlayerContext } from '../../src/BoardDataContext';
import { GameStateContext } from '../../src/GameStateContext';
import { Board } from '../../src/chess_logic/Board';
// const board_config = require("../../src/board_config.json");

afterEach(cleanup);

const state: GameState = {
    board: new Board(initial_board_state()),
    currentAction: "SELECTING_PIECE",
    activePlayer: "b",
    candidateMoves: [],
    candidatePiece: undefined
};

it('renders correctly', () => {
    const tree: any = renderer.create(
        <GameStateContext.Provider value={state}>
            <ActivePlayerContext.Provider value={'w'}>
                <BoardSizeContext.Provider value={800}>
                    <Square 
                        position={{r: 1, c: 0}} 
                        data={0}
                        boardClick={()=>{}}
                    />
                </BoardSizeContext.Provider>
            </ActivePlayerContext.Provider>
        </GameStateContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

test('correct color', () => {
    let boardSize: number = 800;
    render(
        <GameStateContext.Provider value={state}>
            <ActivePlayerContext.Provider value={'w'}>
                <BoardSizeContext.Provider value={boardSize}>
                    <Square 
                        position={{r: 0, c: 0}} 
                        data={0}
                        boardClick={()=>{}}
                    />
                </BoardSizeContext.Provider>
            </ActivePlayerContext.Provider>
        </GameStateContext.Provider>
    );

    expect(
        screen
            .getByRole('square')
            .classList
            .contains('dark')
    ).toBe(true);
})

test('correct position', () => {
    let boardSize: number = 800;

    render(
        <GameStateContext.Provider value={state}>
            <ActivePlayerContext.Provider value={'w'}>
                <BoardSizeContext.Provider value={boardSize}>
                    <Square 
                        position={{r: 0, c: 0}} 
                        data={0}
                        boardClick={()=>{}}
                    />
                </BoardSizeContext.Provider>
            </ActivePlayerContext.Provider>
        </GameStateContext.Provider>
    );

    expect(
        screen
            .getByRole('square-container')
            .getAttribute('x')
    ).toBe("0");
    expect(
        screen
            .getByRole('square-container')
            .getAttribute('y')
    ).toBe("700");

    cleanup();


    render(
        <GameStateContext.Provider value={state}>
            <ActivePlayerContext.Provider value={'w'}>
                <BoardSizeContext.Provider value={boardSize}>
                    <Square 
                        position={{r: 3, c: 2}} 
                        data={0}
                        boardClick={()=>{}}
                    />
                </BoardSizeContext.Provider>
            </ActivePlayerContext.Provider>
       </GameStateContext.Provider>
    );

    expect(
        screen
            .getByRole('square-container')
            .getAttribute('x')
    ).toBe("200");
    expect(
        screen
            .getByRole('square-container')
            .getAttribute('y')
    ).toBe("400");

    cleanup();

    render(
        <GameStateContext.Provider value={state}>
            <ActivePlayerContext.Provider value={'b'}>
                <BoardSizeContext.Provider value={boardSize}>
                    <Square 
                        position={{r: 0, c: 0}} 
                        data={0}
                        boardClick={()=>{}}
                    />
                </BoardSizeContext.Provider>
            </ActivePlayerContext.Provider>
        </GameStateContext.Provider>
    );

    expect(
        screen
            .getByRole('square-container')
            .getAttribute('x')
    ).toBe("700");
    expect(
        screen
            .getByRole('square-container')
            .getAttribute('y')
    ).toBe("0");

    cleanup();


    render(
        <GameStateContext.Provider value={state}>
            <ActivePlayerContext.Provider value={'b'}>
                <BoardSizeContext.Provider value={boardSize}>
                    <Square 
                        position={{r: 3, c: 2}} 
                        data={0}
                        boardClick={()=>{}}
                    />
                </BoardSizeContext.Provider>
            </ActivePlayerContext.Provider>
        </GameStateContext.Provider>
    );

    expect(
        screen
            .getByRole('square-container')
            .getAttribute('x')
    ).toBe("500");
    expect(
        screen
            .getByRole('square-container')
            .getAttribute('y')
    ).toBe("300");
});