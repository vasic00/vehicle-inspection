import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf.json";
import "../style/signup-page.css";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const SignUpPage = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [password, changePassword] = useState(null);
  const [confirmPassword, changeConfirmPassword] = useState(null);
  const [username, changeUsername] = useState(null);
  const [firstname, changeFirstname] = useState(null);
  const [lastname, changeLastname] = useState(null);
  const [phone, changePhone] = useState(null);
  const [email, changeEmail] = useState(null);

  const [usernameError, changeUsernameError] = useState(false);
  const [firstnameError, changeFirstnameError] = useState(false);
  const [lastnameError, changeLastnameError] = useState(false);
  const [passwordError, changePasswordError] = useState(false);
  const [confirmPasswordError, changeConfirmPasswordError] = useState(false);

  const [showPassword, changeShowPassword] = useState(false);
  const [showConfirmPassword, changeShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeUsername = (value) => {
    changeUsername(value);
    if (usernameError && value !== null && value !== "")
      changeUsernameError(false);
  };
  const handleChangeFirstname = (value) => {
    changeFirstname(value);
    if (firstnameError && value !== null && value !== "")
      changeFirstnameError(false);
  };
  const handleChangeLastname = (value) => {
    changeLastname(value);
    if (lastnameError && value !== null && value !== "")
      changeLastnameError(false);
  };
  const handleChangePassword = (value) => {
    changePassword(value);
    if (
      confirmPassword !== null &&
      confirmPassword !== "" &&
      value !== confirmPassword
    )
      changeConfirmPasswordError(true);
    else changeConfirmPasswordError(false);
    if (passwordError && value !== null && value !== "")
      changePasswordError(false);
  };
  const handleConfirmPasswordChange = (value) => {
    changeConfirmPassword(value);
    if (value === password) changeConfirmPasswordError(false);
    else changeConfirmPasswordError(true);
  };
  const signup = () => {
    let error = false;
    if (username === null || username === "") {
      error = true;
      changeUsernameError(true);
    }
    if (firstname === null || firstname === "") {
      error = true;
      changeFirstnameError(true);
    }
    if (lastname === null || lastname === "") {
      error = true;
      changeLastnameError(true);
    }
    if (password === null || password === "") {
      error = true;
      changePasswordError(true);
    }
    if (
      confirmPassword === null ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      error = true;
      changeConfirmPasswordError(true);
    }
    if (!error) {
      axios
        .post(conf.server_url + `/auth/signup`, {
          username,
          password,
          firstname,
          lastname,
          phone,
          email,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/homepage", { state: res.data });
        })
        .catch((exc) => {
          console.log(exc);
          if (
            exc !== null &&
            exc.response !== null &&
            exc.response.status === 401
          ) {
            changePasswordError(true);
            changeUsernameError(true);
            setSnackbarMessage("Unesite druge kredencijale!");
            setOpenSnackbar(true);
          } else {
            setSnackbarMessage("Servis nedostupan!");
            setOpenSnackbar(true);
          }
        });
    }
  };
  return (
    <div className="page">
      <div className="header">eVehicleInspection</div>
      <div id="about-us">Specijalizovana aplikacija za vozila!</div>
      <div id="signup-content">
        <div id="signup-form">
          <div className="input-component">
            <TextField
              required
              label="Ime"
              value={firstname}
              onChange={(event) => {
                handleChangeFirstname(event.target.value);
              }}
              error={firstnameError}
            />
          </div>
          <div className="input-component">
            <TextField
              required
              label="Prezime"
              value={lastname}
              onChange={(event) => {
                handleChangeLastname(event.target.value);
              }}
              error={lastnameError}
            />
          </div>
          <div className="input-component">
            <TextField
              required
              label="Korisničko ime"
              value={username}
              onChange={(event) => {
                handleChangeUsername(event.target.value);
              }}
              error={usernameError}
            />
          </div>
          <div className="input-component">
            <FormControl variant="outlined" error={passwordError}>
              <InputLabel htmlFor="outlined-adornment-password">
                Lozinka *
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(event) => handleChangePassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => changeShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color={passwordError ? "error" : ""} />
                      ) : (
                        <Visibility color={passwordError ? "error" : ""} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Lozinka *"
              />
            </FormControl>
          </div>
          <div className="input-component">
            <FormControl variant="outlined" error={confirmPasswordError}>
              <InputLabel htmlFor="outlined-adornment-password">
                Potvrda lozinke *
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                // type={confirmPassword ? "text" : "password"}
                type={showConfirmPassword ? "text" : "password"}
                onChange={(event) =>
                  handleConfirmPasswordChange(event.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      // onClick={() => changeShowPassword(!showPassword)}
                      onClick={() =>
                        changeShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {/* {showPassword ? ( */}
                      {showConfirmPassword ? (
                        <VisibilityOff
                          color={confirmPasswordError ? "error" : ""}
                        />
                      ) : (
                        <Visibility
                          color={confirmPasswordError ? "error" : ""}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Potvrda lozinke *"
              />
            </FormControl>
          </div>
          <div className="input-component">
            <TextField
              label="Telefon"
              value={phone}
              onChange={(event) => {
                changePhone(event.target.value);
              }}
            />
          </div>
          <div className="input-component">
            <TextField
              label="Email"
              value={email}
              onChange={(event) => {
                changeEmail(event.target.value);
              }}
            />
          </div>
          <div className="input-component">
            <Button
              variant="contained"
              onClick={() => signup()}
              className="signup-btn"
            >
              Registracija
            </Button>
            <Button
              sx={{ marginTop: 1 }}
              variant="contained"
              onClick={() => navigate("/login")}
              className="signup-btn"
            >
              Povratak
            </Button>
          </div>
        </div>
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
  );
};
