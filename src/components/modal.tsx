import React from "react";
import styled from "styled-components";
import { CustomColumn, CustomRow, NormalButton } from "../utils/custumStyles";
const ModalWrapper = styled.div`
  display: none;
  position: fixed;
  z-index: 10;
  padding-top: 10%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .modal-content {
    margin: auto;
    padding: 20px 20px 00px 20px;
    width: 400px;
    top: 10%;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 30px;

    .title {
      text-align: center;
      font-size: 28px;
      padding: 20px 0;
      font-weight: 600;
      letter-spacing: 0px;
      color: #424242;
      opacity: 1;
    }
    .divider {
      width: 100%;
      height: 1px;
      background-color: #00000029;
    }
  }
`;

export const CustomModal: React.FC<{
  success: Function;
  cancel: Function;
  title: string;
  id: string;
  divider?: boolean;
}> = ({ children, success, cancel, title, id, divider = true }) => {
  return (
    <ModalWrapper id={id}>
      <CustomColumn className="modal-content">
        <div className="title">{title}</div>
        {children}
        {divider && <div className="divider"></div>}
        <CustomRow justify="space-between">
          <NormalButton
            width="48%"
            background="#fff"
            color="#4B7BFF"
            onClick={() => cancel()}
          >
            CANCEL
          </NormalButton>
          <NormalButton
            width="48%"
            background="#4B7BFF"
            onClick={() => success()}
          >
            OK
          </NormalButton>
        </CustomRow>
      </CustomColumn>
    </ModalWrapper>
  );
};
