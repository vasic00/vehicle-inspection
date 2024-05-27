import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import "../style/acc-info.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  DataGrid,
  getGridStringOperators,
  getGridNumericOperators,
} from "@mui/x-data-grid";

import { AccDataModal } from "./AccDataModal";
import { VehicleCarousel } from "./VehicleCarousel";
import { NewVehicleModal } from "./NewVehicleModal";
import { VehicleInfo } from "./VehicleInfo";
import { ConfirmationModal } from "./ConfirmationModal";
import { AlertModal } from "./AlertModal";
export const AccInfo = (props) => {
  const navigate = useNavigate();
  const [render, changeRender] = useState(true);
  const [toCancel, setToCancel] = useState(-1);
  const [openModal, changeOpenModal] = useState(false);
  const [openNewVehicleModal, changeOpenNewVehicleModal] = useState(false);
  const [openAccDataModal, changeOpenAccDataModal] = useState(false);
  const [openConfirmModal, changeOpenConfirmModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [msgInfo, changeMsgInfo] = useState(null);
  const [vehicle, changeVehicle] = useState(null);
  const [toDelete, changeToDelete] = useState(null);

  const stringOperators = getGridStringOperators().filter(
    (operator) => operator.value === "contains"
  );
  const numericOperators = getGridNumericOperators().filter(
    (operator) =>
      operator.value === "=" || operator.value === "<" || operator.value === ">"
  );
  const columns = [
    { field: "id", headerName: "ID", width: 70, filterable: false },
    {
      field: "booked",
      headerName: "Zakazano",
      width: 140,
      filterOperators: stringOperators,
    },
    {
      field: "start",
      headerName: "Početak",
      width: 200,
      filterOperators: stringOperators,
    },
    {
      field: "vehicleInfo",
      headerName: "Vozilo",
      width: 200,
      filterOperators: stringOperators,
    },
    {
      field: "station",
      headerName: "Lokacija",
      width: 300,
      filterOperators: stringOperators,
    },
    {
      field: "price",
      headerName: "Cijena",
      description: "Procjena troškova u BAM!",
      width: 120,
      type: "number",
      disableColumnFilter: true,
      filterOperators: numericOperators,
    },
    {
      // field: "status",
      field: "statusInfo",
      headerName: "Status",
      width: 120,
      filterOperators: stringOperators,
    },
    {
      width: 120,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        !params.row.canceled &&
        !params.row.done && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpenAlertModal(true);
              setToCancel(params.row);
            }}
          >
            Otkaži
          </Button>
        ),
    },
  ];

  const logout = () => {
    navigate("/login");
    // remove user data
  };
  const closeAccDataModal = () => {
    changeOpenAccDataModal(false);
  };
  const closeNewVehicleModal = () => {
    changeOpenNewVehicleModal(false);
  };
  const addVehicle = (vehicle) => {
    props.httpClient
      .post(
        `/vehicles` +
        (vehicle.type === "CAR"
          ? "/cars"
          : vehicle.type === "CARGO"
            ? "/cargo"
            : "/bikes"),
        vehicle
      )
      .then((res) => {
        console.log(res.data);
        props.user.vehicles.push(res.data);
        changeRender(!render);
        props.feedback("Vozilo dodano!", false);
      })
      .catch((exc) => {
        props.feedback("Servis nedostupan!", true);
      });
  };
  const changeData = (firstname, lastname, email, phone) => {
    props.httpClient
      .put(`/customers/data/` + props.user.id, {
        id: props.user.id,
        firstname,
        lastname,
        phone,
        email,
      })
      .then((res) => {
        console.log(res.status);
        props.user.firstname = firstname;
        props.user.lastname = lastname;
        props.user.phone = phone;
        props.user.email = email;
        changeRender(!render);
        props.feedback("Podaci izmijenjeni!", false);
      })
      .catch((exc) => {
        if (exc !== null && exc.response && exc.response.status === 404)
          props.feedback("Izmjena odbijena!", true);
        else props.feedback("Servis nedostupan!", true);
      });
  };
  const cancel = () => {
    console.log(toCancel);
    props.httpClient
      .put(`/reservations/cancel/` + toCancel.id)
      .then((res) => {
        console.log(res.status);
        toCancel.canceled = true;
        toCancel.status = "OTKAZANO";
        props.user.penalties = props.user.penalties + 1;
        changeRender(!render);
        props.feedback("Reservacija otkazana!", false);
      })
      .catch((exc) => {
        props.feedback("Prekasno!", true);
      });
  };
  const vehicleInfo = (v) => {
    if (vehicle == null || v.id != vehicle.id) changeVehicle(v);
    else changeVehicle(null);
  };
  const deleteVehicle = (id) => {
    console.log("delteing");
    changeToDelete(id);
    changeOpenConfirmModal(true);
  };
  const confirm = (flag) => {
    if (flag) {
      props.httpClient
        .put(`/vehicles/delete/` + toDelete)
        .then((res) => {
          props.user.vehicles = props.user.vehicles.filter(
            (v) => v.id !== toDelete
          );
          changeRender(!render);
          props.feedback("Vozilo obrisano!", false);
        })
        .catch((exc) => {
          props.feedback("Servis nedostupan!", true);
        });
    }
    changeOpenConfirmModal(false);
    changeToDelete(null);
  };
  const changeMalus = (vehicle, value) => {
    props.httpClient
      .put(`/vehicles/malus/` + vehicle.id + "?malus=" + value)
      .then((res) => {
        props.feedback("Malus izmijenjen!", false);
      })
      .catch((exc) => {
        props.feedback("Services nedostupan!", true);
      });
  };
  const confirmCancel = (flag) => {
    if (flag) cancel();
    setOpenAlertModal(false);
  };

  return (
    <div id="tab-wrapper">
      <div id="first-section">
        <div id="photo-section">
          <img id="user-avatar" src={avatar}></img>
          <Button
            className="acc-btn"
            variant="contained"
            color="success"
            onClick={() => changeOpenAccDataModal(true)}
          >
            Izmijeni podatke
          </Button>
          <Button
            className="acc-btn"
            id="logout-btn"
            variant="contained"
            color="error"
            onClick={logout}
          >
            Odjavi se
          </Button>
          <AccDataModal
            user={props.user}
            open={openAccDataModal}
            close={closeAccDataModal}
            submit={changeData}
          ></AccDataModal>
        </div>
        <div id="right-section">
          <div className="info-labels">
            <div className="info-label">Ime:</div>
            <div className="info-label">Telefon:</div>
            <div className="info-label">Email: </div>
            <div className="info-label">Kazneni bodovi:</div>
            <div className="info-label">Vozila:</div>
            <div className="info-label">Pristupio:</div>
            <div className="info-label">Pregledi:</div>
            <div className="info-label">Prosjek troškova:</div>
          </div>
          <div className="info-values ">
            <div className="info-label">
              {props.user.firstname + " " + props.user.lastname}
            </div>
            <div className="info-label">{props.user.phone}</div>
            <div className="info-label">{props.user.email}</div>
            <div className="info-label">{props.user.penalties}</div>
            <div className="info-label">{props.user.vehicles.length}</div>
            <div className="info-label">
              {props.user.joined.split("T")[0].replaceAll("-", ".")}
            </div>
            <div className="info-label">{props.user.examinations}</div>
            <div className="info-label">
              {props.user.averageCost.toFixed(2) + " "}
              BAM
            </div>
          </div>
        </div>
      </div>
      <div className="subtitle">Rezervacije</div>
      <div id="table-wrapper">
        <DataGrid
          disableRowSelectionOnClick
          rows={props.user.appointments.map((a) => {
            a.vehicleInfo = a.vehicle.manufacturer + " " + a.vehicle.model;
            a.statusInfo =
              a.status === "BOOKED"
                ? "ZAKAZANO"
                : a.status === "CANCELED"
                  ? "OTKAZANO"
                  : "ZAVRŠENO";
            a.start = a.startsAt.split("T")[0] + " " + a.startsAt.split("T")[1];
            if (a.created !== null) {
              const t1 = a.created.split("T")[0];
              let t2 = a.created.split("T")[1].split(".")[0];
              t2 = t2.split(":")[0] + ":" + t2.split(":")[1];
              a.booked = t1 + " " + t2;
            }
            return a;
          })}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[2, 5, 10, 20]}
        />
      </div>
      <div className="subtitle">Moja vozila</div>
      <VehicleCarousel
        vehicles={props.user.vehicles}
        info={vehicleInfo}
        delete={(id) => deleteVehicle(id)}
        id="my-vehicles-carousel"
      ></VehicleCarousel>
      <Button
        id="add-btn"
        variant="contained"
        onClick={() => changeOpenNewVehicleModal(true)}
      >
        Dodaj vozilo
      </Button>
      <br></br>
      {vehicle && (
        <Card id="vehicle-info">
          <CardContent>
            <VehicleInfo
              vehicle={vehicle}
              changeMalus={changeMalus}
              feedback={props.feedback}
              httpClient={props.httpClient}
            ></VehicleInfo>
          </CardContent>
        </Card>
      )}
      {openConfirmModal && (
        <ConfirmationModal
          confirm={confirm}
          open={openConfirmModal}
        ></ConfirmationModal>
      )}
      <NewVehicleModal
        open={openNewVehicleModal}
        close={closeNewVehicleModal}
        submit={addVehicle}
        engines={props.engines}
        classes={props.classes}
        owner={props.user.id}
      ></NewVehicleModal>
      <AlertModal
        confirm={confirmCancel}
        open={openAlertModal}
        count={props.user.penalties}
      ></AlertModal>
    </div>
  );
};
