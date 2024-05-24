import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const validate = () => {
    let isValid = true;
    if (email === "" || email === null) {
      isValid = false;
      toast.warning("Please Enter Email");
    }
    if (password === "" || password === null) {
      isValid = false;
      toast.warning("Please Enter Password");
    }
    return isValid;
  };

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      const inputObj = { email, password };
      fetch("http://localhost:8000/user/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputObj),
      })
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Login failed, invalid credentials");
          } else {
            toast.success("Success");
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("jwttoken", resp.jwtToken);
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to: " + err.message);
        });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="40vh"
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={ProceedLoginusingAPI}
        bgcolor="white"
        p={3}
        borderRadius={2}
        boxShadow={3}
        maxWidth={400}
        width="100%"
      >
        <TextField
          label="Email"
          placeholder="Enter Email"
          fullWidth
          required
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Sign in
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
