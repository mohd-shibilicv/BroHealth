import axios from "axios";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to validate the form fields
  const validateInput = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "email":
        if (!value || !/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value || value.length < 8) {
          errorMessage = "Password must be at least 8 characters long";
        }
        break;
      case "confirm-password":
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the individual state variables for each input field first
    switch (name) {
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirm-password":
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    // Then validate the input and update the errors state
    const errorMessage = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = Object.values(errors).every((error) => !error);
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);

    try {
      const response = await axios.post(
        "http://localhost:8000/patients/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Display success message to the user
      toast.success("Registration successful!");
      // Redirect to login page after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data;
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...backendErrors,
        }));
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} className="m-2 important">
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                fullWidth
                id="firstname"
                label="First Name"
                alue={firstname}
                onChange={handleInputChange}
                error={!!errors.firstname}
                helperText={errors.firstname}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
                alue={lastname}
                onChange={handleInputChange}
                error={!!errors.lastname}
                helperText={errors.lastname}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} mt={2}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegistrationForm;
