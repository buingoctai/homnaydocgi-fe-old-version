import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
<<<<<<< HEAD
// import Link from "@material-ui/core/Link";
// import Typography from "@material-ui/core/Typography";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './style.css';

const userStyles = makeStyles((theme) => ({
    mainContainer: {
        flexGrow: 2,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "106.5%",
        width: "100%",
        textAlign: "center",
        marginLeft: "2%",
        transition: "transform 0.3s",
        "&:hover": {
            transform: "scale(1.02)",
        },
        cursor: "pointer"
    },
    button: {
        position: "absolute",
        left: "5%",
        bottom: "10%",
    },
    title: {
        position: "sticky",
        fontSize: "20px",
        color: "#ffff",
        top: "5%"
    },
    description: {
        position: "sticky",
        fontSize: "13px",
        top: "15%"
    }
=======
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import "./style.css";

const { red, blue, green } = require("@material-ui/core/colors");
const userStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "106.5%",
    width: "100%",
    textAlign: "center",
    marginLeft: "2%",
    cursor: "pointer",
  },
  button: {
    position: "absolute",
    left: "5%",
    bottom: "10%",
  },
  titleWrap: {
    position: "sticky",
    fontSize: "20px",
    top: "5%",
  },
  descriptionWrap: {
    position: "sticky",
    fontSize: "13px",
    top: "15%",
  },
>>>>>>> 91cd517... adjust slideshow, add button back, adjust css
}));

const AuthorPost = (props) => {
  const { responsiveObj, type, title, data, navigateTime } = props;
  const classes = userStyles({ ...responsiveObj });
  const content = [
    { title: "A1", description: "Author1", button: "Read more", image: "red" },
    { title: "A2", description: "Author2", button: "Read more", image: "blue" },
    {
      title: "A3",
      description: "Author3",
      button: "Read more",
      image: "green",
    },
  ];

  const slideWrap = () => {
    if (type === "image") {
      return data.map((item, index) => (
        <div>
          <img src={item} width="100%" alt="" />
        </div>
      ));
    }

<<<<<<< HEAD
    const content = [   {title: 'A1', description: 'Author1', button: 'Read more', image: 'red'},
                        {title: 'A2', description: 'Author2', button: 'Read more', image: 'blue'},
                        {title: 'A3', description: 'Author3', button: 'Read more', image: 'green'},
                    ]
    return (
        <div className={classes.mainContainer}>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#551A99", textAlign: "left" }}>
                Tác giả
            </span>
            <Slider touchDisabled={false} autoplay={3000}>
                {content.map((item, index) => (
                    <div
                        key={index}
                        style={{ background: item.image}}
                    >
                        <div>
                            <h1 className={classes.title}>{item.title}</h1>
                            <p className={classes.description}>{item.description}</p>
                            <a className= {["btn-more", classes.button].join(" ")} href="#">{item.button}</a>
                        </div>
                    </div>
                ))}
            </Slider>
=======
    return data.map((item, index) => (
      <div key={index} style={{ background: "#C1C1C1" }}>
        <div>
          <h1 className={classes.titleWrap}>{item.name}</h1>
          <p className={classes.descriptionWrap}>{item.description}</p>
          <a
            className={["btn-more", classes.button].join(" ")}
            target="_blank"
            href={`https://www.facebook.com/search/top?q=+${item.name}`}
          >
            Tìm kiếm trên facebook
          </a>
>>>>>>> 91cd517... adjust slideshow, add button back, adjust css
        </div>
      </div>
    ));
  };

  return (
    <div className={classes.container}>
      <span
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#551A99",
          textAlign: "left",
        }}
      >
        {title}
      </span>
      <Slider
        touchDisabled={false}
        autoplay={navigateTime}
        previousButton={<NavigateBeforeIcon />}
        nextButton={<NavigateNextIcon />}
      >
        {slideWrap()}
      </Slider>
    </div>
  );
};

AuthorPost.propTypes = {
  post: PropTypes.object,
};

export default AuthorPost;
