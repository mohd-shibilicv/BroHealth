import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "doctor2.jpg";
  const displayName = props.displayName ? props.displayName : "Shibli CV";

  return (
    <div className="flex w-full justify-end items-start mb-2">
      <div className="mx-2 bg-black text-white px-3 py-2 rounded">
        <p className="text-xs">{displayName}</p>
        <p className="font-semibold text-md py-2">{message}</p>
        <p className="text-xs text-gray-300">{timestamp}</p>
      </div>
      <Avatar
        sx={{
          color: "white",
          backgroundColor: "black",
          width: "40px",
          height: "40px",
          marginRight: "10px",
        }}
        alt={displayName}
        src={photoURL}
      />
    </div>
  );
};
