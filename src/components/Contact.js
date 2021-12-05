import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import background2 from "../assets/background2.jpg";
import mobile from "../assets/mobileBackground.jpg";
import phoneImg from "../assets/phone.svg";
import emailImg from "../assets/email.svg";
import airplane from "../assets/send.svg";
import { Link } from "react-router-dom";
import ButtonArrow from "./ui/ButtonArrow";
import { isEmail, isPhone } from "../utils/Validation";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${background2})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "60em",
    paddingBottom: "10em",
    opacity: 0.9,
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${mobile})`,
    },
  },
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
    [theme.breakpoints.down("md")]: {
      margin: 0,
      height: 65,
      width: 185,
      fontSize: "1.25rem",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    marginTop: "1.5em",
    height: 35,
    padding: 5,
    "& span": {
      marginLeft: ".5em",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
  },
  message: {
    marginTop: "5em",
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: 5,
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
}));

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const initialError = {
  emailError: "",
  phoneError: "",
};

const Contact = (props) => {
  const { setValue } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [contact, setContact] = useState(initialState);
  const { name, phone, email, message } = contact;
  const [error, setError] = useState(initialError);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const { phoneError, emailError } = error;
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

    switch (e.target.name) {
      case "email":
        if (!isEmail(value)) {
          setError({ ...error, emailError: "Please enter a valid Email" });
        } else {
          setError({ ...error, emailError: "" });
        }
        break;
      case "phone":
        if (!isPhone(value)) {
          setError({
            ...error,
            phoneError: "Please enter a valid Phone Number",
          });
        } else {
          setError({ ...error, phoneError: "" });
        }
        break;
      default:
        break;
    }
  };

  const onConfirm = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);
      await axios.post("https://arc-dev-backend.herokuapp.com/contact", {
        name,
        email,
        phone,
        message,
      });

      setLoading(false);
      setOpen(false);
      setContact(initialState);
      setAlert({
        open: true,
        message: "Message sent successfully",
        backgroundColor: "#4BB543",
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
      setAlert({
        open: true,
        message: "Something went wrong, please try again",
        backgroundColor: "#FF3232",
      });
    }
  };

  const buttonContent = (
    <React.Fragment>
      Send{" "}
      <img src={airplane} alt="paper airplane" style={{ marginLeft: "1em" }} />
    </React.Fragment>
  );
  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }

  return (
    <Grid container direction="row">
      <ScrollToTopOnMount />
      <Grid
        item
        container
        direction="column"
        lg={4}
        xl={3}
        justifyContent="center"
        alignItems="center"
        style={{
          marginBottom: matchesMD ? "5em" : 0,
          marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0,
        }}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant="h2"
                style={{ lineHeight: 1 }}
                align={matchesMD ? "center" : undefined}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                style={{ color: theme.palette.common.blue }}
                align={matchesMD ? "center" : undefined}
              >
                We're waiting.
              </Typography>
            </Grid>

            <Grid item container style={{ marginTop: "2em" }}>
              <Grid item>
                <img
                  src={phoneImg}
                  alt="phone"
                  style={{ marginRight: "0.5em", verticalAlign: "bottom" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  <a
                    style={{ color: "inherit", textDecoration: "none" }}
                    href="tel:6188007471"
                  >
                    (555) 555-5555
                  </a>
                </Typography>
              </Grid>
            </Grid>

            <Grid item container style={{ marginBottom: "2em" }}>
              <Grid item>
                <img
                  src={emailImg}
                  alt="envelope"
                  style={{ marginRight: "0.5em", verticalAlign: "bottom" }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  <a
                    style={{ color: "inherit", textDecoration: "none" }}
                    href="mailto:joe.contreras809@gmail.com"
                  >
                    joe.contreras809@gmail.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{ width: "20em" }} direction="column">
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChangeInput}
                  fullWidth
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Email"
                  id="email"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                  error={emailError.length !== 0}
                  helperText={emailError}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Phone"
                  name="phone"
                  id="phone"
                  fullWidth
                  value={phone}
                  onChange={handleChangeInput}
                  error={phoneError.length !== 0}
                  helperText={phoneError}
                />
              </Grid>
            </Grid>
            <Grid item style={{ width: "20em" }}>
              <TextField
                id="message"
                name="message"
                value={message}
                onChange={handleChangeInput}
                fullWidth
                multiline
                rows={10}
                className={classes.message}
                InputProps={{ disableUnderline: true }}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              style={{ marginTop: "2em" }}
            >
              <Button
                disabled={
                  name.length === 0 ||
                  email.length === 0 ||
                  phone.length === 0 ||
                  message.length === 0 ||
                  emailError.length !== 0 ||
                  phoneError.length !== 0
                }
                variant="contained"
                className={classes.sendButton}
                onClick={() => setOpen(true)}
              >
                Send Message{" "}
                <img
                  src={airplane}
                  alt="paper airplane"
                  style={{ marginLeft: "1em" }}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        fullScreen={matchesSM}
        style={{ zIndex: 1302 }}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "15em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "15em",
            paddingBottom: matchesXS ? "1em" : "5em",
            paddingTop: matchesXS ? "1em" : "5em",
          },
        }}
      >
        <DialogContent>
          <Grid container direction="column" align="center">
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Confirm Message
              </Typography>
            </Grid>

            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                label="Name"
                id="name"
                name="name"
                value={name}
                onChange={handleChangeInput}
                fullWidth
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                label="Email"
                id="email"
                fullWidth
                name="email"
                value={email}
                onChange={handleChangeInput}
                error={emailError.length !== 0}
                helperText={emailError}
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                label="Phone"
                name="phone"
                id="phone"
                fullWidth
                value={phone}
                onChange={handleChangeInput}
                error={phoneError.length !== 0}
                helperText={phoneError}
              />
            </Grid>
          </Grid>
          <Grid item style={{ width: matchesSM ? "100%" : "20em" }}>
            <TextField
              id="message"
              name="message"
              value={message}
              onChange={handleChangeInput}
              fullWidth
              multiline
              rows={10}
              className={classes.message}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid
            item
            container
            style={{ marginTop: "2em" }}
            alignItems="center"
            direction={matchesSM ? "column" : "row"}
          >
            <Grid item>
              <Button
                color="primary"
                onClick={() => setOpen(false)}
                style={{ fontWeight: 300 }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={
                  name.length === 0 ||
                  email.length === 0 ||
                  phone.length === 0 ||
                  message.length === 0 ||
                  emailError.length !== 0 ||
                  phoneError.length !== 0
                }
                variant="contained"
                className={classes.sendButton}
                onClick={onConfirm}
              >
                {loading ? <CircularProgress size={30} /> : buttonContent}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />

      <Grid
        item
        container
        className={classes.background}
        lg={8}
        xl={9}
        alignItems="center"
        direction={matchesMD ? "column" : "row"}
        justifyContent={matchesMD ? "center" : undefined}
      >
        <Grid
          item
          style={{
            marginLeft: matchesMD ? 0 : "3em",
            textAlign: matchesMD ? "center" : "inherit",
          }}
        >
          <Grid container direction="column">
            <Grid item align={matchesMD ? "center" : undefined}>
              <Typography variant="h2">
                Simple Software. <br />
                Revolutionary results
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "1.5rem", color: "#fff" }}
              >
                Take advantage of the 21st Century.
              </Typography>
              <Grid justifyContent={matchesMD ? "center" : undefined} container>
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
    </Grid>
  );
};

export default Contact;
