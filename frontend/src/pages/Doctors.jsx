import React, { useState } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from "react-router-dom";

const Doctors = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState(["jhsgs", "sdfs", "jgajk"]);
  const [doctors, setDoctors] = useState([
    "Mr. jagsdj",
    "jakhsg",
    "jghas",
    "jhsdgaj",
    "jkhasgkj",
  ]);
  const [page, setPage] = useState(1);

  const handleFilterToggle = () => {
    setShowFilter(!showFilter);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-4 pt-20 pb-16">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Doctors</h1>
        <p className="text-gray-600">Find the perfect doctor for your needs.</p>
      </div>

      <div className="flex justify-between items-center my-10">
        {/* Filter Button */}
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<FilterListIcon />}
          onClick={handleFilterToggle}
          className="mr-4 mb-4 bg-white border-black hover:bg-gray-200 text-black"
        >
          Filter
        </Button>

        {/* Category Navlinks */}
        <div className="flex justify-center items-center" id="category-filter">
          {categories.map((category, index) => (
            <NavLink
              key={index}
              className="px-4 py-1 rounded-sm mr-4 bg-white border border-black hover:bg-black hover:text-white text-black active:bg-black active:text-white"
            >
              {category}
            </NavLink>
          ))}
        </div>

        {/* Sort By Button */}
        <div onClick={handleSortChange} className="px-2 py-1 rounded-sm mr-4 border bg-white border-black hover:bg-gray-200 text-black">
          Sort by
          <KeyboardArrowDownIcon />
        </div>
      </div>

      {/* Filter Form (Show conditionally) */}
      {showFilter && <FilterForm onApply={() => setShowFilter(false)} />}

      {/* Doctor Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center">
        <Pagination
          count={10}
          page={page}
          onChange={handlePageChange}
          className="mt-20 justify-center"
        />
      </div>
    </div>
  );
};

const FilterForm = () => {
  // Implement your filter form logic here
  return (
    <div className="bg-white rounded p-4 shadow-md">
      {/* Your filter form fields */}
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded p-4 shadow-md">
      <img
        src="/doctor7.jpg"
        alt={doctor.name}
        className="rounded-full mb-2"
      />
      <h2 className="text-xl font-medium mb-1">sdhgas</h2>
      <p className="text-gray-600">dasda</p>
      <Button
        variant="contained"
        href={`/doctors/${doctor.id}`}
        className="mt-2 bg-black hover:bg-gray-800 text-white"
      >
        View Details
      </Button>
    </div>
  );
};

export default Doctors;
