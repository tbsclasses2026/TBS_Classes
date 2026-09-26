import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  semester: string;
  branch: string;
  createdAt: Date;
}

const SubjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    semester: { type: String, required: true },
    branch: { type: String, required: true },
  },
  { timestamps: true }
);

export const Subject = models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
