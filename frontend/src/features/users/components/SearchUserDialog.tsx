import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    useTheme,
    alpha,
    Stack,
    Autocomplete,
    CircularProgress,
    Avatar,
    Typography,
    DialogActions,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import useSearchUsers from "../hooks/useSearchUsers";
import { useDebounce } from "../../../hooks/useDebounce";
import { UserDto } from "../types/userSchemas";
import useGrantAccess from "../../projects/hooks/useGrantAccess";
import { ProjectRole } from "../../../types/projectRoles";

export function SearchUserDialog({
    open,
    onClose,
    projectId,
}: {
    open: boolean;
    onClose: () => void;
    projectId: string;
}) {
    const theme = useTheme();
    const [queryInput, setQueryInput] = useState<string>("");
    const debouncedQuery = useDebounce(queryInput, 300);
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
    const { users, isLoading } = useSearchUsers(debouncedQuery);
    const [selectedRole, setSelectedRole] = useState<ProjectRole>(ProjectRole.Editor);
    const { grantAccess } = useGrantAccess(projectId);

    const handleClose = () => {
        onClose();
    };

    const handleShare = () => {
        if (selectedUser) {
            grantAccess({ projectId: projectId, userId: selectedUser.id, role: selectedRole });
            handleClose();
        }
    };

    const handleChangeRole = (event: SelectChangeEvent) => {
        setSelectedRole(event.target.value as ProjectRole);
    };

    return (
        <Dialog
            open={open}
            onClose={isLoading ? undefined : handleClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        paddingTop: 1,
                        backgroundColor: "background.paper",
                        backgroundImage: "none",
                        border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    },
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>Project Members</DialogTitle>

            <DialogContent>
                <Stack direction="row" spacing={1} mt={2}>
                    <Autocomplete
                        getOptionLabel={(option) => option.email}
                        options={users}
                        filterOptions={(x) => x}
                        autoComplete
                        fullWidth
                        includeInputInList
                        value={selectedUser}
                        onChange={(_event, newValue) => {
                            setSelectedUser(newValue);
                        }}
                        onInputChange={(_event, newInputValue) => {
                            setQueryInput(newInputValue);
                        }}
                        loading={isLoading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search by name or email"
                                fullWidth
                                slotProps={{
                                    input: {
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    },
                                }}
                            />
                        )}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props;
                            return (
                                <li key={key} {...optionProps}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Avatar sx={{ width: "30px", height: "30px" }}>
                                                {option.firstname[0].toUpperCase()}
                                                {option.lastname?.[0]?.toUpperCase()}
                                            </Avatar>
                                            <Stack direction="row" spacing={0.5}>
                                                <Typography variant="body2">{option.firstname}</Typography>
                                                <Typography variant="body2">{option.lastname}</Typography>
                                            </Stack>
                                            <Typography variant="caption" color="text.secondary">
                                                &lt;{option.email}&gt;
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </li>
                            );
                        }}
                    />
                    <Select value={selectedRole} onChange={handleChangeRole} sx={{ minWidth: "12ch" }}>
                        <MenuItem value={ProjectRole.Editor}>Editor</MenuItem>
                        <MenuItem value={ProjectRole.Viewer}>Viewer</MenuItem>
                    </Select>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleShare} variant="contained" disabled={!selectedUser}>
                    Share
                </Button>
            </DialogActions>
        </Dialog>
    );
}
