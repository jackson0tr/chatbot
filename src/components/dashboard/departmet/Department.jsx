import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import InputCom from "../../shared/InputCom.jsx";
import { useFormik } from "formik";
import axios from "axios";
import CustomTable from "../../shared/CustomTable.jsx";
import { DepartmentContext } from "../../context/DepartmentContextProvider.jsx";
import { useSnackbar } from "../../context/SnackbarProvider.jsx";

export default function Department() {
  const token = localStorage.getItem("userToken");
  const { getDepartments, removeDep } = useContext(DepartmentContext);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const { showSnackbar } = useSnackbar();

  // Function to remove a department
  const removeDepartment = async (depId) => {
    try {
      const res = await removeDep(depId);
      if (res.message === "success") {
        showSnackbar({
          message: "Department deleted successfully",
          severity: "error",
        });
        setTableData(tableData.filter((dep) => dep._id !== depId));
      }
      return res;
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  // Fetch departments data
  async function fetchData() {
    try {
      const res = await getDepartments();
      if (res.deps.length > 0) {
        const departmentKeys = Object.keys(res.deps[0]);
        const columns = ["_id", "name", "createdAt"];
        setTableColumns(columns);
        setTableData(res.deps);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [getDepartments]);

  // Formik configuration
  const initialValues = {
    name: "",
  };

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/addDepartment`,
        values,
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      if (data.message === "success") {
        showSnackbar({
          message: "Department added successfully",
          severity: "success",
        });
        fetchData(); // Fetch updated data after adding department
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ml: { xs: 0, lg: 20 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontSize: "30px",
          mt: 5,
          mb: 2,
          fontWeight: "bold",
        }}
      >
        Departments
      </Typography>
      <Box sx={{ textAlign: "center", width: "80%",ml:{lg:"150px"}, margin: "auto" }}> {/* Adjust width and margin here */}
        <form onSubmit={formik.handleSubmit}>
          <InputCom
            type="text"
            placeholder="Add Department Name"
            name="name"
            title="Department"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgba(43, 1, 62, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(43, 1, 62, 0.8)",
              },
            }}
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Box sx={{ my: 2, width: "100%" }}>
          <CustomTable
            columns={tableColumns}
            data={tableData}
            onDelete={removeDepartment}
          />
        </Box>
      </Box>
    </Box>
  );
}
