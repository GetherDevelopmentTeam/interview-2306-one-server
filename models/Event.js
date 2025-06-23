const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    date: { type: Date, required: true },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
eventSchema.virtual("formattedDate").get(function () {
  return this.date.toISOString().split("T")[0];
});

module.exports = mongoose.model("Event", eventSchema);
