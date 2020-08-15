import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    // <Typography variant="body2" color="textSecondary" align="center">
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    // backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    backgroundColor: "rgba(128,128,130,0.5)",
    color: "#fff",
    padding: "10px 0",
  },
  container: {
    // display: "flex",
  },
  footerTop: {
    display: "flex",
    // justifyContent: "space-between",
    borderBottom: "3px solid #fff",
    margin: "5px 0",
    padding: "10px 0",
    flexFlow: "row wrap",
  },
  footerItem: {
    margin: "0 5px",
    flex: "1 0",
    // border: "1px solid #000",
    transition: "0.5s",
    // "&:hover": {
    //   backgroundColor: "#939",
    // },
  },
  footerLeft: {
    paddingRight: "1rem",
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    // alignItems: "center",
    // backgroundColor: "#939",
  },
  icon: {
    height: 50,
    width: 50,
  },
  linkContact: {
    display: "flex",
    justifyContent: "center",
  },
}));
export default function Footer(props) {
  const classes = useStyles();
  const { description } = props;

  return (
    <footer className={classes.footer}>
      <Container className={classes.container} maxWidth="lg">
        <div className={classes.footerTop}>
          <div className={`${classes.footerItem}  ${classes.footerLeft}`}>
            <div
              className="logo"
              style={{ height: 100, width: 100, backgroundColor: "#199" }}
            ></div>
            <div className="about">
              <h1>Về Chúng Tôi</h1>
              <Typography paragraph={true} align="justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                eu orci rhoncus, sollicitudin ante at, placerat risus. Lorem
                ipsum dolor.
              </Typography>
            </div>
          </div>
          <div className={`${classes.footerItem}  ${classes.footerContent}`}>
            <h1 style={{ textAlign: "center" }}>Thông Tin Liên Lạc</h1>
            <div>
              <h3>Email: </h3>
              <h3>Số điện thoại: </h3>
            </div>
            <div className={classes.linkContact}>
              <Link
                color="inherit"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/bui.ngoctai.71/",
                    "_blank"
                  )
                }
              >
                <FacebookIcon className={classes.icon} />
              </Link>
              <Link
                color="inherit"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/b%C3%B9i-ng%E1%BB%8Dc-t%C3%A0i-0010a6152/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bq8uomy%2BNRKit63nDG4gSfg%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_flagship3_feed-nav.settings_view_profile",
                    "_blank"
                  )
                }
                to=""
              >
                <LinkedInIcon className={classes.icon} />
              </Link>
            </div>
          </div>
          <div className={`${classes.footerItem} ${classes.footerContent}`}>
            <h1 style={{ textAlign: "center" }}>Đội Phát Triển</h1>
            <div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bot">
          <Typography variant="subtitle1" align="center" component="p">
            {description}
          </Typography>
          <Copyright />
        </div>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
