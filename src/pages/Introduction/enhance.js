import { compose, withHandlers, withState, lifecycle } from "recompose";
import axios from "axios";

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
    "Mobile"
  ]), // call api to get labels
  withState("addLabelsChoosing", "setAddLabelsChoosing", [
    "Marketing",
    "Leader",
    "Sales"
  ]), // call api to get labels
  withState("isKeepCurrentPage", "setIsKeepCurrentPage", true),
  withHandlers({
    checkingNavigatePage: props => async token => {
      const {
        saveTokenDispatch,
        setIsSuccessLogin,
        setIsKeepCurrentPage,
        techLabels,
        isChooseTechOptions,
        isChooseAddOptions,
        addLabels
      } = props;

      if (!isChooseTechOptions && !isChooseAddOptions) {
        await saveTokenDispatch(token);
        setTimeout(
          () =>
            setIsKeepCurrentPage(
              techLabels.length === 0 || addLabels.length === 0
            ),
          3000
        );
        setTimeout(() => setIsSuccessLogin(true), 5000);
      }
    }
  }),
  withHandlers({
    onChangeTechLabels: props => ({ name, checked }) => {
      const { setTechLabels, techLabels } = props;
      if (checked) {
        setTechLabels([...techLabels, name]);
        return;
      }
      setTechLabels(techLabels.filter(label => label !== name));
    },
    onChangeAddLabels: props => ({ name, checked }) => {
      const { setAddLabels, addLabels } = props;
      if (checked) {
        setAddLabels([...addLabels, name]);
        return;
      }
      setAddLabels(addLabels.filter(label => label !== name));
    },
    onPressLoginButton: props => async fbLink => {
      const {
        setIsLoadingBtn,
        setTechLabels,
        setAddLabels,
        setIsChooseTechOptions,
        setIsChooseAddOptions,
        checkingNavigatePage,
        techLabels,
        addLabels
      } = props;
      const { userName, fbUrl, techKnowledge, addKnowledge } = fbLink;

      await setIsLoadingBtn(true);
      await axios({
        method: "post",
        url: `http://localhost:8000/user/submitData`,
        headers: {},
        data: {
          userName,
          fbUrl,
          techKnowledge: techLabels.length > 0 ? techLabels : techKnowledge,
          addKnowledge: addLabels.length > 0 ? addLabels : addKnowledge
        }
      })
        .then(async res => {
          const { techHandler, addHandler, token } = res.data;

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
          checkingNavigatePage(token);
        })
        .catch(error => console.log(error));
    }
  }),
  lifecycle({})
);
