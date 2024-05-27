import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createAxiosInstance from "../util/axiosClient";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { VacationModal } from "../components/VacationModal";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Footer } from "../components/Footer";
import dayjs from "dayjs";
import CompanyCard from "../components/CompanyCard";
import "../style/admin-homepage.css";
import CompanyInfo from "../components/CompanyInfo";
import { StationForm } from "../components/StationForm";
import { NewWorkerForm } from "../components/NewWorkerForm";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CancelReservationModal } from "../components/CancelReservationlModal";
import {
  DataGrid,
  getGridStringOperators,
  getGridNumericOperators,
} from "@mui/x-data-grid";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const stringOperators = getGridStringOperators().filter(
  (operator) => operator.value === "contains"
);
export const AdminHomepage = (props) => {
  const location = useLocation();
  console.log("?????????????????????");
  console.log(location.state);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [stationInfo, changeStationInfo] = useState(null);
  const [stations, setStations] = useState(location.state.company.stations);
  const [tab, changeTab] = useState(0);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(dayjs().$M);
  const [holidays, setHolidays] = useState(location.state.company.holidays);
  const [openVacationModal, setOpenVacationModal] = useState(false);
  const [vacation, setVacation] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [openModal, changeOpenModal] = useState(false);
  const [toCancel, setToCancel] = useState(null);
  console.log(location.state.company.stations);
  const navigate = useNavigate();
  const httpClient = createAxiosInstance(location.state.token);

  useEffect(() => {
    httpClient
      .get("/companies/" + location.state.company.id + "/holidays")
      .then((res) => setHolidays(res.data))
      .catch((err) => { });
  }, []);
  const handleChangeVacation = (list) => {
    console.log(list);
    setVacation(list);
    setOpenVacationModal(true);
  };

  const handleMonthChange = (event) => {
    setMonth(event.$M);
  };
  const handleCancel = (reservation) => {
    setToCancel(reservation);
    changeOpenModal(true);
  };
  const handleDayChange = (event) => {
    const date =
      event.$y +
      "-" +
      (event.$M + 1 > 9 ? event.$M + 1 : "0" + (event.$M + 1)) +
      "-" +
      (event.$D > 9 ? event.$D : "0" + event.$D);
    if (holidays.map((h) => h.holidayDate).includes(date)) {
      console.log(holidays);
      const selected = holidays.filter((h) => h.holidayDate === date)[0];
      httpClient
        .delete("/companies/holidays/" + selected.id)
        .then((res) => {
          setHolidays(holidays.filter((h) => h.id !== selected.id));
        })
        .catch((err) => { });
    } else {
      httpClient
        .post("/companies/" + location.state.company.id + "/holidays", {
          holidayDate: date,
        })
        .then((res) => {
          console.log(res.data.id);
          setHolidays([...holidays, { id: res.data.id, holidayDate: date }]);
        })
        .catch((err) => { });
    }
  };
  const ServerDay = (props) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected =
      !outsideCurrentMonth &&
      highlightedDays
        .filter((d) => d.$M === day.$M && d.$D === day.$D && d.$y === day.$y)
        .map((d) => d.$D).length > 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? <BeachAccessIcon color="primary" /> : undefined
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  };

  const changeInfo = (station) => {
    if (station == null) {
      httpClient
        .get("/companies/" + location.state.company.id + "/stations")
        .then((res) => {
          setStations(res.data);
          changeStationInfo(null);
        })
        .catch((err) => { });
    } else {
      let fetched = false;
      httpClient
        .get("/companies/stations/lines/" + station.id)
        .then((res) => {
          station.lines = res.data;
          if (fetched) {
            console.log(station);
            changeStationInfo({ ...station });
          } else fetched = true;
        })
        .catch((err) => { });
      httpClient
        .get("/companies/stations/workers/" + station.id)
        .then((res) => {
          station.workers = res.data;
          console.log(res.data);
          if (fetched) {
            console.log(station);
            changeStationInfo({ ...station });
          } else fetched = true;
        })
        .catch((err) => { });
    }
  };
  const blockUser = (id, flag) => {
    httpClient
      .put("/workers/" + id + "/block?flag=" + flag.toString())
      .then((res) => changeInfo(stationInfo))
      .catch((err) => { });
  };

  const update = (station, lines) => {
    console.log(station);
    console.log(lines);
    httpClient
      .put("/companies/stations/" + station.id, station)
      .then((res) => {
        setStations(
          stations.map((s) => {
            if (s.id !== station.id) return s;
            else return station;
          })
        );
        let counter = lines.length;
        lines.forEach((l) => {
          httpClient
            .post("/companies/stations/" + station.id + "/lines", {
              name: l.value,
            })
            .then((res) => {
              if (counter === 1) changeInfo(station);
              else counter--;
            })
            .catch((err) => console.log(err));
        });

        handleOpenSnackbar("Ažurirano!", false);
      })
      .catch((err) => {
        console.log(err);
        handleOpenSnackbar("Greška na serveru!", true);
      });
  };
  const logout = () => {
    navigate("/services/login");
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleOpenSnackbar = (msg, error) => {
    setSnackbarSeverity(error ? "error" : "success");
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
  };
  const save = (station, lines) => {
    httpClient
      .post("/companies/" + location.state.company.id + "/stations", station)
      .then((res) => {
        setStations([...stations, res.data]);
        lines.forEach((l) => {
          httpClient
            .post("/companies/stations/" + res.data.id + "/lines", {
              name: l.name,
            })
            .then(() => {
              changeTab(0);
              changeInfo(null);
            })
            .catch();
        });
        handleOpenSnackbar("Kreirano!", false);
      })
      .catch((err) => {
        console.log(err);
        handleOpenSnackbar("Greska na serveru!", true);
      });
  };
  const handleChangeTab = (event, newValue) => {
    changeTab(newValue);
  };
  const newWorker = (worker, station) => {
    httpClient
      .post("/companies/stations/" + station + "/workers", worker)
      .then((res) => {
        changeInfo(stationInfo);
        handleOpenSnackbar("Novi radnik kreiran!", false);
      })
      .catch();
  };
  const deleteLine = (id) => {
    httpClient
      .delete("/companies/lines/" + id)
      .then((res) => {
        changeInfo(stationInfo);
      })
      .catch((err) => { });
  };
  const cancel = (reservation, msg) => {
    httpClient
      .put(`/reservations/admin/cancel/` + reservation.id)
      .then((res) => {
        const message = {
          id: reservation.vehicle.owner,
          title:
            "Rezervacija sa identifikatorom " +
            reservation.id +
            " (" +
            reservation.startsAt.replace("T", " ") +
            ") je otkazana!",
          content:
            msg +
            "\n" +
            "-------------------------" +
            "\n" +
            location.state.firstname +
            " " +
            location.state.lastname +
            "\n" +
            reservation.station,
          sender: location.state.firstname + " " + location.state.lastname,
        };
        httpClient
          .post("/messages", message)
          .then((res) => {
            handleOpenSnackbar("Klijent obaviješten!", false);
          })
          .catch((exc) => { });
        setToCancel(null);
      })
      .catch((exc) => { });
  };
  const deleteUser = (id) => {
    httpClient
      .delete("/workers/" + id)
      .then((res) => {
        changeInfo(stationInfo);
      })
      .catch((err) => { });
  };
  const changeWorkerLocation = (id, option) => {
    httpClient
      .put("/workers/" + id, { station: { id: option } })
      .then((res) => changeInfo(stationInfo))
      .catch((err) => { });
  };

  useEffect(() => {
    httpClient
      .get("/reservations/companies/" + location.state.company.id)
      .then((res) => setReservations(res.data))
      .catch((err) => { });
  }, [toCancel]);
  const appointmentColumns = [
    {
      field: "date",
      headerName: "Datum",
      width: 100,
      filterable: false,
    },
    {
      field: "time",
      headerName: "Vrijeme",
      width: 110,
      filterable: false,
      sortable: false,
    },
    {
      field: "stationInfo",
      headerName: "Stanica",
      width: 150,
      sortable: false,
      filterOperators: stringOperators,
    },
    {
      field: "vehicleInfo",
      headerName: "Vozilo",
      width: 120,
      filterable: false,
      sortable: false,
    },
    {
      field: "owner",
      headerName: "Klijent",
      width: 170,
      sortable: false,
      filterOperators: stringOperators,
    },
    {
      field: "estPrice",
      headerName: "Cijena",
      description: "Procjena troškova (BAM)!",
      width: 120,
      type: "number",
      disableColumnFilter: true,
      filterable: false,
      sortable: false,
    },
    {
      width: 110,
      field: "Otkaži",
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        !params.row.canceled && !params.row.done ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCancel(params.row);
            }}
          >
            Otkaži
          </Button>
        ) : (
          <span>OTKAZANO</span>
        ),
    },
  ];
  return (
    location.state && (
      <div className="page">
        <div id="header-wrapper">
          <div className="company-header">eVehicleInspection</div>
          <div id="company-info">
            <div className="details">
              <div className="detail">
                {location.state.firstname + " " + location.state.lastname}
              </div>
              <hr></hr>
              <div className="detail">{location.state.company.name}</div>
              <div className="detail">
                {"Ocjena: " + location.state.company.grade.toFixed(2)}
              </div>
              <div className="detail">
                {"Email: " + location.state.company.email}
              </div>
              <div className="detail">
                {"Telefon: " + location.state.company.phone}
              </div>
              <div className="detail">{location.state.company.address}</div>
              <div className="detail">
                <Button
                  className="acc-btn"
                  id="worker-logout-btn"
                  variant="contained"
                  color="error"
                  onClick={logout}
                >
                  Odjavi se
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleChangeTab} centered>
            <Tab
              label="Početna"
              icon={<HomeIcon></HomeIcon>}
              {...a11yProps(0)}
            />
            <Tab
              label="Rezervacije"
              icon={<CalendarIcon></CalendarIcon>}
              {...a11yProps(1)}
            />
            <Tab
              label="Nova lokacija"
              icon={<BuildIcon></BuildIcon>}
              {...a11yProps(2)}
            />
            <Tab label="Novi radnik" icon={<PersonIcon />} {...a11yProps(3)} />
            <Tab
              label="Praznici"
              icon={<BeachAccessIcon />}
              {...a11yProps(4)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          <div className="stations-div">
            {stationInfo ? (
              <CompanyInfo
                feedback={handleOpenSnackbar}
                data={stationInfo}
                update={update}
                deleteLine={deleteLine}
                blockUser={blockUser}
                deleteUser={deleteUser}
                return={() => changeInfo(null)}
                vacation={handleChangeVacation}
                changeWorkerLocation={changeWorkerLocation}
                stations={stations}
              />
            ) : (
              <div className="card-container">
                {stations &&
                  stations.map((c) => (
                    <CompanyCard
                      logo={location.state.company.logo}
                      company={c}
                      changeInfo={changeInfo}
                      grade={() => { }}
                      station={true}
                    ></CompanyCard>
                  ))}
              </div>
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <div className="flex-table-wrapper">
            <div>
              <DataGrid
                disableRowSelectionOnClick
                rows={reservations.map((a) => {
                  a.vehicleInfo =
                    a.vehicle.type === "CAR"
                      ? "Automobil"
                      : a.vehicle.type === "CARGO"
                        ? "Teretno vozilo"
                        : "Motocikl";
                  a.date = a.startsAt.split("T")[0];
                  a.stationInfo = a.station.split("-")[1];
                  a.time =
                    a.startsAt.split("T")[1].split(":")[0] +
                    ":" +
                    a.startsAt.split("T")[1].split(":")[1] +
                    " - " +
                    a.endsAt.split("T")[1].split(":")[0] +
                    ":" +
                    a.endsAt.split("T")[1].split(":")[1];
                  a.op_line = a.line.name;
                  a.owner = a.vehicle.ownerName;
                  a.estPrice = a.price.toFixed(2) + " BAM";

                  return a;
                })}
                columns={appointmentColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 20, 30]}
              />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={3}>
          <div className="new-station">
            <div className="new-station-column">
              <div className="subtitle" id="no-margin-subtitle">
                Novi radnik
              </div>
              <NewWorkerForm
                stations={stations}
                feedback={handleOpenSnackbar}
                newWorker={newWorker}
              ></NewWorkerForm>
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          <div className="new-station">
            <div className="new-station-column">
              <div className="subtitle" id="no-margin-subtitle">
                Nova stanica
              </div>

              <StationForm
                feedback={handleOpenSnackbar}
                update={save}
                return={() => {
                  changeTab(0);
                  changeInfo(null);
                }}
              />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={4}>
          <div className="new-station">
            <div className="new-station-column">
              <div className="subtitle" id="no-margin-subtitle">
                Kalendar praznika
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  defaultValue={dayjs()}
                  value={day}
                  onMonthChange={(event) => handleMonthChange(event)}
                  onChange={(event) => handleDayChange(event)}
                  slots={{
                    day: ServerDay,
                  }}
                  slotProps={{
                    day: {
                      highlightedDays: holidays.map((d) =>
                        dayjs(d.holidayDate)
                      ),
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </CustomTabPanel>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <div className="details" id="mobile-details">
          <hr></hr>
          <div className="detail">
            {location.state.firstname + " " + location.state.lastname}
          </div>
          <div className="detail">{location.state.company.name}</div>
          <div className="detail">
            {"Ocjena: " + location.state.company.grade.toFixed(2)}
          </div>
          <div className="detail">
            {"Email: " + location.state.company.email}
          </div>
          <div className="detail">
            {"Telefon: " + location.state.company.phone}
          </div>
          <div className="detail">{location.state.company.address}</div>
          <div className="detail">
            <Button
              className="acc-btn"
              id="worker-logout-btn"
              variant="contained"
              color="error"
              onClick={logout}
            >
              Odjavi se
            </Button>
          </div>
        </div>
        {vacation && (
          <VacationModal
            open={openVacationModal}
            vacation={vacation}
            submit={(date) => {
              if (vacation.map((v) => v.date).includes(date)) {
                const selected = vacation.filter((v) => v.date === date)[0];

                httpClient
                  .delete("/workers/vacation/" + selected.id)
                  .then((res) => {
                    setVacation(vacation.filter((v) => v.id !== selected.id));
                  })
                  .catch((err) => { });
              }
            }}
            close={() => setOpenVacationModal(false)}
          ></VacationModal>
        )}
        {toCancel && (
          <CancelReservationModal
            open={openModal}
            close={() => changeOpenModal(false)}
            cancel={cancel}
            data={toCancel}
          ></CancelReservationModal>
        )}
        <Footer></Footer>
      </div>
    )
  );
};
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default AdminHomepage;
