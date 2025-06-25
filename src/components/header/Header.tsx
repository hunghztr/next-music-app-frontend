"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import MoreIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname, useRouter } from "next/navigation";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "250px",
    },
  },
}));

export default function Header() {
  const path = usePathname();
  const { data: session } = useSession();
  const route = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href={`/profile/${session?.user.id}`}>Profile</Link>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          signOut();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href={`/profile/${session?.user.id}`}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Link>
      <MenuItem
        onClick={() => {
          signOut();
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#131a2c" }}>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link href={"/"}>Sonix Music</Link>
            </Typography>
            <Search
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                console.log(input.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const input = e.target as HTMLInputElement;
                  route.push(`/search?search=${input.value}`);
                }
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: "20px",
                cursor: "pointer",
              }}
            >
              {session ? (
                <div className="flex gap-8 items-center">
                  <span
                    className={`${
                      path.startsWith("/playlist")
                        ? "bg-[#1a2238] text-blue-100 px-4 py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link href={"/playlist"}>Playlist</Link>
                  </span>
                  <span
                    className={`${
                      path.startsWith("/like")
                        ? "bg-[#1a2238] text-blue-100 px-4 py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link href={"/like"}>Likes</Link>
                  </span>
                  <span
                    className={`${
                      path.startsWith("/track/upload")
                        ? "bg-[#1a2238] text-blue-100 px-4 py-1 rounded-md"
                        : ""
                    }`}
                  >
                    <Link href={"/track/upload"}>Uploads</Link>
                  </span>
                  <Image
                    onClick={handleProfileMenuOpen}
                    className="rounded-full"
                    src={`${process.env.NEXT_PUBLIC_CLOUD_URL}/${
                      session.user.avatar ? session.user.avatar : "user.png"
                    }`}
                    alt="A"
                    width={35}
                    height={35}
                  />
                </div>
              ) : (
                <Link href={"/auth/signin"}>
                  <Button
                    // onClick={() => signIn()}
                    variant="outlined"
                    color="inherit"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
