import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let regobj = { name, email, password };
    console.log("Form submitted. Data:", regobj);

    fetch("http://localhost:8000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Signup Successful");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Failed: " + err.message);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        bgcolor="white"
        p={3}
        borderRadius={2}
        boxShadow={3}
        maxWidth={400}
        width="100%"
      >
        <TextField
          label="Name"
          placeholder="Enter Name"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          placeholder="Enter Email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
