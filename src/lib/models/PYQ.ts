import mongoose from 'mongoose';

const StructuredQuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  marks: { type: Number },
  repeatCount: { type: Number, default: 1 }, // Used for "Repeated 3+ times" badge
  isImportant: { type: Boolean, default: false }
});

const PYQSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "End-Sem 2023 - OS"
  subject: { type: String, required: true },
  universityName: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  year: { type: Number, required: true },
  questionType: { type: String, enum: ['end-sem', 'mid-sem'], required: true },
  
  // PDF Support
  fileUrl: { type: String },
  
  // Structured Text Questions Support
  structuredQuestions: [StructuredQuestionSchema],
  
  downloadCount: { type: Number, default: 0 }
}, { timestamps: true });

export const PYQ = mongoose.models.PYQ || mongoose.model('PYQ', PYQSchema);
