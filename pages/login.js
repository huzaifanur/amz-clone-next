import {
  Button,
  Grid,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import NextLink from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/users/login", { email, password });
      alert("Success");
    } catch (error) {
      alert(error.response.data ? error.response.data.message : error.message);
    }
  };
  return (
    <Layout title="Login">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={8} sm={12} textAlign="center">
          <form onSubmit={submitHandler}>
            <Typography component="h1" variant="h1">
              Login
            </Typography>

            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="verify-password"
                  label="Verify Password"
                  inputProps={{ type: "password" }}
                />
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="secondary"
                >
                  Submit
                </Button>
              </ListItem>
              <ListItem>
                Dont have an account?
                <NextLink href="/register" passHref>
                  <Link> Register</Link>
                </NextLink>
              </ListItem>
            </List>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
}
