import React, { useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@mui/material";
import Product from "../../models/Products";
import db from "../../utils/db";
import axios from "axios";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";

export default function ProductScreen({ product }) {
  const classes = useStyles();
  const { dispatch } = useContext(Store);
  const router = useRouter();

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < 1) {
      window.alert("Sorry. Product Out of Stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quanitity: 1 },
    });
    router.push("/cart");
  };

  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1} direction="row" justifyContent="center">
        <Grid item md={6} sm={8} xs={12}>
          <Grid>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : false,
    },
  };
}
