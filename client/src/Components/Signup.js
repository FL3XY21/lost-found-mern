import React, { useState } from "react";
import { Formik, Form } from "formik";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Typography,
  Button,
  Stack,
  Divider,
  TextField,
  Avatar,
} from "@mui/material";

function Signup() {
  const [image, setImage] = useState(null);

  // handle image preview (no Firebase, only preview)
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // submit signup to Node.js backend
  const handleSubmit = async (values) => {
    try {
      const payload = {
        nickname: values.nickname,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      };

      const response = await axios.post(
        "https://lost-found-mern-pivc.onrender.com/users/create",
        payload
      );

      if (response.data === "Done" || response.status === 200) {
        toast.success("Signup successful!");
        window.location.href = "/log-in";
      } else {
        toast.error("Signup failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error!");
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      gap="20px"
      pt="10px"
    >
      {/* Header */}
      <Stack
        direction="row"
        width="100%"
        sx={{ backgroundColor: "primary.main" }}
        height="125px"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h5" color="white">
          Welcome On Board!
        </Typography>
      </Stack>

      {/* Form Section */}
      <Stack mt={3} direction="row">
        {/* Left Image */}
        <Stack width="50%" display={{ xs: "none", md: "flex" }}>
          <img
            width="100%"
            src="https://i.ibb.co/G2k63ys/login-1.png"
            alt="img"
          />
        </Stack>

        {/* Signup Form */}
        <Stack width={{ xs: "100%", md: "400px" }} margin="0 auto">
          <Formik
            initialValues={{
              nickname: "",
              fullname: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <Stack gap="10px">

                  <Typography variant="h5">
                    <b>Sign Up</b>
                  </Typography>

                  {/* Image Preview */}
                  <Stack alignItems="center">
                    <Avatar
                      src={image ? URL.createObjectURL(image) : ""}
                      sx={{ width: "6rem", height: "6rem" }}
                    />

                    <Button
                      variant="contained"
                      component="label"
                      endIcon={<PhotoCamera />}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </Stack>

                  {/* Nickname */}
                  <TextField
                    name="nickname"
                    label="Nickname"
                    value={values.nickname}
                    onChange={handleChange}
                    required
                  />

                  {/* Fullname */}
                  <TextField
                    name="fullname"
                    label="Full Name"
                    value={values.fullname}
                    onChange={handleChange}
                    required
                  />

                  {/* Email */}
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />

                  {/* Password */}
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />

                  {/* Submit Button */}
                  <Button type="submit" variant="contained">
                    Sign Up
                  </Button>

                </Stack>
              </Form>
            )}
          </Formik>

          <Divider sx={{ margin: "1rem 0" }} />

          <Stack direction="row" gap="10px">
            <Typography>Already have an account?</Typography>
            <Typography component={Link} to="/log-in">
              Login
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Signup;
