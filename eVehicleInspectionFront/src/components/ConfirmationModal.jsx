import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

export const ConfirmationModal = (props) => {
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
        Da li si siguran?
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={() => props.confirm(true)}>
          Da
        </Button>
        <Button onClick={() => props.confirm(false)}>Ne</Button>
      </DialogActions>
    </Dialog>
  );
};
