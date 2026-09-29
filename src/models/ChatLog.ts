import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
}, { _id: false });

const ChatLogSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous' },
  subject: { type: String, required: true },
  messages: { type: [MessageSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ChatLog = mongoose.models.ChatLog || mongoose.model('ChatLog', ChatLogSchema);
