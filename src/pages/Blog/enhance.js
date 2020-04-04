import { compose, withHandlers, withState, lifecycle } from "recompose";
import { getCookie } from "../../utils/utils";
import { COOKIE_NAMES } from "../../utils/constants";
import axios from "axios";

export default compose(
  withState("currentUser", "setCurrentUser", ""),
  withState(
    "isNavigateSubmitPageNotifi",
    "setIsNavigateSubmitPageNotifi",
    false
  ),

  // withHandlers({}),
  lifecycle({
    componentDidMount() {
      const { setCurrentUser, setIsNavigateSubmitPageNotifi } = this.props;
      const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
      if (token) {
        // fetch user inform
        axios({
          method: "post",
          url: `http://localhost:8000/user/authencation`,
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => console.log(response))
          .catch(err => console.log(err));
      } else {
        setIsNavigateSubmitPageNotifi(true);
        setTimeout(() => setIsNavigateSubmitPageNotifi(false), 5000);
        setTimeout(
          () => (window.location.href = "http://localhost:3000/"),
          5000
        );
      }
    }
  })
);
