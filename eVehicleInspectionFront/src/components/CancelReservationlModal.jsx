import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "../style/message-modal.css";
export const CancelReservationModal = (props) => {
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    props.close();
  };
  const handleCancel = () => {
    props.cancel(props.data, msg ? msg : "");
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
        <Typography>
          {props.data.line +
            " : " +
            props.data.startsAt.split("T")[0] +
            " " +
            props.data.startsAt.split("T")[1].split(":")[0] +
            ":" +
            props.data.startsAt.split("T")[1].split(":")[1] +
            " - " +
            props.data.endsAt.split("T")[1].split(":")[0] +
            ":" +
            props.data.endsAt.split("T")[1].split(":")[1]}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          multiline
          fullWidth
          className="data-input"
          label="Poruka"
          value={msg}
          onChange={(event) => {
            setMsg(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="error">
          Otkaži rezervaciju
        </Button>
        <Button autoFocus onClick={handleClose}>
          Odustani
        </Button>
      </DialogActions>
    </Dialog>
  );
};
