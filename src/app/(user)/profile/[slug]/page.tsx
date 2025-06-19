
import {sendRequest} from "@/utils/fetchApi";

import Profile from "@/components/header/profile/Profile";

const ProfilePage = async ({params}:{params:{slug:string}}) => {

  const res = await sendRequest<IBackendRes<IPage>>({
    url:`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/user`,
    method:"POST",
    body:{id:params.slug}
  })



  return (
      <Profile res={res}/>
  );
};
export default ProfilePage;
