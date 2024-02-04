import { TextField, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";

const SelectDishRank = ({ dish, selectedDishes, setSelectedDishes }: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const rankingArray = [
    { label: 0, value: 0 },
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
  ];

  const handleRankChange = (e: any) => {
    const dishName = e.target.name;
    const value = e.target.value;

    const dishRankSelected = [
      {
        dishName: dishName,
        rank: value,
        id: String(value),
      },
    ];

    if (
      selectedDishes.some(
        (dish: any) => dish.rank === value || dish.dishName === dishName
      )
    ) {
      let newSelectedDishes = selectedDishes.filter(
        (dish: any) => dish.rank !== value
      );
      newSelectedDishes = [...dishRankSelected, ...newSelectedDishes];

      setSelectedDishes(() => [...newSelectedDishes]);
      enqueueSnackbar("Dish Added", {
        variant: "success",
        autoHideDuration: 500,
      });
    } else {
      setSelectedDishes((prevRank: any) => [...prevRank, ...dishRankSelected]);
      enqueueSnackbar("Dish Added", {
        variant: "success",
        autoHideDuration: 500,
      });
    }
  };

  return (
    <>
      <TextField
        name={dish.dishName}
        select
        label="Select"
        value={0}
        onChange={(e) => handleRankChange(e)}
        helperText="Select the rank of the Dish"
      >
        {rankingArray.map((option, index) => (
          <MenuItem key={index} id={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default SelectDishRank;
