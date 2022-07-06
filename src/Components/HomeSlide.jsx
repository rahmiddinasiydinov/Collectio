import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Component.scss";
// import required modules
import { Pagination, Navigation } from "swiper";
import { Box } from "@mui/material";
import HomeCollectionCard from "./HomeCard";
import HomeItemCard from "./HomeItemCard";
import { useState } from "react";
export const HomeSlide = ({ array, type }) => {
    const [columns, setColumn] = useState(
      window.innerWidth > 1300
        ? 4
        : window.innerWidth > 1000
        ? 3
        : window.innerWidth > 650
        ? 2
        : 1
    );
    window.addEventListener("resize", () => {
      setColumn(
        window.innerWidth > 1300
          ? 4
          : window.innerWidth > 1000
          ? 3
          : window.innerWidth > 650
          ? 2
          : 1
      );
    });
  return (
    <Box
      width={"100%"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      marginBottom={'50px'}
    >
      <Swiper
        slidesPerView={columns}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {type === "collection"
          ? array?.map((e) => {
              return (
                <SwiperSlide key={e?._id}>
                  <HomeCollectionCard
                    username={e?.user?.fullName}
                    img={e?.img}
                    avatar={e?.user?.img}
                    date={e?.createdAt}
                    desc={e?.desc}
                    title={e?.name}
                    topic={e?.topic}
                    id={e?._id}
                    isMarkdown={e?.isMarkdown}
                  />
                </SwiperSlide>
              );
            })
          : array?.map((e, i) => {
            return (
              <SwiperSlide key={e?._id}>
                <HomeItemCard
                  username={e?.user?.fullName}
                  img={e?.img}
                  date={e?.createdAt}
                  avatar={e?.user?.img}
                  id={e?._id}
                  desc={e?.desc}
                  topic={e?.tag?.title}
                  title={e?.title}
                  collection={e?.collectionName.name}
                  isMarkdown={e?.isMarkdown}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Box>
  );
};
