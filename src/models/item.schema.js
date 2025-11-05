import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null, 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    tax_applicable: {
      type: Boolean,
      default: false,
    },
    tax: {
      type: Number,
      default: 0,
    },
    base_amount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
