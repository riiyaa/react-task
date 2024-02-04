import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SelectedDishRankView from "./SelectdDishRankView";
import Dish from "./Dish";

function ListView({
  selectedDishes,
  setSelectedDishes,
  dishScore,
  setDishScore,
}: any) {
  const navigate = useNavigate();
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
      const res: any = await fetch("assets/json/list.json").then((data:any)=>data.json());
      setDishesInfo(res);
      console.log(res);
      
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
      <Box className="result-page-redirect">
        {" "}
        <Link to="/result">Go to Result Page</Link>
      </Box>
      {isUserAuthenticated ? (
        <Box className="dishes-container">
          <Grid container spacing={2} sx={{ placeContent: "start" }}>
            <Grid item xs={8}>
              <Box className="heading-select">
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
            <Grid item xs={4} className="dishrankview">
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
