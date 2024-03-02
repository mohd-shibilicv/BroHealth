import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tooltip } from "@mui/material";
import moment from "moment-timezone";

const handleViewDetails = (appointmentId) => {
  // Add your logic to navigate to the details page or open a modal
  console.log(`View details for appointment with ID: ${appointmentId}`);
};

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "doctorName",
    headerName: "Doctor",
    width: 200,
    minWidth: 200,
  },
  {
    field: "consultationType",
    headerName: "Appointment Type",
    width: 200,
    minWidth: 200,
  },
  {
    field: "dateAndTime",
    headerName: "Date & Time",
    type: "datetime",
    width: 200,
    minWidth: 200,
    valueFormatter: (params) =>
      moment.utc(params.value).format("MMMM Do YYYY, h:mm:ss a"),
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    minWidth: 200,
    renderCell: (params) => (
      <div className="flex justify-center items-center">
        {params.row.status === "pending" ? (
          <p className="p-2 rounded-lg bg-yellow-100 text-yellow-800">
            Pending
          </p>
        ) : params.row.status === "confirmed" ? (
          <p className="p-2 rounded-lg bg-indigo-100 text-indigo-800">
            Confirmed
          </p>
        ) : (
          <p className="p-2 rounded-lg bg-red-100 text-red-800">Canceled</p>
        )}
      </div>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    minWidth: 100,
    renderCell: (params) => (
      <div className="flex justify-center">
        <Tooltip title="view" placement="right">
          <VisibilityIcon
            className="hover:text-indigo-900 cursor-pointer"
            onClick={() => handleViewDetails(params.row.id)}
          />
        </Tooltip>
      </div>
    ),
  },
];

const PatientAppointments = () => {
  const [appointments, setAppointments] = React.useState([]);
  const token = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/appointments/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.results);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, [token]);

  const rows = Array.isArray(appointments)
    ? appointments.map((appointment) => ({
        id: appointment.id,
        doctorName: `Dr. ${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`,
        consultationType: appointment.consultation_type,
        dateAndTime: appointment.date_and_time,
        status: appointment.status,
      }))
    : [];

  return (
    <div className="flex w-full justify-center">
      <Box sx={{ height: 500 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          pageSizeOptions={[5, 10, 25, 100]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default PatientAppointments;
