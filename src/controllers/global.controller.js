import { searchEverythingService } from "../services/global.service";
import { CustomTryCatch } from "../utils/CustomTryCatch";

export const SearchEverything = CustomTryCatch(async (req, res) => {
  const { query } = req.query;
  const results = await searchEverythingService(query);

  res.status(200).json({
    success: true,
    message: "Search results fetched successfully",
    data: results,
  });
});