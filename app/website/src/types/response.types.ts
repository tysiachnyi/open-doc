export type LoginResponse = {
  data: {
    token: string;
    userId: string;
    name: string;
    email: string;
    password: string;
  };
};

export type ProjectResponse = {
  data: {
    authorId: string;
    description: string;
    title: string;
    type: string;
    __v: number;
    _id: string;
  };
};
