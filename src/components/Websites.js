import React, { useEffect } from "react";
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
import analytics from "../assets/analytics.svg";
import seo from "../assets/seo.svg";
import outreach from "../assets/outreach.svg";
import ecommerce from "../assets/ecommerce.svg";
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
  paragraphContainer: {
    maxWidth: "30em",
  },
}));

export default function Websites(props) {
  const { setSelectedIndex, setValue } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

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
              to="/mobileapps"
              onClick={() => {
                setSelectedIndex(1);
              }}
            >
              <img src={backArrow} alt="Back to Mobile Development" />
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
              Website Development
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              Having a website is a necessity in today's business world. They
              give you one central, public location to let people know who you
              are, what you do, and why you are the best at it.
            </Typography>
            <Typography variant="body1" paragraph>
              From simply having your hours posted to having a full fledged
              online store, making yourself as accessible to possible users
              drives growth and enables you to reach new customers.
            </Typography>
          </Grid>
        </Grid>

        <Hidden mdDown>
          <Grid item className={classes.arrowContainer}>
            <IconButton
              style={{ backgroundColor: "transparent" }}
              component={Link}
              to="/services"
              onClick={() => {
                setValue(1);
              }}
            >
              <img src={forwardArrow} alt="Forward to services" />
            </IconButton>
          </Grid>
        </Hidden>
      </Grid>

      <Grid
        item
        container
        direction={matchesSM ? "column" : "row"}
        className={classes.rowContainer}
        alignItems="center"
        style={{ marginTop: "15em" }}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item align={matchesSM ? "center" : undefined}>
              <Typography variant="h4" gutterBottom>
                Analytics
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={analytics}
                alt="Analytics"
                style={{ marginLeft: "-2.75em" }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className={classes.paragraphContainer}
          align={matchesSM ? "center" : undefined}
        >
          <Typography variant="body1">
            Knowledge is power, and data is 21st century gold. Analysing this
            data can reveal hidden patterns and trends in your business,
            empowering you to make smarter decisions with measurable effects.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction={matchesSM ? "column" : "row"}
        className={classes.rowContainer}
        alignItems="center"
        justifyContent="flex-end"
        style={{ marginTop: "15em", marginBottom: "15em" }}
      >
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item align={matchesSM ? "center" : undefined}>
              <Typography variant="h4" gutterBottom>
                E-Commerce
              </Typography>
            </Grid>
            <Grid item>
              <img src={ecommerce} alt="Dollar signs" />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          style={{ marginLeft: matchesSM ? "0" : "1em" }}
          className={classes.paragraphContainer}
          align={matchesSM ? "center" : undefined}
        >
          <Typography variant="body1" paragraph>
            It's no secret that people like to shop online.
          </Typography>
          <Typography variant="body1" paragraph>
            In 2017 over 2.3 trillion was spent in e-commerce, and it's time for
            your slice of that pie.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction={matchesSM ? "column" : "row"}
        className={classes.rowContainer}
        alignItems="center"
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item align={matchesSM ? "center" : undefined}>
              <Typography variant="h4" gutterBottom>
                Outreach
              </Typography>
            </Grid>
            <Grid item>
              <img src={outreach} alt="Outreach" />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          style={{ marginLeft: matchesSM ? "0" : "1em" }}
          className={classes.paragraphContainer}
          align={matchesSM ? "center" : undefined}
        >
          <Typography variant="body1">
            Draw people in with a dazzling website. Showing off your products
            online is a great way to help customers decide what's right for them
            before visiting in person.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction={matchesSM ? "column" : "row"}
        className={classes.rowContainer}
        alignItems="center"
        justifyContent="flex-end"
        style={{ marginTop: "15em", marginBottom: "15em" }}
      >
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item align={matchesSM ? "center" : undefined}>
              <Typography variant="h4" gutterBottom>
                Search Engine <br /> Optimization
              </Typography>
            </Grid>
            <Grid item>
              <img src={seo} alt="SEO " />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          style={{ marginLeft: matchesSM ? "0" : "1em" }}
          className={classes.paragraphContainer}
          align={matchesSM ? "center" : undefined}
        >
          <Typography variant="body1" paragraph>
            How often have you ever been to the second page of Google results.
          </Typography>
          <Typography variant="body1" paragraph>
            If you're like us, probably never.
          </Typography>
          <Typography variant="body1" paragraph>
            Customers don't go there either, so make sure your website is
            designed to end up at the top.
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <CallToAction setValue={setValue} />
      </Grid>
    </Grid>
  );
}
