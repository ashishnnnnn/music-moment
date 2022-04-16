export function UserDataReducer(state, action) {
  const action_type = action.type;
  switch (action_type) {
    case "ADD_TO_LIKED":
      const new_liked_video_after_add = action.payload;
      localStorage.setItem(
        "my_liked_video",
        JSON.stringify(new_liked_video_after_add)
      );
      return { ...state, liked_video: new_liked_video_after_add };
    case "REMOVE_FROM_LIKED":
      const new_liked_video_after_remove = action.payload;
      localStorage.setItem(
        "my_liked_video",
        JSON.stringify(new_liked_video_after_remove)
      );
      return { ...state, liked_video: new_liked_video_after_remove };
    case "RESET":
      return { liked_video: [], watch_later: [], playlist: [] };
    default:
      return state;
  }
}
