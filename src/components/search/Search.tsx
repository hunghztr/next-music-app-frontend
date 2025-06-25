import { convertSlugUrl } from "@/utils/fetchApi";
import Image from "next/image";
import Link from "next/link";
const Search = ({ tracks }: { tracks: ITrackTop[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {tracks.map((i) => (
        <div
          key={i.id}
          className="flex items-center bg-white rounded-lg shadow-sm p-3 hover:bg-gray-50 transition"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${i.imgUrl}`}
            alt="Track Image"
            width={80}
            height={80}
            className="rounded-md object-cover"
          />

          <div className="ml-4 flex-1">
            <Link
              href={`/track/${convertSlugUrl(i.title)}-${i.id}.html?audio=${
                i.trackUrl
              }`}
            >
              <h3 className="text-lg font-semibold hover:underline truncate">
                {i.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 truncate">
              {i.uploader?.name || "Unknown"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Search;
