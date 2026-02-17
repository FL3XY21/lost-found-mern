import Item from "../../models/Item.js";
import mongoose from "mongoose";

export const createItem = async (req, res) => {

  try {

    console.log("Received item:", req.body);

    const newItem = new Item({

      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      location: req.body.location,
      date: req.body.date,
      number: req.body.number,

      // convert string to ObjectId
      userId: new mongoose.Types.ObjectId(req.body.userId),

      // img must be array because schema requires array
      img: req.file ? [req.file.filename] : []


    });

    const savedItem = await newItem.save();

    console.log("Item saved:", savedItem);

    res.status(201).json(savedItem);

  } catch (error) {

    console.log("Error saving item:", error);

    res.status(500).json(error.message);

  }

};
