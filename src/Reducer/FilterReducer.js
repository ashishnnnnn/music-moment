export function FilterReducer(state, action) {
  const action_type = action.type.toUpperCase();
  console.log(action_type);
  console.log(action);
  switch (action_type) {
    case "CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
}
