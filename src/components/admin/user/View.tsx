import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

type Props = {
  open: boolean;
  onClose: () => void;
  user: IUser | null;
};

const ViewUser = ({ open, onClose, user }: Props) => {
  if (!user) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="w-[50vw] max-w-md p-6 bg-white text-gray-800">
        <Typography variant="h6" className="mb-2 text-blue-600 font-semibold">
          👤 Thông tin người dùng
        </Typography>

        <Divider className="mb-4" />

        <div className="space-y-3 text-sm leading-6">
          <div>
            <span className="font-semibold text-gray-600">Username:</span>{" "}
            <span>{user.username}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Name:</span>{" "}
            <span>{user.name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Age:</span>{" "}
            <span>{user.age}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Gender:</span>{" "}
            <span>{user.gender}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Address:</span>{" "}
            <span>{user.address}</span>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default ViewUser;
