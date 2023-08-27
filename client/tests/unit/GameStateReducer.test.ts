import gameStateReducer from "../../src/gameStateReducer";
import { initial_board_state } from "../../src/utils/chess_setup_utils";
import { GameStateAction } from "../../src/types/App.d";
import { Board } from "../../src/chess_logic/Board";
import { BoardState, BoardCoord } from "../../src/types/Types2.d";
import { MockSocket, GameState } from "../../src/types/App.d";

let initialGameState: GameState;

beforeEach(() => {
    initialGameState = {
        board: new Board(initial_board_state()),
        currentAction: 'SELECTING_PIECE',
        activePlayer: 'w',
        candidateMoves: [],
        candidatePiece: undefined,
        socket: new MockSocket()
    };
});

describe("board click", () => {
    test('white pawn selection', () => {
        let action: GameStateAction = {
            type: 'board click',
            selectedSquare: {r: 1, c: 1}
        };
        let newState: GameState = gameStateReducer(initialGameState, action);
        let expectedState: GameState = {
            ...initialGameState,
            currentAction: 'SELECTING_MOVE',
            candidateMoves: [
                {r: 2, c: 1}, {r: 3, c: 1}
            ],
            candidatePiece: {r: 1, c: 1}
        };
        expect(newState.currentAction === 'SELECTING_MOVE');
        let expectedMoves: BoardCoord[] = [
            {r: 2, c: 1}, {r: 3, c: 1}
        ];
        expectedMoves.map((bc: BoardCoord) => {
            expect(newState.candidateMoves).toContainEqual(bc);
        });
        expect(newState.candidateMoves.length).toEqual(2);
    });

    test('white pawn move', () => {
        let state: GameState = {
            ...initialGameState,
            candidateMoves: [{r: 2, c: 1}, {r: 3, c: 1}],
            candidatePiece: {r: 1, c: 1},
            currentAction: 'SELECTING_MOVE'
        }
        let action: GameStateAction = {
            type: 'board click',
            selectedSquare: {r: 3, c: 1}
        };
        let newState: GameState = gameStateReducer(state, action);
        let board: Board = new Board(initial_board_state());
        board.processMove(
            {r: 1, c: 1},
            {r: 3, c: 1}
        );
        let socket: MockSocket = new MockSocket();
        socket.lastEmit = [
            'update',
            board.toJson()
        ];
        expect(newState.socket).toEqual(socket);
        expect(newState.board).toEqual(board);
    });
});

describe('update', () => {
    it('correctly updates board', () => {
        let board: Board = new Board(initial_board_state());
        board.processMove({r: 0, c: 1}, {r: 2, c: 0});
        let data = board.toJson();

        let action: GameStateAction = {
            type: 'update board',
            data: data
        };

        let newState: GameState = gameStateReducer(initialGameState, action);
        let expectedState: GameState = {
            board: board,
            activePlayer: 'w',
            candidateMoves: [],
            candidatePiece: undefined,
            currentAction: 'SELECTING_PIECE',
            socket: new MockSocket()
        };
        expect(newState).toEqual(expectedState);
    });
});
