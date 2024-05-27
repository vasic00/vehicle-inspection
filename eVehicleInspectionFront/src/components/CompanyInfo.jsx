import React, { useState } from "react";
import { StationForm } from "./StationForm";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import SettingsIcon from "@mui/icons-material/Settings";
import { DataGrid } from "@mui/x-data-grid";
import { SelectModal } from "./SelectModal";

export const CompanyInfo = (props) => {
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const handleOpenSelectModal = (id) => {
    setSelectedWorkerId(id);
    setOpenSelectModal(true);
  };
  const lineColumns = [
    { field: "id", headerName: "ID", width: 70, filterable: false },
    {
      field: "name",
      headerName: "Naziv",
      width: 150,
      filterable: false,
    },
    {
      width: 80,
      field: "Ukloni",
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          onClick={() => {
            props.deleteLine(params.row.id);
          }}
        >
          <DeleteIcon color="error"></DeleteIcon>
        </IconButton>
      ),
    },
  ];
  const workerColumns = [
    { field: "id", headerName: "ID", width: 70, filterable: false },
    {
      field: "name",
      headerName: "Ime",
      width: 150,
      filterable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      filterable: false,
    },
    {
      width: 80,
      field: "Godisnji",
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          onClick={() => {
            props.vacation(params.row.vacationDates);
          }}
        >
          <BeachAccessIcon color="primary"></BeachAccessIcon>
        </IconButton>
      ),
    },
    {
      width: 80,
      field: "Izmijeni",
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          onClick={() => {
            handleOpenSelectModal(params.row.id);
          }}
        >
          <SettingsIcon color="primary"></SettingsIcon>
        </IconButton>
      ),
    },
    {
      width: 80,
      field: "Status",
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          onClick={() => {
            props.blockUser(params.row.id, !params.row.blocked);
          }}
        >
          {params.row.blocked === true ? (
            <PlayArrowIcon color="primary"></PlayArrowIcon>
          ) : (
            <DoDisturbIcon color="error"></DoDisturbIcon>
          )}
        </IconButton>
      ),
    },
    {
      width: 80,
      field: "Ukloni",
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          onClick={() => {
            props.deleteUser(params.row.id);
          }}
        >
          <DeleteIcon color="error"></DeleteIcon>
        </IconButton>
      ),
    },
  ];

  return (
    <div className="company-wrapper">
      <StationForm
        feedback={props.feedback}
        data={props.data}
        return={props.return}
        update={props.update}
      ></StationForm>
      {props.data.lines && (
        <div className="lines-wrapper">
          <DataGrid
            disableRowSelectionOnClick
            rows={props.data.lines.map((l) => {
              l.status = l.blocked ? "NEAKTIVNA" : "AKTIVNA";
              return l;
            })}
            columns={lineColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 8 },
              },
            }}
            pageSizeOptions={[2, 5, 10, 20]}
          />
        </div>
      )}
      {props.data.workers && (
        <div className="lines-wrapper">
          <DataGrid
            disableRowSelectionOnClick
            rows={props.data.workers.map((l) => {
              console.log(l.blocked);
              l.status = l.blocked ? "BLOKIRAN" : "AKTIVAN";
              l.name = l.firstname + " " + l.lastname;
              return l;
            })}
            columns={workerColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 8 },
              },
            }}
            pageSizeOptions={[2, 5, 10, 20]}
          />
        </div>
      )}
      {openSelectModal && (
        <SelectModal
          open={openSelectModal}
          change={(option) => {
            props.changeWorkerLocation(selectedWorkerId, option);
            setOpenSelectModal(false);
          }}
          close={() => setOpenSelectModal(false)}
          options={props.stations}
        ></SelectModal>
      )}
    </div>
  );
};

export default CompanyInfo;
