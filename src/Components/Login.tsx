/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Fade,
  FormControlLabel,
  Grid,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { LockPersonRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface StatusType {
  isSelect: boolean;
  isInValid: boolean;
  isError: boolean;
}
type User = {
  id: number;
  username: string;
  password: string;
};

function Login() {
  const defaultTheme = createTheme();
  const inputRef1: any = useRef(null);
  const inputRef2: any = useRef("");
  const [status, setSatus] = useState<StatusType>({
    isSelect: false,
    isInValid: false,
    isError: false,
  });
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const uname = data.get("email");
    const pass = data.get("password");
    fetch("assets/json/users.json")
      .then((res) => res.json())
      .then((users: User[]) => {
        if (uname && pass) {
          setSatus((prev: StatusType) => ({ ...prev, isError: true }));
          const authUser: User | undefined = users.find(
            (user: User) => user.username == uname && user.password == pass
          );
          if (authUser) {
            if (
              authUser?.username == uname &&
              authUser?.password == pass &&
              status.isSelect
            ) {
              localStorage.setItem("isAuthenticated", "true");
              navigate("/list", { replace: true });
            } else if (
              authUser?.username == uname &&
              authUser?.password == pass &&
              !status.isSelect
            ) {
              sessionStorage.setItem("isAuthenticated", "true");
              navigate("/list", { replace: true });
            }
          } else {
            setSatus((prev: StatusType) => ({
              ...prev,
              isInValid: true,
              isError: false,
            }));
          }
        } else {
          setSatus((prev: StatusType) => ({
            ...prev,
            isError: true,
            isInValid: false,
          }));
        }
      })
      .catch((err) => {
        console.log("e", err);
      });
  };

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const handleClose = () => {
    setSatus((prev: StatusType) => ({ ...prev, isInValid: false }));
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderImage: "fill 0 linear-gradient(to right, #fff1, #fff)",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{ boxShadow: "none" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexDirection: "column",
                }}
              >
                <Box>
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockPersonRounded />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    ref={inputRef1}
                    helperText={
                      status.isError &&
                      !inputRef1.current.value &&
                      "Username is required"
                    }
                    error={status.isError && !inputRef1.current.value}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={status.isError && !inputRef2.current.value}
                    helperText={
                      status.isError &&
                      !inputRef2.current.value &&
                      "Password is required"
                    }
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        defaultValue={status.isSelect.toString()}
                        onChange={(e: any) =>
                          setSatus((prev: StatusType) => ({
                            ...prev,
                            isSelect: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 10, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Fade in={status.isInValid}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={status.isInValid}
            onClose={handleClose}
            autoHideDuration={2000}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Invalid Credentials
            </Alert>
          </Snackbar>
        </Fade>
      </ThemeProvider>
    </div>
  );
}

export default Login;
