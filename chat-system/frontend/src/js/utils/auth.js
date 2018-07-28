const jwtTokenKey = "auth-token"

const setToken = (jwtToken) => {
  localStorage.setItem(jwtTokenKey, jwtToken);
};

export const confirmLogin = (jwtToken) => {
  setToken(jwtToken);
};

export const getJwtToken = () => {
  return localStorage.getItem(jwtTokenKey);
}

export const isLoggedIn = () => {
  const jwtToken = getJwtToken();
  return !!jwtToken
};

export const confirmLogout = () => {
  localStorage.removeItem(jwtTokenKey);
  return new Promise((resolve, reject) => resolve(true));
};
