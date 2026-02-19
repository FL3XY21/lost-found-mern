import Report from "../../models/Report.js";

const getReports = async (req, res) => {

  try {

    const reports = await Report.find()
      .populate("itemId")
      .populate("reportedBy");

    res.json(reports);

  }
  catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error fetching reports" });

  }

};

export default getReports;
