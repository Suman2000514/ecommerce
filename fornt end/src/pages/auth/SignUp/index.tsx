import React, { useState } from "react";
import Container from "@mui/material/Container";
import { Col, Form, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../services/toaster.service";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      warningToast("Password and confirm password must be the same");
    } else {
      const data = {
        name,
        password,
        email,
      };
      try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/register", data);

        if (response.data.status) {
          navigate("/");
          successToast(response.data.message);
        }
      } catch (error) {
        errorToast(error.response.data.error);
      }
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6}>
          <h1>Sign Up</h1>
          <Form onSubmit={registerSubmitHandler}>
            <TextField
              id="name"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Name"
              placeholder="Enter name here"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Email"
              placeholder="Enter email here"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Password"
              placeholder="Enter password here"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="confirm-password"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Confirm Password"
              placeholder="Enter password again"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
