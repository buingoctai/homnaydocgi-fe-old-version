import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './style.css';

const { red, blue, green } = require('@material-ui/core/colors');
const Button = require('@material-ui/core/Button').default;
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
}));

export default function AuthorPost(props) {
    const { responsiveObj } = props;
    const classes = userStyles({ ...responsiveObj });

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
                            <a className= {["btn-more", classes.button].join(" ")}>{item.button}</a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

AuthorPost.propTypes = {
    post: PropTypes.object,
};