import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import { getCookie } from "../../utils/utils";
import { COOKIE_NAMES } from "../../utils/constants";

import { saveTokenToCookie } from "../../store/actions";
import { asyncSubmitUserData } from "./Store/actions";

const mapStateToProps = (state) => {
  return {
    id_token: state.id_token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveTokenToCookieDispatch: (payload) => saveTokenToCookie(payload),
    submitUserDataDispatch: (payload) => asyncSubmitUserData(payload),
  };
};

export default compose(
  withState("isLoadingBtn", "setIsLoadingBtn", false),
  withState("isSuccessLogin", "setIsSuccessLogin", false),
  withState("techLabels", "setTechLabels", []),
  withState("addLabels", "setAddLabels", []),
  withState("isChooseTechOptions", "setIsChooseTechOptions", false),
  withState("isChooseAddOptions", "setIsChooseAddOptions", false),
  withState("techLabelsChoosing", "setTechLabelsChoosing", [
    "Back-End",
    "Front-End",
    "Mobile",
  ]), // call api to get labels
  withState("addLabelsChoosing", "setAddLabelsChoosing", [
    "Marketing",
    "Leader",
    "Sales",
  ]), // call api to get labels
  withState("isKeepCurrentPage", "setIsKeepCurrentPage", true),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    checkingNavigatePage: (props) => () => {
      const {
        setIsSuccessLogin,
        setIsKeepCurrentPage,
        techLabels,
        isChooseTechOptions,
        isChooseAddOptions,
        addLabels,
      } = props;

      if (!isChooseTechOptions && !isChooseAddOptions) {
        setTimeout(
          () =>
            setIsKeepCurrentPage(
              techLabels.length === 0 || addLabels.length === 0
            ),
          3000
        );
        setTimeout(() => setIsSuccessLogin(true), 5000);
      }
    },
  }),
  withHandlers({
    onChangeTechLabels: (props) => ({ name, checked }) => {
      const { setTechLabels, techLabels } = props;
      if (checked) {
        setTechLabels([...techLabels, name]);
        return;
      }
      setTechLabels(techLabels.filter((label) => label !== name));
    },
    onChangeAddLabels: (props) => ({ name, checked }) => {
      const { setAddLabels, addLabels } = props;
      if (checked) {
        setAddLabels([...addLabels, name]);
        return;
      }
      setAddLabels(addLabels.filter((label) => label !== name));
    },
    onPressLoginButton: (props) => async (fbLink) => {
      const {
        setIsLoadingBtn,
        setTechLabels,
        setAddLabels,
        setIsChooseTechOptions,
        setIsChooseAddOptions,
        checkingNavigatePage,
        saveTokenToCookieDispatch,
        submitUserDataDispatch,
        techLabels,
        addLabels,
      } = props;
      const { userName, fbUrl, techKnowledge, addKnowledge } = fbLink;

      await setIsLoadingBtn(true);
      submitUserDataDispatch({
        userName,
        fbUrl,
        techKnowledge: techLabels.length > 0 ? techLabels : techKnowledge,
        addKnowledge: addLabels.length > 0 ? addLabels : addKnowledge,
      })
        .then(async (response) => {
          const { techHandler, addHandler, token } = response;
          if (token) {
            await saveTokenToCookieDispatch(token);
          }
          if (techHandler.classified) {
            await setIsChooseTechOptions(false);
            await setTechLabels(techHandler.labels);
          } else {
            await setIsChooseTechOptions(true);
          }

          if (addHandler.classified) {
            await setIsChooseAddOptions(false);
            await setAddLabels(addHandler.labels);
          } else {
            await setIsChooseAddOptions(true);
          }
          await setIsLoadingBtn(false);
          checkingNavigatePage();
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }),
  lifecycle({
    componentDidMount() {
      const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
      // if (token) {
      //   window.location.href = "http://localhost:300/home";
      // }

      window.location.href = `${process.env.REACT_APP_URL}/home`;
    },
  })
);
