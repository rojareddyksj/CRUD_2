import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => {
        setEmployees(employees.filter((employee) => employee._id !== id));
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Department", field: "department" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <Button
            size="small"
            onClick={() => handleEdit(params.data._id)}
            style={{ marginRight: 5 }}
            type="primary"
          >
            Edit
          </Button>
          <Button
            size="small"
            onClick={() => handleDelete(params.data._id)}
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>

      <Button
        type="primary"
        style={{ marginBottom: "15px" }}
        onClick={() => navigate("/add-employee")}
      >
        Add Employee
      </Button>

      <div
        className="ag-theme-alpine"
        style={{
          height: "400px",
          width: "950px",
          marginTop: "20px",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={employees}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default EmployeeList;
