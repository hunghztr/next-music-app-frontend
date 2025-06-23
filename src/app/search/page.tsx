"use client";
import Search from "@/components/search/Search";
import { sendRequest } from "@/utils/fetchApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [results, setResults] = useState<ITrackTop[]>([]);
  const search = useSearchParams();
  const query = search.get("search");
  document.title = `Search results for "${query}" - Music App`;
  useEffect(() => {
    const fetch = async () => {
      const res = await sendRequest<IBackendRes<IPage<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/search`,
        method: "GET",
        queryParams: {
          search: query,
          current: 1,
          pageSize: 10,
        },
      });
      if (res.data?.result) {
        setResults(res.data.result);
      }
    };
    fetch();
  }, [query]);
  return (
    <div className="mx-40 my-4">
      <h2 className="font-bold text-[1.3vw] mb-4">Your Results</h2>
      <hr className="mb-6" />

      <Search tracks={results} />
    </div>
  );
};
export default SearchPage;
