import { sendRequest } from "@/utils/fetchApi";
import { Button } from "@mui/material";
import Image from "next/image";

const AdminPage = async () => {
  const chillRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/top`,
    method: "POST",
    body: { category: "CHILL", limit: 10 },
  });
  const workoutRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/top`,
    method: "POST",
    body: { category: "WORKOUT", limit: 10 },
  });
  const partyRes = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/top`,
    method: "POST",
    body: { category: "PARTY", limit: 10 },
  });

  const renderTrackList = (tracks: ITrackTop[], title: string) => (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <ul className="space-y-3">
        {tracks.map((track, index) => (
          <li key={track.id} className="flex items-center gap-4">
            <span className="text-lg font-semibold w-6 text-gray-500">
              {index + 1}
            </span>
            <Image
              src={track.trackUrl || "/default-thumbnail.jpg"}
              alt={track.title}
              width={50}
              height={50}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{track.title}</span>
              <span className="text-sm text-gray-500">
                {track?.uploader?.name}
              </span>
            </div>
            <div className="ml-auto text-sm text-gray-600">
              {track.countPlay} plays
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6 text-gray-800">
        🎵 Top Bài Hát Thịnh Hành Theo Thể Loại
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {renderTrackList(chillRes.data || [], "Chill")}
        {renderTrackList(workoutRes.data || [], "Workout")}
        {renderTrackList(partyRes.data || [], "🎉 Party")}
      </div>
      <Button variant="outlined">Lưu vào Redis</Button>
    </div>
  );
};

export default AdminPage;
