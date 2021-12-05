import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Lottie from "react-lottie";
import { cloneDeep } from "lodash";
import check from "../assets/check.svg";
import send from "../assets/send.svg";
import software from "../assets/software.svg";
import mobile from "../assets/mobile.svg";
import website from "../assets/website.svg";
import backArrow from "../assets/backArrow.svg";
import forwardArrow from "../assets/forwardArrow.svg";
import backArrowDisabled from "../assets/backArrowDisabled.svg";
import forwardArrowDisabled from "../assets/forwardArrowDisabled.svg";
import camara from "../assets/camera.svg";
import upload from "../assets/upload.svg";
import person from "../assets/person.svg";
import persons from "../assets/persons.svg";
import people from "../assets/people.svg";
import info from "../assets/info.svg";
import bell from "../assets/bell.svg";
import users from "../assets/users.svg";
import iphone from "../assets/iphone.svg";
import gps from "../assets/gps.svg";
import customized from "../assets/customized.svg";
import data from "../assets/data.svg";
import android from "../assets/android.svg";
import globe from "../assets/globe.svg";
import biometrics from "../assets/biometrics.svg";

import estimateAnimation from "../animations/estimateAnimation/data.json";
import { isEmail, isPhone } from "../utils/Validation";
import axios from "axios";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "12em",
    height: "10em",
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 50,
    width: 225,
    fontSize: "1.25rem",
    marginTop: "5em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  message: {
    marginTop: "3em",
    marginBottom: "2em",
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: 5,
  },
  specialText: {
    fontFamily: "Raleway",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.common.orange,
  },
}));

const defaultQuestions = [
  {
    id: 1,
    title: "Which service are you interested in?",
    active: true,
    options: [
      {
        id: 1,
        title: "Custom Software Development",
        subtitle: null,
        icon: software,
        iconAlt: "three floating screens",
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: "iOS/Android App Development",
        subtitle: null,
        icon: mobile,
        iconAlt: "outlines of phones and tablets",
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: "Website Development",
        subtitle: null,
        icon: website,
        iconAlt: "computer outline",
        selected: false,
        cost: 0,
      },
    ],
  },
];

const softwareQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which platforms do you need supported?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Web Application",
        subtitle: null,
        icon: website,
        iconAlt: "computer outline",
        selected: false,
        cost: 100,
      },
      {
        id: 2,
        title: "iOS Application",
        subtitle: null,
        icon: iphone,
        iconAlt: "outline of iphone",
        selected: false,
        cost: 100,
      },
      {
        id: 3,
        title: "Android Application",
        subtitle: null,
        icon: android,
        iconAlt: "outlines of android phone",
        selected: false,
        cost: 100,
      },
    ],
    active: true,
  },
  {
    id: 3,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Photo/Video",
        subtitle: null,
        icon: camara,
        iconAlt: "camera outline",
        selected: false,
        cost: 25,
      },
      {
        id: 2,
        title: "GPS",
        subtitle: null,
        icon: gps,
        iconAlt: "gps pin",
        selected: false,
        cost: 25,
      },
      {
        id: 3,
        title: "File Transfer",
        subtitle: null,
        icon: upload,
        iconAlt: "outline of cloud with arrow pointing up",
        selected: false,
        cost: 25,
      },
    ],
    active: false,
  },
  {
    id: 4,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Users/Authentication",
        subtitle: null,
        icon: users,
        iconAlt: "outline of a person with a plus sign",
        selected: false,
        cost: 25,
      },
      {
        id: 2,
        title: "Biometrics",
        subtitle: null,
        icon: biometrics,
        iconAlt: "fingerprint",
        selected: false,
        cost: 25,
      },
      {
        id: 3,
        title: "Push Notifications",
        subtitle: null,
        icon: bell,
        iconAlt: "outline of a bell",
        selected: false,
        cost: 25,
      },
    ],
    active: false,
  },
  {
    id: 5,
    title: "What type of custom features do you expect to need?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Low Complexity",
        subtitle: "(Informational)",
        icon: info,
        iconAlt: "'i' inside a circle",
        selected: false,
        cost: 25,
      },
      {
        id: 2,
        title: "Medium Complexity",
        subtitle: "(Interactive, Customizable, Realtime)",
        icon: customized,
        iconAlt: "two toggle switches",
        selected: false,
        cost: 50,
      },
      {
        id: 3,
        title: "High Complexity",
        subtitle: "(Data Modeling and Computation)",
        icon: data,
        iconAlt: "outline of line graph",
        selected: false,
        cost: 100,
      },
    ],
    active: false,
  },
  {
    id: 6,
    title: "How many users do you expect?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "0-10",
        subtitle: null,
        icon: person,
        iconAlt: "person outline",
        selected: false,
        cost: 1,
      },
      {
        id: 2,
        title: "10-100",
        subtitle: null,
        icon: persons,
        iconAlt: "outline of two people",
        selected: false,
        cost: 1.25,
      },
      {
        id: 3,
        title: "100+",
        subtitle: null,
        icon: people,
        iconAlt: "outline of three people",
        selected: false,
        cost: 1.5,
      },
    ],
    active: false,
  },
];

const websiteQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which type of website are you wanting?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Basic",
        subtitle: "(Informational)",
        icon: info,
        iconAlt: "person outline",
        selected: false,
        cost: 100,
      },
      {
        id: 2,
        title: "Interactive",
        subtitle: "(Users, API's, Messaging)",
        icon: customized,
        iconAlt: "outline of two people",
        selected: false,
        cost: 200,
      },
      {
        id: 3,
        title: "E-Commerce",
        subtitle: "(Sales)",
        icon: globe,
        iconAlt: "outline of three people",
        selected: false,
        cost: 250,
      },
    ],
    active: true,
  },
];

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

const Estimate = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const myRef = useRef(null);
  const [questions, setQuestions] = useState(defaultQuestions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contact, setContact] = useState(initialState);
  const { name, phone, email, message } = contact;
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  // const [answers, setAnswers] = useState(initialAnswers);

  const [total, setTotal] = useState(0);
  const [service, setService] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState("");
  const [users, setUsers] = useState("");
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const { phoneError, emailError } = error;

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: estimateAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const nextQuestion = () => {
    if (matchesSM) {
      window.scrollTo(0, myRef.current.offsetTop + 75);
    }
    //creating a new array
    const newQuestions = cloneDeep(questions);
    //Finding the active question. Returns an array with the only element being the active question
    const currentlyActive = newQuestions.filter((question) => question.active);
    //Finds the index of the active question within the entire array
    const activeIndex = currentlyActive[0].id - 1;
    //Finding the next question in the array
    const nextIndex = activeIndex + 1;

    //Overriding the active property of the question to false within the new array
    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
    //Overriding the active property of the next question in the array to true
    newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };

    //Set the state to new updated array of questions
    setQuestions(newQuestions);
  };

  const previousQuestion = () => {
    if (matchesSM) {
      window.scrollTo(0, myRef.current.offsetTop + 75);
    }
    //creating a new array
    const newQuestions = cloneDeep(questions);
    //Finding the active question. Returns an array with the only element being the active question
    const currentlyActive = newQuestions.filter((question) => question.active);
    //Finds the index of the active question within the entire array
    const activeIndex = currentlyActive[0].id - 1;
    //Finding the previous question in the array
    const nextIndex = activeIndex - 1;

    //Overriding the active property of the question to false within the new array
    newQuestions[activeIndex] = { ...currentlyActive[0], active: false };
    //Overriding the active property of the previous question in the array to true
    newQuestions[nextIndex] = { ...newQuestions[nextIndex], active: true };

    //Set the state to new updated array of questions
    setQuestions(newQuestions);
  };

  const navigationPrevDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);

    //If we are on the first question => disable previous button
    if (currentlyActive[0].id === 1) {
      return true;
    } else {
      return false;
    }
  };

  const navigationNextDisabled = () => {
    const currentlyActive = questions.filter((question) => question.active);

    //If we are on the first question => disable previous button
    if (currentlyActive[0].id === questions[questions.length - 1].id) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelect = (id) => {
    //creating a new array
    const newQuestions = cloneDeep(questions);
    //Finding the active question. Returns an array with the only element being the active question
    const currentlyActive = newQuestions.filter((question) => question.active);
    //Finds the index of the active question within the entire array
    const activeIndex = currentlyActive[0].id - 1;

    //finding the index of the selected option with the option.id provided
    const newSelected = newQuestions[activeIndex].options[id - 1];

    //check if an option has already been selected (for selecting only one option)
    const previousSelected = currentlyActive[0].options.filter(
      (option) => option.selected
    );
    switch (currentlyActive[0].subtitle) {
      case "Select one.":
        if (previousSelected[0]) {
          previousSelected[0].selected = !previousSelected[0].selected;
        }
        //Toggle the selected property
        newSelected.selected = !newSelected.selected;
        break;
      default:
        //Toggle the selected property
        newSelected.selected = !newSelected.selected;
        break;
    }

    switch (newSelected.title) {
      /*
      case "Custom Software Development":
        //Update state to use website questions
        setQuestions(softwareQuestions);
        setAnswers({ ...initialAnswers, service: newSelected.title });
        break;
      case "iOS/Android App Development":
        //Update state to use website questions
        setQuestions(softwareQuestions);
        // setAnswers({ ...answers, service: newSelected.title });
        setAnswers({ ...initialAnswers, service: newSelected.title });
        break;
      case "Website Development":
        //Update state to use website questions
        setQuestions(websiteQuestions);
        // setAnswers({ ...answers, service: newSelected.title });
        setAnswers({ ...initialAnswers, service: newSelected.title });
        break;
      default:
        //Updating the state to use software questions
        setQuestions(newQuestions);
*/
      case "Custom Software Development":
        if (matchesSM) {
          window.scrollTo(0, myRef.current.offsetTop + 75);
        }
        setQuestions(softwareQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setUsers("");
        setCategory("");
        break;
      case "iOS/Android App Development":
        if (matchesSM) {
          window.scrollTo(0, myRef.current.offsetTop + 75);
        }
        setQuestions(softwareQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setUsers("");
        setCategory("");
        break;
      case "Website Development":
        if (matchesSM) {
          window.scrollTo(0, myRef.current.offsetTop + 75);
        }
        setQuestions(websiteQuestions);
        setService(newSelected.title);
        setPlatforms([]);
        setFeatures([]);
        setCustomFeatures("");
        setUsers("");
        setCategory("");
        break;
      default:
        setQuestions(newQuestions);
        break;
    }
  };

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

  const getTotal = () => {
    let cost = 0;

    const selections = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length > 0);

    selections.map((options) => options.map((option) => (cost += option.cost)));

    if (questions.length > 2) {
      const userCost = questions
        .filter(
          (question) => question.title === "How many users do you expect?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0];

      setUsers(userCost.title);

      cost -= userCost.cost;
      cost *= userCost.cost;
    }

    setTotal(cost);
  };

  const getPlatforms = () => {
    if (questions.length > 2) {
      let newPlatforms = [];

      questions
        .filter(
          (question) =>
            question.title === "Which platforms do you need supported?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0]
        .map((option) => newPlatforms.push(option.title));

      setPlatforms(newPlatforms);
    }
  };

  const getFeatures = () => {
    if (questions.length > 2) {
      let newFeatures = [];

      questions
        .filter(
          (question) =>
            question.title === "Which features do you expect to use?"
        )
        .map((question) => question.options.filter((option) => option.selected))
        .map((option) =>
          option.map((newFeature) => newFeatures.push(newFeature.title))
        );

      setFeatures(newFeatures);
    }
  };

  const getCustomFeatures = () => {
    if (questions.length > 2) {
      const newCustomFeatures = questions
        .filter(
          (question) =>
            question.title ===
            "What type of custom features do you expect to need?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0].title;

      setCustomFeatures(newCustomFeatures);
    }
  };

  const getCategory = () => {
    if (questions.length === 2) {
      const newCategory = questions
        .filter(
          (question) =>
            question.title === "Which type of website are you wanting?"
        )[0]
        .options.filter((option) => option.selected)[0].title;

      setCategory(newCategory);
    }
  };

  const sendEstimate = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://arc-dev-backend.herokuapp.com/estimate",
        {
          name,
          email,
          phone,
          message,
          total,
          category,
          service,
          platforms,
          features,
          customFeatures,
          users,
        }
      );

      /*
      console.log(
        `${name}`,
        `${newDate}`,
        `service: ${service}`,
        `features: ${features}`,
        `category: ${category}`,
        `platforms: ${platforms}`,
        `customFeatures: ${customFeatures}`,
        `users:${users}``${total}`
      );

*/
      const newComplexity = (comp) => {
        let newComp;
        switch (comp) {
          case "Low Complexity":
            newComp = "Low";
            break;
          case "Medium Complexity":
            newComp = "Medium";
            break;
          case "High Complexity":
            newComp = "High";
            break;
          default:
            break;
        }

        return newComp;
      };

      const newService = (oldService) => {
        let newServ;
        switch (oldService) {
          case "Custom Software Development":
            newServ = "Custom Software";
            break;
          case "iOS/Android App Development":
            newServ = "Mobile App";
            break;
          case "Website Development":
            newServ = "Website";
            break;
          default:
            break;
        }

        return newServ;
      };

      const newPlatforms = (oldPlatforms) => {
        const newP = oldPlatforms.map((plat) => {
          let newPlat;
          switch (plat) {
            case "Web Application":
              newPlat = "Web";
              break;
            case "iOS Application":
              newPlat = "iOS";
              break;
            case "Android Application":
              newPlat = "Android";
              break;
            default:
              break;
          }
          return newPlat;
        });
        return newP;
      };

      const date = new Date();
      const realComplexity = newComplexity(customFeatures);
      const realService = newService(service);
      const realPlatforms = newPlatforms(platforms);

      // console.log(realComplexity);
      // console.log(realService);
      // console.log(realPlatforms);

      const insertRes = await axios.post(
        "https://arc-dev-backend.herokuapp.com/project/create",
        {
          name: name,
          date: format(date, "MM/dd/yy"),
          service: realService,
          features: service === "Website" ? category : features.join(", "),
          complexity: service === "Website" ? "N/A" : realComplexity,
          platforms: service === "Website" ? "N/A" : realPlatforms.join(", "),
          users: service === "Website" ? "N/A" : users,
          total: `$${total}`,
        }
      );

      setLoading(false);
      setContact(initialState);
      setAlert({
        open: true,
        message: "Estimate sent successfully",
        backgroundColor: "#4BB543",
      });
      setDialogOpen(false);
      console.log(res.data);
      console.log(insertRes);
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

  /*
  const getTotal = () => {
    let cost = 0;
    //Find all the options that have been selected
    const selections = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length > 0);

    //Add the cost of the selected questions
    selections.map((question) =>
      question.map((option) => (cost += option.cost))
    );

    //Find which option was selected in The last question which is a multiplier
    if (questions.length > 2) {
      const userCost = questions
        .filter(
          (question) => question.title === "How many users do you expect?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0];

      console.log(userCost.title);
      setAnswers({ ...answers, users: userCost.title });

      //Subtract userCost which is a multiplier from total cost
      cost -= userCost.cost;
      //Apply the multiplier value  to the total cost
      cost *= userCost.cost;
    }
    //Update state
    setTotal(cost);
  };

  const getPlatforms = () => {
    let newPlatforms = [];
    if (questions.length > 2) {
      questions
        .filter(
          (question) =>
            question.title === "Which platforms do you need supported?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0]
        .map((option) => newPlatforms.push(option.title));
      setAnswers({ ...answers, platforms: newPlatforms });
    }
  };

  const getFeatures = () => {
    let newFeatures = [];
    if (questions.length > 2) {
      questions
        .filter(
          (question) =>
            question.title === "Which features do you expect to use?"
        )
        .map((question) => question.options.filter((option) => option.selected))
        .map((option) =>
          option.map((newFeature) => newFeatures.push(newFeature.title))
        );
      setAnswers({ ...answers, features: newFeatures });
    }
  };

  const getCustomFeatures = () => {
    if (questions.length > 2) {
      const newCustomFeatures = questions
        .filter(
          (question) =>
            question.title ===
            "What type of custom features do you expect to need?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0].title;

      setAnswers({ ...answers, customFeatures: newCustomFeatures });
    }
  };
*/

  const estimateDisabled = () => {
    let disabled = true;

    const emptySelections = questions
      .filter(
        (question) => question.title !== "Which features do you expect to use?"
      )
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length === 0);

    const featuresSelected = questions
      .filter(
        (question) => question.title === "Which features do you expect to use?"
      )
      .map((question) => question.options.filter((option) => option.selected))
      .filter((selection) => selection.length > 0);

    if (questions.length === 2) {
      if (emptySelections.length === 1) {
        disabled = false;
      }
    } else if (questions.length === 1) {
      disabled = true;
    } else if (emptySelections.length === 1 && featuresSelected.length > 0) {
      disabled = false;
    }
    return disabled;
  };

  const softwareSelection = (
    <Grid container direction="column">
      <Grid
        item
        container
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src={check} alt="check" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            {`You want ${service} `}
            {platforms.length > 0
              ? `for ${
                  //if only web application is selected...
                  platforms.indexOf("Web Application") > -1 &&
                  platforms.length === 1
                    ? //then finish sentence here
                      "a Web Application."
                    : //otherwise, if web application and another platform is selected...
                    platforms.indexOf("Web Application") > -1 &&
                      platforms.length === 2
                    ? //then finish the sentence here
                      `a Web Application and an ${platforms[1]}.`
                    : //otherwise, if only one platform is selected which isn't web application...
                    platforms.length === 1
                    ? //then finish the sentence here
                      `an ${platforms[0]}`
                    : //otherwise, if other two options are selected...
                    platforms.length === 2
                    ? //then finish the sentence here
                      "an iOS Application and an Android Application."
                    : //otherwise if all three are selected...
                    platforms.length === 3
                    ? //then finish the sentence here
                      "a Web Application, an iOS Application, and an Android Application."
                    : null
                }`
              : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src={check} alt="check" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            {"with "}
            {/* if we have features... */}
            {features.length > 0
              ? //...and there's only 1...
                features.length === 1
                ? //then end the sentence here
                  `${features[0]}.`
                : //otherwise, if there are two features...
                features.length === 2
                ? //...then end the sentence here
                  `${features[0]} and ${features[1]}.`
                : //otherwise, if there are three or more features...
                  features
                    //filter out the very last feature...
                    .filter((feature, index) => index !== features.length - 1)
                    //and for those features return their name...
                    .map((feature, index) => (
                      <span key={index}>{`${feature}, `}</span>
                    ))
              : null}
            {features.length > 0 &&
            features.length !== 1 &&
            features.length !== 2
              ? //...and then finally add the last feature with 'and' in front of it
                ` and ${features[features.length - 1]}.`
              : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container alignItems="center">
        <Grid item xs={2}>
          <img src={check} alt="check" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            {`The custom features will be of ${customFeatures.toLowerCase()}, and the project will be used by about ${users} users.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  const websiteSelection = (
    <Grid container direction="column" style={{ marginTop: "14em" }}>
      <Grid item container alignItems="center">
        <Grid item xs={2}>
          <img src={check} alt="check" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            You want{" "}
            {category === "Basic"
              ? "a Basic website."
              : `an ${category} Website.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
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
        lg
        alignItems={matchesMD ? "center" : undefined}
      >
        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesMD ? 0 : "2em" }}
          align={matchesMD ? "center" : undefined}
        >
          <Typography variant="h2">Estimate</Typography>
        </Grid>
        <Grid
          item
          style={{
            marginRight: matchesMD ? 0 : "10em",
            maxWidth: "50em",
            marginTop: "7.5em",
          }}
        >
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        lg
        style={{ marginRight: matchesMD ? 0 : "2em", marginBottom: "25em" }}
        alignItems="center"
      >
        {questions
          .filter((question) => question.active)
          .map((question, index) => (
            <React.Fragment key={index}>
              <Grid item align="center" ref={myRef}>
                <Typography
                  variant="h2"
                  style={{
                    fontWeight: 500,
                    marginTop: "5em",
                    lineHeight: 1.25,
                    marginLeft: matchesSM ? "1em" : 0,
                    marginRight: matchesSM ? "1em" : 0,
                  }}
                >
                  {question.title}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ marginBottom: "2.5em" }}
                >
                  {question.subtitle}
                </Typography>
              </Grid>
              <Grid item container>
                {question.options.map((option, index) => (
                  <Grid
                    key={index}
                    item
                    container
                    direction="column"
                    md
                    component={Button}
                    onClick={() => handleSelect(option.id)}
                    style={{
                      display: "grid",
                      textTransform: "none",
                      marginBottom: matchesSM ? "1.5em" : 0,
                      borderRadius: 0,
                      backgroundColor: option.selected
                        ? theme.palette.common.orange
                        : null,
                    }}
                  >
                    <Grid item style={{ maxWidth: "14em" }} align="center">
                      <Typography variant="h6" style={{ marginBottom: "1em" }}>
                        {option.title}
                      </Typography>
                      <Typography variant="caption" align="center">
                        {option.subtitle}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <img
                        src={option.icon}
                        alt={option.iconAlt}
                        className={classes.icon}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          ))}
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ width: "18em", marginTop: "3em" }}
        >
          <Grid item>
            <IconButton
              onClick={previousQuestion}
              disabled={navigationPrevDisabled()}
            >
              <img
                src={navigationPrevDisabled() ? backArrowDisabled : backArrow}
                alt="back arrow"
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={nextQuestion}
              disabled={navigationNextDisabled()}
            >
              <img
                src={
                  navigationNextDisabled() ? forwardArrowDisabled : forwardArrow
                }
                alt="forward arrow"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.estimateButton}
            disabled={estimateDisabled()}
            onClick={() => {
              setDialogOpen(true);
              getTotal();
              getPlatforms();
              getFeatures();
              getCustomFeatures();
              getCategory();
            }}
          >
            Get Estimate
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        style={{ zIndex: 1302 }}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="lg"
        fullScreen={matchesSM}
      >
        <Grid container justifyContent="center">
          <Grid item style={{ marginTop: "1em", marginBottom: "1em" }}>
            <Typography variant="h2" align="center">
              Estimate
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid
            container
            justifyContent="space-around"
            direction={matchesSM ? "column" : "row"}
            alignItems={matchesSM ? "center" : undefined}
          >
            <Grid
              item
              container
              direction="column"
              md={7}
              style={{ maxWidth: "20em" }}
            >
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

              <Grid item style={{ maxWidth: "20em" }}>
                <TextField
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleChangeInput}
                  fullWidth
                  multiline
                  placeholder="Tell us more about your project."
                  rows={10}
                  className={classes.message}
                  InputProps={{ disableUnderline: true }}
                />
              </Grid>
              <Grid item align={matchesSM ? "center" : undefined}>
                <Typography variant="body1" paragraph>
                  We can create this digital solution for an estimated{" "}
                  <span className={classes.specialText}>
                    ${total.toFixed(2)}
                  </span>
                </Typography>
                <Typography variant="body1" paragraph>
                  Fill out your name, email and phone number, place your request
                  and we'll get back to you moving forward and a final price.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              md={5}
              alignItems={matchesSM ? "center" : undefined}
              style={{ maxWidth: "30em" }}
            >
              <Hidden smDown>
                <Grid item>
                  {questions.length > 2 ? softwareSelection : websiteSelection}
                </Grid>
              </Hidden>

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
                  className={classes.estimateButton}
                  onClick={sendEstimate}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      Place Request
                      <img
                        src={send}
                        alt="paper airplane"
                        style={{ marginLeft: "0.5em" }}
                      />
                    </>
                  )}
                </Button>
              </Grid>
              <Hidden mdUp>
                <Grid
                  item
                  style={{
                    marginTop: "1em",
                    marginBottom: "1em",
                  }}
                >
                  <Button
                    style={{
                      fontWeight: 300,
                    }}
                    color="primary"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Hidden>
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
    </Grid>
  );
};

export default Estimate;
