"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";

interface AddToPlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  playlists: IPlaylist[];
  onSelect: (playlist: IPlaylist) => void;
}

export default function AddToPlaylist({
  open,
  onClose,
  playlists,
  onSelect,
}: AddToPlaylistDialogProps) {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedTitle) {
      const selectedPlaylist = playlists.find(
        (pl) => pl.title === selectedTitle
      );
      if (selectedPlaylist) {
        onSelect(selectedPlaylist);
        onClose();
        setSelectedTitle(null);
      }
    }
  };

  const handleClose = () => {
    setSelectedTitle(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm vào Playlist</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={playlists.map((p) => p.title)}
          renderInput={(params) => (
            <TextField {...params} label="Chọn Playlist" />
          )}
          value={selectedTitle}
          onChange={(_, newValue) => setSelectedTitle(newValue)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedTitle}
        >
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
