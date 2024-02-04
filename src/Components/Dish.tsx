import { Box, Grid, Typography } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import DishesCard from "./DishCard";

const Dish = ({
  error,
  isLoading,
  dishesInfo,
  selectedDishes,
  setSelectedDishes,
}:any) => {
  let dishesList;
  if (error) {
    dishesList = (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} className="loading">
          <SentimentDissatisfied />
          <Typography variant="h5">Unable to load Dishes to Vote</Typography>
        </Grid>
      </Box>
    );
  } else if (isLoading) {
    dishesList = (
      <Box sx={{ flexGrow: 1 }} className="loading">
        <CircularProgress />
        <p>Loading products....</p>
      </Box>
    );
  } else {
    dishesList = (
      <Grid container spacing={2}>
        {dishesInfo?.map((dish:any, index:number) => (
          <Grid
            item
            xs={12}
            sm={3}
            key={dish.id}
            sx={{
              display: "flex",
              justifyContent: "start",
              padding: "1rem",
              height: "auto",
            }}
          >
            <DishesCard
              dish={dish}
              selectedDishes={selectedDishes}
              setSelectedDishes={setSelectedDishes}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return dishesList;
};

export default Dish;
