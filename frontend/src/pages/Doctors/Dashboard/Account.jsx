import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VerifyDoctorAccount from "../../../components/Doctors/VerifyDoctorAccount";
import Container from "@mui/material/Container";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Container>{children}</Container>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Account = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            textColor="inherit"
            indicatorColor="primary"
          >
            <Tab label="Verify Account" {...a11yProps(0)} />
            <Tab label="Reset Password" {...a11yProps(1)} />
            <Tab label="Other Settings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <VerifyDoctorAccount />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          Reset Password
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          Other Settings
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Account;
