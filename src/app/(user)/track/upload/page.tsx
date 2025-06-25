import UploadTab from "@/components/track/UploadTab";
import Container from "@mui/material/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sonix - Upload",
  description: "Trang Upload",
};
const UploadPage = () => {
  return (
    <Container>
      <UploadTab />
    </Container>
  );
};
export default UploadPage;
