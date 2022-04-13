export const getPageName = (ele_name, token) => {
  if (ele_name === "Home") {
    return "/";
  } else if (ele_name === "Explore") {
    return "/explore";
  } else {
    if (!token) {
      return "/login";
    } else {
      return "/" + ele_name.toLowerCase();
    }
  }
};
