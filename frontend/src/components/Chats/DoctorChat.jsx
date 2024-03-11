import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Paper from "@mui/material/Paper";
import { MessageLeft } from "./MessageLeft";
import { MessageRight } from "./MessageRight";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MedicationIcon from "@mui/icons-material/Medication";
import axios from "axios";
import { useWebSocket } from "../../hooks/useWebSocket";

function PatientChat() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const { client } = useWebSocket(
    `${import.meta.env.VITE_APP_API_WEB_SOCKET_BASE_URL}/ws/chat/${roomId}/`,
    token
  );

  useEffect(() => {
    if (client) {
      client.onmessage = (message) => {
        const parsedMessage = JSON.parse(message.data);
        setMessages((prevMessages) => [...prevMessages, parsedMessage.message]);
      };
    }
  }, [client]);

  // Fetch initial chat history
  useEffect(() => {
    const fetchInitialChatHistory = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/appointments/appointment-rooms/${roomId}/chats/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const parsedMessages = response.data.results.map((item) => {
          const messageObj = JSON.parse(item.message);
          return {
            ...messageObj,
            room: item.room,
            sender: messageObj.sender,
            timestamp: item.timestamp,
          };
        });
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Failed to fetch initial chat history:", error);
      }
    };

    fetchInitialChatHistory();
  }, [roomId, token]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (client) {
      client.send(JSON.stringify({ message: message }));
    }
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
        id="style-1"
        sx={{
          width: "calc( 100% - 20px )",
          margin: 2,
          overflowY: "auto",
          height: "500px",
        }}
      >
        {messages.length === 0 && (
          <div className="w-full mx-auto flex flex-col justify-center items-center h-[500px]">
            <MedicationIcon color="dark" sx={{ fontSize: "80px", mb: 2 }} />
            <p className="text-4xl font-extrabold">BroHealth</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender === "doctor" ? (
              <MessageRight
                message={msg.content}
                timestamp={msg.timestamp}
                displayName="doctor's Name"
                avatarDisp={true}
              />
            ) : (
              <MessageLeft
                message={msg.content}
                timestamp={msg.timestamp}
                displayName="patient's Name"
                avatarDisp={true}
              />
            )}
          </div>
        ))}
      </Paper>
      <form
        onSubmit={handleSendMessage}
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

export default PatientChat;
