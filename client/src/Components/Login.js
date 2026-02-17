import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";

import {
  Typography,
  Button,
  Stack,
  Divider,
  TextField,
} from "@mui/material";

function Login() {

  // FIX: define missing states
  const [loading, setloading] = useState(false);



  function login(values) {

    setloading(true);

    const payload = {
      email: values.email,
      password: values.password,
    };


    // STATIC ADMIN LOGIN
    if (
      values.email === "admin@lostfound.com" &&
      values.password === "123"
    ) {

      const adminUser = {
        _id: "admin123",
        nickname: "Administrator",
        email: "admin@lostfound.com",
        role: "admin"
      };

      localStorage.setItem("token", "admin-token");
      localStorage.setItem("user", JSON.stringify(adminUser));

      toast.success("Admin login successful!");

      window.location.href = "/admin";

      return;
    }


    // NORMAL USER LOGIN
    axios.post("http://localhost:5000/users/login", payload)

    .then((response) => {

      if (response.data.ok) {

        const user = response.data.user;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Logged In Successfully!");

        

        // ROLE BASED REDIRECT
        if (user.role === "admin") {

          window.location.href = "/admin";

        } else {

          window.location.href = "/";
        }

      } else {

        

        setloading(false);

      }

    })

    .catch((error) => {

      console.log(error);

      toast.error("Login failed");

      setloading(false);

    });

  }


  return (

    <Stack justifyContent="center" alignItems="center" width="100%" pt="20px">

      <Stack
        direction="row"
        width="100%"
        sx={{ backgroundColor: 'primary.main' }}
        height="125px"
        alignItems="center"
        justifyContent="center"
      >

        <Typography variant="h5" color="white">
          Welcome Back!
        </Typography>

      </Stack>


      <Stack direction="row" mt={3}>

        <Stack width="50%" display={{ xs: 'none', md: 'flex' }}>
          <img
            width="100%"
            src="https://i.ibb.co/G2k63ys/login-1.png"
            alt="login"
          />
        </Stack>


        <Stack width="400px">

          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={login}
          >

          {({ values, handleChange }) => (

            <Form>

              <Stack gap={2}>

                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  Login
                </Button>

              </Stack>

            </Form>

          )}

          </Formik>


          <Divider sx={{ my: 2 }} />


          <Typography>

            Don't have account?

            <Link to="/sign-up">
              Sign Up
            </Link>

          </Typography>


        </Stack>

      </Stack>

    </Stack>

  );

}

export default Login;
