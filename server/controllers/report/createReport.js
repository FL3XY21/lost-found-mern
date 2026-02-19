import Report from "../../models/Report.js";

const createReport = async (req, res) => {

  try {

    const { itemId, reportedBy, reason } = req.body;

    const report = new Report({
      itemId,
      reportedBy,
      reason
    });

    await report.save();

    res.status(201).json({
      message: "Report submitted",
      report
    });

  }
  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

export default createReport;
