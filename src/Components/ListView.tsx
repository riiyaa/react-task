/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import SelectedDishRankView from "./SelectdDishRankView";
import Dish from "./Dish";

function ListView({
  selectedDishes,
  setSelectedDishes,
  dishScore,
  setDishScore,
}: any) {
  const [dishesInfo, setDishesInfo] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isUserAuthenticated = sessionStorage.getItem("isAuthenticated");

  useEffect(() => {
    performApiCall();
  }, []);

  const action = (snackbarId: any) => {
    return (
      <Button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        Dismiss
      </Button>
    );
  };

  const performApiCall = async () => {
    setIsLoading(true);
    try {
      const res: any = await fetch("assets/json/list.json").then((data: any) =>
        data.json()
      );
      setDishesInfo(res);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      setError(true);
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, {
          action: (snackbarId) => action(snackbarId),
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0.5rem",
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
          to="/result"
        >
          Go to Result Page
        </Link>
      </Box>
      {isUserAuthenticated ? (
        <Box sx={{ padding: "2rem" }}>
          <Grid container spacing={2} sx={{ placeContent: "start" }}>
            <Grid item xs={8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "1rem",
                }}
              >
                <Typography variant="h6">Select Best Dishes</Typography>
              </Box>
              <Dish
                error={error}
                isLoading={isLoading}
                dishesInfo={dishesInfo}
                selectedDishes={selectedDishes}
                setSelectedDishes={setSelectedDishes}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                height: "max-content",
                width: "max-content",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  border: "solid",
                  borderWidth: "thin",
                  borderColor: "antiquewhite",
                  height: "max-content",
                  width: "max-content",
                  backgroundColor: "ghostwhite",
                  padding: "1rem",
                }}
              >
                <SelectedDishRankView
                  dishesInfo={dishesInfo}
                  selectedDishes={selectedDishes}
                  setSelectedDishes={setSelectedDishes}
                  dishScore={dishScore}
                  setDishScore={setDishScore}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Navigate replace to="/" />
      )}
    </>
  );
}

export default ListView;
