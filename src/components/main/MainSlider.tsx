"use client";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface IProps {
  data: ITrackTop[];
  title: string;
}
const MainSlider = (props: IProps) => {
  const { title, data } = props;
  console.log(data);
  const NextArrow = (props: any) => {
    return (
      <Button
        sx={{
          position: "absolute",
          right: "0",
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
        variant="contained"
        color="inherit"
        onClick={props.onClick}
      >
        <ChevronRight />
      </Button>
    );
  };
  const PreArrow = (props: any) => {
    return (
      <Button
        sx={{
          position: "absolute",
          left: "0",
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
        variant="contained"
        color="inherit"
        onClick={props.onClick}
      >
        <ChevronLeft />
      </Button>
    );
  };
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreArrow>pre</PreArrow>,
  };
  return (
    <Box
      sx={{
        margin: "0 50px",
      }}
    >
      <h2 className="font-bold text-lg my-2.5">{title}</h2>
      <Slider {...settings} infinite={data.length >= 5}>
        {data.map((i) => {
          return (
            <div key={i.id}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${i.imgUrl}`}
                alt="ảnh bài hát"
                width={100}
                height={100}
              />
              <div className="mt-1.5">
                <h3 className="font-bold">{i.title}</h3>
                <h5>{i.description}</h5>
              </div>
            </div>
          );
        })}
      </Slider>
      <Divider />
    </Box>
  );
};
export default MainSlider;
