import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/service-homepage.css";
import createAxiosInstance from "../util/axiosClient";
import conf from "../conf.json";
import { Footer } from "../components/Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
import GradeIcon from "@mui/icons-material/Grade";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import no_image from "../assets/no-image.jpeg";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import HistoryIcon from "@mui/icons-material/History";

import {
  DataGrid,
  getGridStringOperators,
  getGridNumericOperators,
} from "@mui/x-data-grid";
import { CancelReservationModal } from "../components/CancelReservationlModal";
import { VacationModal } from "../components/VacationModal";
import { ExamReport } from "../components/ExamReport";
import { CalendarIcon } from "@mui/x-date-pickers";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const stringOperators = getGridStringOperators().filter(
  (operator) => operator.value === "contains"
);
export const ServiceHomepage = () => {
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
      field: "line",
      headerName: "Linija",
      width: 100,
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
      description: "Procjena troška (BAM)!",
      width: 120,
      type: "number",
      disableColumnFilter: true,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Registracija",
      field: "registration",
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="icon-wrapper">
          {params.row.registration ? (
            params.row.first ? (
              <GradeIcon className="green-icon"></GradeIcon>
            ) : (
              <CheckCircleIcon className="green-icon"></CheckCircleIcon>
            )
          ) : (
            <DangerousIcon className="red-icon"></DangerousIcon>
          )}
        </div>
      ),
    },
    {
      field: "plates",
      headerName: "Nove tablice",
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="icon-wrapper">
          {params.row.newPlates ? (
            <CheckCircleIcon className="green-icon"></CheckCircleIcon>
          ) : (
            <DangerousIcon className="red-icon"></DangerousIcon>
          )}
        </div>
      ),
    },
    {
      headerName: "Zeleni karton",
      field: "greenCard",
      width: 130,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="icon-wrapper">
          {params.row.greenCard ? (
            <CheckCircleIcon className="green-icon"></CheckCircleIcon>
          ) : (
            <DangerousIcon className="red-icon"></DangerousIcon>
          )}
        </div>
      ),
    },
    {
      headerName: "Potvrda o registraciji",
      field: "regCert",
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="icon-wrapper">
          {params.row.regCert ? (
            <CheckCircleIcon className="green-icon"></CheckCircleIcon>
          ) : (
            <DangerousIcon className="red-icon"></DangerousIcon>
          )}
        </div>
      ),
    },
    {
      headerName: "Potvrda o vlasništvu",
      field: "ownerCert",
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <div className="icon-wrapper">
          {params.row.ownerCert ? (
            <CheckCircleIcon className="green-icon"></CheckCircleIcon>
          ) : (
            <DangerousIcon className="red-icon"></DangerousIcon>
          )}
        </div>
      ),
    },
    {
      width: 110,
      field: "Otkaži",
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        !params.row.canceled &&
        !params.row.done && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCancel(params.row);
            }}
          >
            Otkaži
          </Button>
        ),
    },
    {
      width: 110,
      field: "Izvještaj",
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        !params.row.canceled &&
        !params.row.done && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setReport(params.row.exam);
              setShowReport(true);
            }}
          >
            Izvještaj
          </Button>
        ),
    },
  ];
  const examsColumns = [
    {
      field: "timeValue",
      headerName: "Vrijeme",
      width: 170,
      filterable: false,
      sortable: false,
    },
    {
      field: "line",
      headerName: "Linija",
      width: 150,
      sortable: false,
      filterOperators: stringOperators,
    },
    {
      field: "vehicleInfo",
      headerName: "Vozilo",
      width: 170,
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
      field: "priceValue",
      headerName: "Cijena",
      width: 100,
      type: "number",
      disableColumnFilter: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <span className="blue-status">{params.row.priceValue}</span>
      ),
    },
    {
      field: "supervisor",
      headerName: "Nadzornik",
      width: 170,
      sortable: false,
      filterOperators: stringOperators,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      sortable: false,
      filterOperators: stringOperators,
      renderCell: (params) =>
        params.row.record.passed ? (
          <span className="passed-status">ZADOVOLJIO</span>
        ) : (
          <span className="failed-status">NIJE ZADOVOLJIO</span>
        ),
    },
    {
      width: 100,
      field: "PDF",
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        !params.row.canceled &&
        !params.row.done && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              downloadPDF(params.row.id);
            }}
          >
            PDF
          </Button>
        ),
    },
  ];
  const [engines, changeEngines] = useState(null);
  const [classes, changeClasses] = useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [appointments, setAppointments] = React.useState([]);
  const [exams, setExams] = React.useState([]);
  const [criteria, setCriteria] = React.useState([]);
  const [report, setReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [toCancel, setToCancel] = useState(null);
  const [openModal, changeOpenModal] = useState(false);
  const location = useLocation();
  const [workerData, changeWorkerData] = useState(location.state);
  const httpClient = createAxiosInstance(location.state.token);
  const [tab, changeTab] = useState(0);
  const [openVacationModal, setOpenVacationModal] = useState(false);
  const [vacation, setVacation] = useState(workerData.vacationDates);
  const navigate = useNavigate();
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
  const handleChangeTab = (event, newValue) => {
    changeTab(newValue);
  };
  const logout = () => {
    navigate("/services/login");
  };
  const downloadPDF = (id) => {
    httpClient
      .get("/examinations/pdf/" + id, {
        responseType: "blob",
      })
      .then((blob) => {
        const content = new Blob([blob.data], { type: "application/pdf" });
        console.log(content);
        const url = window.URL.createObjectURL(content);
        const pdfWindow = window.open();
        pdfWindow.location.href = url;
      })
      .catch((exc) => {
        console.log(exc);
        handleOpenSnackbar("PDF nedostupan...", true);
      });
  };
  const close = () => changeOpenModal(false);
  const cancel = (reservation, msg) => {
    httpClient
      .put(`/reservations/company/cancel/` + reservation.id)
      .then((res) => {
        reservation.canceled = true;
        reservation.status = "CANCELED";
        setAppointments([
          ...appointments.filter((a) => a.id !== reservation.id),
        ]);
        const message = {
          id: reservation.vehicle.owner,
          title:
            "Reservacija sa indentifikatorom " +
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
          .catch((exc) => {
            handleOpenSnackbar("Rezervacija otkazana!", false);
          });
      })
      .catch((exc) => { });
  };
  useEffect(() => {
    httpClient
      .get(`/reservations/stations/` + location.state.station.id)
      .then((res) => {
        console.log(res.data);
        setAppointments(res.data);
      })
      .catch((exc) => {
        setAppointments([]);
      });

    httpClient
      .get(`/examinations/station/` + location.state.station.id)
      .then((res) => {
        console.log(res.data);
        setExams(res.data);
      })
      .catch((exc) => {
        setExams([]);
      });
  }, [tab]);
  useEffect(() => {
    httpClient
      .get(`/vehicles/engines`)
      .then((res) => {
        console.log(res.data);
        changeEngines(res.data);
      })
      .catch((exc) => {
        handleOpenSnackbar("Servis nedostupan!", true);
      });
    httpClient
      .get(`/vehicles/classes`)
      .then((res) => {
        changeClasses(res.data);
      })
      .catch((exc) => {
        handleOpenSnackbar("Servis nedostupan!", true);
      });
    httpClient
      .get(`/examinations/criteria`)
      .then((res) => {
        console.log(res.data);
        setCriteria(res.data);
      })
      .catch((exc) => {
        setCriteria([]);
      });
  }, []);
  const handleCancel = (reservation) => {
    setToCancel(reservation);
    changeOpenModal(true);
  };
  const generateReport = (exam) => {
    console.log(exam);

    if (exam.record.checkAll)
      exam.record.criteria.forEach((c) => {
        c.satisfied = true;
      });
    httpClient
      .post("/examinations", exam)
      .then((res) => {
        exam.record.passed = res.data.record.passed;
        setAppointments([
          ...appointments.filter((a) => a.id !== exam.reservationId, {
            responseType: "blob",
          }),
        ]);
        httpClient
          .get("/examinations/pdf/" + res.data.id, {
            responseType: "blob",
          })
          .then((blob) => {
            console.log(blob.data);
            const content = new Blob([blob.data], { type: "application/pdf" });
            console.log(content);
            const url = window.URL.createObjectURL(content);
            const pdfWindow = window.open();
            pdfWindow.location.href = url;
            handleOpenSnackbar("Izvještaj kreiran!", false);
          })
          .catch((exc) => {
            console.log(exc);
            handleOpenSnackbar(
              "Izvještaj krerian! Nije moguce preuzeti PDF...",
              false
            );
          });

        const message = {
          id: exam.vehicle.owner,
          title: "Izvještaj!",
          content:
            "Procjena stanja vozila sa rednim brojem " +
            res.data.id +
            " za vozilo " +
            exam.vehicle.manufacturer +
            " " +
            exam.vehicle.model +
            (exam.record.passed ? "je USPJEŠNA!" : " NEUSPJEŠNA!"),
          sender: exam.supervisor,
        };

        httpClient
          .post("/messages", message)
          .then((res) => { })
          .catch((exc) => { });
      })
      .catch((exc) => { });
  };
  return (
    <div className="page">
      <div id="header-wrapper">
        <div className="company-header">eVehicleInspection</div>
        <div id="company-info">
          <div className="details">
            <div className="detail">
              {workerData.firstname + " " + workerData.lastname}
            </div>
            <div className="detail">
              {"Nadzornik : " + workerData.count + " puta"}
            </div>
            <hr></hr>
            <div className="detail">
              {workerData.company.name}{" "}
              <IconButton
                color="primary"
                onClick={() => setOpenVacationModal(true)}
              >
                <CalendarIcon></CalendarIcon>
              </IconButton>
            </div>
            <div className="detail">{workerData.station.name}</div>
            <div className="detail">
              {"Radno vrijeme: " +
                workerData.station.startsAt +
                " - " +
                workerData.station.endsAt +
                " h"}
            </div>
            <div className="detail">
              {"Broj linija: " + workerData.station.linesNum}
            </div>
            <div className="detail">
              {" "}
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
          <img
            id="service-logo"
            src={
              workerData.company.logo !== null
                ? conf.server_url +
                "/companies/logo/" +
                btoa(workerData.company.logo)
                : no_image
            }
          ></img>
        </div>
      </div>
      {/* <div id="about-us">Specialized web app for vehicle services!</div> */}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="navbar"
        >
          <Tabs value={tab} onChange={handleChangeTab} centered>
            <Tab
              label="Rezervacije"
              icon={<EditCalendarIcon />}
              {...a11yProps(0)}
            />
            <Tab
              label="Istorija"
              icon={<HistoryIcon></HistoryIcon>}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          {criteria && report && showReport ? (
            <div className="flex-container">
              <ExamReport
                exam={report}
                engines={engines}
                classes={classes}
                return={() => setShowReport(false)}
                submit={generateReport}
                feedback={handleOpenSnackbar}
                httpClient={httpClient}
              ></ExamReport>
            </div>
          ) : (
            <>
              <DataGrid
                className="custom-table"
                disableRowSelectionOnClick
                rows={appointments.map((a) => {
                  a.vehicleInfo =
                    a.vehicle.type === "CAR"
                      ? "Automobil"
                      : a.vehicle.type === "CARGO"
                        ? "Teretno vozilo"
                        : "Motocikl";
                  a.date = a.startsAt.split("T")[0];
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
                  a.exam = a.exam
                    ? a.exam
                    : {
                      report: {
                        reservationId: a.id,
                        price: a.price.toFixed(2),
                        vehicleId: a.vehicle.id,
                        supervisorId: workerData.id,
                        line: a.line,
                        lineId: a.lineId,
                        newPlates: a.newPlates,
                        registration: a.registration,
                        first: a.first,
                        regCert: a.regCert,
                        ownerCert: a.ownerCert,
                        greenCard: a.greenCard,
                        supervisor:
                          workerData.firstname + " " + workerData.lastname,
                        company: workerData.company.name,
                        station: workerData.station.name,
                        vehicle: {
                          model: a.vehicle.model,
                          manufacturer: a.vehicle.manufacturer,
                          color: a.vehicle.color,
                          malus: a.vehicle.malus,
                          id: a.vehicle.id,
                          ownerName: a.vehicle.ownerName,
                          owner: a.vehicle.owner,
                          type: a.vehicle.type,
                          productionYear: a.vehicle.productionYear,
                          engine: a.vehicle.engine,
                          emissionClass: a.vehicle.emissionClass,
                          enginePower: a.vehicle.enginePower
                            ? a.vehicle.enginePower
                            : 1,
                          engineVolume: a.vehicle.engineVolume
                            ? a.vehicle.engineVolume
                            : 1,
                          loadMax: a.vehicle.loadMax ? a.vehicle.loadMax : 1,
                          mass: a.vehicle.mass ? a.vehicle.mass : 1,
                          lpg: a.vehicle.lpg ? a.vehicle.lpg : 1,
                        },
                        period: a.time,
                        record: {
                          passed: false,
                          description: "",

                          criteria: criteria.map((c) => {
                            return {
                              name: c,
                              satisfied: false,
                              description: "",
                            };
                          }),
                        },
                      },

                      ref_price: a.price.toFixed(2),
                    };
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
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <div id="history-wrapper">
            <DataGrid
              className="custom-table"
              disableRowSelectionOnClick
              rows={exams.map((e) => {
                e.timeValue =
                  e.time.split("T")[0] +
                  " " +
                  e.time.split("T")[1].split(":")[0] +
                  ":" +
                  e.time.split("T")[1].split(":")[1];
                e.vehicleInfo = e.vehicle.manufacturer + " " + e.vehicle.model;
                e.status = e.record.passed ? "PASSED" : "FAILED";
                e.owner = e.vehicle.ownerName;
                e.priceValue = e.price.toFixed(2) + " BAM";
                return e;
              })}
              columns={examsColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 30]}
            />
          </div>
        </CustomTabPanel>
      </Box>
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
          {workerData.firstname + " " + workerData.lastname}
        </div>
        <div className="detail">
          {"Nadzornik : " + workerData.count + " puta"}
        </div>

        <div className="detail">{workerData.company.name}</div>
        <div className="detail">{workerData.station.name}</div>
        <div className="detail">
          {"Radno vrijeme: " +
            workerData.station.startsAt +
            " - " +
            workerData.station.endsAt +
            " h"}
        </div>
        <div className="detail">
          {"Linija za pregled: " + workerData.station.linesNum}
        </div>
        <div className="detail">
          {" "}
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
      {toCancel && (
        <CancelReservationModal
          open={openModal}
          close={close}
          cancel={cancel}
          data={toCancel}
        ></CancelReservationModal>
      )}
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
          } else {
            httpClient
              .post("/workers/" + location.state.id + "/vacation", {
                date,
              })
              .then((res) => {
                setVacation([...vacation, { id: res.data.id, date }]);
              })
              .catch((err) => {
                handleOpenSnackbar(
                  "Already spent annual vacation or selected date from past...",
                  true
                );
              });
          }
        }}
        close={() => setOpenVacationModal(false)}
      ></VacationModal>
      <Footer></Footer>
    </div>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tab-content"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
export default ServiceHomepage;
