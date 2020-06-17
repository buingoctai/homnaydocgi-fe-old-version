const allDevelop = {
  REACT_APP_API: "http://localhost:8080",
  REACT_APP_URL: "http://localhost:3000",
};

const develop = {
  REACT_APP_API: "https://homnaydocgi-api.herokuapp.com",
  REACT_APP_URL: "http://localhost:3000",
};

const pro = {
  REACT_APP_API: "https://homnaydocgi-api.herokuapp.com",
  REACT_APP_URL: "https://homnaydocgi.herokuapp.com",
};

const dev = process.env.REACT_APP_STAGE === "allDev" ? allDevelop : develop;
const config = process.env.REACT_APP_STAGE === "pro" ? pro : dev;

export default {
  ...config,
};
