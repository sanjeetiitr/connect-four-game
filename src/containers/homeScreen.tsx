import * as React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CustomModal } from "../components/modal";
import PlayIcon from "../svgComponent/playIcon";
import { CustomRow, NormalButton } from "../utils/custumStyles";

const ScreenWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;

  .top-text {
    width: 700px;
    padding: 30px;
    .title-bold {
      font-size: 28px;
      color: #3d4276;
      letter-spacing: 0px;
      text-transform: uppercase;
      font-weight: 600;
      padding-bottom: 5px;
    }
    .title-second {
      font-size: 18px;
      letter-spacing: 0px;
      color: #949494;
    }
  }

  .main-wrapper {
    background-color: white;
    height: 560px;
    width: 700px;
    box-shadow: 0px 3px 10px #00000029;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    opacity: 1;
    z-index: 1;
    flex-direction: column;
    display: flex;

    .col-1 {
      border-bottom: 1px solid #f7f7f7;
    }
    .col-2 {
      flex-wrap: wrap;
    }

    .main-img {
      margin-top: -200px;
    }
  }

  .bottom-wrapper {
    height: 150px;
    background-color: #eeeeee;
    width: 700px;
    background: #eeeeee 0% 0% no-repeat padding-box;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    opacity: 1;
    margin-top: -100px;
    z-index: 0;
    flex-direction: column;
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    color: #424242;

    .copyright {
      font-size: 16px;
      text-align: left;
      letter-spacing: 0px;
      color: #424242;
      opacity: 1;
      padding: 40px 30px 20px 30px;
    }
  }
`;

const PlayButton = styled.button`
  font-size: "20px";
  font-weight: 600;
  cursor: pointer;
  padding: 30px;
  background: #ff7243;
  border: none;
  width: 132px;
  height: 132px;
  background: #ff7243 0% 0% no-repeat padding-box;
  box-shadow: 10px 10px 50px #ff724373;
  border-radius: 20px;

  .btn-txt {
    letter-spacing: 4.4px;
    color: #424242;
    font-size: 22px;
    margin-top: 16px;
  }

  &:hover {
    border: none;
    outline: none;
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:active {
    border: none;
    outline: none;
  }
  &:disabled {
    border: none;
    outline: none;
  }
`;

export const HomeScreen: React.FC<{}> = () => {
  let history = useHistory();
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

  return (
    <ScreenWrapper>
      <div className="top-text">
        <div className="title-bold">Connect Four!</div>
        <div className="title-second">
          Play with other players <br />
          round the world.
        </div>
      </div>
      <div className="main-wrapper">
        <CustomRow margin="30px" justify="space-evenly" className="col-1">
          <PlayButton>
            <PlayIcon fill="#fff" height="40px" />
            <div className="btn-txt">PLAY</div>
          </PlayButton>
          <img
            className="main-img"
            width="400px"
            height="400px"
            alt="img"
            src="/4inarow.png"
          />
        </CustomRow>
        <CustomRow margin="30px" justify="space-between" className="col-2">
          <NormalButton
            background="#4BABFF"
            width="48%"
            onClick={() => handleModalClick("custom-modal")}
          >
            <img height="40" alt="icon" src="/one@2x.png" />
            Custom Game
          </NormalButton>
          <NormalButton
            background="#4B7BFF"
            width="48%"
            onClick={() => history.push("/prestart")}
          >
            <img height="40" alt="icon" src="/two@2x.png" />
            Two Players
          </NormalButton>
          <NormalButton
            background="#4B4BFF"
            width="48%"
            onClick={() => handleModalClick("custom-modal")}
          >
            <img height="40" alt="icon" src="/online@2x.png" />
            Game Online
          </NormalButton>
          <NormalButton
            background="#6E4BFF"
            width="48%"
            onClick={() => handleModalClick("custom-modal")}
          >
            <img height="40" alt="icon" src="/training@2x.png" />
            Training Game
          </NormalButton>
        </CustomRow>
      </div>
      <div className="bottom-wrapper">
        <div className="copyright">© 2020</div>
      </div>
      <CustomModal
        success={() => handleModalSuccess("custom-modal")}
        cancel={() => handleModalCancel("custom-modal")}
        title="Coming Soon"
        id="custom-modal"
        divider={false}
      ></CustomModal>
    </ScreenWrapper>
  );
};
