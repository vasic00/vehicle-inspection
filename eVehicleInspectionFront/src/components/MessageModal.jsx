import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import "../style/message-modal.css";
export const MessageModal = (props) => {
  const handleClose = () => {
    props.msg.read = true;
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
      <DialogTitle sx={{ m: 1, p: 2 }} id="customized-dialog-title">
        <pre className="pre-field">
          <span id="red">{!props.msg.read ? "NOVO!  " : ""}</span>
          {props.msg.title}

          <br></br>
          {props.msg.from}
        </pre>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{props.msg.content}</Typography>
        <Typography gutterBottom>
          {props.msg.time.split("T")[0] +
            " " +
            props.msg.time.split("T")[1].split(":")[0] +
            ":" +
            props.msg.time.split("T")[1].split(":")[0]}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
