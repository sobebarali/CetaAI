import Organization, { IOrganization } from "../model/organization.model";

export const createOrganization = async (
  organizationData: Partial<IOrganization>
): Promise<IOrganization> => {
  return await Organization.create(organizationData )
};

export const findAllOrganizations = async (): Promise<IOrganization[]> => {
  return await Organization.find();
};

export const findOrganizationById = async (
  id: string
): Promise<IOrganization | null> => {
  return await Organization.findById(id);
};

export const updateOrganization = async (
  id: string,
  organizationData: Partial<IOrganization>
): Promise<IOrganization | null> => {
  return await Organization.findByIdAndUpdate(id, organizationData, {
    new: true,
  });
};

export const deleteOrganization = async (
  id: string
): Promise<IOrganization | null> => {
  return await Organization.findByIdAndDelete(id);
};