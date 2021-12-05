import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ButtonArrow from "./ButtonArrow";
import mobileBackground from "../../assets/mobileBackground.jpg";
import background from "../../assets/background.jpg";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";

const useStyles = makeStyles((theme) => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    marginTop: "1.5em",
    height: 35,
    padding: 5,
    "& span": {
      marginLeft: ".5em",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  /*
  background: {
    backgroundImage: `url(${background})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    width: "100%",
    height: "55em",

    /!*
    overflow: "hidden",
    position: "relative",

    "&:before": {
      content: " ",
      backgroundAttachment: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      backgroundImage: `url(${background})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      willChange: "transform",
      zIndex: -1,
    },
*!/
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },

*/
  estimateButton: {
    ...theme.typography.estimate,
    background: theme.palette.common.orange,
    borderRadius: 50,
    height: 70,
    width: 195,
    marginRight: "5em",
    marginLeft: "2em",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      height: 65,
      width: 185,
      fontSize: "1.25rem",
    },
  },
}));

const CallToAction = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { setValue } = props;
  return (
    <Parallax
      bgImage={matchesSM ? mobileBackground : background}
      bgImageAlt="call to action"
      strength={matchesSM ? 100 : 250}
    >
      <Grid
        container
        alignItems="center"
        // className={classes.background}
        justifyContent={matchesSM ? "center" : "space-between"}
        direction={matchesSM ? "column" : "row"}
        style={{ height: "65em" }}
      >
        <Grid
          item
          style={{
            marginLeft: matchesSM ? 0 : "5em",
            textAlign: matchesSM ? "center" : "inherit",
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h2">
                Simple Software. <br />
                Revolutionary results
              </Typography>
              <Typography variant="subtitle1" style={{ fontSize: "1.5rem" }}>
                Take advantage of the 21st Century.
              </Typography>
              <Grid justifyContent={matchesSM ? "center" : undefined} container>
                <Button
                  component={Link}
                  to="/revolution"
                  variant="outlined"
                  className={classes.learnButton}
                  onClick={() => {
                    setValue(2);
                  }}
                >
                  <span style={{ marginRight: 5 }}>Learn More</span>
                  <ButtonArrow
                    height={10}
                    width={10}
                    fill={theme.palette.common.blue}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/estimate"
            variant="contained"
            className={classes.estimateButton}
            onClick={() => {
              setValue(8);
            }}
          >
            Free Estimate
          </Button>
        </Grid>
      </Grid>
    </Parallax>
  );
};
export default CallToAction;
