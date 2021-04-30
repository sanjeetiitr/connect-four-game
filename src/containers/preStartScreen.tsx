import * as React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CustomAvatar } from "../components/avatar";
import { CustomModal } from "../components/modal";
import BackIcon from "../svgComponent/backIcon";
import { CustomColumn, CustomRow, NormalButton } from "../utils/custumStyles";
interface Props {
  isMobile: boolean;
}

const PreStartScreenWrapper = styled.div`
  flex-direction: column;
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
      left: 20px;
      cursor: pointer;
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: #00000029;
    margin: 20px 0;
  }

  .main-wrapper {
    padding: 30px 30px 0px 30px;
    background-color: white;
    min-height: 560px;
    width: 500px;
    box-shadow: 0px 3px 10px #00000029;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    opacity: 1;
    z-index: 1;
    flex-direction: column;
    display: flex;

    .lightGreen {
      background-color: #dcf6e4;
    }
    .lightYellow {
      background-color: #f6efd5;
    }
    .lightBlue {
      background-color: #eff3ff;
    }
    .row-ui-style {
      border: 1px solid #70707026;
      border-radius: 15px;

      .sub-t1 {
        text-align: left;
        font-size: 16px;
        letter-spacing: 0px;
        color: #424242;
        opacity: 0.56;
      }
      .sub-t2 {
        text-align: left;
        font-size: 24px;
        letter-spacing: 0px;
        color: #424242;
        opacity: 1;
        font-weight: 600;
      }
      .input-cust {
        background: transparent;
        border: none;
        padding: 0 0 4px 0;
        border-bottom: 1px solid grey;
        width: 100%;

        &:focus-visible {
          outline: none;
        }
      }

      .radio-item {
        padding: 20px;
        background: #eff3ff 0% 0% no-repeat padding-box;
        border: 1px solid #70707026;
        border-radius: 15px;
        opacity: 1;
        margin: 5px 0;
        cursor: pointer;
        label {
          color: #424242;
          font-size: 24px;
          padding-left: 10px;
          cursor: pointer;
        }
        input {
          cursor: pointer;
          height: 18px;
          width: 18px;
        }
      }
    }
    .pointer {
      cursor: pointer;
    }
  }

  @media (max-width: 450px) {
    .top-navigation {
      width: 100%;
      .header-title {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .main-wrapper {
      padding: 10px 0;
      min-height: 560px;
      width: 100%;
      border-radius: 30px;
      align-items: center;
      justify-content: center;

      .row-ui-style {
        border: 1px solid #70707026;
        border-radius: 10px;
        width: 80%;

        .sub-t1 {
          font-size: 12px;
        }
        .sub-t2 {
          font-size: 20px;
        }
        .input-cust {
          &:focus-visible {
            outline: none;
          }
        }

        .radio-item {
          padding: 10px;
          border-radius: 10px;
          label {
            font-size: 18px;
          }
          input {
            height: 14px;
            width: 14px;
          }
        }
      }
    }
  }
`;

