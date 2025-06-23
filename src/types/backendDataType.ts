
export {}
declare global{
  interface IRequest{
    url:string;
    method:string;
    body?: {[key:string]: any };
    queryParams?: any;
    useCredentials?: any;
    headers?: any;
    nextOptions?: any;
  }
  interface ITrackTop{
    id: string,
    title: string,
    description:string,
    category: string,
    imgUrl: string,
    trackUrl: string,
    countLike: number,
    countPlay: number,
    uploader: {
      id: string,
      email: string,
      name:string,
      role: string,
      type: string
    }
    createdAt:string;
    updatedAt:string;
    isDeleted:boolean;
  }
  interface IBackendRes<T>{
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
}