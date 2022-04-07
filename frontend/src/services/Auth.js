export const TOKEN_KEY = "@tindev-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const loginToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logoutToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};