import UserList from "@/components/admin/user/UserList";
import authOptions from "@/utils/authOptions";
import { sendRequest } from "@/utils/fetchApi";
import { getServerSession } from "next-auth";

const UserPage = async () => {
  const session = await getServerSession(authOptions);
  const res = await sendRequest<IBackendRes<IPage<IUser>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  if (res.status !== 200) {
    console.log("error ", res.message);
  }

  return <UserList />;
};

export default UserPage;
