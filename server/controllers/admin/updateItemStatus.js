import Item from "../../models/Item.js";

export const updateItemStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    item.status = status;

    await item.save();

    res.json({
      success: true,
      message: "Status updated",
      item
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};
