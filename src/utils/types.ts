type signFormType = {
    username: string;
    image:string
};

type User = {
    id?: string;
    username: string;
    image?: any;
};

type TMessage = {
    id: string;
    userId: string;
    user?: User;
    text?: string;
    images?: string[];
    createdAt: Date;
};

export type {TMessage, User, signFormType}
