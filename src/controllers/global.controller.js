import { searchEverythingService } from "../services/global.service.js";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";

export const SearchEverything = CustomTryCatch(async (req, res) => {
  const { query } = req.query;
  const results = await searchEverythingService(query);

  res.status(200).json({
    success: true,
    message: "Search results fetched successfully",
    data: results,
  });
});