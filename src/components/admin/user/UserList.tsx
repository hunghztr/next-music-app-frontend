"use client";
import CreateUser from "@/components/admin/user/Create";
import UpdateUser from "@/components/admin/user/Update";
import ViewUser from "@/components/admin/user/View";
import { sendRequest } from "@/utils/fetchApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserList = () => {
  const { data: session } = useSession();
  const route = useRouter();
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Phân trang
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleOpenCreate = () => setOpenCreate(true);
  const handleOpenUpdate = () => setOpenUpdate(true);

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetch = async () => {
      const res = await sendRequest<IBackendRes<IPage<IUser>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/search`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        queryParams: {
          username: searchTerm,
          current: page,
        },
      });

      if (res.status === 200) {
        setFilteredUsers(res.data?.result || []);
        setTotalPages(res.data?.meta.pages || 1);
      }
    };

    fetch();
  }, [session, searchTerm, page]);

  return (
    <div className="p-6 bg-white text-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-600">
          👤 Danh sách người dùng
        </h1>
        <button
          onClick={handleOpenCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
        >
          + Tạo mới
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="🔍 Tìm theo username..."
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // reset về trang đầu
          }}
        />
      </div>

      <CreateUser open={openCreate} setOpen={setOpenCreate} />
      <UpdateUser
        open={openUpdate}
        setOpen={setOpenUpdate}
        user={selectedUser}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-gray-800 border border-gray-300 rounded-md shadow">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUsers || []).map((user) => (
              <tr
                onClick={() => handleViewUser(user)}
                key={user.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all"
              >
                <td className="py-2 px-4">{user.type}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(user);
                      handleOpenUpdate();
                    }}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm("Bạn có chắc muốn xóa user này?")) {
                        const res = await sendRequest<IBackendRes<string>>({
                          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`,
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                          },
                        });
                        if (res.status !== 200) {
                          alert("Xóa user không thành công!");
                          return;
                        }
                        alert("User đã được xóa thành công!");
                        route.refresh();
                        setSelectedUser(null);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Không có người dùng nào.
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

      <ViewUser
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserList;
