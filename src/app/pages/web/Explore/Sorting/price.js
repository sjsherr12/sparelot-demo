import { PriceSortingTypeToDescription, SortingValues, useSorting } from "./context";

const { FormControl, InputLabel, Box, MenuItem, Select, NativeSelect } = require("@mui/material");
const { useState } = require("react");

const Price_Sorting = () => {
    const {
        previews,
        setPreviews
    } = useSorting();

    const handleChange = (e) => {
        setPreviews((prev) => ({
            ...prev,
            price: e.target.value,
        }))
    }
  
    return (
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Price
            </InputLabel>
            <NativeSelect
                defaultValue='none'
                value={previews?.price}
                onChange={handleChange}
                inputProps={{
                    id: 'uncontrolled-native',
                }}
            >
                {SortingValues.map((sv, idx) => (
                    <option value={
                        sv
                    }>{PriceSortingTypeToDescription[sv]}</option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}

export default Price_Sorting;