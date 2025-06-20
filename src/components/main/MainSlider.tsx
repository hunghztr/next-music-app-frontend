"use client";
import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import Link from "next/link";
import {convertSlugUrl} from "@/utils/fetchApi";
import Image from "next/image";

interface IProps {
    data: ITrackTop[];
    title: string;
}

const MainSlider = (props: IProps) => {
    const {title, data} = props;

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
                <ChevronRight/>
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
                <ChevronLeft/>
            </Button>
        );
    };
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PreArrow>pre</PreArrow>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
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

                            <div className='relative w-full h-[100px]'>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${i.imgUrl}`}
                                    alt="ảnh bài hát" fill
                                    className='object-contain'
                                    sizes="100px"
                                    priority
                                />
                            </div>

                            <div className="mt-1.5">
                                <Link href={`/track/${convertSlugUrl(i.title)}-${i.id}.html?audio=${i.trackUrl}`}>
                                    <h3 className="font-bold">{i.title}</h3>
                                </Link>

                                <h5>{i.description}</h5>
                            </div>
                        </div>
                    );
                })}
            </Slider>
            <Divider/>
        </Box>
    );
};
export default MainSlider;
