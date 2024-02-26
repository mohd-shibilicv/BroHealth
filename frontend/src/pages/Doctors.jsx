import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Doctors = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/doctors/`,
          {
            params: {
              page: page,
            },
          }
        );
        setDoctors(response.data);
        setTotalPages(response.data.count);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch data:", error);
      }
    };

    fetchDoctors();
  }, [page]);

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

        {/* Sort By Button */}
        <div className="flex justify-center items-center">
          <form method="get" className="sorting-form flex gap-2 items-center">
            <div className="relative">
              <select
                name="sort"
                id="sort"
                onChange={handleSortChange}
                className="border border-black p-2 rounded-md min-w-[150px]"
              >
                <option value="default">Default</option>
                <option value="specialization">Specialzation</option>
                <option value="fee">Fee</option>
                <option value="expertise">Expertise</option>
              </select>
            </div>
          </form>
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
          count={totalPages}
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
      jdfkjghjdkj
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  const fullProfilePictureUrl = `${import.meta.env.VITE_APP_API_BASE_URL}${
    doctor.user.profile_picture
  }`;

  return (
    <div className="h-full bg-white border border-black rounded p-4 shadow-md">
      <div
        key={doctor.id}
        className="flex justify-center flex-col gap-2 items-center doctor-card"
      >
        <img
          className="object-contain rounded-lg max-w-[250px] max-h-[250px]"
          src={fullProfilePictureUrl}
          alt={`${doctor.user.first_name} ${doctor.user.last_name}`}
        />
        <h2 className="font-semibold text-lg">
          Dr. {doctor.user.first_name} {doctor.user.last_name}
        </h2>
        <p className="text-md">{doctor.specialization}</p>
        <p className="text-sm">
          {doctor.years_of_experience} years of experience
        </p>
      </div>
      <Link
        to={`/doctors/${doctor.id}`}
        className="flex justify-center items-center my-3 relative"
      >
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          sx={{
            mt: 3,
            mb: 2,
            color: "black",
            backgroundColor: "#FFF",
            borderColor: "black",
            "&:hover": {
              backgroundColor: "#000",
              color: "white",
            },
          }}
        >
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default Doctors;
