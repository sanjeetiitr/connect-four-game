import { relative } from "node:path";
import React from "react";
import styled from "styled-components";

export enum Player {
  None = "NONE",
  One = "PLAYER_ONE",
  Two = "PLAYER_TWO",
}

export enum GameState {
  Ongoing = -1,
  Draw = 0,
  PlayerOneWin = Player.One,
  PlayerTwoWin = Player.Two,
}
export type Board = Player[];

export const intitializeBoard = () => {
  const board = [];
  for (let i = 0; i < 64; i++) {
    board.push(Player.None);
  }
  return board;
};

const getPlayerName = (player: Player) => {
  if (player === Player.None) return Player.None;
  if (player === Player.One) return Player.One;
  if (player === Player.Two) return Player.Two;
};

const findLowestEmptyIndex = (board: Board, column: number) => {
  for (let i = 56 + column; i >= 0; i -= 8) {
    if (board[i] === Player.None) return i;
  }
  return -1;
};

const togglePlayerTurn = (player: Player) => {
  return player === Player.One ? Player.Two : Player.One;
};

const getGameState = (board: Board) => {
  // Checks wins horizontally
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c <= 4; c++) {
      const index = r * 8 + c;
      const boardSlice = board.slice(index, index + 4);
      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) return winningResult;
    }
  }

  // check wins vertically // not workng
  for (let r = 0; r <= 4; r++) {
    for (let c = 0; c < 8; c++) {
      const index = r * 8 + c;
      const boardSlice = [
        board[index],
        board[index + 8],
        board[index + 8 * 2],
        board[index + 8 * 3],
      ];

      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) return winningResult;
    }
  }

  // check wins diagonally
  for (let r = 0; r <= 4; r++) {
    for (let c = 0; c < 8; c++) {
      const index = r * 8 + c;

      // Checks diagonal down-left
      if (c >= 3) {
        const boardSlice = [
          board[index],
          board[index + 8 - 1],
          board[index + 8 * 2 - 2],
          board[index + 8 * 3 - 3],
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
      }

      // Checks diagonal down-right
      if (c <= 3) {
        const boardSlice = [
          board[index],
          board[index + 8 + 1],
          board[index + 8 * 2 + 2],
          board[index + 8 * 3 + 3],
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) return winningResult;
      }
    }
  }

  if (board.some((cell) => cell === Player.None)) {
    return GameState.Ongoing;
  } else {
    return GameState.Draw;
  }
};

const checkWinningSlice = (miniBoard: Player[]) => {
  if (miniBoard.some((cell) => cell === Player.None)) return false;

  if (
    miniBoard[0] === miniBoard[1] &&
    miniBoard[1] === miniBoard[2] &&
    miniBoard[2] === miniBoard[3]
  ) {
    return miniBoard[1];
  }

  return false;
};

//component

const GameTileWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #84a4fc;
  box-shadow: 0px 3px 6px #00000040;

  .round_cell {
    width: calc(500px / 8 - 8px);
    height: calc(500px / 8 - 8px);
    background: white;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 4px;
    border: 2px solid #ffffff;
    box-shadow: 0px 3px 6px #00000040 inset;
  }
  .round_cell[data-player="PLAYER_ONE"] {
    background-image: linear-gradient(#ffffc9, #cece00);
  }
  .round_cell[data-player="PLAYER_TWO"] {
    background-image: linear-gradient(#fb7272, #da0000);
  }
`;

export const GameTileBox: React.FC<{
  setPlayerTurn: Function;
  playerTurn: Player;
  gameState: GameState | Player;
  setGameState: Function;
  board: Board;
  setBoard: Function;
}> = ({
  setPlayerTurn,
  playerTurn,
  setGameState,
  gameState,
  board,
  setBoard,
}) => {
  //   const [board, setBoard] = React.useState<Board>(intitializeBoard());
  //   const [playerTurn, setPlayerTurn] = React.useState<Player>(Player.One);
  //   const [gameState, setGameState] = React.useState<GameState | Player>(
  //     GameState.Ongoing
  //   );

  sessionStorage.setItem("playerTurn", playerTurn);

  const renderCells = () => {
    return board.map((player, index) => renderCell(player, index));
  };

  const renderCell = (player: Player, index: number) => {
    let currentPlayer = getPlayerName(player);
    return (
      <div
        className="round_cell"
        key={index}
        onClick={handleOnClick(index)}
        data-player={currentPlayer}
        style={
          currentPlayer !== Player.None
            ? {
                backgroundImage: `url(/${currentPlayer}.png)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {}
        }
      >
        <div
          style={{
            border:
              currentPlayer !== Player.None
                ? `4px solid ${
                    currentPlayer === Player.Two ? "#F8D146" : "#37AC5D"
                  } `
                : "none",
            height: "-webkit-fill-available",
            width: "-webkit-fill-available  ",
            position: "relative",
            borderRadius: "50%",
          }}
        ></div>
      </div>
    );
  };

  const handleOnClick = (index: number) => () => {
    if (gameState !== GameState.Ongoing) return;
    const column = index % 8;
    makeMove(column);
  };

  const makeMove = (column: number) => {
    const index = findLowestEmptyIndex(board, column);
    const newBoard = board.slice();
    newBoard[index] = playerTurn;
    const gameState = getGameState(newBoard);
    setBoard(newBoard);
    setGameState(gameState);
    setPlayerTurn(togglePlayerTurn(playerTurn));
  };

  return <GameTileWrapper> {renderCells()}</GameTileWrapper>;
};
