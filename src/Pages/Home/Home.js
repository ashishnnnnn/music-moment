import "./Home.css";
import { Sliders, Footer } from "../../Components";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../Context/FilterContext";
import { useVideoList } from "../../Context/VideosContext";
import axios from "axios";
import { useEffect } from "react";
import { getRandomArray } from "../../Utils/getRandomArray";

const cateogry_details = [
  {
    src: "https://i.pinimg.com/originals/f1/75/eb/f175eb4e1806f055f7ea35622e773424.jpg",
    title: "arijit",
    name: "Arijit Singh",
  },
  {
    src: "https://starsunfolded.com/wp-content/uploads/2017/01/Mohit-Chauhan.jpg",
    title: "mohit",
    name: "Mohit Chauhan",
  },
  {
    src: "https://chiloka.com/i/i/k/k/-/kk-singer-10.jpg",
    title: "kk",
    name: "KK",
  },
  {
    src: "https://www.pinkvilla.com/imageresize/papon-best-quarantine-songs.jpg?width=752&format=webp&t=pvorg",
    title: "papon",
    name: "PAPON",
  },
];

export const Home = () => {
  let navigate = useNavigate();
  const { setVideoList } = useVideoList();
  const { setFilterState } = useFilter();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/videos");
        setVideoList(getRandomArray(data.videos));
        localStorage.setItem("videos", JSON.stringify(data.videos));
      } catch (e) {
        setVideoList([]);
      }
    })();
  }, []);
  return (
    <div className="main-body home-body pad-t-2 ">
      <Sliders />
      <button
        to="/product-list"
        className="btn btn-primary view-all-product fnt-1-2 cursor-pointer mar-c-auto flex"
        onClick={() => {
          setFilterState({
            type: "CATEGORY",
            payload: "ALL",
          });
          navigate("/explore");
        }}
      >
        Explore
      </button>
      <div className="featured-head fnt-3 flex-center-column text-center fnt-w-500 gap-2 mar-t-1 mar-b-2">
        <p>Featured Singers</p>
        <div className="thick-bar"></div>
      </div>
      <div className="container">
        <div className="responsive-grid">
          {cateogry_details.map((ele, index) => (
            <div
              onClick={() => {
                setFilterState({
                  type: "CATEGORY",
                  payload: ele.name.toUpperCase(),
                });
                navigate("/explore");
              }}
              className="card vertical-card"
              key={index}
            >
              <div className="text-img img-container">
                <img src={ele.src} alt={ele.title} />
                <div className="text-overlay text-center flex-center-column">
                  <div className="title">{ele.name.toUpperCase()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
