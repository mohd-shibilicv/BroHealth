import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSlice from "../../store/slices/auth.js";
import useSWR from "swr";
import axiosService from "../../services/axios.js";

const DashboardPage = () => {
  const account = useSelector((state) => state.auth.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = account?.id;

  const { data: user } = useSWR(`/user/${userId}/`, (url) =>
    axiosService.get(url).then((res) => res.data)
  );

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/login");
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full p-6">
        <button
          onClick={handleLogout}
          className="rounded p-2 w-32 bg-red-700 text-white"
        >
          Logout
        </button>
      </div>

      {user ? (
        <div className="w-full h-full text-center items-center">
          <p className="self-center my-auto">Welcome, {user.email}</p>
        </div>
      ) : (
        <p className="text-center items-center">Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;
