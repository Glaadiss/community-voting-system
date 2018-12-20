export const typeDefs = /* GraphQL */ `type AggregateContest {
  count: Int!
}

type AggregateProject {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Contest {
  id: ID!
  name: String!
  projects(where: ProjectWhereInput, orderBy: ProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Project!]
}

type ContestConnection {
  pageInfo: PageInfo!
  edges: [ContestEdge]!
  aggregate: AggregateContest!
}

input ContestCreateInput {
  name: String!
  projects: ProjectCreateManyWithoutContestsInput
}

input ContestCreateManyWithoutProjectsInput {
  create: [ContestCreateWithoutProjectsInput!]
  connect: [ContestWhereUniqueInput!]
}

input ContestCreateWithoutProjectsInput {
  name: String!
}

type ContestEdge {
  node: Contest!
  cursor: String!
}

enum ContestOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ContestPreviousValues {
  id: ID!
  name: String!
}

input ContestScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [ContestScalarWhereInput!]
  OR: [ContestScalarWhereInput!]
  NOT: [ContestScalarWhereInput!]
}

type ContestSubscriptionPayload {
  mutation: MutationType!
  node: Contest
  updatedFields: [String!]
  previousValues: ContestPreviousValues
}

input ContestSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ContestWhereInput
  AND: [ContestSubscriptionWhereInput!]
  OR: [ContestSubscriptionWhereInput!]
  NOT: [ContestSubscriptionWhereInput!]
}

input ContestUpdateInput {
  name: String
  projects: ProjectUpdateManyWithoutContestsInput
}

input ContestUpdateManyDataInput {
  name: String
}

input ContestUpdateManyMutationInput {
  name: String
}

input ContestUpdateManyWithoutProjectsInput {
  create: [ContestCreateWithoutProjectsInput!]
  delete: [ContestWhereUniqueInput!]
  connect: [ContestWhereUniqueInput!]
  disconnect: [ContestWhereUniqueInput!]
  update: [ContestUpdateWithWhereUniqueWithoutProjectsInput!]
  upsert: [ContestUpsertWithWhereUniqueWithoutProjectsInput!]
  deleteMany: [ContestScalarWhereInput!]
  updateMany: [ContestUpdateManyWithWhereNestedInput!]
}

input ContestUpdateManyWithWhereNestedInput {
  where: ContestScalarWhereInput!
  data: ContestUpdateManyDataInput!
}

input ContestUpdateWithoutProjectsDataInput {
  name: String
}

input ContestUpdateWithWhereUniqueWithoutProjectsInput {
  where: ContestWhereUniqueInput!
  data: ContestUpdateWithoutProjectsDataInput!
}

input ContestUpsertWithWhereUniqueWithoutProjectsInput {
  where: ContestWhereUniqueInput!
  update: ContestUpdateWithoutProjectsDataInput!
  create: ContestCreateWithoutProjectsInput!
}

input ContestWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  projects_every: ProjectWhereInput
  projects_some: ProjectWhereInput
  projects_none: ProjectWhereInput
  AND: [ContestWhereInput!]
  OR: [ContestWhereInput!]
  NOT: [ContestWhereInput!]
}

input ContestWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createContest(data: ContestCreateInput!): Contest!
  updateContest(data: ContestUpdateInput!, where: ContestWhereUniqueInput!): Contest
  updateManyContests(data: ContestUpdateManyMutationInput!, where: ContestWhereInput): BatchPayload!
  upsertContest(where: ContestWhereUniqueInput!, create: ContestCreateInput!, update: ContestUpdateInput!): Contest!
  deleteContest(where: ContestWhereUniqueInput!): Contest
  deleteManyContests(where: ContestWhereInput): BatchPayload!
  createProject(data: ProjectCreateInput!): Project!
  updateProject(data: ProjectUpdateInput!, where: ProjectWhereUniqueInput!): Project
  updateManyProjects(data: ProjectUpdateManyMutationInput!, where: ProjectWhereInput): BatchPayload!
  upsertProject(where: ProjectWhereUniqueInput!, create: ProjectCreateInput!, update: ProjectUpdateInput!): Project!
  deleteProject(where: ProjectWhereUniqueInput!): Project
  deleteManyProjects(where: ProjectWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Project {
  id: ID!
  name: String!
  contests(where: ContestWhereInput, orderBy: ContestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contest!]
}

type ProjectConnection {
  pageInfo: PageInfo!
  edges: [ProjectEdge]!
  aggregate: AggregateProject!
}

input ProjectCreateInput {
  name: String!
  contests: ContestCreateManyWithoutProjectsInput
}

input ProjectCreateManyWithoutContestsInput {
  create: [ProjectCreateWithoutContestsInput!]
  connect: [ProjectWhereUniqueInput!]
}

input ProjectCreateWithoutContestsInput {
  name: String!
}

type ProjectEdge {
  node: Project!
  cursor: String!
}

enum ProjectOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProjectPreviousValues {
  id: ID!
  name: String!
}

input ProjectScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [ProjectScalarWhereInput!]
  OR: [ProjectScalarWhereInput!]
  NOT: [ProjectScalarWhereInput!]
}

type ProjectSubscriptionPayload {
  mutation: MutationType!
  node: Project
  updatedFields: [String!]
  previousValues: ProjectPreviousValues
}

input ProjectSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProjectWhereInput
  AND: [ProjectSubscriptionWhereInput!]
  OR: [ProjectSubscriptionWhereInput!]
  NOT: [ProjectSubscriptionWhereInput!]
}

input ProjectUpdateInput {
  name: String
  contests: ContestUpdateManyWithoutProjectsInput
}

input ProjectUpdateManyDataInput {
  name: String
}

input ProjectUpdateManyMutationInput {
  name: String
}

input ProjectUpdateManyWithoutContestsInput {
  create: [ProjectCreateWithoutContestsInput!]
  delete: [ProjectWhereUniqueInput!]
  connect: [ProjectWhereUniqueInput!]
  disconnect: [ProjectWhereUniqueInput!]
  update: [ProjectUpdateWithWhereUniqueWithoutContestsInput!]
  upsert: [ProjectUpsertWithWhereUniqueWithoutContestsInput!]
  deleteMany: [ProjectScalarWhereInput!]
  updateMany: [ProjectUpdateManyWithWhereNestedInput!]
}

input ProjectUpdateManyWithWhereNestedInput {
  where: ProjectScalarWhereInput!
  data: ProjectUpdateManyDataInput!
}

input ProjectUpdateWithoutContestsDataInput {
  name: String
}

input ProjectUpdateWithWhereUniqueWithoutContestsInput {
  where: ProjectWhereUniqueInput!
  data: ProjectUpdateWithoutContestsDataInput!
}

input ProjectUpsertWithWhereUniqueWithoutContestsInput {
  where: ProjectWhereUniqueInput!
  update: ProjectUpdateWithoutContestsDataInput!
  create: ProjectCreateWithoutContestsInput!
}

input ProjectWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  contests_every: ContestWhereInput
  contests_some: ContestWhereInput
  contests_none: ContestWhereInput
  AND: [ProjectWhereInput!]
  OR: [ProjectWhereInput!]
  NOT: [ProjectWhereInput!]
}

input ProjectWhereUniqueInput {
  id: ID
}

type Query {
  contest(where: ContestWhereUniqueInput!): Contest
  contests(where: ContestWhereInput, orderBy: ContestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contest]!
  contestsConnection(where: ContestWhereInput, orderBy: ContestOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContestConnection!
  project(where: ProjectWhereUniqueInput!): Project
  projects(where: ProjectWhereInput, orderBy: ProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Project]!
  projectsConnection(where: ProjectWhereInput, orderBy: ProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProjectConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  contest(where: ContestSubscriptionWhereInput): ContestSubscriptionPayload
  project(where: ProjectSubscriptionWhereInput): ProjectSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
}

input UserUpdateManyMutationInput {
  name: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`