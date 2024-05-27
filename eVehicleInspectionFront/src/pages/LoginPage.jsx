import React, { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../style/login-page.css";
import vehicle from "../assets/car-service-trans.png";
import cover1 from "../assets/cover1.png";
import cover2 from "../assets/cover2.png";
import Button from "@mui/material/Button";
import Switch, { SwitchProps } from "@mui/material/Switch";
import conf from "../conf.json";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
export const LoginPage = (props) => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [failed, setFailed] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const usernameChanged = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const passwordChanged = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const submit = () => {
    const credentials = btoa(username + ":" + password);
    axios
      .post(conf.server_url + `/auth` + (props.worker ? "/workers" : ""), {
        username: username.trim(),
        password: password.trim(),
      })
      .then((res) => {
        setFailed(false);
        if (props.worker) {
          if (res.data.role === "ADMIN")
            navigate("/services/admin/homepage", { state: res.data });
          else navigate("/services/homepage", { state: res.data });
        } else navigate("/homepage", { state: res.data });
      })
      .catch((exc) => {
        if (
          exc != null &&
          exc.response != null &&
          exc.response.status === 401
        ) {
          setFailed(true);
          setSnackbarMessage("Pogrešni kredencijali!");
          setOpenSnackbar(true);
        } else {
          setSnackbarMessage("Servis nedostupan!");
          setOpenSnackbar(true);
        }
      });
  };

  return (
    <div className="page">
      <div className="header">eVehicleInspection</div>
      <div id="about-us">Specijalizovana web aplikacija za vaša vozila!</div>
      <div className="login-page">
        <div id="content">
          <div className="logo-wrapper">
            <img
              id="logo"
              src={props.worker ? cover2 : cover1}
              alt="vehicle"
            ></img>
          </div>
        </div>
        <div className="login-form-wrapper">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                success
                id="outlined"
                label="Korisničko ime"
                onChange={usernameChanged}
                error={failed}
              />
              <br></br>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                error={failed}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Lozinka
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={passwordChanged}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                      submit();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Lozinka"
                />
              </FormControl>
              <br></br>
            </div>
          </Box>
          {!props.worker && (
            <div id="btns">
              <Button variant="text" onClick={() => navigate("/homepage")}>
                Gost
              </Button>
              <Button variant="text" onClick={() => navigate("/signup")}>
                Registracija
              </Button>
            </div>
          )}
          <div className="login-btn-wrapper">
            <Button variant="contained" onClick={submit}>
              Prijavi se
            </Button>
            {!props.worker && (
              <Button
                id="company-login-btn"
                variant="text"
                onClick={() => navigate("/services/login")}
              >
                Prijava za kompanije
              </Button>
            )}
          </div>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
