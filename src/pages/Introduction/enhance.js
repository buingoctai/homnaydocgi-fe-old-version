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
  withHandlers({
    checkingNavigatePage: props => {
      const {
        setIsSuccessLogin,
        isChooseTechOptions,
        isChooseAddOptions
      } = props;
      if (!isChooseTechOptions && !isChooseAddOptions) {
        setTimeout(() => setIsSuccessLogin(true), 3000);
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
        checkingNavigatePage
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
          techKnowledge,
          addKnowledge
        }
      })
        .then(async res => {
          const fakeRes = {
            intent: {
              confidence: 0.79,
              name: "greet"
            },
            intent_ranking: [
              {
                confidence: 0.9683540388643863,
                name: "greet"
              },
              {
                confidence: 0.0304360804949038,
                name: "findRestaurantsByCity"
              },
              {
                confidence: 0.0009200842500758811,
                name: "negative"
              },
              {
                confidence: 0.0002700520294281852,
                name: "affirmative"
              },
              {
                confidence: 0.0000197443612058981,
                name: "bye"
              }
            ],
            text: "long time no meet."
          };
          const { intent } = fakeRes;
          const { confidence, name } = intent;
          if (confidence < 0.7) {
            await setIsChooseTechOptions(confidence < 0.7);
          } else {
            setTechLabels(["Back-End", "Front-End"]);
          }
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
          const fakeRes = {
            intent: {
              confidence: 0.99,
              name: "greet"
            },
            intent_ranking: [
              {
                confidence: 0.9683540388643863,
                name: "greet"
              },
              {
                confidence: 0.0304360804949038,
                name: "findRestaurantsByCity"
              },
              {
                confidence: 0.0009200842500758811,
                name: "negative"
              },
              {
                confidence: 0.0002700520294281852,
                name: "affirmative"
              },
              {
                confidence: 0.0000197443612058981,
                name: "bye"
              }
            ],
            text: "long time no meet."
          };
          await setIsLoadingBtn(false);
          const { intent } = fakeRes;
          const { confidence, name } = intent;

          if (confidence < 0.7) {
            await setIsChooseAddOptions(confidence < 0.7);
            checkingNavigatePage();
          } else {
            await setAddLabels(["Marketing", "Leader"]);
            checkingNavigatePage();
          }
        })
        .catch(error => console.log(error));
    }
  }),
  lifecycle({})
);
