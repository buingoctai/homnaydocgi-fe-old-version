import { compose, withHandlers, withState } from "recompose";

export default compose(
  withState("isShowAddingForm", "setIsShowAddingForm", true),
  withState("isLoadingTable", "setIsLoadingTable", false),
  withHandlers({
    onNavigateListArticle: async props => {
      const { setIsShowAddingForm, setIsLoadingTable } = props;
      await setIsLoadingTable(true);
      setTimeout(() => setIsLoadingTable(false), 3000);
      setTimeout(() => setIsShowAddingForm(false), 4000);
    }
  })
);
