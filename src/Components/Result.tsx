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
    // console.log(items);
    if (items) {
      setPollList(items);
    }
  }, []);

  useEffect(() => {
    selectedDishesTotalScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollList]);

  const selectedDishesTotalScore = () => {
    let totalScoreMap = pollList.reduce((mapAcc, obj) => {
      if (!mapAcc[obj.name]) {
        mapAcc[obj.name] = obj.score;
      } else {
        mapAcc[obj.name] = mapAcc[obj.name] + obj.score;
      }

      return mapAcc;
    }, {});

    totalScoreList(totalScoreMap);
  };

  const totalScoreList = (data:any) => {
    let tempArray:any[] = [];

    Object.keys(data).forEach((key) =>
      tempArray.push({
        name: key,
        score: data[key],
      })
    );
    tempArray = tempArray.sort((a, b) => b.score - a.score);
    setListToDisplay(() => [...tempArray]);
  };

  let table = (
    <Grid container spacing={2} padding={"1rem"}>
      <Grid item xs={12}>
        <Box sx={{
          display: 'flex',
          placeContent: 'center',
          padding: '1rem'
        }}>
          <Typography sx={{
            color: 'blue',
            border: 'solid',
            borderColor: 'yellowgreen',
            background: 'bisque',
            padding: '0.5rem',
          }} variant="h6">
            Dish Poll Results
          </Typography>
        </Box>
        <GenerateTableFromData
          backgroundColor='pery'
          listToDisplay={listToDisplay}
        />{" "}
      </Grid>
    </Grid>
  );

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '0.5rem',
        paddingTop: '0.5rem',
      }}>
        {" "}
        <Link to="/list">Go to Poll Page</Link>
      </Box>
      {isUserAuthenticated ? table : <Navigate replace to="/" />}
    </>
  );
};

export default Result;
