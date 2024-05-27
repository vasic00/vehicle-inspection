import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import conf from "../conf.json";
import no_image from "../assets/no-image.jpeg";
export const CompanyCard = (props) => {
  return (
    <Card
      sx={{ maxWidth: 345, margin: props.station ? 2 : 0 }}
      key={props.company.id}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={
          props.company.logo !== null
            ? conf.server_url +
              "/companies/logo/" +
              btoa(props.logo ? props.logo : props.company.logo)
            : no_image
        }
        title={props.company.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Adresa: " + props.company.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Telefon: " + props.company.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Email: " + props.company.email}
        </Typography>
        {props.station && (
          <>
            <Typography variant="body2" color="text.secondary">
              {"Radno vrijeme: " +
                props.company.startsAt +
                "h - " +
                props.company.endsAt +
                "h"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {"Broj zaposlenih: " + props.company.employeesNum}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {!props.station && (
          <Rating
            name="simple-controlled"
            value={Math.round(props.company.grade)}
            onChange={(event, newValue) =>
              props.grade(newValue, props.company.id)
            }
          />
        )}
        <Button
          className="info-btn"
          sx={{ marginLeft: 20 }}
          onClick={() => props.changeInfo(props.company)}
        >
          {props.station ? "Izmijeni" : "Info"}
        </Button>
      </CardActions>
    </Card>
  );
};
export default CompanyCard;
