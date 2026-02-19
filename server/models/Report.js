import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },

  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reason: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "reviewed"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Report = mongoose.model("Report", reportSchema);

export default Report;
