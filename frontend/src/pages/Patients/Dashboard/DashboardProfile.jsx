import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import authSlice from "../../../store/slices/auth.js";

const DashboardProfile = () => {
  const account = useSelector((state) => state.auth.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {account ? (
        <div className="w-full h-full text-center items-center">
          <p className="self-center my-auto">Welcome, {account.email}</p>
        </div>
      ) : (
        <>
        <div className="relative flex min-h-[500px] justify-center items-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress color="inherit" />
          </Box>
        </div>
        </>
      )}
    </div>
  );
}

export default DashboardProfile