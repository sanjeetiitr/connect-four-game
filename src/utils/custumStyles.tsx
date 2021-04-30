import styled from "styled-components";

interface CustomLayoutProps {
  align?: string;
  justify?: string;
  height?: string;
  width?: string;
  padding?: string;
  margin?: string;
}

export const CustomRow = styled.div<CustomLayoutProps>`
  flex-direction: row;
  display: flex;
  align-items: ${(props) => props.align || "unset"};
  justify-content: ${(props) => props.justify || "unset"};
  height: ${(props) => props.height || "unset"};
  width: ${(props) => props.width || "unset"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
`;

export const CustomColumn = styled.div<CustomLayoutProps>`
  flex-direction: column;
  display: flex;
  align-items: ${(props) => props.align || "unset"};
  justify-content: ${(props) => props.justify || "unset"};
  height: ${(props) => props.height || "unset"};
  width: ${(props) => props.width || "unset"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
`;

export const NormalButton = styled.button<{
  background?: string;
  width?: string;
  color?: string;
  marginBottom?: string;
  shadow?: boolean;
}>`
  font-size: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || "white"};

  font-weight: 600;
  cursor: pointer;
  padding: 20px;
  background: ${(props) => props.background || "#4BABFF"};
  border: none;
  width: ${(props) => props.width || "100%"};
  font-weight: medium;
  margin-bottom: ${(props) => props.marginBottom || "30px"};
  border-radius: 20px;
  box-shadow: ${(props) => (!props.shadow ? "0px 3px 6px #00000029" : "none")};

  img {
    margin-right: 10px;
  }

  &:hover {
    border: none;
    outline: none;
    // background: #ff7243;
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
    cursor: not-allowed;
    // background: #ff7243;
  }

  @media (max-width: 450px) {
    font-size: 16px;
    padding: 10px;
    margin-bottom: ${(props) => props.marginBottom || "10px"};
    border-radius: 10px;
  }
`;
