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
    case "ADD_TO_WATCH_LATER":
      const new_watch_later_after_add = action.payload;
      localStorage.setItem(
        "my_watch_later_video",
        JSON.stringify(new_watch_later_after_add)
      );
      return { ...state, watch_later: new_watch_later_after_add };

    case "REMOVE_FROM_WATCH_LATER":
      const new_watch_later_after_remove = action.payload;
      localStorage.setItem(
        "my_watch_later_video",
        JSON.stringify(new_watch_later_after_remove)
      );
      return { ...state, watch_later: new_watch_later_after_remove };
    case "ADD_TO_HISTORY":
      const new_history_after_add = action.payload;
      localStorage.setItem("my_history", JSON.stringify(new_history_after_add));
      return { ...state, history: new_history_after_add };
    case "REMOVE_FROM_HISTORY":
      const new_history_after_remove = action.payload;
      localStorage.setItem(
        "my_history",
        JSON.stringify(new_history_after_remove)
      );
      return { ...state, history: new_history_after_remove };
    case "REMOVE_ALL_HISTORY":
      const new_history_after_remove_all = action.payload;
      localStorage.setItem(
        "my_history",
        JSON.stringify(new_history_after_remove_all)
      );
      return { ...state, history: new_history_after_remove_all };
    case "RESET":
      return { liked_video: [], watch_later: [], playlist: [], history: [] };
    default:
      return state;
  }
}
