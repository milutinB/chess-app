from typing import Union, Literal, Tuple, List, TypedDict, TypeGuard, TypeVar

# Each players pieces are numbered with an integer 0 - 15
PieceNumber = Literal[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
def is_piece_number(num: int) -> TypeGuard[PieceNumber]:
    return num in range(16)

PlayerColor = Literal['w', 'b']
def is_player_color(string: str) -> TypeGuard[PlayerColor]:
    return string == 'w' or string == 'b'

# A piece is uniquely determined by its 
# owner's color and its number
PieceIndex = Tuple[
    PlayerColor,
    PieceNumber
]


# Each square is either empty (indicated by Literal 0)
# or occupied by a piece (determined by a PieceIndex)
SquareData = Literal[0] | PieceIndex


def is_piece_index(obj: SquareData) -> TypeGuard[PieceIndex]:
    res: bool = type(obj) != int
    return res


# Squares on the board are indexed 
# by two indices:
#  a row index (0 - 7)
#  a column index (A - H)
RowIndex = Literal[0, 1, 2, 3, 4, 5, 6, 7]

ColIndex = Literal['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

BoardPosition = Tuple[
    RowIndex,
    ColIndex
]


class BoardRow(TypedDict):
    A: SquareData
    B: SquareData
    C: SquareData
    D: SquareData
    E: SquareData
    F: SquareData
    G: SquareData
    H: SquareData


BoardData = Tuple[
    BoardRow, BoardRow, BoardRow, BoardRow,
    BoardRow, BoardRow, BoardRow, BoardRow
]


def is_lit_zero(obj: SquareData) -> TypeGuard[Literal[0]]:
    res: bool = type(obj) == int
    return res

def board_row_from_string(string: str) -> BoardRow:

    square_strings: List[str] = string.split(',')

    if len(square_strings) != 8:
        raise ValueError("Row string must have eight comma separated values")
    
    row: BoardRow = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'E': 0,
        'F': 0,
        'G': 0,
        'H': 0
    }

    colIndices: List[ColIndex] = [
                    'A', 'B', 'C', 'D', 
                    'E', 'F', 'G', 'H'
                ]

    for i in range(8):
        val: str = square_strings[i]
        if val != '0':
            if not len(val) in range(2, 4):
                raise ValueError(
                    "A piece index must contain a colow character ('w' or 'b')\n"
                    "followed by an integer (0 - 15)" 
                )

            
            color: str = val[0]
            if color != 'w' and color != 'b':
                raise ValueError("player color must be 'w' or 'b'")

            assert is_player_color(color)

            num_str: str = val[1:]
            if not int(num_str) in range(0, 16):
                raise ValueError("piece index must be in the range (0 - 15)")

            num: int = int(num_str)

            assert is_piece_number(num)

            piece_index: PieceIndex = (color, num)
            row[colIndices[i]] = piece_index

    return row


class Board:

    def __init__(self, data: BoardData) -> None:
        self.data = data


    def __getitem__ (self, key: BoardPosition) -> SquareData:
        return self.data[key[0]][key[1]]

    # Updates the baord and returns destroyed piece index
    def process_move(
        self, 
        src: BoardPosition, 
        tgt: BoardPosition) -> SquareData:

        srcData: SquareData = self.data[src[0]][src[1]]
        tgtData: SquareData = self.data[tgt[0]][tgt[1]]

        if srcData != 0 and tgtData != 0:
            if srcData[0] == tgtData[0]:
                raise Exception("Illegal move")

        if srcData == 0:
            return 0

        self.data[tgt[0]][tgt[1]] = srcData
        self.data[src[0]][src[1]] = 0

        return tgtData

    def __str__(self) -> str:

        output: str = ''

        colIndices: List[ColIndex] = [
                    'A', 'B', 'C', 'D', 
                    'E', 'F', 'G', 'H'
                ]

        for row in self.data:
            for i in range(8):
                index: ColIndex = colIndices[i]
                current_sq = row[index]
                if is_lit_zero(current_sq):
                    output += str(current_sq)
                elif is_piece_index(current_sq):
                    output += str(current_sq[0]) + str(current_sq[1])
                if i == 7:
                    if row != self.data[7]:
                        output += '\n'
                else:
                    output += ','


        return output