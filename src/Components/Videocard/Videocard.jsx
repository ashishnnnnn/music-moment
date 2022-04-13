import "./Videocard.css";

export const Videocard = ({ ele }) => {
  return (
    <div className="video-card pad-0-5">
      <div className="card vertical-card">
        <div className="text-img img-container">
          <img src={ele.img_src} alt="song-image" />
          <div className="text-overlay flex-center-row">
            <i class="fas fa-play fnt-2 color-white"></i>
          </div>
        </div>
      </div>
      <div className="flex video-description gap-1-5 ali-ce">
        <div className="video-title pad-l-0-5 fnt-w-600 fnt-1-2">
          {ele.title}
        </div>
        <div className="video-card-option cursor-pointer flex-center-row pad-tb-0-5">
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <p className="pad-l-0-5 fnt-w-500">{ele.views}M Views</p>
      <div className="pad-l-0-5 mar-t-0-5 flex ali-ce gap-0-5">
        <img
          className="channel-logo"
          src={ele.channel_src}
          alt="channel-logo"
        />
        <p>{ele.channel_name}</p>
      </div>
    </div>
  );
};
