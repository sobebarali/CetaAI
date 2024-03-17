import mongoose, { Document } from "mongoose";

export interface IWorkspace extends Document {
  name: string;
  description: string;
  owner: string;
  members: string[];
  createdBy: string;
  updatedBy: string;
}

export const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    default: "",
  },
  owner: {
    type: String,
    required: true,
  },
  members: [String],
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
  },
}, {
    timestamps: true,
});
