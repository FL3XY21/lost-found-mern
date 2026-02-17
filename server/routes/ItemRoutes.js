import express from 'express'
import upload from "../middlewares/upload.js";
import { createItem } from '../controllers/Items/CreateItem.js'
import Item from "../models/Item.js";

import { validateJWT } from '../middlewares/validateToken.js'
import getAllItems from '../controllers/Items/getAllItems.js'
import getItemById from '../controllers/Items/getItemById.js'
import updateItem from '../controllers/Items/updateItem.js'
import deleteItem from '../controllers/Items/deleteItem.js'
const router = express.Router()
router.post("/newItem", upload.single("image"), createItem);
router.post('/newItem',validateJWT, createItem)
router.get('/:id', getItemById)
router.get('/', getAllItems)
router.put('/update/:id',validateJWT, updateItem)
router.delete('/delete/:id', deleteItem)
router.put("/resolve/:id", async (req, res) => {

  try {

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.status = "resolved";

    await item.save();

    res.json({ message: "Item resolved" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});

export default router
