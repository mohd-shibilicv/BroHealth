import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, Tooltip } from "@mui/material";
import moment from 'moment-timezone';

const handleViewDetails = (appointmentId) => {
  // Add your logic to navigate to the details page or open a modal
  console.log(`View details for appointment with ID: ${appointmentId}`);
};

const columns = [
  { field: "id", headerName: "ID", width: 150,  },
  {
    field: "patientName",
    headerName: "Patient",
    width: 250,
    
  },
  {
    field: "doctorName",
    headerName: "Doctor",
    width: 250,
    
  },
  {
    field: "consultationType",
    headerName: "Appointment Type",
    width: 200,
    
  },
  {
    field: "dateAndTime",
    headerName: "Date & Time",
    type: "datetime",
    width: 250,
    valueFormatter: (params) => moment.utc(params.value).format('MMMM Do YYYY, h:mm:ss a')
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => (
      <div className="flex justify-center gap-2">
        <Tooltip title="view" placement="right">
          <VisibilityIcon
            className="hover:text-indigo-900 cursor-pointer"
            onClick={() => handleViewDetails(params.row.id)}
          />
        </Tooltip>
        <Tooltip title="delete" placement="right">
          <DeleteIcon
            className="hover:text-red-700 cursor-pointer"
            onClick={() => handleViewDetails(params.row.id)}
          />
        </Tooltip>
      </div>
    ),
  },
];

const AdminAppointments = () => {
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
        console.log(response.data)
        setAppointments(response.data.results);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const rows = Array.isArray(appointments)
    ? appointments.map((appointment) => ({
        id: appointment.id,
        patientName: `${appointment.patient.user.first_name} ${appointment.patient.user.last_name}`,
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

export default AdminAppointments;
