import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { InputLabel, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const SelectModal = (props) => {
  const [option, setOption] = useState();
  return (
    <Dialog
      onClose={props.close}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Izaberite jednu od opcija
      </DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, minWidth: 276 }}>
          <InputLabel>Stanica</InputLabel>
          <Select
            labelId="required-label"
            value={option}
            label="Stanica"
            onChange={(event) => setOption(event.target.value)}
          >
            {props.options.map((e) => {
              return (
                <MenuItem value={e.id} key={e.id}>
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            if (option != null) props.change(option);
            else props.close();
          }}
        >
          Save
        </Button>
        <Button onClick={props.close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
