import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import NotificationDivider from "../../components/NotificationDivider";
import TopicOption from "./components/TopicOption";
import Header from "../../components/Header";
import MainFeaturedPost from "./PostWrap/MainFeaturedPost";
import FeaturedPost from "./PostWrap/FeaturedPost";
import DetailPost from "../../components/DetailPost";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import PostGrid from "../../components/PostGrid";
import FeedBack from "./components/FeedBack";
import AuthorPost from "./PostWrap/AuthorPost";
import enhance from "./enhance";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "90%",
    paddingLeft: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
    paddingRight: (props) => (props.is_maxWidth_500px ? "0px" : "none"),
  },
  featuredContent: {},
  featureGrid: {
    width: (props) => (props.is_maxWidth_500px ? "100%" : "50%"),
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  totalContentLoadingWrap: {
    height: "100%",
    width: "100%",
    marginTop: "200px",
    marginBottom: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMessage: {
    display: "flex",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
}));

const Blog = (props) => {
  const responsiveObj = {
    is_maxWidth_500px: useMediaQuery("(max-width:500px)"),
    is_maxWidth_1000px: useMediaQuery("(max-width:1000px)"),
    is_minWidth_2000px: useMediaQuery("(min-width:2000px)"),
  };
  const {
    isOpenNotification,
    isOpenFeedBack,
    isOpenChoseTopic,
    isLoadingPage,
    isLoadingSubPage,
    isOpenDetaiContainer,
    isShowPaging,
    allTopic,
    userName,
    currentPageIndex,
    detailPost,
    showingPost,
    mainPosts,
    featuredPosts,
    allPost,
    isBookMarkedPost,
    postList,
  } = props;

  const {
    onHandleOpenDetailContainer,
    onGetFeaturedTopic,
    onSubmitFeedBack,
    onSaveListPost,
    onUnSaveListPost,
    setIsOpenNotification,
    setIsOpenChoseTopic,
    setIsOpenFeedBack,
  } = props;

  const {_onClickSusbribeToPushNotification, _onClickSendSubscriptionToServer, _onClickSendNotification} = props;
  const classes = useStyles({ ...responsiveObj });

  const authorData = {
    imageList: [
      "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/91651356_10221659159173576_3247397447923662848_o.jpg?_nc_cat=100&_nc_sid=174925&_nc_ohc=pp_EiaNhDC0AX_EUZ74&_nc_ht=scontent.fsgn5-5.fna&oh=4e857736da7d671473062711d27258cc&oe=5F274795",
      "https://scontent.fdad3-3.fna.fbcdn.net/v/t1.0-9/26230148_10214748987063592_8377186319034611906_n.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=uvu6Qu3c240AX_Osvq-&_nc_ht=scontent.fdad3-3.fna&oh=aed9cb0f661f270fe165ed60fff689e1&oe=5F2612A3",
    ],
    infor: [
      {
        name: "Tuan Nguyen",
        description: "CTO tại VCCORP",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/38149369_10216412207723069_415017780664860672_n.jpg?_nc_cat=107&_nc_sid=a4a2d7&_nc_ohc=SNk8DlYsadEAX_xbwhD&_nc_ht=scontent-hkt1-1.xx&oh=cc84562c81babdbcbd4c91a35899e995&oe=5F2E649E",
      },
      {
        name: "Viet Cv",
        description: "Product Owner tại CodeLearn.io",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/61579806_2457966960933765_4055868803093889024_o.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=AI3p-BW2S5kAX9eW_TW&_nc_ht=scontent-hkt1-1.xx&oh=33a582672bb9f08722ecd2ebee71fc81&oe=5F3003DE",
      },
      {
        name: "Sơn Đức Nguyễn",
        description: "Chairman tại Học viện Thương hiệu Plato",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/90082720_10158060669284910_2574090328466259968_o.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=S0uttLvccGsAX_J4Bmp&_nc_ht=scontent-hkt1-1.xx&oh=ce072c04c7af7042c7346c0f014f5c6a&oe=5F2EF1AB",
      },
      {
        name: "Nguyen Phi Van",
        description: "Board Advisor at Austria-Vietnam Innovation Council",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/106505010_1405071963215891_7426207842881977826_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=OYaMfoVH8J8AX83AUDz&_nc_ht=scontent-hkt1-1.xx&oh=8ed8aa8efaae51e21548cca0e50e9790&oe=5F2CF107",
      },
      {
        name: "Đào Trung Thành",
        description: "Giám đốc Kỹ thuật (CTO), MVV Group",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/87128860_10216625605613451_7306121918938087424_o.jpg?_nc_cat=104&_nc_sid=a4a2d7&_nc_ohc=T3UgfgFG9C4AX_9Sysr&_nc_ht=scontent-hkt1-1.xx&oh=c2c21a2979333892f721c969eec01686&oe=5F310977",
      },

      {
        name: "David Trieu",
        description:
          "Project Director tại Hệ Sinh Thái Khởi Nghiệp IoT Việt Nam",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t31.0-8/20900824_1147057698772455_2980176105139356507_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=Nv4zjWZ7IXkAX-STMvm&_nc_ht=scontent-hkt1-1.xx&oh=cf42e18bcef0fbc41a64a3de75620206&oe=5F2B2C7C",
      },
      {
        name: "Lê Công Thành",
        description: "President tại InfoRe Technology",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/106123562_10157564889651172_3351400229146310688_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_ohc=I7yWnCCIRnwAX_QbAOU&_nc_ht=scontent-hkt1-1.xx&oh=e7eda2d02ad707253db70e7966ad8800&oe=5F2ECAC7",
      },
      {
        name: "Truong Hoang Ly Phi",
        description:
          "Vice Chairwoman tại Young Businesspeople Association of Ho Chi Minh city",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/106334396_10218340052674846_2806064368343971177_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=UeiS6SmJN2EAX8mHJXd&_nc_ht=scontent-hkt1-1.xx&oh=c02b262209d8690fda4bb6f45aa4eb3c&oe=5F2EDB55",
      },

      {
        name: "Thanh N. Truong",
        description: "Phó Hiệu trưởng tại Trường Đại học Văn Lang",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/83882074_10218559214863899_6642744394501849088_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=ZTiSsDSudsgAX_FgI_C&_nc_ht=scontent-hkt1-1.xx&oh=96846c539609c933baf148991af1c4f9&oe=5F300BC7",
      },
      {
        name: "Trieu Nguyen",
        description: "Owner and Founder tại USPA.tech",
        image:
          "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/83406528_10157169667584506_4978266553792331776_o.jpg?_nc_cat=109&_nc_sid=a4a2d7&_nc_ohc=VgyQf8_iPy8AX-2uxDk&_nc_ht=scontent-hkg4-1.xx&oh=0437a89cd7625ffd8a0286927bb383a4&oe=5F327840",
      },

      {
        name: "Minh Đào",
        description: "Chief Ninja tại Trạm Đọc - Read Station",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
      },
      {
        name: "Nguyễn Đức Hiển",
        description: "Phó tổng biên tập Báo Pháp Luật TP HCM",
        image:
          "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/106986444_10158826604819090_8082621413082796810_n.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=TIt4_7qrI-MAX9E0BcG&_nc_ht=scontent.fsgn5-6.fna&oh=1764a985382720b27fddf17889bc2eed&oe=5F30D5ED",
      },
      {
        name: "Linh Mạnh Nguyễn",
        description:
          "Giảng dạy tại LITADO - Trường Đào Tạo Cao Cấp Digital Marketing",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/35923072_1126203024185544_6311169363017728000_n.jpg?_nc_cat=104&_nc_sid=a4a2d7&_nc_ohc=4W2QbfysomUAX-cdVtb&_nc_ht=scontent-hkt1-1.xx&oh=8400955b237213a36766fc42964204ec&oe=5F2EE9C8",
      },
      {
        name: "Van Vu",
        description: "Professor of Mathematics tại Yale University",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/68782080_2583418198356012_7066215585633271808_n.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=CuGwuzSaAFcAX_6skIi&_nc_ht=scontent-hkt1-1.xx&oh=b0dba1688064ead5c9a73690ff80d49b&oe=5F2F4ADF",
      },
      {
        name: "Nghia Minh Le",
        description: "Director of Marketplace System tại Tiki",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/75242248_10214203181944500_4552056994592194560_n.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=TcAk9iXSOTsAX9eG5w-&_nc_ht=scontent-hkt1-1.xx&oh=fe32111c9f79fcb037b232938f753a94&oe=5F328C9D",
      },
      {
        name: "Viet Tran",
        description: "Từng làm Software Architect tại Sendo",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/67761882_2851363918225042_6148802024222752768_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=MhJTnUjaBTkAX9tjWdP&_nc_ht=scontent-hkt1-1.xx&oh=5be299d2ba73913abba08e042df16f09&oe=5F2FA3C6",
      },
      {
        name: "Trần Lâm",
        description: "Co-Founder tại ATP Web",
        image: "",
      },
      {
        name: "Thanhtu Pham",
        description: "CTO tại Agiletech Vietnam",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/35360470_2132271237026787_4450099831104339968_n.jpg?_nc_cat=104&_nc_sid=a4a2d7&_nc_ohc=GUK_fRKEJGAAX8mEMNC&_nc_ht=scontent-hkt1-1.xx&oh=e96e853cb879be8184ee58f28211b8e4&oe=5F30F89E",
      },
      {
        name: "Bùi Ngọc Tài",
        description: "Associate Software Engineer tại Zalo",
        image:
          "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/83190373_1035991570101293_2405762880734494720_n.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=Ke3SmsgttSsAX_1D1zj&_nc_ht=scontent-hkt1-1.xx&oh=b674dd01f7f12ae06d323a683b64987a&oe=5F31331B",
      },
    ],
  };

  const authorList = {
    image: [
      "https://uploads-ssl.webflow.com/5be2baf97a00671aef1118cd/5e31a33d94b1c0d5e4b58f99_belle%20buzzwords.png",
      "https://www.intheblack.com/-/media/intheblack/allimages/workplace/2016/business-buzzwords.jpg?h=476&la=en&mw=806&w=806&rev=c39bd5246fcd4ded832348c5b8b591ad",
      "https://miro.medium.com/max/3000/1*z_tMP7UnBamSyDkB1rav3Q.png",
    ],
    author: [...authorData.infor],
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container}>
        <Header
          title="HÔM NAY ĐỌC GÌ?"
          currentUser={userName}
          postList={postList}
          setIsOpenNotification={setIsOpenNotification}
          isOpenNotification={isOpenNotification}
          _onClickSusbribeToPushNotification={_onClickSusbribeToPushNotification}
          // _onClickSendSubscriptionToServer={_onClickSendSubscriptionToServer}
          _onClickSendNotification={_onClickSendNotification}
        />
        {isLoadingPage && (
          <div className={classes.totalContentLoadingWrap}>
            <span className={classes.loadingMessage}>Đang tải bài viết</span>
            <LinearProgress
              color="primary"
              style={{ height: "3px", width: "20%" }}
            />
          </div>
        )}

        {isOpenNotification && (
          <NotificationDivider
            setIsOpenChoseTopic={setIsOpenChoseTopic}
            setIsOpenFeedBack={setIsOpenFeedBack}
          />
        )}
        {TopicOption({
          visible: isOpenChoseTopic,
          setIsOpenChoseTopic: setIsOpenChoseTopic,
          allTopic: allTopic,
          onGetFeaturedTopic: onGetFeaturedTopic,
        })}

        {FeedBack({
          visible: isOpenFeedBack,
          onSubmitFeedBack: onSubmitFeedBack,
        })}
 
        {!isLoadingPage && (
          <main>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 0",
                height: "230px",
                maxHeight: "235px",
                marginBottom: "1%",
              }}
            >
              <MainFeaturedPost
                post={mainPosts}
                responsiveObj={responsiveObj}
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
              {!responsiveObj.is_maxWidth_500px && (
                <AuthorPost
                  type="image"
                  title="Từ khóa hot"
                  data={authorList.image}
                  navigateTime={3000}
                  responsiveObj={responsiveObj}
                />
              )}
              {!responsiveObj.is_maxWidth_500px && (
                <AuthorPost
                  type="infor"
                  title="Chuyên gia"
                  data={authorList.author}
                  navigateTime={1500}
                  responsiveObj={responsiveObj}
                />
              )}
            </div>
            <div className={classes.featuredContent}>
              <Grid container spacing={4} className={classes.featureGrid}>
                <FeaturedPost
                  key="featured post"
                  post={featuredPosts}
                  responsiveObj={responsiveObj}
                  onHandleOpenDetailContainer={onHandleOpenDetailContainer}
                />
              </Grid>
              <div className={classes.developing} />
            </div>

            <Grid container spacing={5} className={classes.mainGrid}>
              <Main title="Tất cả" />
              <PostGrid
                posts={allPost.data}
                totalRecord={Math.ceil(allPost.totalRecord / 3)}
                isShowPaging={isShowPaging}
                currentPageIndex={currentPageIndex}
                responsiveObj={responsiveObj}
                onHandleOpenDetailContainer={onHandleOpenDetailContainer}
              />
            </Grid>
          </main>
        )}
        {isOpenDetaiContainer && (
          <DetailPost
            post={detailPost}
            showingPost={showingPost}
            isOpenDetaiContainer={isOpenDetaiContainer}
            responsiveObj={responsiveObj}
            loading={isLoadingSubPage}
            isBookMarkedPost={isBookMarkedPost}
            onHandleOpenDetailContainer={onHandleOpenDetailContainer}
            onSaveListPost={onSaveListPost}
            onUnSaveListPost={onUnSaveListPost}
          />
        )}

        {/*-----------------------------------Nhóm thông báo-----------------------------------------------*/}
      </Container>
      <Footer description="Mọi sao chép nội dung bài viết không ghi rõ nguồn đều vi phạm quyền sở hữu" />
    </React.Fragment>
  );
};
export default enhance(Blog);
