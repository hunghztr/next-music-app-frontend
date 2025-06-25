import { sendRequest } from "@/utils/fetchApi";

import Profile from "@/components/header/profile/Profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sonix - Profile",
  description: "Trang Profile",
};
const ProfilePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await sendRequest<IBackendRes<IPage<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/user`,
    method: "POST",
    body: { id: slug },
  });
  return <Profile res={res} />;
};
export default ProfilePage;
