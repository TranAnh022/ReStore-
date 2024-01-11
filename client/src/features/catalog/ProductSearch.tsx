import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);       //this func ser the value instantly inside the input (user can see the change immediately)
        debouncedSearch(event);                 //debounce function give us the delay for user to type (wait 1s for user compelete typing before send to data)
      }}
    />
  );
};

export default ProductSearch;
