import React, { useState, useEffect } from "react";
import { setConstraint } from "../constraints";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactsIcon from "@mui/icons-material/Contacts";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import Axios from "axios";

import {
  Modal,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import { Carousel } from "react-carousel-minimal";
import { MdDateRange } from "react-icons/md";
import { GrMap } from "react-icons/gr";

const BASE_URL = "https://lost-found-mern-pivc.onrender.com";

function ItemPage() {

  const [item, setItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);

  const item_id = queryParams.get("cid");

  const current_user =
    queryParams.get("type")?.split("/")[1] || "false";

  setConstraint(true);

  // =============================
  // CLAIM FUNCTION (FIXED)
  // =============================

  const handleClaim = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !item) {
      toast.error("Login required");
      return;
    }

    try {

      await Axios.post(`${BASE_URL}/claims/create`, {
        itemId: item._id,
        claimedBy: user._id,
      });

      toast.success("Claim submitted successfully");

    } catch (error) {

      console.log(error);
      toast.error("Error submitting claim");

    }

  };

  // =============================
  // REPORT FUNCTION (FIXED)
  // =============================

  const handleReport = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !item) {
      toast.error("Login required");
      return;
    }

    try {

      await Axios.post(`${BASE_URL}/reports/create`, {
        itemId: item._id,
        reportedBy: user._id,
        reason: "Suspicious item",
      });

      toast.success("Report submitted");

    } catch (error) {

      console.log(error);
      toast.error("Error reporting item");

    }

  };

  // =============================
  // FETCH ITEM
  // =============================

  useEffect(() => {

    if (!item_id) return;

    axios
      .get(`${BASE_URL}/items/${item_id}`)
      .then((response) => {

        const data = response.data.item;

        if (!data) return;

        setItem(data);

        // slides
        let slides = [];

        if (data.img && data.img.length > 0) {
          data.img.forEach((img) => {
            slides.push({
              image: `${BASE_URL}/uploads/${img}`,
            });
          });
        }

        const itemDetailsJSX = (

          <>
            <Stack px={5} gap="30px">

              {/* CAROUSEL */}

              <Carousel
                data={slides}
                height="270px"
                radius="10px"
                dots={false}
                automatic={false}
                slideBackgroundColor="#dbdbdb"
                slideImageFit="contain"
              />

              {/* USER */}

              <Stack
                direction="row"
                border="solid 2px"
                borderColor="primary.main"
                borderRadius="10px"
                p="10px"
                alignItems="center"
                gap="15px"
              >

                <Avatar
                  src={
                    data?.userId?.img?.length
                      ? `${BASE_URL}/uploads/${data.userId.img[0]}`
                      : ""
                  }
                  sx={{ width: 100, height: 100 }}
                />

                <Typography fontWeight="bold">
                  {data?.userId?.fullname || "Unknown"}
                </Typography>

              </Stack>

              {/* BUTTONS */}

              {current_user === "true" ? (

                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  onClick={() => setShowDelete(true)}
                >
                  Delete Post
                </Button>

              ) : (

                <>
                  <Button
                    startIcon={<ContactsIcon />}
                    variant="contained"
                    onClick={() => setShowContact(true)}
                  >
                    Contact
                  </Button>

                  <Stack direction="row" spacing={2}>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleClaim}
                    >
                      Claim Item
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleReport}
                    >
                      Report Item
                    </Button>

                  </Stack>

                </>

              )}

              {/* DESCRIPTION */}

              <Typography fontWeight="bold">
                Description:
              </Typography>

              <Typography>
                {data.description}
              </Typography>

              {/* DATE */}

              <Stack direction="row" gap="10px">

                <MdDateRange />

                <Typography>
                  {data.date}
                </Typography>

              </Stack>

              {/* LOCATION */}

              <Stack direction="row" gap="10px">

                <GrMap />

                <Typography>
                  {data.location}
                </Typography>

              </Stack>

            </Stack>
          </>
        );

        setItemDetails(itemDetailsJSX);

      })
      .catch(console.log);

  }, [item_id]);

  // =============================
  // DELETE
  // =============================

  const delete_item = async () => {

    try {

      await axios.delete(`${BASE_URL}/items/delete/${item_id}`);

      toast.success("Item deleted");

      window.location.href = "/mylistings";

    } catch (error) {

      console.log(error);

    }

  };

  // =============================
  // UI
  // =============================

  return (

    <>
      <Stack alignItems="center">

        <Stack
          width="100%"
          height="125px"
          bgcolor="primary.main"
          justifyContent="center"
          alignItems="center"
        >

          <Typography color="white" fontSize="25px">
            {item?.type} Item
          </Typography>

          <Typography color="white" fontSize="20px">
            {item?.name}
          </Typography>

        </Stack>

        {itemDetails}

      </Stack>

      {/* DELETE MODAL */}

      <Modal open={showDelete} onClose={() => setShowDelete(false)}>

        <Stack
          bgcolor="white"
          p={5}
          alignItems="center"
          gap={2}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >

          <Typography>
            Are you sure?
          </Typography>

          <Button onClick={delete_item}>
            Yes
          </Button>

        </Stack>

      </Modal>

      {/* CONTACT MODAL */}

      <Modal open={showContact} onClose={() => setShowContact(false)}>

        <Stack
          bgcolor="white"
          p={5}
          alignItems="center"
          gap={2}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >

          <Typography>
            Contact: {item?.number}
          </Typography>

        </Stack>

      </Modal>

    </>
  );

}

export default ItemPage;
