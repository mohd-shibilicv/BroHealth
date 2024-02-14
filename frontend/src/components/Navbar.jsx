import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MedicationIcon from "@mui/icons-material/Medication";
import ProfilePictureComponent from "./ProfilePictureComponent.jsx";
import LogoutIcon from '@mui/icons-material/Logout';
import authSlice from '../store/slices/auth.js';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    navigate("/login");
  };

  const isAuthenticated = !!auth.account;

  return (
    <nav className="shadow shadow-gray-300 w-full px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo */}
        <Link to="/">
          <div className="text-black-600 md:order-1 flex gap-1 items-center">
            <MedicationIcon color="dark" fontSize="large" />
            <p className="font-bold md:text-lg">BroHealth</p>
          </div>
        </Link>
        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            {/* Active Link = text-gray-600
               Inactive Link = hover:text-gray-600 */}
            <li className="md:px-4 md:py-2 text-gray-900">
              <Link to="/">Home</Link>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-700">
              <a href="#">Doctors</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-700">
              <a href="#">Blogs</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-700">
              <a href="#">About</a>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-700">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          {isAuthenticated ? (
            <div className="flex gap-4">
              {/* <div className="flex items-center gap-4">
                <ProfilePictureComponent base64ProfilePicture={user?.profile_picture} />
              </div> */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-50 rounded-xl flex items-center gap-2"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-50 rounded-xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0  0  20  20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3  3a1  1  0  011  1v12a1  1  0  11-2  0V4a1  1  0  011-1zm7.707  3.293a1  1  0  010  1.414L9.414  9H17a1  1  0  110  2H9.414l1.293  1.293a1  1  0  01-1.414  1.414l-3-3a1  1  0  010-1.414l3-3a1  1  0  011.414  0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
