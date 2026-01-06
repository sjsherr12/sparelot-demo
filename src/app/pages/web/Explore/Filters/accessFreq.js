import { Box } from "@mui/material";
import { useFilters } from "./context"
import { TimeOfDayAccessTypes } from "app/utils/optimize/utils";
import FilterSelectable from "./selectable";
import { AccessFrequencyTypes } from "app/utils/optimize/utils";

const AccessFrequency_Filter = () => {
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
            {AccessFrequencyTypes.map((ty, idx) => (
                <FilterSelectable
                    key={idx}
                    label={ty}
                    selected={previews[4].includes(idx)}
                    onToggle={() => {
                        setPreviews((prev) => ({
                            ...prev,
                            4: prev[4].includes(idx)
                                ? prev[4].filter(i => i !== idx)
                                : [...prev[4], idx]
                        }))
                    }}
                />
            ))}
        </Box>
    )
}

export default AccessFrequency_Filter