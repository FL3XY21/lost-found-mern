import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import { motion } from 'framer-motion'
import { FcAbout } from 'react-icons/fc';
import { FcOvertime } from 'react-icons/fc';

import { Link } from 'react-router-dom'
import {
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Pagination,
} from '@mui/material'

import Axios from "axios";

const BASE_URL = "https://lost-found-mern-pivc.onrender.com";

const Paginationn = ({ page, setPage, max }) => {

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Pagination
      sx={{ pt: "80px" }}
      count={Math.ceil(max)}
      page={page}
      onChange={handleChange}
      showLastButton
      showFirstButton
    />
  );
};

export default function Feed() {

  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user : null;
  };

  const user_info = getUserId();

  setConstraint(true);

  const [item, setitem] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {

    Axios.get(`${BASE_URL}/items`)
      .then((response) => {

        const allitems = response.data.items.reverse();

        const itemsPerPage = 9;

        const numItems = allitems.length;

        setMaxPages(Math.ceil(numItems / itemsPerPage));

        const startIndex = (page - 1) * itemsPerPage;

        const endIndex = startIndex + itemsPerPage;

        const data = allitems.slice(startIndex, endIndex);

        let items = [];

        data.forEach((item) => {

          if (!user_info || item.userId !== user_info._id) return;

          const created_date = new Date(item.createdAt);

          const createdAt =
            created_date.getDate() +
            "/" +
            (created_date.getMonth() + 1) +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();

          // FIXED IMAGE URL HERE
          const imageUrl =
            item.img && item.img.length > 0
              ? `${BASE_URL}/uploads/${item.img[0]}`
              : "";

          items.push(

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              key={item._id}
            >

              <Card
                sx={{
                  width: '270px',
                  height: '400px',
                  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
                }}
              >

                <CardContent>

                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      backgroundColor: '#9CC0DF',
                      height: '200px',
                      borderRadius: '8px',
                    }}
                  >

                    <Avatar
                      src={imageUrl}
                      sx={{
                        width: '170px',
                        height: '170px',
                      }}
                    />

                  </Stack>
<Button
  variant="contained"
  color="success"
  sx={{ mt: 1 }}
  onClick={async () => {

    await Axios.put(
      `https://lost-found-mern-pivc.onrender.com/items/resolve/${item._id}`
    );

    window.location.reload();

  }}
>
  Mark as Resolved
</Button>

                  <Stack p="11px" gap="11px">

                    <Typography fontSize="22px" fontWeight="bold">
                      {item.name}
                    </Typography>

                    <Stack direction="row" gap="10px">
                      <FcAbout size={22} />

                      <Typography fontSize="15px">
                        {item.description.slice(0, 30)}...
                      </Typography>

                    </Stack>

                    <Stack direction="row" gap="10px">
                      <FcOvertime size={22} />

                      <Typography fontSize="15px">
                        {createdAt}
                      </Typography>

                    </Stack>

                    <motion.div whileTap={{ scale: 0.95 }}>

                      <Button
                        component={Link}
                        to={`/${item.name}?cid=${item._id}&type=${item.type}/true`}
                        variant="contained"
                      >
                        More Details
                      </Button>

                    </motion.div>

                  </Stack>

                </CardContent>

              </Card>

            </motion.div>

          );

        });

        setitem(items);

      })
      .catch((err) => {

        console.log("Error :", err);

      });

  }, [page]);

  return (

    <>
      <Stack
        direction="row"
        width="100%"
        sx={{ backgroundColor: 'primary.main' }}
        height="125px"
        alignItems="center"
        justifyContent="center"
      >

        <Typography fontSize="23px" color="white" fontWeight="bold">

          Here you can find your posted Items, {user_info?.nickname}

        </Typography>

      </Stack>

      <Stack
        pt="20px"
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        gap="24px"
      >

        {item}

      </Stack>

      <Paginationn page={page} setPage={setPage} max={maxPages} />

    </>

  );
}
