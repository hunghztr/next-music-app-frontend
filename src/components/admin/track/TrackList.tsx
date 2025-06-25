"use client";

import { sendRequest } from "@/utils/fetchApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TrackList = () => {
  const { data: session } = useSession();
  const route = useRouter();

  const [filteredTracks, setFilteredTracks] = useState<ITrackTop[] | null>(
    null
  );

  // Phân trang
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetch = async () => {
      const res = await sendRequest<IBackendRes<IPage<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        queryParams: {
          current: page,
        },
      });

      if (res.status === 200) {
        setFilteredTracks(res.data?.result || []);
        setTotalPages(res.data?.meta.pages || 1);
      }
    };

    fetch();
  }, [session, page]);

  return (
    <div className="p-6 bg-white text-gray-900">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-800 border border-gray-300 rounded-md shadow">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left">Tên Bài Hát</th>
              <th className="py-2 px-4 text-left">Tên Ca Sĩ</th>
              <th className="py-2 px-4 text-left">Lượt Thích</th>
              <th className="py-2 px-4 text-center">Lượt Nghe</th>
            </tr>
          </thead>
          <tbody>
            {(filteredTracks || []).map((t) => (
              <tr
                key={t.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all"
              >
                <td className="py-2 px-4">{t.title}</td>
                <td className="py-2 px-4">{t.uploader.name}</td>
                <td className="py-2 px-4">{t.countLike}</td>
                <td className="py-2 px-4">{t.countPlay}</td>

                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm("Bạn có chắc muốn xóa track này?")) {
                        const res = await sendRequest<IBackendRes<string>>({
                          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${t.id}`,
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                          },
                        });
                        if (res.status !== 200) {
                          alert("Xóa track không thành công!");
                          return;
                        }
                        alert("Track đã được xóa thành công!");
                        route.refresh();
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredTracks?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Không có bài hát nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang: chỉ có 2 nút Trước & Sau */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-purple-100 text-purple-600 border-gray-300"
              }`}
            >
              ← Trước
            </button>

            <span className="text-gray-600 text-sm">
              Trang {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-purple-100 text-purple-600 border-gray-300"
              }`}
            >
              Sau →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackList;
