import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import { updateItemStatus } from "../controllers/admin/updateItemStatus.js";

import User from "../models/User.js";
import Item from "../models/Item.js";

const router = express.Router();


// Get all users
router.get("/users", adminAuth, async (req, res) => {

  const users = await User.find();

  res.json(users);

});


// Get all items
router.get("/items", adminAuth, async (req, res) => {

  const items = await Item.find();

  res.json(items);

});


// Delete user
router.delete("/user/:id", adminAuth, async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json("User deleted");

});


// Delete item
router.delete("/item/:id", adminAuth, async (req, res) => {

  await Item.findByIdAndDelete(req.params.id);

  res.json("Item deleted");

});
router.put("/item/:id/status", updateItemStatus);


export default router;
