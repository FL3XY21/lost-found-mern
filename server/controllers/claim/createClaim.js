import Claim from "../../models/Claim.js";
import Item from "../../models/Item.js";

const createClaim = async (req, res) => {

  try {

    const { itemId, claimedBy } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    const claim = new Claim({
      itemId,
      claimedBy,
      itemOwner: item.userId
    });

    await claim.save();

    res.status(201).json({
      message: "Claim created successfully",
      claim
    });

  }
  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

export default createClaim;
