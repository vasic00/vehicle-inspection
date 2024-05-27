import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../style/report.css";
export const ExamReport = (props) => {
  console.log(props.exam);
  const [status, setStatus] = useState(
    props.exam.report.record.passed ? "PASSED" : "FAILED"
  );
  const [licencePlates, setLicencePlates] = useState("XXX-X-XXX");
  const [malus, setMalus] = useState(props.exam.report.vehicle.malus);
  const [type, setType] = useState(props.exam.report.vehicle.type);
  const [color, setColor] = useState(props.exam.report.vehicle.color);
  const [year, setYear] = useState(
    dayjs().set("year", props.exam.report.vehicle.productionYear)
  );
  const [manufacturer, setManufacturer] = useState(
    props.exam.report.vehicle.manufacturer
  );
  const [model, setModel] = useState(props.exam.report.vehicle.model);
  const [engine, setEngine] = useState(props.exam.report.vehicle.engine);
  const [engineClass, setEngineClass] = useState(
    props.exam.report.vehicle.emissionClass
  );
  const [mass, setMass] = useState(
    props.exam.report.vehicle.mass ? props.exam.report.vehicle.mass : 1
  );
  const [load, setLoad] = useState(
    props.exam.report.vehicle.loadMax ? props.exam.report.vehicle.loadMax : 1
  );
  const [volume, setVolume] = useState(
    props.exam.report.vehicle.engineVolume
      ? props.exam.report.vehicle.engineVolume
      : 1
  );
  const [power, setPower] = useState(
    props.exam.report.vehicle.enginePower
      ? props.exam.report.vehicle.enginePower
      : 1
  );
  const [gas, setGas] = useState(
    props.exam.report.lpg ? props.exam.report.lpg : 1
  );

  const [price, setPrice] = useState(parseInt(props.exam.report.price));
  const [plates, setPlates] = useState(props.exam.report.newPlates);
  const [first, setFirst] = useState(props.exam.report.first);
  const [ownerCert, setOwnerCert] = useState(props.exam.report.ownerCert);
  const [greenCard, setGreenCard] = useState(props.exam.report.greenCard);
  const [registrationCert, setRegistrationCert] = useState(
    props.exam.report.regCert
  );
  const [registration, setRegistration] = useState(
    props.exam.report.registration
  );
  const [description, setDescription] = useState(
    props.exam.report.record.description
  );
  const [render, setRender] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const returnAsync = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    props.return();
  };
  const handlePriceChange = (value) => {
    setPrice(parseInt(value));
  };
  const handleTypeChange = (event) => {
    if (event.target.value === "CAR") {
      setLoad(1);
      setMass(1);
    } else if (event.target.value === "CARGO") {
      setPower(1);
      setVolume(1);
    } else {
      setLoad(1);
      setMass(1);
      setPower(1);
    }
    setType(event.target.value);
  };
  const handleVolumeChange = (event) => {
    if (event.target.value > 0 && event.target.value < 5000)
      setVolume(event.target.value);
  };
  const handlePowerChange = (event) => {
    if (event.target.value > 0 && event.target.value < 200)
      setPower(event.target.value);
  };
  const handleMassChange = (event) => {
    if (event.target.value > 0 && event.target.value < 25000)
      setMass(event.target.value);
  };
  const handleLoadChange = (event) => {
    if (event.target.value > 0 && event.target.value < 25000)
      setLoad(event.target.value);
  };
  const handleGasChange = (event) => {
    setGas(event.target.checked);
  };
  const submitCalculatorData = (dto) => {
    console.log(dto);
    if (dto.type === "CAR") {
      props.httpClient
        .post(`/vehicles/calculator/cars`, dto)
        .then((res) => {
          console.log(res.data.value);
          setPrice(res.data.value);
        })
        .catch((exc) => {
          props.feedback("Servis nedostupan!", true);
        });
    } else if (dto.type === "CARGO") {
      props.httpClient
        .post(`/vehicles/calculator/cargo`, dto)
        .then((res) => {
          console.log(res.data.value);
          setPrice(res.data.value);
        })
        .catch((exc) => {
          props.feedback("Servis nedostupan!", true);
        });
    } else {
      props.httpClient
        .post(`/vehicles/calculator/bikes`, dto)
        .then((res) => {
          console.log(res.data.value);
          setPrice(res.data.value);
        })
        .catch((exc) => {
          props.feedback("Servis nedostupan!", true);
        });
    }
  };
  const submit = () => {
    const dto = {
      type,
      engine,
      engineClass,
      volume,
      first,
      registration,
      regCert: registrationCert,
      ownerCert,
      greenCard,
      newPlates: plates,
      malus,
    };
    if (type === "CAR") {
      dto.power = power;
      dto.year = year.$y;
    } else if (type === "CARGO") {
      dto.mass = mass;
      dto.load = load;
    } else {
      dto.year = year.$y;
    }
    console.log(dto);
    submitCalculatorData(dto);
  };
  useEffect(
    () => submit(),
    [
      type,
      engine,
      engineClass,
      power,
      volume,
      mass,
      load,
      registration,
      plates,
      greenCard,
      registrationCert,
      ownerCert,
      first,
      year,
      malus,
    ]
  );
  return (
    <div id="report-wrapper">
      <div id="report-title">Izvještaj</div>
      <div className="report-columns outer-columns">
        <div className="report-rows">
          <div className="report-section">
            <div className="section-title">Vozilo</div>
            <div className="report-columns">
              <div className="report-labels">
                <div className="report-label" id="owner-label">
                  {"Vlasnik: " + props.exam.report.vehicle.ownerName}
                </div>
                <FormControl required sx={{ m: 1, minWidth: 160 }}>
                  <InputLabel id="required-label">Tip vozila</InputLabel>
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
                    label="Tablice *"
                    value={licencePlates}
                    onChange={(event) => {
                      setLicencePlates(event.target.value);
                    }}
                  />
                </FormControl>

                <FormControl required sx={{ m: 1, minWidth: 160 }}>
                  <TextField
                    label="Proizvođač"
                    value={manufacturer}
                    onChange={(event) => {
                      setManufacturer(event.target.value);
                    }}
                  />
                </FormControl>

                <FormControl required sx={{ m: 1, minWidth: 160 }}>
                  <TextField
                    label="Model"
                    value={model}
                    onChange={(event) => {
                      setModel(event.target.value);
                    }}
                  />
                </FormControl>

                <FormControl required sx={{ m: 1, minWidth: 160 }}>
                  <TextField
                    label="Boja"
                    value={color}
                    onChange={(event) => {
                      setColor(event.target.value);
                    }}
                  />
                </FormControl>

                <FormControl required sx={{ m: 1, minWidth: 160 }}>
                  <InputLabel id="required-label">Tip motora</InputLabel>
                  <Select
                    labelId="required-label"
                    value={engine}
                    label="Tip motora"
                    onChange={(event) => setEngine(event.target.value)}
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
                    label="Klasa motora"
                    onChange={(event) => setEngineClass(event.target.value)}
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
                      onChange={(value) => setYear(value)}
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
                        label="Max nosivost *"
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
                <FormControl required sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="required-label">Malus</InputLabel>
                  <Select
                    value={malus}
                    onChange={(event) => setMalus(event.target.value)}
                    label="Malus *"
                  >
                    {[
                      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2,
                      1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2,
                    ].map((e) => {
                      return (
                        <MenuItem value={e} key={e}>
                          {Math.round(e * 100) + "%"}
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
                          // checked={gas}
                          onChange={handleGasChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="LPG"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="report-section">
          <div className="section-title">Kriteriji</div>
          <div className="report-columns">
            <div className="report-labels">
              {props.exam.report.record.criteria.map((c) => (
                <div className="report-label-large" key={c.name}>
                  {c.name}
                </div>
              ))}
              <div className="report-label-large" key={"all"}>
                <span style={{ color: "blue" }}>Označi sve</span>
              </div>
            </div>
            <div className="report-values">
              {props.exam.report.record.criteria.map((c) => (
                <div className="report-value-large" key={c.name + " value"}>
                  <Checkbox
                    checked={c.satisfied || checkAll}
                    onChange={(event) => {
                      c.satisfied = event.target.checked;
                      const passed = props.exam.report.record.criteria
                        .map((c) => c.satisfied)
                        .reduce((a, b) => a && b, true);
                      props.exam.report.record.passed = passed;
                      setStatus(passed ? "PASSED" : "FAILED");
                      setRender(!render);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  {!c.satisfied && !checkAll && (
                    <TextField
                      className="reason-field"
                      variant="standard"
                      value={c.description}
                      onChange={(event) => {
                        c.description = event.target.value;
                        setRender(!render);
                      }}
                    />
                  )}
                </div>
              ))}
              <div className="report-value-large" key={"all value"}>
                <Checkbox
                  checked={checkAll}
                  onChange={(event) => {
                    props.exam.report.record.passed = event.target.checked;
                    props.exam.report.record.checkAll = event.target.checked;
                    setStatus(event.target.checked ? "PASSED" : "FAILED");
                    setCheckAll(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
          </div>
          <div className="report-section">
            <div className="section-title">Opcije</div>
            <div className="report-columns">
              <div className="report-labels">
                <div className="report-label">Registracija:</div>
                {registration && (
                  <div className="report-label">Prva registracija:</div>
                )}
                {registration && (
                  <div className="report-label">Nove tablice:</div>
                )}
                <div className="report-label">Zeleni karton:</div>
                {registration && (
                  <div className="report-label">Potvrda o registaciji:</div>
                )}
                <div className="report-label">Potvrda o vlasništvu:</div>
              </div>
              <div className="report-values">
                <div className="report-value">
                  <FormControl>
                    <Checkbox
                      checked={registration}
                      onChange={(event) => {
                        props.exam.report.registration = event.target.checked;
                        setRegistration(event.target.checked);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </FormControl>
                </div>
                {registration && (
                  <div className="report-value">
                    <FormControl>
                      <Checkbox
                        checked={first}
                        onChange={(event) => {
                          props.exam.report.first = event.target.checked;
                          setFirst(event.target.checked);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </FormControl>
                  </div>
                )}
                {registration && (
                  <div className="report-value">
                    <FormControl>
                      <Checkbox
                        checked={plates}
                        onChange={(event) => {
                          props.exam.report.newPlates = event.target.checked;
                          setPlates(event.target.checked);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </FormControl>
                  </div>
                )}
                <div className="report-value">
                  <FormControl>
                    <Checkbox
                      checked={greenCard}
                      onChange={(event) => {
                        props.exam.report.greenCard = event.target.checked;
                        setGreenCard(event.target.checked);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </FormControl>
                </div>
                {registration && (
                  <div className="report-value">
                    <FormControl>
                      <Checkbox
                        checked={registrationCert}
                        onChange={(event) => {
                          props.exam.report.regCert = event.target.checked;
                          setRegistrationCert(event.target.checked);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </FormControl>
                  </div>
                )}
                <div className="report-value">
                  <FormControl>
                    <Checkbox
                      checked={ownerCert}
                      onChange={(event) => {
                        props.exam.report.ownerCert = event.target.checked;
                        setOwnerCert(event.target.checked);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="report-section">
        <div className="section-title">Rezime</div>
        <div className="report-columns">
          <div className="report-labels">
            <div className="report-label-xl">Vrijeme:</div>
            <div className="report-label-xl">Cijena:</div>
            <div className="report-label-xl">Status:</div>
            <div className="desc-field">Opis:</div>
          </div>
          <div className="report-values">
            <div className="report-value-xl">{props.exam.report.period}</div>
            <div className="report-value-xl">
              <FormControl required sx={{ m: 1, width: 150 }} id="price-picker">
                <TextField
                  variant="standard"
                  type="number"
                  value={price.toFixed(2)}
                  onChange={(event) => handlePriceChange(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">BAM</InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
            <div
              className={
                status === "FAILED"
                  ? "report-value-xl failed"
                  : "report-value-xl success"
              }
            >
              {status === "FAILED" ? "NIJE ZADOVOLJIO" : "ZADOVOLJIO"}
            </div>
            <div id="desc-field-wrapper">
              <TextField
                id="desc-field"
                multiline
                rows={4}
                variant="standard"
                value={description}
                onChange={(event) => {
                  props.exam.report.record.description = event.target.value;
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div id="report-footer">
        <div id="report-location">
          {props.exam.report.company}
          <br></br>
          {props.exam.report.station}
          <br></br>
          {new Date().toLocaleDateString() +
            "  " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes()}
        </div>
        <div id="report-supervisor">{props.exam.report.supervisor}</div>
      </div>
      <div id="btns-wrapper">
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            props.return();
          }}
        >
          Povratak
        </Button>
        <Button
          id="submit-report-btn"
          variant="contained"
          color="primary"
          onClick={() => {
            if (licencePlates === "XXX-X-XXX")
              props.feedback("Unesite tablice vozila!", true);
            else {
              props.submit({
                ...props.exam.report,
                price,
                malus,
                engine,
                emissionClass: engineClass,
                enginePower: power,
                engineVolume: volume,
                regCert: registration ? registrationCert : false,
                registration,
                first: registration ? first : false,
                ownerCert,
                newPlates: registration ? plates : false,
                greenCard,
                lpg: gas,
                manufacturer,
                model,
                color,
                productionYear: year.$y,
                mass,
                loadMax: load,
                licencePlates,
                type,
              });
              returnAsync();
            }
          }}
        >
          Sačuvaj
        </Button>
      </div>
    </div>
  );
};
