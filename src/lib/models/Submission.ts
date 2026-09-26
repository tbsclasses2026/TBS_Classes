import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  userId: { type: String, required: true }, // Simple string since we don't have full auth yet
  language: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Error'], required: true },
  output: { type: String }
}, { timestamps: true });

export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
