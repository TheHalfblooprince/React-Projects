export interface postTypes {
    userId: number;
    id: number;
    title: string;
    body:string
}

export interface commentTypes {
    postId: number;
    email: string | undefined;
    id: number;
    body:string,
    
}
