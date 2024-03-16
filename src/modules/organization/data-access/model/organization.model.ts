import mongoose, { Document } from "mongoose";
import  { IWorkspace, workspaceSchema } from "../../../workspace/data-access/model/workspace.model";

export interface IOrganization extends Document {
  name: string;
  description: string;
  email: string;
  phone: string;
  workspaces: IWorkspace[];
}

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  workspaces: [workspaceSchema],
}, {
    timestamps: true,
});

const Organization = mongoose.model<IOrganization>(
  "Organization",
  organizationSchema
);

export default Organization;
