import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

export const StationForm = (props) => {
  const [lines, setLines] = useState([]);
  const [name, setName] = useState(props.data?.name);
  const [address, setAddress] = useState(props.data?.address);
  const [email, setEmail] = useState(props.data?.email);
  const [phone, setPhone] = useState(props.data?.phone);
  const [from, setFrom] = useState(
    dayjs().hour(props.data ? props.data.startsAt : 1)
  );
  const [to, setTo] = useState(
    dayjs().hour(props.data ? props.data.endsAt : 2)
  );

  return (
    <div className="form-wrapper">
      <Paper elevation={12} className="form-paper">
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            // color={name !== props.data?.name ? "warning" : ""}
            focused={name !== props.data?.name ? true : false}
            label="Naziv"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            // color={address !== props.data?.address ? "warning" : ""}
            focused={address !== props.data?.address ? true : false}
            label="Adresa"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            // color={email !== props.data?.email ? "warning" : ""}
            focused={email !== props.data?.email ? true : false}
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 276 }}>
          <TextField
            // color={phone !== props.data?.phone ? "warning" : ""}
            focused={phone !== props.data?.phone ? true : false}
            label="Telefon"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </FormControl>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl required sx={{ m: 1, width: 130 }}>
              <TimePicker
                views={["hours"]}
                label="Početak"
                value={from}
                onChange={(newValue) => setFrom(newValue)}
              />
            </FormControl>

            <FormControl required sx={{ m: 1, width: 130 }}>
              <TimePicker
                // color="warning"
                focused
                views={["hours"]}
                label="Kraj"
                value={to}
                onChange={(newValue) => {
                  if (newValue.isAfter(from)) setTo(newValue);
                  else {
                    setTo(dayjs().hour(props.data?.endsAt));
                    props.feedback("Nevalidno radno vijeme!", true);
                  }
                }}
              />
            </FormControl>
          </LocalizationProvider>
        </div>
        {lines.map((l) => (
          <FormControl required sx={{ m: 1, minWidth: 276 }}>
            <TextField
              // color={address !== props.data?.address ? "warning" : ""}
              focused={address !== props.data?.address ? true : false}
              label={l.name}
              value={l.value}
              onChange={(event) => {
                l.value = event.target.value;
                setLines([...lines]);
              }}
            />
          </FormControl>
        ))}

        <Button
          sx={{ m: 1 }}
          variant="outlined"
          startIcon={<Add></Add>}
          onClick={() => {
            setLines([
              ...lines,
              {
                value: "Linija " + (lines.length + 1),
                name: "Linija " + (lines.length + 1),
              },
            ]);
          }}
        >
          Dodaj liniju
        </Button>
        {lines.length > 0 && (
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            startIcon={<Remove></Remove>}
            onClick={() => {
              lines.pop();
              setLines([...lines]);
            }}
          >
            Ukloni liniju
          </Button>
        )}

        <div className="form-btns">
          <Button
            className="form-btn"
            variant="contained"
            onClick={props.return}
          >
            Povratak
          </Button>
          <Button
            className="form-btn"
            variant="contained"
            onClick={() => {
              if (name && email && phone && address) {
                props.update(
                  {
                    id: props.data?.id,
                    name,
                    email,
                    phone,
                    address,
                    startsAt: from.$H,
                    endsAt: to.$H,
                  },
                  lines
                );
              } else props.feedback("Popunite sva polja!", true);
            }}
          >
            Sačuvaj
          </Button>
        </div>
      </Paper>
    </div>
  );
};
