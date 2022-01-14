import {
  Button,
  Grid,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";

import NextLink from "next/link";
import Layout from "../components/Layout";

export default function Login() {
  return (
    <Layout title="Login">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item md={8} sm={12} textAlign="center">
          <form>
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
                />
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
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
