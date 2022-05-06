import { v4 as uuid } from "uuid";

export function VideoNotesReducer(state, action) {
  const action_type = action.type;
  const { _id, notes } = action.payload;
  switch (action_type) {
    case "ADD_NEW_VIDEO_NOTES":
      return {
        ...state,
        [_id]: [{ _id: uuid(), time: notes.time, text: notes.text }],
      };
    case "ADD_NOTES_TO_PRESENT_VIDEO_NOTES":
      return {
        ...state,
        [_id]: [
          ...state[_id],
          { _id: uuid(), time: notes.time, text: notes.text },
        ],
      };
  }
}
