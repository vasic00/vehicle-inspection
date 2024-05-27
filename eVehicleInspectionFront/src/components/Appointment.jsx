import React, { useState, useEffect } from "react";
import "../style/appointment.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Checkbox from "@mui/material/Checkbox";
import { ConfirmationModal } from "./ConfirmationModal";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import conf from "../conf.json";
import createAxiosInstance from "../util/axiosClient";
export const Appointment = (props) => {
  const [version, setVersion] = React.useState(true);
  const [station, changeStation] = useState(props.companies[0].stations[0]);
  const [stationV2, changeStationV2] = useState(props.companies[0].stations[0]);
  const [vehicle, changeVehicle] = useState(props.myvehicles[0]);
  const [date, changeDate] = useState(dayjs().add(1, "day"));
  const [time, changeTime] = useState(null);
  const [dateV2, changeDateV2] = useState(dayjs().add(1, "day"));
  const [timeV2, changeTimeV2] = useState(null);
  const [newPlates, changeNewPlates] = useState(false);
  const [registration, changeRegistration] = useState(true);
  const [greenCard, changeGreenCard] = useState(false);
  const [regCert, changeRegCert] = useState(false);
  const [ownerCert, changeOwnerCert] = useState(false);
  const [firstTime, changeFirstTime] = useState(false);
  const [cost, changeCost] = useState(null);
  const [proposals, changeProposals] = useState(null);
  const [proposalsV2, changeProposalsV2] = useState(null);
  const [modalOpen, changeModalOpen] = useState(false);
  const [render, changeRender] = useState(false);
  const stations = [].concat(
    ...props.companies.map((c) => {
      return c.stations.map((s) => {
        return { station: s, fullName: c.name + " - " + s.name };
      });
    })
  );

  const handleStationChange = (event) => {
    changeStation(event.target.value);
  };
  const handleStationV2Change = (event) => {
    changeStationV2(event.target.value);
  };
  const handleVehicleChange = (event) => {
    changeVehicle(event.target.value);
  };
  const handleChangeDate = (value) => {
    changeDate(value);
  };
  const handleChangeDateV2 = (value) => {
    changeDateV2(value);
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
  const handleChangeTimeV2 = (value) => {
    changeTimeV2(value);
    changeStationV2(value.stations[0]);
  };
  const handleFirstTimeChange = (event) => {
    changeFirstTime(event.target.checked);
  };
  const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
  };
  const handleVersionChange = (event) => {
    setVersion(event.target.value);
  };
  useEffect(() => {
    if (version) getProposals();
  }, [station, vehicle, date, render, version]);

  useEffect(() => {
    if (!version) getProposalsV2();
  }, [vehicle, dateV2, render, version]);
  useEffect(() => {
    calculate();
  }, [
    vehicle,
    newPlates,
    regCert,
    ownerCert,
    firstTime,
    greenCard,
    registration,
  ]);
  const getProposals = () => {
    console.log("v1");
    let m = date.get("month") + 1;
    if (m < 10) {
      m = "0" + m.toString();
    }
    let d = date.get("date");
    if (d < 10) {
      d = "0" + d.toString();
    }
    props.httpClient
      .get(
        `/reservations/` +
        station.id +
        "/" +
        vehicle.type +
        "/" +
        date.get("year") +
        "-" +
        m +
        "-" +
        d
      )
      .then((res) => {
        console.log(res.data);
        changeProposals(res.data);
        if (res.data.length > 0) {
          changeTime(res.data[0]);
        } else {
          console.log("no data");
          props.feedback("Nema slobodnih termina!", false);
        }
      })
      .catch((exc) => { });
  };
  const getProposalsV2 = () => {
    console.log("v2");
    let m = dateV2.get("month") + 1;
    if (m < 10) {
      m = "0" + m.toString();
    }
    let d = dateV2.get("date");
    if (d < 10) {
      d = "0" + d.toString();
    }
    props.httpClient
      .get(
        `/reservations/` +
        vehicle.type +
        "/" +
        date.get("year") +
        "-" +
        m +
        "-" +
        d
      )
      .then((res) => {
        console.log(res.data);
        changeProposalsV2(res.data);
        if (res.data.length > 0) {
          changeTimeV2(res.data[0]);
          changeStationV2(res.data[0].stations[0]);
        } else {
          props.feedback("Nema slobodnih termina!", false);
          changeTime(null);
        }
      })
      .catch((exc) => {
        props.feedback("Services nedostupan!", true);
      });
  };
  const calculate = () => {
    const dto = {
      vehicle: vehicle.id,
      first: firstTime,
      regCert,
      ownerCert,
      greenCard,
      newPlates,
      registration,
    };
    console.log(dto);
    props.httpClient
      .post(`/vehicles/calculator`, dto)
      .then((res) => {
        changeCost(res.data);
      })
      .catch((exc) => {
        props.feedback("Nema slobodnih termina!", false);
        // ???
        changeCost(0);
      });
  };
  const confirm = (confirm) => {
    if (confirm) book();
    changeModalOpen(false);
  };
  const book = () => {
    const dto = {
      vehicle: vehicle.id,
      first: registration ? firstTime : false,
      registration,
      regCert: registration ? regCert : false,
      ownerCert,
      greenCard,
      newPlates: registration ? newPlates : false,
      station: version ? station.id : stationV2.id,
      startsAt: version ? time.startsAt : timeV2.proposal.startsAt,
      endsAt: version ? time.endsAt : timeV2.proposal.endsAt,
    };
    console.log(dto);
    props.httpClient
      .post(`/reservations`, dto)
      .then((res) => {
        props.feedback("Uspješna rezervacija!", false);
        changeRender(!render);
        props.user.appointments.unshift(res.data);
      })
      .catch((exc) => {
        if (exc && exc.response && exc.response.status === 403)
          props.feedback("Već je zakazano!", true);
        else if (exc && exc.response && exc.response.status === 400)
          props.feedback("Nalog blokiran...", true);
        else props.feedback("Servis nedostupan!", true);
      });
  };
  return (
    <div id="appointment-wrapper">
      <div className="subtitle">Rezerviši termin</div>
      <div id="request-form">
        <div id="select-inputs">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="required-label">Filtriraj po</InputLabel>
            <Select
              labelId="required-label"
              value={version}
              label="Filtriraj po"
              onChange={handleVersionChange}
            >
              <MenuItem value={true} key={1}>
                Lokacija
              </MenuItem>
              <MenuItem value={false} key={0}>
                Datum
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="required-label">Vozilo</InputLabel>
            <Select
              labelId="required-label"
              value={vehicle}
              label="Vehicle *"
              onChange={handleVehicleChange}
            >
              {props.myvehicles.map((e) => {
                return (
                  <MenuItem value={e} key={e.id}>
                    {e.model}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {version && (
            <>
              <FormControl required sx={{ m: 1, minWidth: 280 }}>
                <InputLabel id="required-label">Lokacija</InputLabel>
                <Select
                  labelId="required-label"
                  value={station}
                  label="Location *"
                  onChange={handleStationChange}
                >
                  {stations.map((e) => {
                    return (
                      <MenuItem value={e.station} key={e.station.id}>
                        {e.fullName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                components={["DatePicker"]}
              >
                <DatePicker
                  disablePast
                  shouldDisableDate={isWeekend}
                  label="Datum rezervacije *"
                  format="DD/MM/YYYY"
                  value={date}
                  onChange={(newValue) => handleChangeDate(newValue)}
                  maxDate={dayjs().add(12, "month")}
                  sx={{ m: 1, minWidth: 250 }}
                />
              </LocalizationProvider>{" "}
            </>
          )}

          {!version && (
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              components={["DatePicker"]}
            >
              <DatePicker
                disablePast
                shouldDisableDate={isWeekend}
                label="Datum rezervacije *"
                format="DD/MM/YYYY"
                value={dateV2}
                onChange={(newValue) => handleChangeDateV2(newValue)}
                maxDate={dayjs().add(12, "month")}
                sx={{ m: 1, minWidth: 250 }}
              />
            </LocalizationProvider>
          )}
          {proposals && version && (
            <FormControl required sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="required-label">Vrijeme</InputLabel>
              <Select
                labelId="required-label"
                value={time}
                label="Time *"
                onChange={(event) => changeTime(event.target.value)}
              >
                {proposals.map((e) => {
                  return (
                    <MenuItem value={e} key={e.startsAt}>
                      {e.startsAt.split("T")[1].split(":")[0] +
                        ":" +
                        e.startsAt.split("T")[1].split(":")[1] +
                        " - " +
                        e.endsAt.split("T")[1].split(":")[0] +
                        ":" +
                        e.endsAt.split("T")[1].split(":")[1]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
          {proposalsV2 && !version && (
            <FormControl required sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="required-label">Vrijeme</InputLabel>
              <Select
                labelId="required-label"
                value={timeV2}
                label="Vrijeme *"
                onChange={(event) => handleChangeTimeV2(event.target.value)}
              >
                {proposalsV2.map((e) => {
                  return (
                    <MenuItem value={e} key={e.proposal.startsAt}>
                      {e.proposal.startsAt.split("T")[1].split(":")[0] +
                        ":" +
                        e.proposal.startsAt.split("T")[1].split(":")[1] +
                        " - " +
                        e.proposal.endsAt.split("T")[1].split(":")[0] +
                        ":" +
                        e.proposal.endsAt.split("T")[1].split(":")[1]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
          {timeV2 && !version && (
            <FormControl required sx={{ m: 1, minWidth: 280 }}>
              <InputLabel id="required-label">Lokacija</InputLabel>
              <Select
                labelId="required-label"
                value={stationV2}
                label="Lokacija *"
                onChange={handleStationV2Change}
              >
                {timeV2.stations.map((e) => {
                  return (
                    <MenuItem value={e} key={e.id}>
                      {e.name}
                    </MenuItem>
                  );
                })}
              </Select>
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
                  s
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
        {cost && (
          <div id="cost">
            Ukupna cijena:{" "}
            <span id="cost-value">
              {cost.value.toFixed(2) + " " + cost.currency}
            </span>{" "}
            <span id="malus">(malus={cost.malus.toFixed(1) * 100}%)</span>
          </div>
        )}
        {(time || stationV2) && (
          <Button
            id="book-btn"
            variant="contained"
            // startIcon={<CalculateIcon />}
            color="success"
            onClick={() => changeModalOpen(true)}
          >
            Rezerviši
          </Button>
        )}
      </div>
      <ConfirmationModal confirm={confirm} open={modalOpen}></ConfirmationModal>
    </div>
  );
};
