import { FormInstance } from "antd";

export interface IRefreshTokenProps {
  refreshToken: string;
  token: string;
}

export interface IAuthDets {
  // TO DO
  // To properly define the user object regardless of role
  user: {
    avatarUrl?: string;

    email: string;
    fullName: string;
    id: number;
    isOwner: boolean;
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
    roleId: number;
    status: string; // suppose be 'confirmed' n all
    companyId: number;
    designationId?: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    departmentId?: number;
    company: {
      id: number;
      name: string;
      label: string;
      email: string;
      phoneNumber: string;
      isParent: true;
      isActive: true;
      color: string;
      industryId: 2;
      userId: number;
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

export interface ICreateCompProps {
  name: string;
  email: string;
  phoneNumber: string;
  industryId: number;
  customerFullName: string;
  password: string;
  confirmPassword: string;
}

export interface IVerifyUserProps {
  token: string;
  uid: string;
  email?: string;
}

export interface ICreateEmpProps {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
}

export interface IForgotPasswordProps {
  email: string;
}

export interface ICreateCompSocialAuthProps {
  name: string;
  phoneNumber: string;
  industryId: number;
  token: string;
}

export interface IResetUserPProps {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
}
export interface IUserLoginProps {
  emailOrEmpUid: string;
  password: string;
}

export interface ILoginProps {
  autoLoginDetails?: {
    email: string;
    password: string;
  };
}

export interface stepperInputProps {
  onFinished: any;
  initialValues: any;
  setCurrent?: any;
  email?: string;
  isLoading?: boolean;
  form?: FormInstance<any>;
}

export interface ICreateInvitedEmpProps {
  token: string;
  uid: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  personalInformation: {
    dob: string;
    gender: string;
    phoneNumber: string;
    eligibility: string;
    maritalStatus: string;
    nationality: string;
    address: {
      streetAddress: string;
      countryId: number;
      stateId: number;
      lgaId: number;
      timezone?: string;
    };
    passportExpirationDate?: string;
    validDocumentUrl?: string;
  };
}
