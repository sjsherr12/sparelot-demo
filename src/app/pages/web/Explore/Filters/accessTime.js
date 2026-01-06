import { Box } from "@mui/material";
import { useFilters } from "./context"
import { TimeOfDayAccessTypes } from "app/utils/optimize/utils";
import FilterSelectable from "./selectable";

const AccessTime_Filter = () => {
    const {
        filters,
        setFilters,
        previews,
        setPreviews,
    } = useFilters();

    return (
        <Box
            sx={{
                px:.15,
                pt:.15,
                ml:-.15,
                mt:-.15,
                pb:2,
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                flexWrap: { xs: 'nowrap', lg: 'wrap' },
                overflowX: { xs: 'auto', lg: 'hidden' },
            }}
        >
            {TimeOfDayAccessTypes.map((ty, idx) => (
                <FilterSelectable
                    key={idx}
                    label={ty}
                    selected={previews[5].includes(idx)}
                    onToggle={() => {
                        setPreviews((prev) => ({
                            ...prev,
                            5: prev[5].includes(idx)
                                ? prev[5].filter(i => i !== idx)
                                : [...prev[5], idx]
                        }))
                    }}
                />
            ))}
        </Box>
    )
}

export default AccessTime_Filter