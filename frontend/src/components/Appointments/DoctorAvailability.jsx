import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const DoctorAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState([]);
  console.log(selectedTime);
  const doctorId = useSelector((state) => state.auth.info.id);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/doctors/doctor-availability/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvailabilities(response.data.results);
      } catch (error) {
        console.error("Failed to fetch doctor availabilities:", error);
      }
    };

    fetchAvailabilities();
  }, [token]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddAvailability = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_BASE_URL}/doctors/doctor-availability/${doctorId}/`,
        {
          availability_schedule: {
            [selectedDate.toISOString().split("T")[0]]: selectedTime.map(
              (time) => time.toISOString().split("T")[1].split(".")[0]
            ),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAvailabilities([...availabilities, response.data]);
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to add doctor availability:", error);
    }
  };

  return (
    <div>
      <h2>Doctor Availability</h2>
      <Button variant="contained" onClick={handleOpenDialog}>
        Add Availability
      </Button>
      {availabilities.length > 0 ? (
        <ul>
          {availabilities.map((availability) => (
            <li key={availability.id}>
              <p>Date: {Object.keys(availability.availability_schedule)[0]}</p>
              <ul>
                {availability.availability_schedule[Object.keys(availability.availability_schedule)[0]].map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No availabilities found.</p>
      )}

      {/* Add Availability Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Availability</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              style={{ marginBottom: "16px" }}
            />
            <MobileTimePicker
              label="Select Time"
              value={selectedTime}
              onChange={(newTimes) =>
                Array.isArray(newTimes)
                  ? setSelectedTime(newTimes)
                  : setSelectedTime([newTimes])
              }
              openTo="hours"
              views={["hours", "minutes"]}
              multiple
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddAvailability}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorAvailability;