export const PreStartScreen: React.FC<Props> = ({ isMobile }) => {
  let history = useHistory();
  const [player1, setPlayer1] = React.useState("Player 1");
  const [player2, setPlayer2] = React.useState("Player 2");
  const [gameCount, setGameCount] = React.useState(2);
  const [startWith, setStartWith] = React.useState("Always player 1");

  const handleModalClick = (id: string) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "block";
    }
  };
  const handleModalCancel = (id: string) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  };
  const handleModalSuccess = (id: string) => {
    let element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
    }
  };

  const handleGameStart = () => {
    sessionStorage.setItem(
      "game_setting",
      JSON.stringify({
        PLAYER_ONE: player1,
        PLAYER_TWO: player2,
        gameCount: gameCount,
        startWith: startWith,
      })
    );
    history.push("/game");
  };

  return (
    <PreStartScreenWrapper>
      <CustomRow padding="10px" justify="center" className="top-navigation">
        <BackIcon
          height="20"
          className="back-icon"
          onClick={() => history.push("/")}
        />
        <div className="header-title">Two Player Game</div>
      </CustomRow>
      <div className="main-wrapper">
        <CustomRow
          padding="20px"
          margin="5px 0"
          className="row-ui-style lightGreen"
        >
          <CustomAvatar player="PLAYER_ONE" />
          <CustomColumn margin="0 0 0 10px" justify="space-evenly">
            <div className="sub-t1">Player 1</div>
            <input
              className="sub-t2 input-cust"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
          </CustomColumn>
        </CustomRow>
        <CustomRow
          padding="20px"
          margin="5px 0"
          className="row-ui-style lightYellow"
        >
          <CustomAvatar player="PLAYER_TWO" />
          <CustomColumn margin="0 0 0 10px" justify="space-evenly">
            <div className="sub-t1">Player 2</div>
            <input
              className="sub-t2 input-cust"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </CustomColumn>
        </CustomRow>
        <CustomRow
          padding="20px"
          margin="5px 0"
          className="row-ui-style lightBlue"
        >
          <CustomAvatar player="RUN" />
          <CustomColumn margin="0 0 0 10px" justify="space-evenly">
            <div className="sub-t1">Number of Games</div>
            <div
              onClick={() => handleModalClick("number_of_game")}
              className="pointer"
            >
              {gameCount} Games
            </div>
            <CustomModal
              success={() => handleModalSuccess("number_of_game")}
              cancel={() => handleModalCancel("number_of_game")}
              title="Number of game"
              id="number_of_game"
            >
              <div className="radio-item" onClick={() => setGameCount(2)}>
                <input
                  type="radio"
                  id="gameCount"
                  checked={gameCount === 2}
                  name="gameCount"
                  value={2}
                />
                <label>2 Games</label>
              </div>
              <div className="radio-item" onClick={() => setGameCount(3)}>
                <input
                  type="radio"
                  id="gameCount"
                  name="gameCount"
                  value={3}
                  checked={gameCount === 3}
                />
                <label>3 Games</label>
              </div>
              <div className="radio-item" onClick={() => setGameCount(5)}>
                <input
                  type="radio"
                  id="gameCount"
                  name="gameCount"
                  value={5}
                  checked={gameCount === 5}
                />
                <label>5 Games</label>
              </div>
              <div className="radio-item" onClick={() => setGameCount(10)}>
                <input
                  type="radio"
                  id="gameCount"
                  name="gameCount"
                  checked={gameCount === 10}
                  value={10}
                />
                <label>10 Games</label>
              </div>
            </CustomModal>
          </CustomColumn>
        </CustomRow>
        <CustomRow
          padding="20px"
          margin="5px 0"
          className="row-ui-style lightBlue"
        >
          <CustomAvatar player="WINNER" />
          <CustomColumn margin="0 0 0 10px" justify="space-evenly">
            <div className="sub-t1">Who Starts</div>
            <div
              onClick={() => handleModalClick("who_start_modal")}
              className="pointer"
            >
              {startWith}
            </div>
            <CustomModal
              success={() => handleModalSuccess("who_start_modal")}
              cancel={() => handleModalCancel("who_start_modal")}
              title="Who Starts"
              id="who_start_modal"
            >
              <div>
                <div
                  className="radio-item"
                  onClick={() => setStartWith("Alternative turn")}
                >
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Alternative turn"
                    checked={startWith === "Alternative turn"}
                  />
                  <label>Alternative turn</label>
                </div>
                <div
                  className="radio-item"
                  onClick={() => setStartWith("Looser first")}
                >
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Looser first"
                    checked={startWith === "Looser first"}
                  />
                  <label>Looser first</label>
                </div>
                <div
                  className="radio-item"
                  onClick={() => setStartWith("Winner first")}
                >
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Winner first"
                    checked={startWith === "Winner first"}
                  />
                  <label>Winner first</label>
                </div>
                <div
                  className="radio-item"
                  onClick={() => setStartWith("Always player 1")}
                >
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Always player 1"
                    checked={startWith === "Always player 1"}
                  />
                  <label>Always player 1</label>
                </div>
                <div
                  className="radio-item"
                  onClick={() => setStartWith("Always player 2")}
                >
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Always player 2"
                    checked={startWith === "Always player 2"}
                  />
                  <label>Always player 2</label>
                </div>
              </div>
            </CustomModal>
          </CustomColumn>
        </CustomRow>
        <div className="divider"></div>
        <NormalButton
          background="#4BABFF"
          width={isMobile ? "90%" : "100%"}
          onClick={handleGameStart}
        >
          Start Game
        </NormalButton>
      </div>
    </PreStartScreenWrapper>
  );
};
