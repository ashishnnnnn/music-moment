import "./Explore.css";

import { useFilter } from "../../Context/FilterContext";
import { useState } from "react";
import { useVideoList } from "../../Context/VideosContext";
import LoadingAnimation from "react-circle-loading-animation";
import { Videocard } from "../../Components";
import { filteration } from "../../Utils/filteration";

const filter_option = ["All", "Arijit Singh", "Mohit Chauhan", "KK", "Papon"];

export const Explore = () => {
  const { filter_state, setFilterState } = useFilter();
  const { video_list } = useVideoList();
  const [isloading] = useState(false);

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
