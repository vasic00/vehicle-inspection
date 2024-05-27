import FormControl from "@mui/material/FormControl";
import { InputLabel, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const NewWorkerForm = (props) => {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [station, setStation] = useState(null);
  const [vacation, setVacation] = useState(20);

  return (
    <div className="form-wrapper">
      <Paper elevation={12} className="form-paper">
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            label="Ime"
            value={firstname}
            onChange={(event) => {
              setFirstname(event.target.value);
              setUsername(
                event.target.value + "." + (lastname ? lastname : "")
              );
            }}
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            label="Prezime"
            value={lastname}
            onChange={(event) => {
              setLastname(event.target.value);
              setUsername(
                (firstname ? firstname : "") + "." + event.target.value
              );
            }}
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            id="outlined-number"
            label="Godišnji odmor"
            type="number"
            value={vacation}
            onChange={(event) => {
              if (event.target.value > 9 && event.target.value < 26)
                setVacation(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            label="Lozinka"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 276 }}>
          <InputLabel>Station</InputLabel>
          <Select
            labelId="required-label"
            value={station}
            label="Stanica"
            onChange={(event) => setStation(event.target.value)}
          >
            {props.stations.map((e) => {
              return (
                <MenuItem value={e.id} key={e.id}>
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div className="form-btns">
          <Button
            className="form-btn"
            variant="contained"
            onClick={() => {
              if (firstname && lastname && password && station) {
                props.newWorker(
                  {
                    firstname,
                    lastname,
                    username,
                    password,
                    vacationLimit: vacation,
                  },
                  station
                );
              } else props.feedback("Popunite sva polja!", true);
            }}
          >
            Save
          </Button>
        </div>
      </Paper>
    </div>
  );
};
