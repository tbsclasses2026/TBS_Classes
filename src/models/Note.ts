import mongoose, { Schema, Document, models } from 'mongoose';

export interface INote extends Document {
  subjectId: mongoose.Types.ObjectId;
  title: string;
  type: 'Notes' | 'PYQ' | 'Important Questions';
  fileUrl: string;
  unitNumber?: number;
  downloadCount: number;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['Notes', 'PYQ', 'Important Questions'], required: true },
    fileUrl: { type: String, required: true },
    unitNumber: { type: Number },
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Note = models.Note || mongoose.model<INote>('Note', NoteSchema);
