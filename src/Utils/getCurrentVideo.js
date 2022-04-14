export const getCurrentVideo = (videolist, id) => {
  for (let i = 0; i < videolist.length; i++) {
    if (videolist[i]._id === id) {
      return videolist[i];
    }
  }
};
