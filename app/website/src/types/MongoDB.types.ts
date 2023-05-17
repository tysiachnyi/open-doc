export type DocumentationSchemaType = {
  _id: string;
  title: string;
  description: string;
  content: string;
  projectId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectSchemaType = {
  _id: string;
  title: string;
  description: string;
  type: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSchemaType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
