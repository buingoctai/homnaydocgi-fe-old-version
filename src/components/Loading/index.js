import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    obb: {
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        position: 'relative',
        animation: '$obbAmi 0.5s linear 0s infinite alternate',
        margin: "0px 2px",
        borderRadius: '50%'
    },
    "@keyframes obbAmi": {
        '0%': { backgroundColor: 'red', top: '10px', },
        '50%': { backgroundColor: 'blue', top: '5px' },
        '100%': { backgroundColor: 'red', top: '0px' }
    },
    even: {
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        position: 'relative',
        animation: '$evenAmi 0.5s linear 0s infinite alternate',
        margin: "0px 2px",
        borderRadius: '50%'


    },
    "@keyframes evenAmi": {
        '0%': { backgroundColor: 'red', top: '0px', },
        '50%': { backgroundColor: 'blue', top: '5px' },
        '100%': { backgroundColor: 'red', top: '10px' }
    },
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <div style={{ display: "flex" }}>
            <div className={classes.obb} />
            <div className={classes.even} />
            <div className={classes.obb} />
            <div className={classes.even} />
        </div>



    );
}


export default Loading;