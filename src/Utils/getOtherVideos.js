export const getOtherVideos = (singer_name, id, video_list) => {
  let ret_list = [];
  video_list.forEach((video) => {
    if (
      video._id !== id &&
      video.singer.toLowerCase() === singer_name.toLowerCase()
    ) {
      ret_list.push(video);
    }
  });
  return ret_list;
};
