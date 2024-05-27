import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

export const CompanyInfoModal = (props) => {
  const handleClose = () => {
    props.close();
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
        Dostupne lokacije
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{props.info.description}</Typography>
      </DialogContent>
      {props.info.stations.map((s) => {
        return (
          <DialogContent dividers>
            <Typography gutterBottom>{s.name}</Typography>
            <Typography gutterBottom>{"Adresa: " + s.address}</Typography>
            <Typography gutterBottom>{"Telefon: " + s.phone}</Typography>
          </DialogContent>
        );
      })}
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  );
};
