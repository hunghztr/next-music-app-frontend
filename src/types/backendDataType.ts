
export {}
declare global{
  interface IPage<T>{
    meta:{
      current:number;
      pageSize:number;
      pages:number;
      total:number;
    };
    result:T[]
  }
  interface IRequest{
    url:string;
    method:string;
    body?: {[key:string]: any };
    queryParams?: any;
    useCredentials?: any;
    headers?: any;
    nextOptions?: any;
  }
  interface IUser{
    id: string,
        email: string,
      name:string,
      role: string,
      type: string
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
    uploader: IUser
    createdAt:string;
    updatedAt:string;
    isDeleted:boolean;
  }
  interface IBackendRes<T>{
    error?: string | string[];
    message: string;
    status: number | string;
    data?: T;
  }
  interface IShareTrack extends ITrackTop{
    isPlaying?:boolean;
  }
  interface ITrackContext{
    currentTrack:IShareTrack;
    setCurrentTrack : (value:IShareTrack) => void;
  }

  interface ITrackComment{
    id: string,
    content:string,
    moment:number,
    createdAt:string,
    updatedAt:string,
    deleted:boolean,
    user : IUser,
    track : ITrackTop
  }
}