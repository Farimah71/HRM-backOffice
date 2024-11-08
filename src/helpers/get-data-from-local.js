export const getDataFromLocalStorage = (key) => {
  if (localStorage.getItem("adminInfo")) {
    return JSON.parse(localStorage.getItem("adminInfo"))[key];
  }
};
