import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
  
  import SelectDishRank from "./SelectedDishRank";
  
  const DishesCard = ({ dish, selectedDishes, setSelectedDishes }:any) => {
    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "25rem",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={dish.image}
          alt={dish.dishName}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {dish.dishName}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            {dish.description}
          </Typography>
        </CardContent>
        <CardActionArea>
          <SelectDishRank
            dish={dish}
            selectedDishes={selectedDishes}
            setSelectedDishes={setSelectedDishes}
          />
        </CardActionArea>
      </Card>
    );
  };
  
  export default DishesCard;
  