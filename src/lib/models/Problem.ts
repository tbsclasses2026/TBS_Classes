import mongoose from 'mongoose';

const TestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isHidden: { type: Boolean, default: false },
});

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  starterCode: {
    type: Map,
    of: String, // Language -> Starter Code
    default: {}
  },
  testCases: [TestCaseSchema]
}, { timestamps: true });

export const Problem = mongoose.models.Problem || mongoose.model('Problem', ProblemSchema);
