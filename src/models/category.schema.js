import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
    tax_applicable: {
      type: Boolean,
      required: true,
      default: false,
    },
    tax: {
      type: Number,
      default: 0,
    },
    tax_type: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
