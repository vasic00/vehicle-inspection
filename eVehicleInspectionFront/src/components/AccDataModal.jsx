import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import "../style/acc-data-model.css";
export const AccDataModal = (props) => {
  const [firstname, changeFirstname] = useState(props.user.firstname);
  const [lastname, changeLastname] = useState(props.user.lastname);
  const [phone, changePhone] = useState(props.user.phone);
  const [email, changeEmail] = useState(props.user.email);

  const handleClose = () => {
    props.close();
  };
  const handleSave = () => {
    if (firstname === "" || lastname === "" || phone === "" || email === "") {
      // notify
    } else {
      props.submit(firstname, lastname, email, phone);
      props.close();
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth="xs"
      scroll="paper"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Izmijeni lične podatke
      </DialogTitle>
      <DialogContent dividers>
        <div id="input-wrapper">
          <TextField
            className="data-input"
            label="Ime"
            value={firstname}
            onChange={(event) => {
              changeFirstname(event.target.value);
            }}
          />
          <div className="divider-div"></div>
          <TextField
            className="data-input"
            label="Prezime"
            value={lastname}
            onChange={(event) => {
              changeLastname(event.target.value);
            }}
          />
          <div className="divider-div"></div>
          <TextField
            className="data-input"
            label="Broj telefona"
            value={phone}
            onChange={(event) => {
              changePhone(event.target.value);
            }}
          />
          <div className="divider-div"></div>
          <TextField
            className="data-input"
            label="Email"
            value={email}
            onChange={(event) => {
              changeEmail(event.target.value);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave}>
          Sačuvaj
        </Button>
        <Button autoFocus onClick={handleClose}>
          Odustani
        </Button>
      </DialogActions>
    </Dialog>
  );
};
