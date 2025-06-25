'use client';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LockIcon from '@mui/icons-material/Lock';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import AlertInfo from "@/components/alert/AlertInfo";
import Image from 'next/image';
import {sendRequest} from "@/utils/fetchApi";
import axios from "axios";

const AuthRegister = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        age: "",
        gender: "",
        address: "",
        avatar: "", // filename sau khi upload
    });

    const [errors, setErrors] = useState<any>({});
    const [openMessage, setOpenMessage] = useState(false);
    const [resMessage, setResMessage] = useState("");

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const uploadAvatar = async () => {
        if (!avatar) return null;

        const form = new FormData();
        form.append("fileUpload", avatar);

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload-avatar`,
            form,
        )

        if(res.status >= 400) {
            setResMessage("có lỗi xảy ra, vui lòng tải lại ",)
            setOpenMessage(true);
            return null;
        }
        return res.data.data.result;
    };

    const handleSubmit = async () => {
        const newErrors: any = {};

        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!formData.name) newErrors.name = "Name is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const uploadedFileName = await uploadAvatar();
        if (avatar && !uploadedFileName) {
            setResMessage("Upload avatar failed.");
            setOpenMessage(true);
            return;
        }

        const payload = {
            ...formData,
            avatar: uploadedFileName || "",
        };


            const res = await sendRequest<IBackendRes<string>>({
                url:`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
                method: "POST",
                body: payload,
            })


            if (res.status === 200) {
                setResMessage(res.data||'');
                router.push('/auth/login');
            } else {
                setResMessage(res.message || "Đăng ký thất bại");
                setOpenMessage(true);
            }

    };

    return (
        <Box>
            <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <Grid size={{xs: 12, sm: 8, md: 5, lg: 4}} sx={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                    <div style={{ margin: "20px" }}>
                        <Link href="/"><ArrowBackIcon /></Link>

                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <Avatar><LockIcon /></Avatar>
                            <Typography component="h1">Register</Typography>
                        </Box>

                        <TextField fullWidth label="Username" margin="normal"
                                   value={formData.username}
                                   onChange={(e) => handleChange("username", e.target.value)}
                                   error={!!errors.username}
                                   helperText={errors.username} />

                        <TextField fullWidth label="Password" margin="normal"
                                   type={showPassword ? "text" : "password"}
                                   value={formData.password}
                                   onChange={(e) => handleChange("password", e.target.value)}
                                   error={!!errors.password}
                                   helperText={errors.password}
                                   InputProps={{
                                       endAdornment: <InputAdornment position="end">
                                           <IconButton onClick={() => setShowPassword(!showPassword)}>
                                               {showPassword ? <Visibility /> : <VisibilityOff />}
                                           </IconButton>
                                       </InputAdornment>,
                                   }} />

                        <TextField fullWidth label="Confirm Password" margin="normal"
                                   type={showPassword ? "text" : "password"}
                                   value={formData.confirmPassword}
                                   onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                   error={!!errors.confirmPassword}
                                   helperText={errors.confirmPassword} />

                        <TextField fullWidth label="Full Name" margin="normal"
                                   value={formData.name}
                                   onChange={(e) => handleChange("name", e.target.value)}
                                   error={!!errors.name}
                                   helperText={errors.name} />

                        <Grid container spacing={2}>
                            <Grid size={{xs: 6}}>
                                <TextField fullWidth label="Age" margin="normal"
                                           value={formData.age}
                                           onChange={(e) => handleChange("age", e.target.value)}
                                           error={!!errors.age}
                                           helperText={errors.age} />
                            </Grid>
                            <Grid size={{xs: 6}}>
                                <TextField select fullWidth label="Gender" margin="normal"
                                           value={formData.gender}
                                           onChange={(e) => handleChange("gender", e.target.value)}
                                           error={!!errors.gender}
                                           helperText={errors.gender}>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <TextField fullWidth label="Address" margin="normal"
                                   value={formData.address}
                                   onChange={(e) => handleChange("address", e.target.value)}
                                   error={!!errors.address}
                                   helperText={errors.address} />

                        {/* Avatar Upload */}
                        <Box mt={2}>
                            <input type="file" accept="image/*" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setAvatar(file);
                                    setAvatarPreview(URL.createObjectURL(file));
                                }
                            }} />
                            {avatarPreview && (
                                <Image
                                    width={80}
                                    height={80}
                                    src={avatarPreview}
                                    alt="avatar"
                                    className="mt-2 rounded-full object-cover"
                                />
                            )}
                        </Box>

                        <Button sx={{ my: 3 }} fullWidth variant="contained" onClick={handleSubmit}>
                            Sign Up
                        </Button>
                        <div className="text-blue-400">
                            <Link href={'/auth/signin'}>Login now</Link>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <AlertInfo openMessage={openMessage} setOpenMessage={setOpenMessage} resMessage={resMessage} />
        </Box>
    );
};

export default AuthRegister;
