import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Paper from "@mui/material/Paper";
import { MessageLeft } from "../../../components/Chats/MessageLeft";
import { MessageRight } from "../../../components/Chats/MessageRight";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const client = new W3CWebSocket("ws://localhost:8000/ws/chat/room1/");

function ChatSection() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      setMessages((messages) => [...messages, message.data]);
    };
  }, []);

  const sendMessage = () => {
    client.send(
      JSON.stringify({
        message: message,
      })
    );
    setMessage("");
  };

  return (
    <div
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          id="style-1"
          sx={{
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )",
          }}
        >
          <MessageLeft
            message="あめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName=""
            avatarDisp={true}
          />
          <MessageLeft
            message="xxxxxhttps://yahoo.co.jp xxxxxxxxxあめんぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさぼあかいなあいうえおあいうえおかきくけこさいすせそ"
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="テスト"
            avatarDisp={false}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={true}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="まさりぶ"
            avatarDisp={false}
          />
        </Paper>
        <form onSubmit={sendMessage} className="w-full flex" noValidate autoComplete="off">
          <TextField
            id="standard-text"
            label="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              width: "100%",
            }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: 1 }}>
            <SendIcon />
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default ChatSection;
