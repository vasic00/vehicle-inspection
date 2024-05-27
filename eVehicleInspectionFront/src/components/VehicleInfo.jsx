import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import VerifiedIcon from "@mui/icons-material/Verified";
import ReportIcon from "@mui/icons-material/Report";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";
import {
  DataGrid,
  getGridStringOperators,
  getGridNumericOperators,
} from "@mui/x-data-grid";
import "../style/vehicle-info.css";

const stringOperators = getGridStringOperators().filter(
  (operator) => operator.value === "contains"
);
const numericOperators = getGridNumericOperators().filter(
  (operator) =>
    operator.value === "=" || operator.value === "<" || operator.value === ">"
);

const examColumns = [
  { field: "id", headerName: "ID", width: 70, filterable: false },
  {
    field: "start",
    headerName: "Vrijeme",
    width: 200,
    filterOperators: stringOperators,
  },
  {
    field: "place",
    headerName: "Lokacija",
    width: 310,
    filterOperators: stringOperators,
  },
  {
    field: "priceString",
    headerName: "Cijena",
    description: "Procjena u BAM!",
    width: 120,
    type: "number",
    disableColumnFilter: true,
    filterOperators: numericOperators,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    filterOperators: stringOperators,
  },
];

export const VehicleInfo = (props) => {
  const [render, changeRender] = useState(false);
  const [selected, changeSelected] = useState(null);
  const [malus, changeMalus] = useState(props.vehicle.malus);
  useEffect(() => {
    changeMalus(props.vehicle.malus);
  }, [props.vehicle.malus]);
  const change = (value) => {
    props.changeMalus(props.vehicle, value);
    props.vehicle.malus = value;
    changeMalus(value);
  };
  const downloadPDF = (id) => {
    props.httpClient
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
        props.feedback("PDF nedostupan...", true);
      });
  };
  return (
    <div id="vehicle-wrapper">
      <div id="vehicle-name">
        {(props.vehicle.manufacturer ? props.vehicle.manufacturer : " ? ") +
          " " +
          (props.vehicle.model ? props.vehicle.model : " ? ")}
      </div>
      {selected === null ? (
        <div id="content">
          <div id="info-wrapper">
            <div className="info-labels" id="vehicle-labels">
              <div className="info-label">Tip: </div>
              <div className="info-label">Godina proizvodnje:</div>
              <div className="info-label">Motor:</div>
              <div className="info-label">Klasa:</div>

              {props.vehicle.type === "CAR" && (
                <>
                  <div className="info-label">Zapremina motora:</div>
                  <div className="info-label">Snaga motora:</div>
                  <div className="info-label">Lpg:</div>
                </>
              )}
              {props.vehicle.type === "MOTORBIKE" && (
                <>
                  <div className="info-label">Zapermina motora:</div>
                </>
              )}
              {props.vehicle.type === "CARGO" && (
                <>
                  <div className="info-label">Masa vozila:</div>
                  <div className="info-label">Max nosivost:</div>
                </>
              )}
              <div className="info-label">Boja:</div>
              <div className="info-label malus-label">Malus:</div>
            </div>
            <div className="info-values ">
              <div className="info-label">
                {props.vehicle.type === "CAR"
                  ? "Automobil"
                  : props.vehicle.type === "CARGO"
                    ? "Teretno vozilo"
                    : "Motocikl"}
              </div>
              <div className="info-label">{props.vehicle.productionYear}</div>
              <div className="info-label">{props.vehicle.engine}</div>
              <div className="info-label">
                {"Euro " + props.vehicle.emissionClass}
              </div>
              {props.vehicle.type === "CAR" && (
                <>
                  <div className="info-label">{props.vehicle.engineVolume}</div>
                  <div className="info-label">{props.vehicle.enginePower}</div>
                  <div className="info-label">
                    {props.vehicle.lpg ? "yes" : "no"}
                  </div>
                </>
              )}
              {props.vehicle.type === "MOTORBIKE" && (
                <>
                  <div className="info-label">{props.vehicle.engineVolume}</div>
                </>
              )}
              {props.vehicle.type === "CARGO" && (
                <>
                  <div className="info-label">{props.vehicle.mass}</div>
                  <div className="info-label">{props.vehicle.loadMax}</div>
                </>
              )}
              <div className="info-label">
                {props.vehicle.color ? props.vehicle.color : "?"}
              </div>
              {malus && (
                <FormControl required sx={{ m: 1, minWidth: 80 }}>
                  <Select
                    value={malus}
                    onChange={(event) => change(event.target.value)}
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
              )}
            </div>
          </div>
          {props.vehicle.examinations.length > 0 && (
            <div id="exams-wrapper">
              <div id="table-wrapper">
                <DataGrid
                  onRowSelectionModelChange={(value) => {
                    const target = props.vehicle.examinations.find(
                      (e) => e.id === value[0]
                    );
                    console.log(target);
                    changeSelected(target);
                  }}
                  rows={props.vehicle.examinations.map((e) => {
                    e.status = e.record.passed === true ? "PROŠAO" : "PAO";
                    e.start =
                      e.time.split("T")[0] +
                      " " +
                      e.time.split("T")[1].split(".")[0];
                    e.priceString = e.price + " BAM";
                    e.place = e.company + " " + e.station;
                    return e;
                  })}
                  columns={examColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[2, 5, 10]}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div id="content">
          <div id="info-wrapper">
            <div className="info-labels" id="vehicle-labels">
              <div className="info-label">Vrijeme: </div>
              <div className="info-label">Mjesto:</div>
              <div className="info-label">Period:</div>
              <div className="info-label">Nadzornik:</div>
              <div className="info-label">Status:</div>
              <div className="info-label">Tablice:</div>
              <div className="info-label">Cijena:</div>
              {selected.record.description && (
                <div className="info-label">Napomena:</div>
              )}

              {selected.registration && (
                <div className="info-label">
                  {"Registration" + (selected.first ? " (first)" : "")}
                </div>
              )}
              {selected.ownerCert && (
                <div className="info-label">Potvrda o vlasništvu</div>
              )}
              {selected.regCert && (
                <div className="info-label">Potvrda o registraciji</div>
              )}
              {selected.greenCard && (
                <div className="info-label">Zeleni karton</div>
              )}
              {selected.newPlates && (
                <div className="info-label">Nove tablice</div>
              )}
            </div>
            <div className="info-values ">
              <div className="info-label">
                {selected.time.split("T")[0] +
                  " " +
                  selected.time.split("T")[1].split(".")[0]}
              </div>
              <div className="info-label">
                {selected.company + " - " + selected.station}
              </div>
              <div className="info-label">{selected.period}</div>
              <div className="info-label">{selected.supervisor}</div>
              <div
                className={
                  "info-label" + (selected.record.passed ? " pass" : " fail")
                }
              >
                {selected.record.passed ? "PROŠAO" : "PAO"}
              </div>
              <div className="info-label">{selected.licencePlates}</div>
              <div className="info-label">{selected.price + " BAM"}</div>
              {selected.record.description && (
                <div className="info-label long-text">
                  {selected.record.description}
                </div>
              )}
            </div>
            <Button
              id="return-btn"
              variant="contained"
              // color="success"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => changeSelected(null)}
            >
              Povratak
            </Button>
            <Button
              id="pdf-btn"
              variant="contained"
              // color="success"
              onClick={() => downloadPDF(selected.id)}
            >
              pdf
            </Button>
          </div>
          {/* <div className="info-labels criteria-labels">
            {selected.record.criteria.map((c) => (
              <div className="info-label">{c.name + ": "}</div>
            ))}
          </div> */}
          <div className="info-values criteria-labels">
            {selected.record.criteria.map((c) => (
              <div className="info-label icon">
                <div className="criteria-name">{c.name + ":"}</div>
                {c.satisfied ? (
                  <VerifiedIcon
                    className="status-icon"
                    color="success"
                  ></VerifiedIcon>
                ) : (
                  <>
                    <ReportIcon
                      className="status-icon"
                      color="error"
                    ></ReportIcon>
                    <span className="reason">{" " + c.description}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
