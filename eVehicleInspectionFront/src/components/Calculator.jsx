import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../style/calculator.css";
const marks = [
  {
    value: 1990,
    label: "1990",
  },
  {
    value: 1995,
    label: "1995",
  },
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 2005,
    label: "2005",
  },
  {
    value: 2010,
    label: "2010",
  },
  {
    value: 2015,
    label: "2015",
  },
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2024,
    label: "2024",
  },
];

export const Calculator = (props) => {
  const [type, changeType] = useState("car");
  const [engine, changeEngine] = useState(props.engines[0]);
  const [engineClass, changeEngineClass] = useState(props.classes[0]);
  const [engineVolume, changeEngineVolume] = useState(1000);
  const [enginePower, changeEnginePower] = useState(100);
  const [mass, changeMass] = useState(1000);
  const [load, changeLoad] = useState(1000);
  const [registration, changeRegistration] = useState(true);
  const [newPlates, changeNewPlates] = useState(false);
  const [greenCard, changeGreenCard] = useState(false);
  const [regCert, changeRegCert] = useState(false);
  const [ownerCert, changeOwnerCert] = useState(false);
  const [firstTime, changeFirstTime] = useState(false);
  const [prodYear, changeProdYear] = useState(2023);
  const [malus, changeMalus] = useState(1);
  useEffect(
    () => submit(),
    [
      type,
      engine,
      engineClass,
      enginePower,
      engineVolume,
      mass,
      load,
      registration,
      newPlates,
      greenCard,
      regCert,
      ownerCert,
      firstTime,
      prodYear,
      malus,
    ]
  );
  const handleТypeChange = (event, type) => {
    if (type !== null) {
      console.log(type);
      changeType(type);
    }
  };
  const handleEngineChange = (event) => {
    changeEngine(event.target.value);
  };
  const handleEngineClassChange = (event) => {
    changeEngineClass(event.target.value);
  };
  const handleMalusChange = (event) => {
    changeMalus(event.target.value);
  };
  const valuetext = (value) => {
    return `${value}`;
  };
  const handleEngineVolumeChange = (event) => {
    if (event.target.value > 0 && event.target.value < 5000)
      changeEngineVolume(event.target.value);
  };
  const handleEnginePowerChange = (event) => {
    if (event.target.value > 0 && event.target.value < 200)
      changeEnginePower(event.target.value);
  };
  const handleMassChange = (event) => {
    if (event.target.value > 0 && event.target.value < 25000)
      changeMass(event.target.value);
  };
  const handleLoadChange = (event) => {
    if (event.target.value > 0 && event.target.value < 25000)
      changeLoad(event.target.value);
  };
  const handleChangeRegistration = (event) => {
    changeRegistration(event.target.checked);
  };
  const handleNewPlatesChange = (event) => {
    changeNewPlates(event.target.checked);
  };
  const handleRegCertChange = (event) => {
    changeRegCert(event.target.checked);
  };
  const handleOwnerCertChange = (event) => {
    changeOwnerCert(event.target.checked);
  };
  const handleGreenCardChange = (event) => {
    changeGreenCard(event.target.checked);
  };

  const handleFirstTimeChange = (event) => {
    changeFirstTime(event.target.checked);
  };
  const handleProdYearChange = (event, newValue) => {
    changeProdYear(newValue);
  };
  const submit = () => {
    console.log(window.innerWidth);
    const dto = {
      type,
      engine,
      engineClass,
      volume: engineVolume,
      first: firstTime,
      registration,
      regCert,
      ownerCert,
      greenCard,
      newPlates,
      malus,
    };
    if (type === "car") {
      dto.power = enginePower;
      dto.year = prodYear;
      props.submit(dto);
    } else if (type === "cargo") {
      dto.mass = mass;
      dto.load = load;
      props.submit(dto);
    } else {
      dto.year = prodYear;
      props.submit(dto);
    }
  };
  return (
    <div id="calculator">
      <ToggleButtonGroup
        id="type-toggle"
        value={type}
        exclusive
        onChange={handleТypeChange}
        aria-label="vehicle type"
      >
        <ToggleButton value="car" aria-label="car">
          <DirectionsCarIcon />
        </ToggleButton>
        <ToggleButton value="cargo" aria-label="cargo">
          <LocalShippingIcon />
        </ToggleButton>
        <ToggleButton value="motorbike" aria-label="motorbike">
          <TwoWheelerIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {type !== "cargo" && (
        <Box id="slider">
          <Slider
            aria-label="production year"
            defaultValue={2023}
            getAriaValueText={valuetext}
            step={1}
            min={1990}
            max={2024}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleProdYearChange}
          />
        </Box>
      )}
      <div id="select-inputs">
        <FormControl required sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="required-label">Tip motora</InputLabel>
          <Select
            labelId="required-label"
            value={engine}
            label="Tip motora *"
            onChange={handleEngineChange}
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
        <FormControl required sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="required-label">Klasa motora</InputLabel>
          <Select
            labelId="required-label"
            value={engineClass}
            label="Klasa motora*"
            onChange={handleEngineClassChange}
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
          <InputLabel id="required-label">Malus</InputLabel>
          <Select
            labelId="required-label"
            value={malus}
            label="Malus *"
            onChange={handleMalusChange}
          >
            {[
              0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8,
              2.0,
            ].map((e) => {
              return (
                <MenuItem value={e} key={e}>
                  {Math.round(e * 100)}%
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl required sx={{ m: 1, width: 160 }}>
          <TextField
            id="outlined-number"
            label="Zapremina motora *"
            type="number"
            value={engineVolume}
            onChange={handleEngineVolumeChange}
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
        {type === "car" && (
          <FormControl required sx={{ m: 1, width: 160 }}>
            <TextField
              id="outlined-number"
              label="Snaga motora *"
              type="number"
              value={enginePower}
              onChange={handleEnginePowerChange}
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
        {type === "cargo" && (
          <FormControl required sx={{ m: 1, width: 160 }}>
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
        )}
        {type === "cargo" && (
          <FormControl required sx={{ m: 1, width: 160 }}>
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
        )}
      </div>
      <div id="checkboxes">
        <div className="checkbox">
          <FormControlLabel
            control={
              <Checkbox
                checked={registration}
                onChange={handleChangeRegistration}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Registracija"
          />
        </div>
        {registration && (
          <>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={firstTime}
                    onChange={handleFirstTimeChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Prva registracija"
              />
            </div>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newPlates}
                    onChange={handleNewPlatesChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Nove tablice"
              />
            </div>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={regCert}
                    onChange={handleRegCertChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Potvrda o registraciji"
              />
            </div>
          </>
        )}
        <div className="checkbox">
          <FormControlLabel
            control={
              <Checkbox
                checked={greenCard}
                onChange={handleGreenCardChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Zeleni karton"
          />
        </div>

        <div className="checkbox">
          <FormControlLabel
            control={
              <Checkbox
                checked={ownerCert}
                onChange={handleOwnerCertChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Potvrda o vlasništvu"
          />
        </div>
      </div>
      {props.cost && (
        <div id="cost">
          Procjena troškova:{" "}
          <span id="cost-value">
            {props.cost.value.toFixed(2) + " " + props.cost.currency}
          </span>
        </div>
      )}
    </div>
  );
};
