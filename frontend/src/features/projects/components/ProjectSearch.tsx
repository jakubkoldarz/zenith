import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { ProjectDto } from "../types/projectSchemas";
import { RoleChip } from "../../../components/RoleChip";
import { useProjects } from "../hooks/useProjects";

export default function ProjectSearch() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { isLoading, allProjects } = useProjects({ enabled: open });

    return (
        <Autocomplete<ProjectDto, false, false, true>
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            loading={isLoading}
            size="small"
            sx={{
                width: "70%",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                },
            }}
            options={[...allProjects]}
            freeSolo
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => {
                if (typeof option === "string") return option;
                return option.name;
            }}
            renderInput={(params) => {
                const { InputProps, ...restParams } = params;

                return (
                    <TextField
                        {...restParams}
                        variant="outlined"
                        placeholder="Search..."
                        slotProps={{
                            input: {
                                ...InputProps,
                                startAdornment: (
                                    <>
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" sx={{ ml: 0.5 }} />
                                        </InputAdornment>
                                        {InputProps.startAdornment}
                                    </>
                                ),
                            },
                        }}
                    />
                );
            }}
            renderOption={(props, option) => {
                return (
                    <li
                        {...props}
                        key={option.id}
                        onClick={() => {
                            setOpen(false);
                            navigate(`/projects/${option.id}`);
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            py="0.5rem"
                            spacing={1}
                            width="100%"
                        >
                            <Typography variant="body1">{option.name}</Typography>
                            <RoleChip role={option.role} />
                        </Stack>
                    </li>
                );
            }}
        />
    );
}
