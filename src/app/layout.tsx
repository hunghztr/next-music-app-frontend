"use client"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./globals.css";

// Tạo theme tùy chỉnh (nếu muốn)
const theme = createTheme({
  palette: {
    mode: "light", // hoặc "dark"
  },
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
