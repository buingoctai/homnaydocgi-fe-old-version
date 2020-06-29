import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const { red, blue, green } = require('@material-ui/core/colors');
const Button = require('@material-ui/core/Button').default;
const userStyles = makeStyles((theme) => ({
    mainPostContainer: {
        flexGrow: 3,
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    imageWrap: {
        width: (props) => (props.is_maxWidth_500px ? "100%" : "50%"),
        position: "relative",
        transition: "transform 0.3s",
        "&:hover": {
            transform: "scale(1.05)",
        },
        titleWrap: {
            position: "absolute",
            bottom: "8px",
            left: "16px",
            width: "50%",
        },
        title: {
            fontSize: "20px",
            color: "#ffff",
        },
    }
}));

export default function AuthorArticlePost(props) {
    const { post, responsiveObj, onHandleOpenDetailContainer } = props;
    const classes = userStyles({ ...responsiveObj });

    const content = [   {title: 'A1', description: 'Author1', button: 'test', image: 'red'},
                        {title: 'A2', description: 'Author2', button: 'test', image: 'blue'},
                        {title: 'A3', description: 'Author3', button: 'test', image: 'green'},
                    ]
    return (
        <Slider touchDisabled={true}>
            {content.map((item, index) => (
                <div
                    key={index}
                    style={{ background: item.image }}
                >
                    {/* <div className="center">
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <button>{item.button}</button>
                    </div> */}
                </div>
            ))}
        </Slider>
    )
}

AuthorArticlePost.propTypes = {
    post: PropTypes.object,
};