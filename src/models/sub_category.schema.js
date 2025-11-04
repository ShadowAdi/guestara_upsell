import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
      default: null, 
    },
    tax: {
      type: Number,
      default: null, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("SubCategory", subCategorySchema);
