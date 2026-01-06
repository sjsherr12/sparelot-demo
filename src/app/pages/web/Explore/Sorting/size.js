import { SizeSortingTypeToDescription, SortingValues, useSorting } from "./context";

const { FormControl, InputLabel, Box, MenuItem, Select, NativeSelect } = require("@mui/material");
const { useState } = require("react");

const Size_Sorting = () => {
    const {
        previews,
        setPreviews
    } = useSorting();

    const handleChange = (e) => {
        setPreviews((prev) => ({
            ...prev,
            size: e.target.value,
        }))
    }
  
    return (
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Size
            </InputLabel>
            <NativeSelect
                defaultValue='none'
                value={previews?.size}
                onChange={handleChange}
                inputProps={{
                    id: 'uncontrolled-native',
                }}
            >
                {SortingValues.map((sv, idx) => (
                    <option value={
                        sv
                    }>{SizeSortingTypeToDescription[sv]}</option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}

export default Size_Sorting;