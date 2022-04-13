import "./Explore.css";
import axios from "axios";

import { useFilter } from "../../Context/FilterContext";
import { useEffect, useState } from "react";
import { useVideoList } from "../../Context/VideosContext";
import LoadingAnimation from "react-circle-loading-animation";
import { Videocard } from "../../Components";
import { getRandomArray } from "../../Utils/getRandomArray";
import { filteration } from "../../Utils/filteration";

const filter_option = ["All", "Arijit Singh", "Mohit Chauhan", "KK", "Papon"];

export const Explore = () => {
  const { filter_state, setFilterState } = useFilter();
  const { video_list, setVideoList } = useVideoList();
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    (async () => {
      setisloading(true);
      await (async () => {
        return new Promise((resolve) => setTimeout(resolve, 2000));
      })();
      try {
        setisloading(false);
        const { data } = await axios.get("/api/videos");
        setVideoList(getRandomArray(data.videos));
        localStorage.setItem("videos", JSON.stringify(data.videos));
      } catch (e) {
        setisloading(false);
        setVideoList([]);
      }
    })();
  }, []);
  const list_to_view = filteration(video_list, filter_state);
  return (
    <div className="main-body pad-2">
      {isloading && <LoadingAnimation isLoading={true} color={"red"} />}
      <div className="flex gap-1 filter-options mar-b-1">
        {filter_option.map((ele) => (
          <div
            className={`filter-item fnt-1-2 flex-center-row text-btn-padding ${
              filter_state.category === ele.toUpperCase() ? "active" : ""
            }`}
            onClick={() => {
              setFilterState({ type: "CATEGORY", payload: ele.toUpperCase() });
            }}
            key={ele}
          >
            {ele}
          </div>
        ))}
      </div>
      <div className="video-grid flex-center-row gap-2">
        {list_to_view.map((ele) => (
          <Videocard key={ele._id} ele={ele} />
        ))}
      </div>
    </div>
  );
};
