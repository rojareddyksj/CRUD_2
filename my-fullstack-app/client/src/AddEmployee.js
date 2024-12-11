import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const newEmployee = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      department: values.department,
    };

    axios
      .post("http://localhost:5000/api/employees", newEmployee)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "300px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "600",
          color: "#333",
          width: "50%",
        }}
      >
        Add Employee
      </h2>
      <Form
        name="addEmployee"
        onFinish={handleSubmit}
        layout="vertical"
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "The input is not a valid E-mail!" },
          ]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input the phone number!" },
          ]}
        >
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ borderRadius: "5px" }}
          />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Please input the department!" }]}
        >
          <Input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{ borderRadius: "5px" }}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "30%",
              borderRadius: "5px",
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
            }}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmployee;
