import Search from "@/components/search/Search";

const Like = ({ tracks }: { tracks: ITrackTop[] }) => {
  return (
    <div className="mx-40 my-4">
      <h2 className="font-bold text-[1.3vw] mb-4">Tracks you liked</h2>
      <hr className="mb-6" />

      <Search tracks={tracks} />
    </div>
  );
};

export default Like;
