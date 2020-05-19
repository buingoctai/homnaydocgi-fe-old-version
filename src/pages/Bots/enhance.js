import { connect } from "react-redux";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import {
  asyncGetAllArticle,
  asynGetAudioArticle,
  asynCreateAudioArticle,
  saveAudioList,
} from "../../pages/Bots/Store/actions";

const mapStateToProps = (state) => {
  const { readNewReducers } = state;
  return {
    allArticle: readNewReducers.allArticle,
    audioList: readNewReducers.audioList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllArticleDispatch: (payload) => asyncGetAllArticle(payload),
    getAudioArticleDispatch: (payload) => asynGetAudioArticle(payload),
    createAudioArticleDispatch: (payload) => asynCreateAudioArticle(payload),
    saveAudioListDispatch: (payload) => dispatch(saveAudioList(payload)),
  };
};
export default compose(
  withState("showingPost", "setShowingPost", {}),
  withState("currentAudioArticle", "setCurrentAudioArticle", {}),
  withState("currentPageIndex", "setCurrentPageIndex", 1),
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onClickListenArticle: (props) => ({
      id,
      content,
      setCurrentAudio,
      setIsLoading,
    }) => {
      const {
        audioList,
        getAudioArticleDispatch,
        createAudioArticleDispatch,
        saveAudioListDispatch,
        setCurrentAudioArticle,
      } = props;

      const [currentAudioArticle] = audioList.filter((item) => item.id === id);
      if (currentAudioArticle) {
        setCurrentAudioArticle(currentAudioArticle);
        setCurrentAudio(currentAudioArticle.audio[0]);
        setIsLoading(false);
      } else {
        getAudioArticleDispatch({ id: id })
          .then((res) => {
            if (res.audio.length === 0) {
              createAudioArticleDispatch({ id: id, text: content })
                .then((res) => {
                  const newAudioList = [...audioList, res];
                  saveAudioListDispatch(newAudioList);
                  setCurrentAudioArticle(res);
                  setIsLoading(false);
                })
                .catch();
            } else {
              const newAudioList = [...audioList, res];
              saveAudioListDispatch(newAudioList);
              setCurrentAudioArticle(res);
              setIsLoading(false);
            }
          })
          .catch();
      }
    },
    onChangePageIndex: (props) => (pageIndex) => {
      const { getAllArticleDispatch, setCurrentPageIndex } = props;
      getAllArticleDispatch({
        paging: { pageIndex: pageIndex, pageSize: 10 },
        orderList: { orderType: "DESC", orderBy: "title" },
      })
        .then(() => {
          setCurrentPageIndex(pageIndex);
        })
        .catch();
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getAllArticleDispatch({
        paging: { pageIndex: 1, pageSize: 10 },
        orderList: { orderType: "DESC", orderBy: "title" },
      });
    },
  })
);
