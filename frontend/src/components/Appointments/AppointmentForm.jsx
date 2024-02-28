import React, { useState } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";

const shouldDisableTime = (value, view) => {
  const hour = value.hour();
  if (view === "hours") {
    return hour < 9 || hour > 18;
  }
  return false;
};

const AppointmentPage = () => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [consultationType, setConsultationType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const patient = useSelector((state) => state.auth.info);

  const { doctor } = location.state;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const formattedDateTime = `${selectedDate}T${selectedTime}:00Z`;
      console.log(formattedDateTime);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/appointments/`,
        {
          patient: patient.id,
          doctor: doctor.id,
          consultation_type: consultationType,
          date_and_time: formattedDateTime,
          additional_notes: additionalNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            doctor_id: doctor.id,
          }
        }
      );
      setLoading(false);
  
      // Handle success, e.g., redirect to a confirmation page
      console.log('Appointment created successfully:', response.data);
    } catch (error) {
    setLoading(false);
      console.error('Failed to create appointment:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  // Function to handle date selection
  const handleDateSelect = (newValue) => {
    const selectedDate = newValue.format("YYYY-MM-DD");
    setSelectedDate(selectedDate);
  };
  const handleTimeSelect = (newValue) => {
    const selectedTime = newValue.format("HH:mm");
    setSelectedTime(selectedTime);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl text-center font-semibold mb-6">
        Schedule an Appointment
      </h2>
      <div className="w-full flex justify-center items-center">
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            select
            label="Consultation Type"
            name="consultationType"
            value={consultationType}
            onChange={(event) => setConsultationType(event.target.value)}
            required
            sx={{ mb: 2 }}
          >
            <MenuItem value="new_consultation">New Consultation</MenuItem>
            <MenuItem value="prescription">Prescription Request</MenuItem>
            <MenuItem value="follow_up">Follow-up Appointment</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              format="YYYY-MM-DD"
              name="date"
              views={["year", "month", "day"]}
              className="w-full mt-2"
              disablePast
              value={selectedDate}
              onChange={handleDateSelect}
              sx={{ mb: 2 }}
            />
            <DigitalClock
            skipDisabled
            timeStep={60}
            label="Time Slot"
            name="timeSlot"
            ampm={false}
            onChange={handleTimeSelect}
            sx={{ mb: 2 }}
            shouldDisableTime={shouldDisableTime}
          />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Additional Notes"
            multiline
            rows={4}
            name="additionalNotes"
            value={additionalNotes}
            onChange={(event) => setAdditionalNotes(event.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: "white",
              backgroundColor: "rgb(17  24  39 /  1)",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            {loading ? (
                <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <p>Confirm Appointment</p>
              )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
