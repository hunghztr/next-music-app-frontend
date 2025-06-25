import AlertInfo from "@/components/alert/AlertInfo";
import { sendRequest } from "@/utils/fetchApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateUser = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  user: IUser | null;
}) => {
  const { data: session } = useSession();
  const route = useRouter();
  const [openMessage, setOpenMessage] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const [formData, setFormData] = useState({
    id: user?.id || "",
    username: user?.username || "",
    password: "temp",
    name: user?.name || "",
    age: user?.age || 0,
    gender: user?.gender || "",
    address: user?.address || "",
  });
  useEffect(() => {
    setFormData({
      id: user?.id || "",
      username: user?.username || "",
      password: "temp",
      name: user?.name || "",
      age: user?.age || 0,
      gender: user?.gender || "",
      address: user?.address || "",
    });
  }, [user]);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: "",
      username: "",
      password: "temp",
      name: "",
      age: 0,
      gender: "",
      address: "",
    });
  };

  const handleSubmit = async () => {
    const res = await sendRequest<IBackendRes<IUser>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (res.status !== 200) {
      setResMessage(res.message || "Lỗi không xác định");
      setOpenMessage(true);
    } else {
      route.refresh();
      handleClose();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cập nhật thông</DialogTitle>
      <DialogContent>
        {/* Row 2: Name + Age */}
        <div className="flex gap-4 mt-4">
          <TextField
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={formData.age}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                age: Number(e.target.value),
              }))
            }
          />
        </div>

        {/* Row 3: Gender + Address */}
        <div className="flex gap-4 mt-4">
          <FormControl fullWidth variant="standard">
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained">
          Tạo
        </Button>
      </DialogActions>
      <AlertInfo
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
        resMessage={resMessage}
      />
    </Dialog>
  );
};
export default UpdateUser;
