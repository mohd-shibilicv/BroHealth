import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import default_profile from "/doctor2.jpg";

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "11-23-2024";
  const photoURL = props.photoURL ? props.photoURL : "";
  const displayName = props.displayName ? props.displayName : "Shibli CV";

  // Regular expression to detect links
  const urlRegex = /(http?:\/\/[^\s]+)/g;

  // Function to replace links with <a> tags
  const replaceLinks = (text) => {
    return text.replace(urlRegex, (match) => {
      return `<a href="${match}" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">${match}</a>`;
    });
  };

  // Apply link replacement to the message
  const messageWithLinks = replaceLinks(message);

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
            <div
              className="font-semibold text-md py-2"
              dangerouslySetInnerHTML={{ __html: messageWithLinks }}
            />
            <div className="text-xs">{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};
