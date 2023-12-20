import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSumary";
import { currencyFormat } from "../../app/utils/util";
import { Link } from "react-router-dom";

function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({
      loading: true,
      name: name,
    });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name: "",
        })
      );
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({
      loading: true,
      name: name,
    });
    agent.Basket.removeItem(productId, quantity) //this fucntion 'removeItem' from the data
      .then(() => removeItem(productId, quantity)) // this function 'removeItem' from the storeContext
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name: "",
        })
      );
  }

  if (!basket) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item: BasketItem) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    display="flex"
                    alignItems="center"
                    component={Link}
                    to={`/catalog/${item.productId}`}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>

                <TableCell align="center">
                  <LoadingButton
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        1,
                        "rem" + item.productId
                      )
                    }
                    loading={
                      status.loading && status.name === "rem" + item.productId
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    onClick={() =>
                      handleAddItem(item.productId, "add" + item.productId)
                    }
                    loading={
                      status.loading && status.name === "add" + item.productId
                    }
                    color="error"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>

                <TableCell align="right">
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>

                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.loading && status.name === "del" + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default BasketPage;
