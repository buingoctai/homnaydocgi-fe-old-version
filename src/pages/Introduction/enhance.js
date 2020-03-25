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
    checkingNavigatePage: async props => {
      const {
        setIsSuccessLogin,
        setIsKeepCurrentPage,
        techLabels,
        isChooseTechOptions,
        isChooseAddOptions,
        addLabels
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
        .then(async ({ predictiveTech, predictiveAdd }) => {
          // Create fake respoonse
          const predictiveTechFake = {
            intentTech: {
              confidence: 0.81,
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
          const predictiveAddFake = {
            intentAdd: {
              confidence: 0.71,
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
          //-------------------------------
          const { intentTech } = predictiveTechFake;
          const { intentAdd } = predictiveAddFake;

          if (intentTech.confidence < 0.7) {
            await setIsChooseTechOptions(intentTech.confidence < 0.7);
          } else {
            await setTechLabels(["Back-End", "Front-End"]);
          }

          await setIsLoadingBtn(false);
          if (intentAdd.confidence < 0.7) {
            await setIsChooseAddOptions(intentAdd.confidence < 0.7);
            await checkingNavigatePage();
          } else {
            await setAddLabels(["Marketing", "Leader"]);
            await checkingNavigatePage();
          }
        })
        .catch(error => console.log(error));
    }
  }),
  lifecycle({})
);
