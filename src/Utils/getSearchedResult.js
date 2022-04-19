export const getSearchedResult = (searchValue, video_list) => {
  searchValue = searchValue.trim();
  const searched_result = [];
  if (searchValue.length === 0) {
    return searched_result;
  } else {
    video_list.forEach((element) => {
      if (element.song_name.toLowerCase().includes(searchValue.toLowerCase())) {
        searched_result.push({
          _id: element._id,
          song_name: element.song_name,
        });
      }
    });
    return searched_result;
  }
};
