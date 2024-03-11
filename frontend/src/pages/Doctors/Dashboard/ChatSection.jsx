import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChatSection = () => {
  const token = useSelector((state) => state.auth.token);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/appointments/appointment-rooms/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data.results);
      } catch (error) {
        console.error("Failed to fetch appointment rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="relative flex min-h-[500px] justify-center items-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="inherit" />
          </Box>
        </div>
      ) : (
        <List>
          {rooms.map((room) => (
            <Link
              key={room.id}
              to={`/doctor-dashboard/chat/${room.id}`}
            >
              <ListItem className="mb-2 border border-black">
                <ListItemText
                  primary={room.name}
                  secondary={room.description}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </div>
  );
};

export default ChatSection;
