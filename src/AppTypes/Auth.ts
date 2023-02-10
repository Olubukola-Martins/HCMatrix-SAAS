export interface IAuthDets {
  // TO DO
  // To properly define the user object regardless of role
  user: {
    avatarUrl?: string;

    email: string;
    fullName: string;
    id: number;
    isAdmin: boolean;
    isSocial: boolean;
    isVerified: boolean;
    lastLogin: string;
  };
  userToken: string;

  companies: {
    avatarUrl?: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    hasSelfService: true;
    empUid: string;
    roleId: 1;
    status: string; // suppose be 'confirmed' n all
    companyId: 1;
    designationId?: number;
    userId: 1;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    departmentId?: number;
    company: {
      id: 1;
      name: string;
      label: string;
      email: string;
      phoneNumber: string;
      isParent: true;
      isActive: true;
      color: string;
      industryId: 2;
      userId: 1;
      addressId?: string;
      logoUrl?: string;
      website?: string;
      parentId: number;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string;
    };
    role: {
      id: number;
      name: string;
      companyId: number;
      createdAt: string;
      updatedAt: string;
      permissions: [
        {
          id: number;
          permissionId: number;
          roleId: string;
          createdAt: string;
          updatedAt: string;
          permission: {
            id: number;
            name: string;
            label: string;
            categoryId: number;
            description?: string;
            createdAt: string;
            updatedAt: string;
          };
        }
      ];
    };
  }[];
}
