import sys
sys.path.append('./')
import pytest # type: ignore
from app.game.Board import Board, SquareData, BoardData, BoardRow, board_row_from_string

@pytest.fixture
def get_board():
    initData: BoardData = (
        # white row 1
        {'A': ('w', 0), 'B': ('w', 1), 'C': ('w', 2), 'D': ('w', 3), 
        'E': ('w', 4), 'F': ('w', 5), 'G': ('w', 6), 'H': ('w', 7)},
        # white row 2 
        {'A': ('w', 8), 'B': ('w', 9), 'C': ('w', 10), 'D': ('w', 11), 
        'E': ('w', 12), 'F': ('w', 13), 'G': ('w', 14), 'H': ('w', 15)},

        {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0},
        {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0},
        {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0},
        {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'H': 0},
        
        # black row 1
        {'A': ('b', 8), 'B': ('b', 9), 'C': ('b', 10), 'D': ('b', 11), 
        'E': ('b', 12), 'F': ('b', 13), 'G': ('b', 14), 'H': ('b', 15)},
        # black row 2
        {'A': ('b', 0), 'B': ('b', 1), 'C': ('b', 2), 'D': ('b', 3), 
        'E': ('b', 4), 'F': ('b', 5), 'G': ('b', 6), 'H': ('b', 7)}
    )
    board: Board = Board(initData)
    yield board

@pytest.fixture
def get_board_string():
    string: str =("w0,w1,w2,w3,w4,w5,w6,w7\n"
                    "w8,w9,w10,w11,w12,w13,w14,w15\n"
                    "0,0,0,0,0,0,0,0\n"
                    "0,0,0,0,0,0,0,0\n"
                    "0,0,0,0,0,0,0,0\n"
                    "0,0,0,0,0,0,0,0\n"
                    "b8,b9,b10,b11,b12,b13,b14,b15\n"
                    "b0,b1,b2,b3,b4,b5,b6,b7")
    yield string

@pytest.fixture
def get_row_string():
    string: str = "w4,0,b14,b3,w11,0,0,b0"
    yield string

@pytest.fixture
def get_row():
    row: BoardRow = {
        'A': ('w', 4),
        'B': 0,
        'C': ('b', 14),
        'D': ('b', 3),
        'E': ('w', 11),
        'F': 0,
        'G': 0,
        'H': ('b', 0)
    }
    yield row

def test_board_row_from_string(get_row_string: str, get_row: BoardRow):
    row: BoardRow =  board_row_from_string(get_row_string)
    assert row == get_row

def test_process_move(get_board: Board) -> None:
    board: Board = get_board

    # move the left-most white pawn forward two spaces
    board.process_move((1, 'A'), (3, 'A'))
    assert board[3, 'A'] == ('w', 8)
    assert board[1, 'A'] == 0

    # move the second from left pawn forward one space
    board.process_move((1, 'B'), (2, 'B'))
    assert board[2, 'B'] == ('w', 9)
    assert board[1, 'B'] == 0

    # Test white pawn atacking fellow white
    # pawn raises an exception
    with pytest.raises(Exception) as e_info:
        board.process_move((2, 'B'), (3, 'A'))

def test_attack(get_board: Board) -> None:
    board: Board = get_board

    # left-most black pawn attacks white pawn
    output: SquareData = board.process_move((6, 'A'), (1, 'A'))

    # test a piece is returned
    assert output != 0

    # test the piece is the expected white pawn
    assert output == ('w', 8)

    # test the attacking black pawn now occupies the square
    assert board[1, 'A'] == ('b', 8)


def test_str(get_board: Board, get_board_string: str) -> None:

    assert str(get_board) == get_board_string