import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, default: "Medium" },
    link: { type: String, required: true }, // URL to external quiz or internal route
  },
  { timestamps: true }
);

export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
