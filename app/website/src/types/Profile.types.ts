export type ProfileType = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
};

export type ProfileLocalType = {
  id: string;
  name: string;
  email: string;
};
