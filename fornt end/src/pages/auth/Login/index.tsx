import Container from "@mui/material/Container";
import { Col, Form, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  errorToast,
  successToast,
 
} from "../../../services/toaster.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginSubmitHandler = async (e: any) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        data
      );

      if (response.data.status) {
        navigate("/home");
        successToast(response.data.message);
      }
    } catch (error: any) {
      errorToast(error.response.data.error);
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6}>
          <h1>Login</h1>
          <Form onSubmit={loginSubmitHandler}>
            <TextField
              id="email"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Email"
              placeholder="Enter email here"
              autoFocus
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
              autoFocus
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="contained">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
