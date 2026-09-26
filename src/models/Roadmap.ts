import mongoose from "mongoose";

const RoadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true }, // URL to roadmap image, pdf, or external page
  },
  { timestamps: true }
);

export const Roadmap = mongoose.models.Roadmap || mongoose.model("Roadmap", RoadmapSchema);
