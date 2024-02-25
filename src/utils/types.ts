type signFormType = {
  username: string;
};

type User = {
  id: string;
  username: string;
  image: string;
};

type Message = {
  id: string;
  userId: string;
  user?: User;
  text?: string;
  images?: string[];
  createdAt: Date;
};
