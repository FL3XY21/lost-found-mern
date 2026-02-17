import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React, { useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Container,
  Paper,
  Button,
  Typography,
  Stack,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const LostItem = () => {

  const usertoken = window.localStorage.getItem("token");

  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user._id : null;
  };

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Validation schema
  const schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Item type is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Phone number is required'),
  });

  // Submit form
  const handleSubmit = async (values) => {

    try {

      await schema.validate(values, { abortEarly: false });

      setLoading(true);

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("location", values.location);
      formData.append("date", values.date);
      formData.append("number", values.number);
      formData.append("userId", getUserId());

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "http://localhost:5000/Items/newItem",
        formData,
        {
          headers: {
            token: usertoken,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Item listed successfully!");

      setLoading(false);

      window.location.href = "/mylistings";

    } catch (error) {

      console.error(error);

      toast.error("Error creating item");

      setLoading(false);

    }
  };

  return (

    <Stack width="100%" pt="60px" alignItems="center">

      <Typography fontSize="30px" mb={3}>
        If your item is lost or you found someone's item, Post it Here!
      </Typography>

      <Formik
        initialValues={{
          name: '',
          description: '',
          type: '',
          location: '',
          date: '',
          number: '',
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >

        {({ values, handleChange }) => (

          <Container maxWidth="sm">

            <Paper sx={{ p: 4 }}>

              <Form>

                {/* Upload Image */}
                <Stack mb={2}>
                  <Button
                    variant="contained"
                    component="label"
                    endIcon={<PhotoCamera />}
                  >
                    Upload Image
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>

                  {image && (
                    <Typography variant="body2" mt={1}>
                      Selected: {image.name}
                    </Typography>
                  )}
                </Stack>

                {/* Name */}
                <TextField
                  fullWidth
                  margin="normal"
                  name="name"
                  label="Item name"
                  value={values.name}
                  onChange={handleChange}
                />

                {/* Description */}
                <TextField
                  fullWidth
                  margin="normal"
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                />

                {/* Location */}
                <TextField
                  fullWidth
                  margin="normal"
                  name="location"
                  label="Location"
                  value={values.location}
                  onChange={handleChange}
                />

                {/* Date */}
                <TextField
                  fullWidth
                  margin="normal"
                  name="date"
                  label="Date"
                  value={values.date}
                  onChange={handleChange}
                />

                {/* Phone */}
                <TextField
                  fullWidth
                  margin="normal"
                  name="number"
                  label="Phone"
                  value={values.number}
                  onChange={handleChange}
                />

                {/* Type */}
                <FormControl fullWidth margin="normal">

                  <InputLabel>Item Type</InputLabel>

                  <Select
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="Lost">Lost</MenuItem>
                    <MenuItem value="Found">Found</MenuItem>
                  </Select>

                </FormControl>

                {/* Submit */}
                <motion.div whileTap={{ scale: 0.95 }}>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? "Uploading..." : "Create Post"}
                  </Button>

                </motion.div>

              </Form>

            </Paper>

          </Container>

        )}

      </Formik>

    </Stack>
  );
};

export default LostItem;
