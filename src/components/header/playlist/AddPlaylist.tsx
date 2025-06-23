"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { sendRequest } from "@/utils/fetchApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddPlaylist() {
  const { data: session } = useSession();
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };

  const handleAdd = async () => {
    if (title.trim()) {
      const res = await sendRequest<IBackendRes<string>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/playlists/empty`,
        method: "POST",
        body: { title, isPublic: true },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (res.status === 200) {
        route.refresh();
      }
      handleClose();
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p className="font-bold text-[1.3vw]">Danh sách phát</p>
        <Button onClick={handleOpen} variant="outlined">
          <AddIcon /> Playlist
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Playlist Mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tiêu đề Playlist"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            disabled={!title.trim()}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
