import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export const MessageRight = (props) => {
 const message = props.message ? props.message : "no message";
 const timestamp = props.timestamp ? props.timestamp : "";
 const photoURL = props.photoURL ? props.photoURL : "doctor2.jpg";
 const displayName = props.displayName ? props.displayName : "Shibli CV";

 return (
    <div sx={{
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "10px",
    }}>
      <div sx={{
        position: "relative",
        marginRight: "20px",
        padding: "10px",
        backgroundColor: "#f8e896",
        width: "60%",
        textAlign: "left",
        font: "400 .9em 'Open Sans', sans-serif",
        border: "1px solid #dfd087",
        borderRadius: "10px",
        "&:after": {
          content: "''",
          position: "absolute",
          width: "0",
          height: "0",
          borderTop: "15px solid #f8e896",
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          top: "0",
          right: "-15px"
        },
        "&:before": {
          content: "''",
          position: "absolute",
          width: "0",
          height: "0",
          borderTop: "17px solid #dfd087",
          borderLeft: "16px solid transparent",
          borderRight: "16px solid transparent",
          top: "-1px",
          right: "-17px"
        }
      }}>
        <p sx={{ padding: 0, margin: 0 }}>{message}</p>
        <div sx={{
          position: "absolute",
          fontSize: ".85em",
          fontWeight: "300",
          marginTop: "10px",
          bottom: "-3px",
          right: "5px"
        }}>{timestamp}</div>
      </div>
      <Avatar
        alt={displayName}
        sx={{
          color: "white",
          backgroundColor: deepOrange[500],
          width: "40px",
          height: "40px",
          marginRight: "20px",
        }}
        src={photoURL}
      />
      <div sx={{ marginLeft: "20px" }}>{displayName}</div>
    </div>
 );
};
