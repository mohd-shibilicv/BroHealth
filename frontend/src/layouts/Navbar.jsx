import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MedicationIcon from "@mui/icons-material/Medication";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const isPatient = auth?.account?.role === "patient";
  const isDoctor = auth?.account?.role === "doctor";

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
            {!isDoctor && (
              <li className="md:px-4 md:py-2 hover:text-gray-700">
                <a href="#">Doctors</a>
              </li>
            )}
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
              {isPatient && (
                <>
                <Link to="/dashboard">
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt={auth.account.first_name}
                      src={`${import.meta.env.VITE_APP_API_BASE_URL}/${
                        auth.account.profile_picture
                      }`}
                    />
                  </StyledBadge>
                </Link>
              </>
              )}
              {isDoctor && (
                <>
                  <Link to="/dashboard">
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt={auth.account.first_name}
                        src={`${import.meta.env.VITE_APP_API_BASE_URL}/${
                          auth.account.profile_picture
                        }`}
                      />
                    </StyledBadge>
                  </Link>
                </>
              )}
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
