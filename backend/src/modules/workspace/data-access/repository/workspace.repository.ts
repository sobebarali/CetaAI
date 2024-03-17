import Organization, { IOrganization } from "../../../organization/data-access/model/organization.model";
import { IWorkspace } from "../model/workspace.model";

export const addWorkspace = async (
  organizationId: string,
  workspaceData: Partial<IWorkspace>
): Promise<IOrganization | null> => {
  return await Organization.findByIdAndUpdate(
    organizationId,
    { $push: { workspaces: workspaceData } },
    { new: true }
  );
};

export const removeWorkspace = async (
  organizationId: string,
  workspaceId: string
): Promise<IOrganization | null> => {
  return await Organization.findByIdAndUpdate(
    organizationId,
    { $pull: { workspaces: { _id: workspaceId } } },
    { new: true }
  );
};

export const updateWorkspace = async (
  organizationId: string,
  workspaceId: string,
  workspaceData: Partial<IWorkspace>
): Promise<IOrganization | null> => {
  return await Organization.findOneAndUpdate(
    { _id: organizationId, "workspaces._id": workspaceId },
    { $set: { "workspaces.$": workspaceData } },
    { new: true }
  ).exec()
};


export const getWorkspace = async (
    organizationId: string,
    workspaceId: string
): Promise<IWorkspace | null> => {
    const organization = await Organization.findById(organizationId);
    if (!organization) return null;
    const workspace = organization.workspaces.find(
        (workspace) => workspace._id.toString() === workspaceId
    );
    return workspace || null;
};
