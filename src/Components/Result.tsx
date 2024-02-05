/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Navigate, Link } from "react-router-dom";

import GenerateTableFromData from "./GenerateTableFormData";

const Result = () => {
  const [pollList, setPollList] = useState([]);
  const [listToDisplay, setListToDisplay] = useState([]);
  const isUserAuthenticated = sessionStorage.getItem("isAuthenticated");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("dishScoreData"));
    if (items) {
      setPollList(items);
    }
  }, []);

  useEffect(() => {
    selectedDishesTotalScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollList]);

  const selectedDishesTotalScore = () => {
    const totalScoreMap = pollList.reduce((mapAcc: any, obj: any) => {
      if (!mapAcc[obj.name]) {
        mapAcc[obj.name] = obj.score;
      } else {
        mapAcc[obj.name] = mapAcc[obj.name] + obj.score;
      }

      return mapAcc;
    }, {});

    totalScoreList(totalScoreMap);
  };

  const totalScoreList = (data: any) => {
    let tempArray: any = [];

    Object.keys(data).forEach((key) =>
      tempArray.push({
        name: key,
        score: data[key],
      })
    );
    tempArray = tempArray.sort((a: any, b: any) => b.score - a.score);
    setListToDisplay([...tempArray]);
  };

  const table = (
    <Grid container spacing={2} padding={"1rem"}>
      <Grid item xs={12} sm={6} m={3}>
        <Box
          sx={{
            display: "flex",
            placeContent: "center",
            padding: "1rem",
          }}
        >
          <Typography
            sx={{
              color: "#1976d2",
              border: "solid",
              borderColor: "#1976d2",
              background: "transparent",
              borderRadius: "10px",
              padding: "0.5rem",
            }}
            variant="h6"
          >
            Dish Poll Results
          </Typography>
        </Box>
        <GenerateTableFromData
          backgroundColor="#1976d2"
          listToDisplay={listToDisplay}
        />{" "}
      </Grid>
    </Grid>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "0.5rem",
          paddingTop: "0.5rem",
        }}
      >
        {" "}
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            padding: "10px",
            background: "#1976d2",
            borderRadius: "5px",
          }}
          to="/list"
        >
          Go to Poll Page
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            padding: "10px",
            background: "#1976d2",
            borderRadius: "5px",
          }}
          to="/login"
        >
          Logout
        </Link>
      </Box>
      {isUserAuthenticated ? table : <Navigate replace to="/" />}
    </>
  );
};

export default Result;
