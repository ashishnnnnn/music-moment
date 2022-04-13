export function FilterReducer(state, action) {
  const action_type = action.type.toUpperCase();
  switch (action_type) {
    case "CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
}
