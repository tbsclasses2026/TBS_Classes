import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false }, // Will be empty for OAuth users
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  
  // Extra fields for students
  branch: { type: String },
  semester: { type: String },
  collegeName: { type: String },
  
  // Dashboard stats
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  
  // Bookmarks
  bookmarkedPYQs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PYQ' }]
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
