import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
export const AlertModal = (props) => {
  const handleClose = () => {
    props.confirm(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Upozorenje!
      </DialogTitle>
      <DialogContent>
        {"Preostala su"}
        <span>{3 - props.count >= 0 ? 3 - props.count : 0}</span>
        {" otkazivanja bez posljedica!"}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => props.confirm(true)}>
          Nastavi
        </Button>
        <Button onClick={() => props.confirm(false)}>Abort</Button>
      </DialogActions>
    </Dialog>
  );
};
