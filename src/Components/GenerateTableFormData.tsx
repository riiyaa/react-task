import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const GenerateTableFromData = ({ listToDisplay }:any) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: "burlywood" }}
          aria-label="simple table"
        >
          <TableHead sx={{ backgroundColor: "yellowgreen" }}>
            <TableRow>
              <TableCell>
                <Typography variant="body1" fontWeight={600}>
                  Dish Name
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" fontWeight={600}>
                  Score
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listToDisplay.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GenerateTableFromData;
