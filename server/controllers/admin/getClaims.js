import Claim from "../../models/Claim.js";

const getClaims = async (req, res) => {

  try {

    const claims = await Claim.find()
      .populate("itemId")
      .populate("claimedBy");

    res.json(claims);

  }
  catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error fetching claims" });

  }

};

export default getClaims;
