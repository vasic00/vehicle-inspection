import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import "../style/new-vehicle-modal.css";

export const NewVehicleModal = (props) => {
  const [type, changeType] = useState("CAR");
  const [manufacturer, changeManufacturer] = useState(null);
  const [model, changeModel] = useState(null);
  const [color, changeColor] = useState(null);
  const [engine, changeEngine] = useState(props.engines[0]);
  const [engineClass, changeEngineClass] = useState(props.classes[0]);
  const [year, changeYear] = useState(dayjs());
  const [volume, changeVolume] = useState(1000);
  const [power, changePower] = useState(100);
  const [mass, changeMass] = useState(1000);
  const [load, changeLoad] = useState(2000);
  const [gas, changeGas] = useState(false);
  const handleClose = () => {
    props.close();
  };
  const handleSave = () => {
    const dto = {
      manufacturer,
      model,
      color,
      productionYear: year.$y,
      type,
      engine,
      emissionClass: engineClass,
      owner: props.owner,
    };
    if (type === "CAR" || type === "MOTORBIKE") dto.engineVolume = volume;
    if (type === "CAR") {
      dto.enginePower = power;
      dto.lpg = gas;
    }
    if (type === "CARGO") {
      dto.mass = mass;
      dto.loadMax = load;
    }
    if (model === null) dto.model = "?";
    if (manufacturer === null) dto.manufacturer = "?";
    if (color === null) dto.model = "?";
    props.submit(dto);
    props.close();
  };
  const handleTypeChange = (event) => {
    changeType(event.target.value);
  };
  const handleVolumeChange = (event) => {
    if (event.target.value > 0 && event.target.value < 5000)
      changeVolume(event.target.value);
  };
  const handlePowerChange = (event) => {
    if (event.target.value > 0 && event.target.value < 200)
      changePower(event.target.value);
  };
  const handleMassChange = (event) => {
    if (event.target.value > 0 && event.target.value < 25000)
      changeMass(event.target.value);
  };
  const handleLoadChange = (event) => {
    if (event.target.value > 0 && event.target.value < 25000)
      changeLoad(event.target.value);
  };
  const handleGasChange = (event) => {
    changeGas(event.target.checked);
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
        Dodaj novo vozilo
      </DialogTitle>
      <DialogContent dividers>
        <div id="input-wrapper">
          <FormControl required sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="required-label">Vrsta vozila</InputLabel>
            <Select
              labelId="required-label"
              value={type}
              label="Tip vozila"
              onChange={handleTypeChange}
            >
              <MenuItem value={"CAR"} key={"CAR"}>
                Automobil
              </MenuItem>
              <MenuItem value={"CARGO"} key={"CARGO"}>
                Teretno vozilo
              </MenuItem>
              <MenuItem value={"MOTORBIKE"} key={"MOTORBIKE"}>
                Motocikl
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 160 }}>
            <TextField
              label="Proivođač"
              value={manufacturer}
              onChange={(event) => {
                changeManufacturer(event.target.value);
              }}
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 160 }}>
            <TextField
              label="Model"
              value={model}
              onChange={(event) => {
                changeModel(event.target.value);
              }}
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 160 }}>
            <TextField
              label="Boja"
              value={color}
              onChange={(event) => {
                changeColor(event.target.value);
              }}
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="required-label">Vrsta motora</InputLabel>
            <Select
              labelId="required-label"
              value={engine}
              label="Tip motora"
              onChange={(event) => changeEngine(event.target.value)}
            >
              {props.engines.map((e) => {
                return (
                  <MenuItem value={e} key={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {type === "CAR" && (
            <div className="gas-checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gas}
                    onChange={handleGasChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="LPG"
              />
            </div>
          )}
          <FormControl required sx={{ m: 1, minWidth: 160 }}>
            <InputLabel id="required-label">Klasa motora</InputLabel>
            <Select
              labelId="required-label"
              value={engineClass}
              label="Engine class"
              onChange={(event) => changeEngineClass(event.target.value)}
            >
              {props.classes.map((e) => {
                return (
                  <MenuItem value={e} key={e}>
                    {"Euro " + e}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 160 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={"Godina proizvodnje *"}
                views={["year"]}
                value={year}
                maxDate={dayjs()}
                onChange={(value) => changeYear(value)}
              />
            </LocalizationProvider>
          </FormControl>
          {type !== "CARGO" && (
            <FormControl required sx={{ m: 1, minWidth: 160 }}>
              <TextField
                id="outlined-number"
                label="Zapremina motora *"
                type="number"
                value={volume}
                onChange={handleVolumeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">cm³</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          )}
          {type === "CAR" && (
            <FormControl required sx={{ m: 1, minWidth: 160 }}>
              <TextField
                id="outlined-number"
                label="Snaga motora *"
                type="number"
                value={power}
                onChange={handlePowerChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">kW</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          )}
          {type === "CARGO" && (
            <>
              <FormControl required sx={{ m: 1, minWidth: 160 }}>
                <TextField
                  id="outlined-number"
                  label="Masa vozila *"
                  type="number"
                  value={mass}
                  onChange={handleMassChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl required sx={{ m: 1, minWidth: 160 }}>
                <TextField
                  id="outlined-number"
                  label="Maksimalna nosivost *"
                  type="number"
                  value={load}
                  onChange={handleLoadChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </>
          )}
          <div className="divider-div"></div>
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
