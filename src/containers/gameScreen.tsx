import * as React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CustomAvatar } from "../components/avatar";
import {
  Board,
  GameState,
  GameTileBox,
  intitializeBoard,
  Player,
} from "../components/gameTile";
import BackIcon from "../svgComponent/backIcon";
import { CustomColumn, CustomRow, NormalButton } from "../utils/custumStyles";

const GameScreenWrapper = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;

  .top-navigation {
    background-color: #ffffff;
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;

    .header-title {
      letter-spacing: 0px;
      color: #424242;
      font-size: 24px;
      font-weight: 600;
    }
    .back-icon {
      position: absolute;
      left: 0;
      cursor: pointer;
    }
  }

  .main-wrapper {
    background-color: white;
    height: 580px;
    width: 560px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    opacity: 1;
    z-index: 1;
    flex-direction: row;
    display: flex;

    .col-1 {
      // border-bottom: 1px solid #f7f7f7;
      width: 100%;
    }
    .col-2 {
      flex-wrap: wrap;
      width: 300px;
    }
  }

  .side-wrapper {
    height: 580px;
    width: 300px;
    background-color: #eeeeee;
    background: #eeeeee 0% 0% no-repeat padding-box;
    border-radius: 30px;
    opacity: 1;
    margin-left: -50px;
    z-index: 0;
    flex-direction: column;
    display: flex;
    padding-left: 50px;

    .det-title {
      font-size: 24px;
      font-weight: 500;
      text-align: center;
      letter-spacing: 0px;
      color: #424242;
      opacity: 1;
    }
    .win-text {
      text-align: center;
      font-size: 22px;
      font-weight: 500;
      letter-spacing: 0px;
      color: #ff6600;
      opacity: 1;
      padding-top: 8px;
    }
    .det-sub-title {
      font-size: 18px;
      text-align: center;
      letter-spacing: 0px;
      color: #505351;
      opacity: 1;
      padding-top: 8px;
      padding-bottom: 10px;
    }
    .player-det {
      border: 1px solid #70707026;
      border-radius: 15px;

      .sub-t1 {
        opacity: 0.56;
        font-size: 14px;
      }
      .sub-t2 {
        opacity: 0.56;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .divider {
      width: 100%;
      height: 1px;
      background-color: #424242;
      margin-top: 10px;
    }
  }
  .lightGreen {
    background-color: #dcf6e4;
  }
  .lightYellow {
    background-color: #f6efd5;
  }
`;

export const GameScreen: React.FC<{}> = () => {
  let game_setting = sessionStorage.getItem("game_setting")
    ? sessionStorage.getItem("game_setting")
    : "";

  const [board, setBoard] = React.useState<Board>(intitializeBoard());
  const [playerTurn, setPlayerTurn] = React.useState<Player>(Player.One);
  const [gameState, setGameState] = React.useState<GameState | Player>(
    GameState.Ongoing
  );
  const [tournamentStatus, updateTournamentStatus] = React.useState<any>({
    winner: undefined,
    PLAYER_ONE: 0,
    PLAYER_TWO: 0,
    playGameCount: 1,
    gameCount: game_setting && JSON.parse(game_setting).gameCount,
    startWith: game_setting && JSON.parse(game_setting).startWith,
  });

  let history = useHistory();

  const handleEndGame = () => {
    sessionStorage.clear();
    history.push("/");
  };

  const handleNextGame = () => {
    setBoard(intitializeBoard());
    setPlayerTurn(Player.One);
    setGameState(GameState.Ongoing);
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  React.useEffect(() => {
    if (gameState !== -1 && tournamentStatus.gameCount) {
      let count = tournamentStatus.gameCount;
      let intScore = tournamentStatus[gameState];
      let initplayerCount = tournamentStatus.playGameCount;
      updateTournamentStatus({
        ...tournamentStatus,
        gameCount: count - 1,
        [gameState]: intScore + 1,
        playGameCount: initplayerCount + 1,
      });
    }
  }, [gameState]);

  const checkWinner = () => {
    let midScore = Math.round(
      (game_setting && JSON.parse(game_setting).gameCount) / 2
    );
    if (tournamentStatus.PLAYER_ONE >= midScore) {
      return "PLAYER_ONE";
    } else if (tournamentStatus.PLAYER_TWO >= midScore) {
      return "PLAYER_TWO";
    } else if (
      tournamentStatus.PLAYER_TWO === tournamentStatus.PLAYER_ONE &&
      tournamentStatus.PLAYER_TWO !== 0 &&
      tournamentStatus.PLAYER_ONE !== 0
    ) {
      return false;
    } else return false;
  };

  console.log(
    tournamentStatus,
    game_setting && JSON.parse(game_setting),
    "playerTurn"
  );
  let wonGame = gameState === "PLAYER_TWO" || gameState === "PLAYER_ONE";
  let wonTournament = tournamentStatus.gameCount === 0 || checkWinner();
  let checkWinnerPlayer = checkWinner();
  return (
    <GameScreenWrapper>
      <CustomRow padding="10px" justify="center" className="top-navigation">
        <BackIcon
          height="20"
          className="back-icon"
          onClick={() => history.push("/prestart")}
        />
        <div className="header-title">Two Player Game</div>
      </CustomRow>
      <div className="main-wrapper">
        <CustomRow margin="30px" justify="center" className="col-1">
          <GameTileBox
            setPlayerTurn={setPlayerTurn}
            playerTurn={playerTurn}
            gameState={gameState}
            setGameState={setGameState}
            board={board}
            setBoard={setBoard}
          />
        </CustomRow>
      </div>
      <div className="side-wrapper">
        <CustomColumn margin="30px" justify="space-between" className="col-2">
          <div className="det-title">
            {game_setting && JSON.parse(game_setting).gameCount} Games
            Tournament
          </div>
          {wonGame && <div className="win-text">Congratulation!</div>}
          {!wonGame && !wonTournament && (
            <div className="det-sub-title">
              Playing Game {tournamentStatus.playGameCount}
            </div>
          )}
          {wonGame && !wonTournament && (
            <div className="det-sub-title">
              {game_setting && JSON.parse(game_setting)[gameState]}, you won
              Game {tournamentStatus.PLAYER_ONE + tournamentStatus.PLAYER_TWO}
            </div>
          )}
          {wonTournament && (
            <div className="det-sub-title">
              <b>
                {game_setting &&
                  checkWinnerPlayer &&
                  JSON.parse(game_setting)[checkWinnerPlayer]}
              </b>
              , you won tournament
            </div>
          )}
          <CustomRow
            padding="10px"
            margin="10px 0"
            className="player-det lightGreen"
            justify="space-between"
          >
            <CustomAvatar
              focusCircle={!wonGame && playerTurn === "PLAYER_ONE"}
              player="PLAYER_ONE"
            />
            <CustomColumn justify="space-evenly">
              <div className="sub-t1">Player 1</div>
              <div className="sub-t2">
                {game_setting && JSON.parse(game_setting).PLAYER_ONE}
              </div>
            </CustomColumn>
            <CustomColumn justify="space-evenly">
              <div className="sub-t1">Score</div>
              <div className="sub-t2">{tournamentStatus.PLAYER_ONE}</div>
            </CustomColumn>
          </CustomRow>
          <CustomRow
            padding="10px"
            margin="10px 0"
            className="player-det lightYellow"
            justify="space-between"
          >
            <CustomAvatar
              focusCircle={!wonGame && playerTurn === "PLAYER_TWO"}
              player="PLAYER_TWO"
            />
            <CustomColumn justify="space-evenly">
              <div className="sub-t1">Player 2</div>
              <div className="sub-t2">
                {game_setting && JSON.parse(game_setting).PLAYER_TWO}
              </div>
            </CustomColumn>
            <CustomColumn justify="space-evenly">
              <div className="sub-t1">Score</div>
              <div className="sub-t2">{tournamentStatus.PLAYER_TWO}</div>
            </CustomColumn>
          </CustomRow>
          <div className="divider" />
          <CustomColumn width="100%" padding="20px 0">
            {!wonGame && (
              <NormalButton marginBottom="20px" background="#4B7BFF">
                Undo Step
              </NormalButton>
            )}
            {wonTournament && (
              <NormalButton
                marginBottom="20px"
                background="#4B7BFF"
                onClick={handlePlayAgain}
              >
                Play Again
              </NormalButton>
            )}
            {wonGame && !wonTournament && (
              <NormalButton
                marginBottom="20px"
                background="#4B7BFF"
                onClick={handleNextGame}
              >
                Next Game
              </NormalButton>
            )}
            <NormalButton
              onClick={handleEndGame}
              background="white"
              color="#CC0000"
            >
              End Tournament
            </NormalButton>
          </CustomColumn>
        </CustomColumn>
      </div>
    </GameScreenWrapper>
  );
};
