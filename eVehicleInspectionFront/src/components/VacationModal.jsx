import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
export const VacationModal = (props) => {
  console.log(props.vacation);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(dayjs().$M);
  const handleClose = () => {
    props.close();
  };
  const handleMonthChange = (event) => {
    setMonth(event.$M);
  };
  const handleDayChange = (event) => {
    const date =
      event.$y +
      "-" +
      (event.$M + 1 > 9 ? event.$M + 1 : "0" + (event.$M + 1)) +
      "-" +
      (event.$D > 9 ? event.$D : "0" + event.$D);

    props.submit(date);
  };
  function ServerDay(props) {
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
  }
  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Vacation Calendar
      </DialogTitle>
      <DialogContent>
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
                highlightedDays: props.vacation.map((d) => dayjs(d.date)),
              },
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => props.close()}>
          Zatvori
        </Button>
      </DialogActions>
    </Dialog>
  );
};
