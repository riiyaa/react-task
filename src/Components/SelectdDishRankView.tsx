import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

const SelectedDishRankView = ({
  dishesInfo,
  selectedDishes,
  setSelectedDishes,
  dishScore,
  setDishScore,
}:any) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (dishScore.length) {
      const temp = JSON.stringify(dishScore);
      localStorage.setItem("dishScoreData", temp);
    }
  }, [dishScore]);

  const action = (snackbarId:any) => {
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

  const handleSubmitVote = (e:any) => {
    e.preventDefault();
    if (selectedDishes.length < 3) {
      enqueueSnackbar("Please select atleast 3 Dishes to cast Vote.", {
        action: (snackbarId) => action(snackbarId),
        variant: "error",
      });
      return;
    }
    if (containsDuplicatesDishes() === true) {
      enqueueSnackbar(
        "Please remove Duplicate Dishes and choose Unique Dishes to Cast Vote.",
        {
          action: (snackbarId) => action(snackbarId),
          variant: "error",
        }
      );
      return;
    }
    const dishScoreFromRank = selectedDishes.map((dish:any, index:number) => {
      if (dish.rank === 1) {
        return { name: dish.dishName, score: 30, id: String(index) };
      } else if (dish.rank === 2) {
        return { name: dish.dishName, score: 20, id: String(index) };
      } else if (dish.rank === 3) {
        return { name: dish.dishName, score: 10, id: String(index) };
      }
      return 1;
    });

    if (localStorage.getItem("dishScoreData")) {
      const prevLocalStorageData = JSON.parse(
        localStorage.getItem("dishScoreData")
      );

      setDishScore(() => [...prevLocalStorageData, ...dishScoreFromRank]);
    } else {
      setDishScore(() => [...dishScoreFromRank]);
    }
    enqueueSnackbar(
      "Selected Dishes Voted Succesfully,click on go to poll page to view results",
      {
        action: (snackbarId) => action(snackbarId),
        variant: "success",
      }
    );
  };

  const containsDuplicatesDishes = () => {
    const uniqueValues = new Set(selectedDishes.map((dish) => dish.dishName));

    if (uniqueValues.size < selectedDishes.length) {
      return true;
    }
    return false;
  };

  const handleRemove = (e) => {
    const id = e.target.id;

    const dishToUpdateAfterRemove = selectedDishes.filter(
      (dish:any) => dish.id !== id
    );

    setSelectedDishes(() => [...dishToUpdateAfterRemove]);
  };

  let rankView = selectedDishes
    .sort((a:any, b:any) => a.rank - b.rank)
    .map((dish:any, index:number) => (
      <Box
        display="flex"
        alignItems="flex-start"
        padding="1rem"
        textAlign="center"
        key={index}
        className="details"
      >
        <Stack direction="row" spacing={2} paddingBottom="1rem">
          <Box sx={{ width: "4rem" }}>
            <Typography variant="body1">Rank {dish.rank} :</Typography>
          </Box>
          <Box sx={{ width: "4rem" }}>
            <Typography variant="body1"> {dish.dishName}</Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              name={dish.dishName}
              id={String(dish.id)}
              onClick={(e) => handleRemove(e)}
            >
              Remove
            </Button>
          </Box>
        </Stack>
      </Box>
    ));

  let noDishSelected = (
    <Box sx={{ padding: "2rem" }}>
      No Dishes Selected,Select Dishes To View Ranks.
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ alignSelf: "center", padding: "0.5rem" }}>
        Selected Dishes
      </Typography>
      {selectedDishes.length ? (
        <Box sx={{ textAlign: "center" }}>
          {rankView}
          <Button variant="contained" onClick={(e) => handleSubmitVote(e)}>
            Submit Vote
          </Button>
        </Box>
      ) : (
        noDishSelected
      )}
    </Box>
  );
};

export default SelectedDishRankView;
