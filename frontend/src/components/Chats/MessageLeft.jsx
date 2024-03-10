import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import default_profile from "/doctor2.jpg";

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "11-23-2024";
  const photoURL = props.photoURL ? props.photoURL : "";
  const displayName = props.displayName ? props.displayName : "Shibli CV";

  return (
    <>
      <div className="flex w-full justify-start items-start">
        <Avatar
          alt={displayName}
          sx={{
            color: "black",
            backgroundColor: "white",
            width: "40px",
            height: "40px",
            marginRight: "10px",
          }}
          className="border border-black"
          src={photoURL}
        />
        <div className="border border-black px-3 py-2 rounded mb-2">
          <div className="text-xs">{displayName}</div>
          <div>
            <p className="text-md py-2 font-semibold">{message}</p>
            <div className="text-xs">{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};
