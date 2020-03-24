import { compose, withHandlers, withState, lifecycle } from "recompose";
import axios from "axios";

export default compose(
  withState("isLoadingBtn", "setIsLoadingBtn", false),
  withState("isSuccessLogin", "setIsSuccessLogin", false),
  withState("techLabels", "setTechLabels", []),
  withState("addLabels", "setAddLabels", []),
  withHandlers({
    onPressLoginButton: props => async fbLink => {
      const {
        setIsLoadingBtn,
        setIsSuccessLogin,
        setTechLabels,
        setAddLabels
      } = props;
      const { userName, fbUrl, techKnowledge, addKnowledge } = fbLink;

      await setIsLoadingBtn(true);
      // setTimeout(() => setIsLoadingBtn(false), 3000);
      // setTimeout(() => setIsSuccessLogin(true), 4000);
      await axios({
        method: "post",
        url: `http://localhost:8000/user/submitData`,
        headers: {},
        data: {
          userName,
          fbUrl,
          techKnowledge,
          addKnowledge
        }
      })
        .then(async res => {
          // await setIsLoadingBtn(false);
          console.log(res);
          setTechLabels(["Back-End", "Front-End"]);
        })
        .catch(error => console.log(error));

      await axios({
        method: "post",
        url: `http://localhost:8000/user/submitData`,
        headers: {},
        data: {
          userName,
          fbUrl,
          techKnowledge,
          addKnowledge
        }
      })
        .then(async res => {
          await setIsLoadingBtn(false);
          setAddLabels(["Marketing", "Leader"]);
        })
        .catch(error => console.log(error));
    }
  }),
  lifecycle({})
);
