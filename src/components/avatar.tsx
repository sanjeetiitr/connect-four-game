import React from "react";

export const CustomAvatar: React.FC<{
  player: string;
  focusCircle?: boolean | null;
}> = ({ player, focusCircle }) => {
  return (
    <div
      style={{
        border: focusCircle ? `6px solid #FFA200` : "6px solid transparent",
        height: "60px",
        width: "60px",
        borderRadius: "50%",
      }}
    >
      <div
        style={{
          border: ["PLAYER_TWO", "PLAYER_ONE"].includes(player)
            ? `10px solid ${player === "PLAYER_TWO" ? "#F8D146" : "#37AC5D"} `
            : "10px solid #B1C4F9",
          height: "-webkit-fill-available",
          width: "-webkit-fill-available  ",
          position: "relative",
          borderRadius: "50%",
          backgroundImage: `url(/${player}.png)`,
          backgroundPosition: "center",
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};
