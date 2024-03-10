import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Paper from "@mui/material/Paper";
import { MessageLeft } from "../../../components/Chats/MessageLeft";
import { MessageRight } from "../../../components/Chats/MessageRight";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

function ChatSection() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const roomId = 1;
    const newClient = new W3CWebSocket(
      `${
        import.meta.env.VITE_APP_API_WEB_SOCKET_BASE_URL
      }/ws/chat/${roomId}/?token=${token}`
    );

    newClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    newClient.onclose = () => {
      console.log("WebSocket Client Closed");
    };
    newClient.onerror = (error) => {
      console.log("WebSocket Client Error:", error);
    };
    newClient.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      setMessages((prevMessages) => [...prevMessages, parsedMessage.message]);
    };

    setClient(newClient);

    return () => {
      newClient.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (client) {
      client.send(
        JSON.stringify({
          message: message,
        })
      );
      setMessage("");
    }
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
        id="style-1"
        sx={{
          width: "calc( 100% - 20px )",
          margin: 2,
          overflowY: "auto",
          height: "500px",
        }}
      >
        {messages.length === 0 && (
          <div>
            <p>BroHealth</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender === "doctor" ? (
              <MessageRight
                message={msg.content}
                timestamp="MM/DD 00:00"
                displayName="Doctor's Name"
                avatarDisp={true}
              />
            ) : (
              <MessageLeft
                message={msg.content}
                timestamp="MM/DD 00:00"
                displayName="Patient's Name"
                avatarDisp={true}
              />
            )}
          </div>
        ))}
      </Paper>
      <form
        onSubmit={sendMessage}
        className="w-full flex gap-2"
        noValidate
        autoComplete="off"
      >
        <input
          aria-multiline
          id="standard-text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-black outline-none px-2 py-3 rounded-lg placeholder:text-gray-700"
        />
        {message ? (
          <Button
            type="submit"
            variant="outlined"
            color="inherit"
            sx={{ marginLeft: 1 }}
          >
            <SendIcon />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled
            sx={{ marginLeft: 1 }}
          >
            <SendIcon />
          </Button>
        )}
      </form>
    </div>
  );
}

export default ChatSection;
