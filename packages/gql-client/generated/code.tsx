import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum EContentType {
  Doc = 'Doc',
  Docx = 'Docx',
  Gif = 'Gif',
  Jpeg = 'Jpeg',
  Mp3 = 'Mp3',
  Mp4 = 'Mp4',
  Mpeg = 'Mpeg',
  Odp = 'Odp',
  Ods = 'Ods',
  Odt = 'Odt',
  Pdf = 'Pdf',
  Png = 'Png',
  Ppt = 'Ppt',
  Pptx = 'Pptx',
  Quicktime = 'Quicktime',
  Rar = 'Rar',
  Rtf = 'Rtf',
  Tar = 'Tar',
  Txt = 'Txt',
  Wav = 'Wav',
  Xls = 'Xls',
  Xlsx = 'Xlsx',
  Zip = 'Zip'
}

export enum EImageExtension {
  Gif = 'Gif',
  Jpeg = 'Jpeg',
  Jpg = 'Jpg',
  Png = 'Png'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserEntity;
  deleteUser: Scalars['String']['output'];
  getUserAvatarSignedUrl: Scalars['String']['output'];
  login: UserEntity;
  logout: Scalars['Boolean']['output'];
  setUserAvatar: UserEntity;
  updateUser: UserEntity;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  emailVerified: Scalars['Boolean']['input'];
  firmId: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationGetUserAvatarSignedUrlArgs = {
  ext: EImageExtension;
  hash: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getS3ContentTypes: Array<EContentType>;
  getUser: UserEntity;
  getUsers: Array<UserEntity>;
  me: UserEntity;
};


export type QueryGetUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUsersArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastLogin: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type UserFragment = { __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean };

export type GetUsersQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firmId: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  emailVerified: Scalars['Boolean']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean } };

export type UpdateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean } };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetUserAvatarSignedUrlMutationVariables = Exact<{
  hash: Scalars['String']['input'];
  ext: EImageExtension;
}>;


export type GetUserAvatarSignedUrlMutation = { __typename?: 'Mutation', getUserAvatarSignedUrl: string };

export type SetUserAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type SetUserAvatarMutation = { __typename?: 'Mutation', setUserAvatar: { __typename?: 'UserEntity', id: string, firstName: string, lastName: string, avatar?: string | null, email: string, emailVerified: boolean } };

export const UserFragmentDoc = gql`
    fragment user on UserEntity {
  id
  firstName
  lastName
  avatar
  email
  emailVerified
}
    `;
export const GetUsersDocument = gql`
    query GetUsers($take: Int!, $skip: Int!, $search: String) {
  getUsers(take: $take, skip: $skip, search: $search) {
    ...user
  }
}
    ${UserFragmentDoc}`;

export const GetUsersComponent = (props: Omit<Urql.QueryProps<GetUsersQuery, GetUsersQueryVariables>, 'query'> & { variables: GetUsersQueryVariables }) => (
  <Urql.Query {...props} query={GetUsersDocument} />
);


export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables>({ query: GetUsersDocument, ...options });
};
export const GetUserDocument = gql`
    query getUser($userId: String!) {
  getUser(userId: $userId) {
    ...user
  }
}
    ${UserFragmentDoc}`;

export const GetUserComponent = (props: Omit<Urql.QueryProps<GetUserQuery, GetUserQueryVariables>, 'query'> & { variables: GetUserQueryVariables }) => (
  <Urql.Query {...props} query={GetUserDocument} />
);


export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $firmId: String!, $password: String!, $firstName: String!, $lastName: String!, $emailVerified: Boolean!) {
  createUser(
    email: $email
    firmId: $firmId
    firstName: $firstName
    lastName: $lastName
    password: $password
    emailVerified: $emailVerified
  ) {
    ...user
  }
}
    ${UserFragmentDoc}`;

export const CreateUserComponent = (props: Omit<Urql.MutationProps<CreateUserMutation, CreateUserMutationVariables>, 'query'> & { variables?: CreateUserMutationVariables }) => (
  <Urql.Mutation {...props} query={CreateUserDocument} />
);


export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($email: String!, $id: String!, $firstName: String!, $lastName: String!, $password: String) {
  updateUser(
    id: $id
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
  ) {
    ...user
  }
}
    ${UserFragmentDoc}`;

export const UpdateUserComponent = (props: Omit<Urql.MutationProps<UpdateUserMutation, UpdateUserMutationVariables>, 'query'> & { variables?: UpdateUserMutationVariables }) => (
  <Urql.Mutation {...props} query={UpdateUserDocument} />
);


export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId)
}
    `;

export const DeleteUserComponent = (props: Omit<Urql.MutationProps<DeleteUserMutation, DeleteUserMutationVariables>, 'query'> & { variables?: DeleteUserMutationVariables }) => (
  <Urql.Mutation {...props} query={DeleteUserDocument} />
);


export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...user
  }
}
    ${UserFragmentDoc}`;

export const MeComponent = (props: Omit<Urql.QueryProps<MeQuery, MeQueryVariables>, 'query'> & { variables?: MeQueryVariables }) => (
  <Urql.Query {...props} query={MeDocument} />
);


export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...user
  }
}
    ${UserFragmentDoc}`;

export const LoginComponent = (props: Omit<Urql.MutationProps<LoginMutation, LoginMutationVariables>, 'query'> & { variables?: LoginMutationVariables }) => (
  <Urql.Mutation {...props} query={LoginDocument} />
);


export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export const LogoutComponent = (props: Omit<Urql.MutationProps<LogoutMutation, LogoutMutationVariables>, 'query'> & { variables?: LogoutMutationVariables }) => (
  <Urql.Mutation {...props} query={LogoutDocument} />
);


export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const GetUserAvatarSignedUrlDocument = gql`
    mutation GetUserAvatarSignedUrl($hash: String!, $ext: EImageExtension!) {
  getUserAvatarSignedUrl(hash: $hash, ext: $ext)
}
    `;

export const GetUserAvatarSignedUrlComponent = (props: Omit<Urql.MutationProps<GetUserAvatarSignedUrlMutation, GetUserAvatarSignedUrlMutationVariables>, 'query'> & { variables?: GetUserAvatarSignedUrlMutationVariables }) => (
  <Urql.Mutation {...props} query={GetUserAvatarSignedUrlDocument} />
);


export function useGetUserAvatarSignedUrlMutation() {
  return Urql.useMutation<GetUserAvatarSignedUrlMutation, GetUserAvatarSignedUrlMutationVariables>(GetUserAvatarSignedUrlDocument);
};
export const SetUserAvatarDocument = gql`
    mutation SetUserAvatar {
  setUserAvatar {
    ...user
  }
}
    ${UserFragmentDoc}`;

export const SetUserAvatarComponent = (props: Omit<Urql.MutationProps<SetUserAvatarMutation, SetUserAvatarMutationVariables>, 'query'> & { variables?: SetUserAvatarMutationVariables }) => (
  <Urql.Mutation {...props} query={SetUserAvatarDocument} />
);


export function useSetUserAvatarMutation() {
  return Urql.useMutation<SetUserAvatarMutation, SetUserAvatarMutationVariables>(SetUserAvatarDocument);
};