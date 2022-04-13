function category_handle(video_data, state) {
  if (state.category !== "ALL") {
    return video_data.filter((ele) =>
      state.category.includes(ele.singer.toUpperCase())
    );
  }
  return video_data;
}

function compose_fn(state, ...args) {
  return (data) => {
    return args.reduce((accum, curr) => curr(accum, state), data);
  };
}

export const filteration = (data, state) => {
  return compose_fn(state, category_handle)(data);
};
