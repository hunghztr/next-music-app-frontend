import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetchApi";
import AlertInfo from "@/components/alert/AlertInfo";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";
type CategoryOption = {
  label: string;
  category: string;
};
const options: CategoryOption[] = [
  { label: "Ballad", category: "BALLAD" },
  { label: "Pop", category: "POP" },
  { label: "Rap", category: "RAP" },
];

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface INewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
}

const TabInfo = ({
  trackUpload,
}: {
  trackUpload: { fileName: string; progress: number; uploadedFileName: string };
}) => {
  // mở toast báo lỗi
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  const route = useRouter();
  const { data: session } = useSession();
  const [info, setInfo] = useState<INewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    category: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSaveFile = async () => {
    if (!imageFile) {
      setResMessage("bạn chưa có ảnh");
      setOpenMessage(true);
      return undefined;
    }
    const formData = new FormData();
    formData.append("fileUpload", imageFile);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload-img`,
      formData,
      {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      }
    );
    setInfo((prev) => ({ ...prev, imgUrl: res.data.data.result }));

    if (res.status >= 400) {
      setResMessage("có lỗi xảy ra, vui lòng tải lại ");
      setOpenMessage(true);
      return null;
    }
    return res.data.data.result;
  };
  const handleSaveInfo = async (urlImg: string) => {
    const res = await sendRequest<IBackendRes<INewTrack>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks`,
      method: "POST",
      body: {
        title: info.title,
        description: info.description,
        trackUrl: info.trackUrl,
        imgUrl: urlImg,
        category: info.category,
      },
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    });
    if (res.status === 400) {
      setResMessage(res.message);
      setOpenMessage(true);
    } else {
      return true;
    }
    return false;
  };
  const handleSave = async () => {
    const getUrlImg = await handleSaveFile();
    if (!getUrlImg) return;
    const isSuccess = await handleSaveInfo(getUrlImg);
    if (isSuccess) {
      route.push(`/profile/${session?.user.id}`);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        if (img.width !== 500 || img.height !== 500) {
          setResMessage("Ảnh phải có kích thước đúng 250x250px");
          setOpenMessage(true);
          setImageFile(null);
          setPreviewUrl(null);
          return;
        }

        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (trackUpload) {
      setInfo({ ...info, trackUrl: trackUpload.uploadedFileName });
    }
  }, [trackUpload]);
  useEffect(() => {
    return () => {
      clearInterval(trackUpload.progress);
    };
  }, [trackUpload.progress]);

  return (
    <Box sx={{ width: "100%" }}>
      <p className="font-bold">Your uploading track: {trackUpload.fileName} </p>
      <LinearProgressWithLabel value={trackUpload.progress} />
      <div className="mt-10 flex">
        <div className="w-[20vw] flex flex-col">
          <div className="bg-gray-800 w-[20vw] h-[40vh] mb-3 flex items-center justify-center">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Avatar"
                width={250}
                height={250}
                className="object-cover"
              />
            ) : (
              <span className="text-white">Chưa có file</span>
            )}
          </div>

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }} // ẩn input
          />

          <label htmlFor="image-upload">
            <Button variant="contained" component="span" sx={{ width: "100%" }}>
              <CloudUploadIcon sx={{ marginRight: "10px" }} />
              UPLOAD FILE
            </Button>
          </label>
        </div>
        <div className="w-[40vw] ml-12 flex flex-col gap-8">
          <TextField
            value={info?.title}
            onChange={(e) => setInfo({ ...info, title: e.target.value })}
            label="Title"
            variant="standard"
          />
          <TextField
            value={info?.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            label="Description"
            variant="standard"
          />
          <Autocomplete
            options={options}
            getOptionLabel={(option) => option.label}
            value={{ label: info.category, category: info.category }}
            onChange={(event, newValue) => {
              setInfo({
                ...info,
                category: newValue ? newValue.category : "",
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Category"
                variant="outlined"
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.label}>
                {option.label}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
          />
          <Button
            variant="outlined"
            onClick={handleSave}
            sx={{ width: "200px" }}
          >
            Save
          </Button>
        </div>
      </div>
      <AlertInfo
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
        resMessage={resMessage}
      />
    </Box>
  );
};
export default TabInfo;
