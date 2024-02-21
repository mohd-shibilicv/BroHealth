import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import { Grid, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const VerifyDoctorAccount = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(e);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Account Verification
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: 500 }}
          >
            {error && (
              <p className="mx-auto flex justify-center bg-red-100 text-red-600 px-5 py-3 rounded">
                {error}
              </p>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="license-number"
              name="license-number"
              label="Medical License Number"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="licesure-information"
              name="licesure-information"
              label="Licensure Information"
              type="test"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
            <Grid item xs={12}>
              <input
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                multiple
                onChange={handleFileUpload}
              />
              <label htmlFor="raised-button-file">
                <Button
                  color="inherit"
                  className="w-full border"
                  variant="outlined"
                  component="span"
                  sx={{ mt: 2, mb: 2 }}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Certificates
                </Button>
              </label>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                color: "white",
                backgroundColor: "rgb(17  24  39 /  1)",
                borderColor: "black",
                "&:hover": {
                  backgroundColor: "rgb(17  24  39 / 0)",
                  borderColor: "black",
                  color: "black",
                },
              }}
            >
              {loading ? (
                <div
                  className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <p>Verify</p>
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default VerifyDoctorAccount;
