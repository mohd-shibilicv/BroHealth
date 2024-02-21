import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "/heroimage.jpg";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = !!auth.account;
  const isPatient = auth.account.role === "patient";
  const isDoctor = auth.account.role === "doctor";

  return (
    <section className="relative bg-white text-black p-10 mt-10">
      <div className="hidden absolute md:flex items-center right-0 top-0 w-full h-full lg:w-1/2">
        <img
          className="object-contain rounded w-full h-full mx-auto lg:max-w-2xl"
          src={HeroImage}
          alt="Hero Image"
        />
      </div>
      <div className="relative lg:w-1/2 lg:pl-20 flex flex-col">
        <div className="text-5xl font-semibold text-gray-900 leading-none">
          Your trusted partner for online medical consultations.
        </div>
        <div className="mt-6 text-xl font-light text-true-gray-500 antialiased">
          Our platform is designed to simplify access to quality care.
        </div>

        {!isAuthenticated && (
          <Link to="/register">
            <button className="mt-6 px-8 py-4 border font-semibold rounded-full bg-gray-900 text-white hover:bg-white hover:text-black hover:border-black">
              Register for free
            </button>
          </Link>
        )}

        {isPatient && (
          <Link to="/dashboard">
            <button className="mt-6 px-8 py-4 border font-semibold rounded-full bg-gray-900 text-white hover:bg-white hover:text-black hover:border-black">
              Dashboard
            </button>
          </Link>
        )}
        {isDoctor && (
          <Link to="/doctor-dashboard">
            <button className="mt-6 px-8 py-4 border font-semibold rounded-full bg-gray-900 text-white hover:bg-white hover:text-black hover:border-black">
              Dashboard
            </button>
          </Link>
        )}
      </div>
      <div className="mt-12 lg:mt-32 lg:ml-20 text-left">
        <button
          type="button"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-cool-gray-100 text-gray-800 animate-bounce hover:text-gray-900 hover:bg-cool-gray-50 transition duration-300 ease-in-out cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0  0  24  24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19  14l-7  7m0  0l-7-7m7  7V3"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
