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
import backArrow from "../assets/backArrow.svg";
import forwardArrow from "../assets/forwardArrow.svg";
import lightbulb from "../assets/bulb.svg";
import cash from "../assets/cash.svg";
import stopwatch from "../assets/stopwatch.svg";
import root from "../assets/root.svg";
import { Link } from "react-router-dom";

import documentsAnimation from "../animations/documentsAnimation/data";
import scaleAnimation from "../animations/scaleAnimation/data";
import autmationAnimation from "../animations/automationAnimation/data";
import uxAnimation from "../animations/uxAnimation/data";
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
  itemContainer: {
    maxWidth: "40em",
  },
}));

const CustomSoftware = (props) => {
  const { setSelectedIndex, setValue } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const documentOptions = {
    loop: true,
    autoplay: true,
    animationData: documentsAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const scaleOptions = {
    loop: true,
    autoplay: true,
    animationData: scaleAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const automationOptions = {
    loop: true,
    autoplay: true,
    animationData: autmationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const uxOptions = {
    loop: true,
    autoplay: true,
    animationData: uxAnimation,
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
              to="/services"
              onClick={() => {
                setValue(1);
              }}
            >
              <img src={backArrow} alt="Back to services" />
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
              Custom Software Development
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              Weather we're replacing old software or inventing new solutions,
              Arc Development is here to help you tackle technology
            </Typography>
            <Typography variant="body1" paragraph>
              Using commercial software leaves you with a lot of stuff you don't
              need with some of the stuff you do need and ultimately controls
              the way you work. Without using any software at all you risk
              falling behind competitors and missing out on huge savings from
              increased efficiency.
            </Typography>
            <Typography variant="body1" paragraph>
              Our custom solutions are designed from the ground up with your
              needs, wants and goals at the core. This collaborative process
              produces finely tuned software that is much more effective at
              improving your workflow and reducing costs than generalized
              options.
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
              to="/mobileapps"
              onClick={() => {
                setSelectedIndex(1);
              }}
            >
              <img src={forwardArrow} alt="Forward to mobile app Development" />
            </IconButton>
          </Grid>
        </Hidden>
        {/*
        <Grid item style={{ marginLeft: "20em", marginTop: "1em" }}>
          <img src={matchesSM ? customAlt : custom} alt="custom" />
        </Grid>
*/}
      </Grid>

      <Grid
        item
        container
        direction="row"
        className={classes.rowContainer}
        justifyContent="center"
        style={{ marginTop: "15em", marginBottom: "20em" }}
      >
        <Grid
          item
          container
          direction="column"
          md
          style={{ maxWidth: "40em" }}
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h2">Save Energy</Typography>
          </Grid>
          <Grid item>
            <img src={lightbulb} alt="Lightbulb" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          md
          style={{
            maxWidth: "40em",
            marginTop: matchesSM ? "8em" : 0,
            marginBottom: matchesSM ? "8em" : 0,
          }}
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h2">Save Time</Typography>
          </Grid>
          <Grid item>
            <img src={stopwatch} alt="Stopwatch" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          md
          style={{ maxWidth: "40em" }}
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h2">Save Money</Typography>
          </Grid>
          <Grid item>
            <img src={cash} alt="Cash" />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        alignItems={matchesMD ? "center" : undefined}
        direction={matchesMD ? "column" : "row"}
        justifyContent="space-between"
        className={classes.rowContainer}
      >
        <Grid
          item
          container
          className={classes.itemContainer}
          md
          style={{ marginBottom: matchesMD ? "10em" : undefined }}
          direction={matchesSM ? "column" : "row"}
        >
          <Grid
            item
            container
            direction="column"
            md
            align={matchesSM ? "center" : undefined}
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Digital Documents & Data
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                Reduce Errors. Reduce Waste. Reduce Cost.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                Billions are spent annually on the purchasing, printing and
                distribution of paper. On top of the massive environmental
                impact it has, it causes harm to your bottom line as well.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                By utilizing digital forms and documents you can reduce these
                obsolete expenses, accelerate your communication and help the
                Earth.
              </Typography>
            </Grid>
          </Grid>
          <Grid item md>
            <Lottie
              options={documentOptions}
              style={{ maxHeight: 275, maxWidth: 275, minHeight: 250 }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.itemContainer}
          md
          direction={matchesSM ? "column" : "row"}
        >
          <Grid item md>
            <Lottie
              options={scaleOptions}
              style={{
                maxHeight: 260,
                maxWidth: 280,
                marginBottom: matchesSM ? "2em" : undefined,
              }}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            md
            align={matchesSM ? "center" : "right"}
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Scale
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                Weather you're a large brand, just getting started, or taking
                off right now, our application architecture ensures pain-free
                growth and reliability.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="row"
        className={classes.rowContainer}
        style={{ marginBottom: "20em", marginTop: "20em" }}
      >
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <img
              src={root}
              alt="tree roots"
              height={matchesSM ? "300em" : "450em"}
              width={matchesSM ? "300em" : "450em"}
              style={{ margin: "1em" }}
            />
          </Grid>
          <Grid item className={classes.itemContainer}>
            <Typography variant="h4" gutterBottom align="center">
              Root Cause Analysis
            </Typography>
            <Typography variant="body1" paragraph align="center">
              Many problems are merely symptoms of larger, underlying issues.
            </Typography>
            <Typography variant="body1" paragraph align="center">
              We can help you thoroughly examine all areas of your business to
              develop a holistic plan for the most effective implementation of
              technology.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justifyContent="space-between"
        alignItems={matchesMD ? "center" : undefined}
        direction={matchesMD ? "column" : "row"}
        className={classes.rowContainer}
        style={{ marginBottom: matchesMD ? "10em" : "5em" }}
      >
        <Grid
          item
          container
          className={classes.itemContainer}
          md
          direction={matchesSM ? "column" : "row"}
        >
          <Grid
            item
            container
            direction="column"
            md
            align={matchesSM ? "center" : undefined}
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Automation
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                We can help you identify processes with time or event based
                actions which can now be easily automated.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                Increasing efficiency increases profits leaving, you more time
                to focus on your business, not busywork
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                By utilizing digital forms and documents you can reduce these
                obsolete expenses, accelerate your communication and help the
                Earth.
              </Typography>
            </Grid>
          </Grid>
          <Grid item md>
            <Lottie
              options={automationOptions}
              style={{
                maxHeight: 290,
                maxWidth: 280,
                marginTop: matchesSM ? "2em" : undefined,
              }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          className={classes.itemContainer}
          md
          direction={matchesSM ? "column" : "row"}
        >
          <Grid item md>
            <Lottie
              options={uxOptions}
              style={{
                maxHeight: 310,
                maxWidth: 155,
                marginBottom: matchesSM ? "2em" : undefined,
              }}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            md
            align={matchesSM ? "center" : "right"}
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                User Experience Design
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                A design that isn't usable isn't a good design.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                So why are so many pieces of software complicated, confusing,
                and frustrating?
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph>
                By prioritizing users and the real ways they interact with
                technology we're able to develop personable experiences that
                solve problems rather than create new ones.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <CallToAction setValue={setValue} />
      </Grid>
    </Grid>
  );
};

export default CustomSoftware;
