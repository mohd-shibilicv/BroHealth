import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "11-23-2024";
  const photoURL = props.photoURL ? props.photoURL : "doctor2.jpg";
  const displayName = props.displayName ? props.displayName : "Shibli CV";

  return (
    <>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Avatar
          alt={displayName}
          sx={{
            color: "white",
            backgroundColor: deepOrange[500],
            width: "40px",
            height: "40px",
            marginRight: "10px",
          }}
          src={photoURL}
        />
        <div>
          <div sx={{ marginLeft: "20px" }}>{displayName}</div>
          <div
            sx={{
              position: "relative",
              marginLeft: "20px",
              padding: "10px",
              backgroundColor: "#A8DDFD",
              width: "60%",
              textAlign: "left",
              font: "400 .9em 'Open Sans', sans-serif",
              border: "1px solid #97C6E3",
              borderRadius: "10px",
              "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid #A8DDFD",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px",
              },
              "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #97C6E3",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px",
              },
            }}
          >
            <p>{message}</p>
            <div
              sx={{
                position: "absolute",
                fontSize: ".85em",
                fontWeight: "300",
                marginTop: "10px",
                bottom: "-3px",
                right: "5px",
              }}
            >
              {timestamp}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
