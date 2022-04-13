export function FilterReducer(state, action) {
  const action_type = action.type.toUpperCase();
  switch (action_type) {
    case "ALL":
      return { ...state, category: "ALL" };

    case "ARIJIT SINGH":
      return { ...state, category: "ARIJIT SINGH" };

    case "KK":
      return { ...state, category: "KK" };

    case "MOHIT CHAUHAN":
      return { ...state, category: "MOHIT CHAUHAN" };

    case "PAPON":
      return { ...state, category: "PAPON" };

    default:
      return state;
  }
}
