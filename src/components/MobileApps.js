import React, { useEffect } from "react";
import Lottie from "react-lottie";
import {
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import backArrow from "../assets/backArrow.svg";
import forwardArrow from "../assets/forwardArrow.svg";
import integrationAnimation from "../animations/integrationAnimation/data";
import swiss from "../assets/swissKnife.svg";
import access from "../assets/extendAccess.svg";
import engagement from "../assets/increaseEngagement.svg";
import CallToAction from "./ui/CallToAction";

const useStyles = makeStyles((theme) => ({
  heading: {
    maxWidth: "40em",
  },
  arrowContainer: {
    marginTop: "0.5em",
  },
  rowContainer: {
    paddingRight: "5em",
    paddingLeft: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "1.5em",
      paddingLeft: "1.5em",
    },
  },
}));

const MobileApps = (props) => {
  const { setSelectedIndex, setValue } = props;
  const theme = useTheme();
  const classes = useStyles();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: integrationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }

  return (
    <Grid container direction="column">
      <ScrollToTopOnMount />
      <Grid
        item
        container
        direction="row"
        className={classes.rowContainer}
        justifyContent={matchesMD ? "center" : undefined}
        style={{ marginTop: matchesXS ? "1em" : "2em" }}
      >
        <Hidden mdDown>
          <Grid
            item
            className={classes.arrowContainer}
            style={{ marginLeft: "-3.5em", marginRight: "1em" }}
          >
            <IconButton
              style={{ backgroundColor: "transparent" }}
              component={Link}
              to="/customsoftware"
              onClick={() => {
                setSelectedIndex(0);
              }}
            >
              <img src={backArrow} alt="Back to custom software" />
            </IconButton>
          </Grid>
        </Hidden>

        <Grid
          item
          container
          direction="column"
          className={classes.heading}
          align={matchesMD ? "center" : undefined}
        >
          <Grid item>
            <Typography variant="h2" gutterBottom>
              iOS/Android Development
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              Mobile Apps allow you to take your tools on the go.
            </Typography>
            <Typography variant="body1" paragraph>
              Weather you want an app for your customers, your employee, or
              yourself, we can build cross-platform native solutions for any
              part of your business process. This opens you up to a whole new
              world by taking advantage of your phone features like the camara,
              GPS, push notifications, and more.
            </Typography>
            <Typography variant="body1" paragraph>
              Convenience. Connection
            </Typography>
            <Typography variant="body1" paragraph>
              We create exactly what you want, exactly how you want it.
            </Typography>
          </Grid>
        </Grid>

        <Hidden mdDown>
          <Grid item className={classes.arrowContainer}>
            <IconButton
              style={{ backgroundColor: "transparent" }}
              component={Link}
              to="/websites"
              onClick={() => {
                setSelectedIndex(2);
              }}
            >
              <img src={forwardArrow} alt="Forward to websites Development" />
            </IconButton>
          </Grid>
        </Hidden>
      </Grid>

      <Grid
        item
        container
        className={classes.rowContainer}
        direction={matchesSM ? "column" : "row"}
        style={{ marginBottom: "15em", marginTop: "15em" }}
      >
        <Grid
          item
          container
          direction="column"
          md
          align={matchesSM ? "center" : undefined}
        >
          <Grid item>
            <Typography variant="h4">Integration</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              Our technology enables an innate interconnection between web and
              mobile applications, putting everything you need in one convenient
              place.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              This allows you to extend your reach, reinvent interactions, and
              develop a stronger relationship with your users than ever before.
            </Typography>
          </Grid>
        </Grid>
        <Grid item md>
          <Lottie options={defaultOptions} style={{ maxWidth: "20em" }} />
        </Grid>

        <Grid
          item
          container
          direction="column"
          md
          align={matchesSM ? "center" : "right"}
        >
          <Grid item>
            <Typography variant="h4">Simultaneous Platform Support</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              Our cutting edge development process allows us to create apps for
              iPhone, Android and tablets - all at the same time.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              This significantly reduces costs and creates a more unified brand
              experience across all devices.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction={matchesMD ? "column" : "row"}
        className={classes.rowContainer}
        align="center"
        style={{ marginBottom: "15em" }}
      >
        <Grid item container direction="column" md alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Extend Functionality
            </Typography>
          </Grid>
          <Grid item>
            <img src={swiss} alt="Swiss army knife" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          md
          alignItems="center"
          style={{
            marginTop: matchesMD ? "10em" : 0,
            marginBottom: matchesMD ? "10em" : 0,
          }}
        >
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Extend Access
            </Typography>
          </Grid>
          <Grid item>
            <img
              src={access}
              alt="access"
              style={{ maxWidth: matchesXS ? "20em" : "28em" }}
            />
          </Grid>
        </Grid>

        <Grid item container direction="column" md alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Increase Engagement
            </Typography>
          </Grid>
          <Grid item>
            <img src={engagement} alt="App with notification" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <CallToAction setValue={setValue} />
      </Grid>
    </Grid>
  );
};

export default MobileApps;
