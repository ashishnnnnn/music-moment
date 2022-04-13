import { createContext, useContext, useReducer } from "react";
import { FilterReducer } from "../Reducer/FilterReducer";

const FilterContext = createContext(null);

const useFilter = () => useContext(FilterContext);

const initial_filter_state = {
  category: "ALL",
};

const FilterProvider = ({ children }) => {
  const [filter_state, setFilterState] = useReducer(
    FilterReducer,
    initial_filter_state
  );
  return (
    <FilterContext.Provider value={{ filter_state, setFilterState }}>
      {children}
    </FilterContext.Provider>
  );
};

export { useFilter, FilterProvider };
