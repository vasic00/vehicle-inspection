import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/homepage.css";
import calculator from "../assets/calculator.png";
import avatar from "../assets/avatar.png";
import inspection from "../assets/inspection.png";
import Badge from "@mui/material/Badge";
import { CompanyCarousel } from "../components/CompanyCarousel";
import { Calculator } from "../components/Calculator";
import { Footer } from "../components/Footer";
import { Appointment } from "../components/Appointment";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { AccInfo } from "../components/AccInfo";
import Fab from "@mui/material/Fab";
import createAxiosInstance from "../util/axiosClient";
import { ListItem } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const Homepage = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [selectedMsg, setSelectedMsg] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();
  const [customerData, changeCustomerData] = useState(location.state);
  const httpClient = createAxiosInstance(
    location.state ? location.state.token : "none"
  );
  const [companies, changeCompanies] = useState(null);
  const [engines, changeEngines] = useState(null);
  const [classes, changeClasses] = useState(null);
  const [render, changeRender] = useState(false);
  const [cost, changeCost] = useState(null);
  const [navVisibility, changeNavVisibility] = useState(
    window.innerWidth < 600 || customerData === null
  );
  const [navClass, changeNavClass] = useState("");
  const [tab, changeTab] = useState(0);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleOpenSnackbar = (msg, error) => {
    setSnackbarSeverity(error ? "error" : "success");
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
  };
  const handleChangeTab = (event, newValue) => {
    if (newValue === 1)
      if (customerData.vehicles.length > 0) changeTab(newValue);
      else {
        handleOpenSnackbar("Dodajte prvo vozila!", true);
      }
    else changeTab(newValue);
  };
  const hideNav = async (event) => {
    changeNavClass("removing");
    await new Promise((r) => setTimeout(r, 600));
    changeNavVisibility(true);
  };
  useEffect(() => {
    httpClient
      .get(`/companies`)
      .then((res) => {
        console.log(res.data);
        changeCompanies(res.data);
      })
      .catch((exc) => {
        handleOpenSnackbar("Servis nedostupan!", true);
      });
  }, [render]);

  useEffect(() => {
    httpClient
      .get(`/vehicles/engines`)
      .then((res) => {
        console.log(res.data);
        changeEngines(res.data);
      })
      .catch((exc) => {
        handleOpenSnackbar("Servis nedostupan!", true);
      });
    httpClient
      .get(`/vehicles/classes`)
      .then((res) => {
        console.log(res.data);
        changeClasses(res.data);
      })
      .catch((exc) => {
        handleOpenSnackbar("Servis nedostupan!", true);
      });
    window.addEventListener("scroll", hideNav);
    return () => {
      window.removeEventListener("scroll", hideNav);
    };
  }, []);
  const submitCalculatorData = (dto) => {
    console.log(dto);
    if (dto.type === "car") {
      httpClient
        .post(`/vehicles/calculator/cars`, dto)
        .then((res) => {
          changeCost(res.data);
        })
        .catch((exc) => {
          handleOpenSnackbar("Servis nedostupan!", true);
        });
    } else if (dto.type === "cargo") {
      httpClient
        .post(`/vehicles/calculator/cargo`, dto)
        .then((res) => {
          changeCost(res.data);
        })
        .catch((exc) => {
          handleOpenSnackbar("Servis nedostupan!", true);
        });
    } else {
      httpClient
        .post(`/vehicles/calculator/bikes`, dto)
        .then((res) => {
          changeCost(res.data);
        })
        .catch((exc) => {
          handleOpenSnackbar("Servis nedostupan!", true);
        });
    }
  };

  const list = (msgs) => (
    <Box sx={{ width: "auto" }} role="presentation">
      <List>
        {msgs
          .filter((msg) => !msg.read)
          .map((msg) => (
            <>
              <ListItemButton
                onClick={() => {
                  if (!msg.read) {
                    httpClient
                      .put(`/messages/` + msg.id)
                      .then((res) => {
                        msg.read = true;
                      })
                      .catch((exc) => { });
                  }
                  setSelectedMsg(selectedMsg !== msg.id ? msg.id : -1);
                }}
                key={msg.id}
                disablePadding
              >
                <ListItemIcon>
                  <MailIcon color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <span className="red-text">NEW!</span>
                  {" " + msg.sender + " - " + msg.title}{" "}
                </ListItemText>
                {msg.id === selectedMsg ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              {msg.id === selectedMsg && (
                <ListItem>
                  <Typography sx={{ marginLeft: 7 }} className="text">
                    {msg.content +
                      " (" +
                      msg.time.split("T")[0] +
                      " " +
                      msg.time.split("T")[1].split(":")[0] +
                      ":" +
                      msg.time.split("T")[1].split(":")[0] +
                      ")"}
                  </Typography>
                </ListItem>
              )}
            </>
          ))}
      </List>
      <Divider />
      <List>
        {msgs
          .filter((msg) => msg.read)
          .map((msg) => (
            <>
              <ListItemButton
                onClick={() => {
                  setSelectedMsg(selectedMsg !== msg.id ? msg.id : -1);
                }}
                key={msg.id}
                disablePadding
              >
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText>
                  {" " + msg.sender + " - " + msg.title}{" "}
                </ListItemText>
                {msg.id === selectedMsg ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {msg.id === selectedMsg && (
                <ListItem>
                  <Typography sx={{ marginLeft: 7 }} className="text">
                    {msg.content +
                      " (" +
                      msg.time.split("T")[0] +
                      " " +
                      msg.time.split("T")[1].split(":")[0] +
                      ":" +
                      msg.time.split("T")[1].split(":")[0] +
                      ")"}
                  </Typography>
                </ListItem>
              )}
            </>
          ))}
      </List>
    </Box>
  );

  return (
    <div className="page">
      <div className="header">eVehicleInspection</div>
      <div id="about-us">Specijalizovana web aplikacija za vaša vozila!</div>
      {!navVisibility && (
        <div className={navClass + "-up-slowly"}>
          <div id="navigation-bar">
            <div className="column" id="left">
              <a href="#slideshow">
                <div className={"card small-card " + navClass + "-up"}>
                  <div className="card-name"> Kompanije</div>
                </div>
              </a>
              <a href="#calculator-wrapper">
                <div
                  className={"card small-card " + navClass + "-up"}
                  id="calculator-tab"
                >
                  <div className="card-name">Kalkulator troškova</div>
                  <img
                    id="calculator-img"
                    src={calculator}
                    alt="calculator"
                  ></img>
                </div>
              </a>
            </div>
            <div className="column" id="center">
              <div
                className={"card large-card " + navClass + "-up"}
                onClick={() => {
                  hideNav();
                  changeTab(1);
                }}
              >
                <div className="card-name " id="bottom-card-name">
                  Zakaži termin
                </div>
                <img
                  alt="examination"
                  src={inspection}
                  id="inspection-img"
                ></img>
              </div>
            </div>
            <div className="column" id="right">
              <div
                className={"card medium-card " + navClass + "-up"}
                id="profile-tab"
                onClick={() => {
                  hideNav();
                  changeTab(2);
                }}
              >
                <div className="card-name" id="top-card-name">
                  Moj profil
                </div>
                <img src={avatar} id="avatar-img" alt="avatar"></img>
                <img src={avatar} id="blured-avatar-img" alt="avatar"></img>
              </div>
            </div>
          </div>
          <div id="scroll">
            <KeyboardDoubleArrowDownIcon
              id="scroll-btn"
              color="primary"
              sx={{ fontSize: 80 }}
            ></KeyboardDoubleArrowDownIcon>
          </div>
        </div>
      )}
      {!customerData && (
        <Fab
          variant="extended"
          onClick={() => navigate("/signup")}
          id="signup-fbn"
        >
          <PersonPinIcon sx={{ mr: 1 }} />
          Registracija
        </Fab>
      )}
      <Box sx={{ width: "100%" }}>
        {navVisibility && (
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="navbar"
          >
            <Tabs value={tab} onChange={handleChangeTab} centered>
              <Tab
                label="Naslovna"
                icon={<HomeIcon></HomeIcon>}
                {...a11yProps(0)}
              />
              <Tab
                label="Servisi"
                disabled={customerData === null}
                icon={<BuildIcon></BuildIcon>}
                {...a11yProps(1)}
              />
              <Tab
                label="Moj nalog"
                disabled={customerData === null}
                icon={<PersonIcon />}
                {...a11yProps(2)}
              />
              <Tab
                label="Notifikacije"
                disabled={customerData === null}
                icon={
                  <Badge
                    badgeContent={
                      customerData
                        ? customerData.msgs.filter((m) => !m.read).length
                        : 0
                    }
                    color="primary"
                  >
                    <MailIcon color="action" />
                  </Badge>
                }
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
        )}
        <CustomTabPanel value={tab} index={0}>
          {companies && (
            <div className="companies-slideshow" id="slideshow">
              <div className="subtitle">Naši partneri</div>
              <CompanyCarousel
                feedback={handleOpenSnackbar}
                httpClient={httpClient}
                companies={companies}
                render={() => {
                  changeRender(!render);
                }}
              ></CompanyCarousel>
            </div>
          )}
          {classes && engines && (
            <div id="calculator-wrapper">
              <div className="calculator">
                <div className="subtitle" id="calculator-title">
                  Kalkulator troškova
                </div>
                <Calculator
                  engines={engines}
                  classes={classes}
                  submit={submitCalculatorData}
                  cost={cost}
                  id="calculator"
                ></Calculator>
              </div>
            </div>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          {companies && customerData && (
            <Appointment
              httpClient={httpClient}
              companies={companies}
              myvehicles={customerData.vehicles}
              user={customerData}
              feedback={handleOpenSnackbar}
            ></Appointment>
          )}
        </CustomTabPanel>
        <CustomTabPanel id="acc-tab" value={tab} index={2}>
          {engines && classes && customerData && (
            <AccInfo
              httpClient={httpClient}
              user={customerData}
              engines={engines}
              classes={classes}
              feedback={handleOpenSnackbar}
            ></AccInfo>
          )}
        </CustomTabPanel>
        <CustomTabPanel id="acc-tab" value={tab} index={3}>
          <div>{customerData ? list(customerData.msgs) : <></>}</div>
        </CustomTabPanel>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer></Footer>
    </div>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default Homepage;
