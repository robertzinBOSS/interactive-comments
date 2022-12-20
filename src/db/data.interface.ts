export interface IData {
    currentUser: IUser;
    comments: IComment[];
}

export interface IComment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: IUser;
    replies?: IComment[];
    replyingTo?: string;
}

export interface IUser {
    image: IImage;
    username: string;
}

export interface IImage {
    png: string;
    webp: string;
}
