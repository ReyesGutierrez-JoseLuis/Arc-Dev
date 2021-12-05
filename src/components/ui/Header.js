import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
  Button,
  MenuItem,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
  IconButton,
  ListItem,
  ListItemText,
  List,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    padding: 0,
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "Auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    zIndex: 1302,
  },
  menuItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  expansion: {
    backgroundColor: theme.palette.common.blue,
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    "&.Mui-expanded": {
      margin: 0,
      borderBottom: 0,
    },
    "&::before": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  },
  expansionDetails: {
    padding: 0,
    backgroundColor: theme.palette.primary.dark,
  },
  expansionSummary: {
    padding: 0,
  },
  itemDivider: {
    borderBottom: "none",
  },
  listItem: {
    padding: "0 16px",
    "&:hover": {
      backgroundColor: "rgba(0, 0,0,0)",
    },
    "&.Mui-selected": {
      backgroundColor: "rgba(0, 0,0,0)",
      "&:hover": {
        backgroundColor: "rgba(0, 0,0,0)",
      },
    },
  },
  summaryContent: {
    margin: 0,
  },
  serviceSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
}));

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { value, setValue, selectedIndex, setSelectedIndex } = props;

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenu(false);
    } else if (event.key === "Escape") {
      setOpenMenu(false);
    }
  }

  const menuOptions = useMemo(() => {
    return [
      {
        name: "Custom Software Development",
        link: "/customsoftware",
        activeIndex: 1,
        selectedIndex: 0,
      },
      {
        name: "iOS/Android App Development",
        link: "/mobileapps",
        activeIndex: 1,
        selectedIndex: 1,
      },
      {
        name: "Website Development",
        link: "/websites",
        activeIndex: 1,
        selectedIndex: 2,
      },
    ];
  }, []);

  const routes = useMemo(() => {
    return [
      { name: "Home", link: "/", activeIndex: 0 },
      {
        name: "Services",
        link: "/services",
        activeIndex: 1,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? true : undefined,
        mouseOver: (event) => handleClick(event),
      },
      { name: "The Revolution", link: "/revolution", activeIndex: 2 },
      { name: "About Us", link: "/about", activeIndex: 3 },
      { name: "Contact Us", link: "/contact", activeIndex: 4 },
    ];
  }, [anchorEl]);

  /*
  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        case "/estimate":
          if (value !== 5) {
            setValue(5);
          }
          break;
        default:
          break;
      }
    });
  }, [
    menuOptions,
    routes,
    selectedIndex,
    setSelectedIndex,
    setValue,
    value,
    props,
  ]);

*/

  const path = typeof window !== "undefined" ? window.location.pathname : null;

  const activeIndex = useCallback(() => {
    const found = routes.find(({ link }) => link === path);
    const menuFound = menuOptions.find(({ link }) => link === path);

    if (menuFound) {
      setValue(1);
      setSelectedIndex(menuFound.selectedIndex);
    } else if (found === undefined) {
      setValue(false);
    } else {
      setValue(found.activeIndex);
    }
  }, [menuOptions, path, routes, setSelectedIndex, setValue]);

  useEffect(() => {
    activeIndex();
  }, [activeIndex, path]);

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            component={Link}
            className={classes.tab}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
            onMouseLeave={() => setOpenMenu(false)}
          />
        ))}
      </Tabs>
      <Button
        component={Link}
        to="/estimate"
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => setValue(8)}
      >
        Free Estimate
      </Button>

      <Popper
        open={openMenu}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "top left",
            }}
          >
            <Paper classes={{ root: classes.menu }} elevation={0}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  onMouseOver={() => setOpenMenu(true)}
                  onMouseLeave={handleClose}
                  autoFocusItem={false}
                  id="simple-menu"
                  onKeyDown={handleListKeyDown}
                  disablePadding
                >
                  {menuOptions.map((option, i) => (
                    <MenuItem
                      key={option + i}
                      component={Link}
                      to={option.link}
                      classes={{ root: classes.menuItem }}
                      onClick={(event) => {
                        handleMenuItemClick(event, i);
                        setValue(1);
                        handleClose();
                      }}
                      selected={
                        i === selectedIndex &&
                        value === 1 &&
                        window.location.pathname !== "/services"
                      }
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/*
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      ></Menu>
*/}
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route, index) =>
            route.name === "Services" ? (
              <Accordion
                classes={{ root: classes.expansion }}
                key={route.name}
                elevation={0}
              >
                <AccordionSummary
                  classes={{
                    root: classes.expansionSummary,
                    content: classes.summaryContent,
                  }}
                  expandIcon={<ExpandMoreIcon color="secondary" />}
                >
                  <ListItem
                    key={`${route}+${index}+${route.activeIndex}`}
                    divider
                    button
                    component={Link}
                    to={route.link}
                    selected={value === route.activeIndex}
                    disableRipple={true}
                    classes={{
                      root: classes.listItem,
                      selected: classes.serviceSelected,
                      divider: classes.itemDivider,
                    }}
                    onClick={() => {
                      setOpenDrawer(false);
                      setValue(route.activeIndex);
                    }}
                  >
                    <ListItemText
                      disableTypography
                      className={classes.drawerItem}
                    >
                      {route.name}
                    </ListItemText>
                  </ListItem>
                </AccordionSummary>
                <AccordionDetails classes={{ root: classes.expansionDetails }}>
                  <Grid container direction="column">
                    {menuOptions.map((route) => (
                      <Grid
                        item
                        key={`${route}+${index}+${route.selectedIndex}`}
                      >
                        <ListItem
                          divider
                          button
                          component={Link}
                          to={route.link}
                          selected={
                            selectedIndex === route.selectedIndex &&
                            value === 1 &&
                            window.location.pathname !== "/services"
                          }
                          classes={{ selected: classes.drawerItemSelected }}
                          onClick={() => {
                            setOpenDrawer(false);
                            setSelectedIndex(route.selectedIndex);
                          }}
                        >
                          <ListItemText
                            disableTypography
                            className={classes.drawerItem}
                          >
                            {route.name}
                          </ListItemText>
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ) : (
              <ListItem
                key={`${route}+${index}+${route.activeIndex}`}
                divider
                button
                component={Link}
                to={route.link}
                selected={value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                }}
              >
                <ListItemText disableTypography className={classes.drawerItem}>
                  {route.name}
                </ListItemText>
              </ListItem>
            )
          )}
          <ListItem
            divider
            button
            component={Link}
            to="/estimate"
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            selected={value === 5}
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
          >
            <ListItemText disableTypography className={classes.drawerItem}>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logo}
              onClick={() => setValue(0)}
            >
              <img alt="company logo" className={classes.logo} src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
