import { useState } from "react";
import { ListItem, ListItemText, IconButton, Typography, Box, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import dayjs from "dayjs";

export default function TodoItem({ todo, remove, toggle, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const priorityColors = {
        High: "#ff4d4d", // Red
        Medium: "#ffa500", // Orange
        Low: "#4caf50", // Green
    };

    const handleEdit = () => {
        editTodo(todo.id, newText); // Update task
        setIsEditing(false);
    };

    return (
        <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd", padding: "10px" }}>
            <IconButton onClick={() => toggle(todo.id)} color={todo.completed ? "success" : "default"}>
                {todo.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>

            <Box sx={{ flex: 1 }}>
                {isEditing ? (
                    <TextField
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        size="small"
                        autoFocus
                        fullWidth
                        sx={{ marginBottom: "5px" }}
                    />
                ) : (
                    <ListItemText
                        primary={
                            <Typography sx={{ textDecoration: todo.completed ? "line-through" : "none", fontWeight: "500" }}>
                                {todo.text}
                            </Typography>
                        }
                        secondary={
                            <>
                                <Typography sx={{ fontSize: "0.8rem", color: "#666" }}>
                                    Added: {dayjs(todo.date).format("DD MMM YYYY")}
                                </Typography>
                                <Typography sx={{ fontSize: "0.8rem", color: priorityColors[todo.priority] }}>
                                    Priority: {todo.priority}
                                </Typography>
                            </>
                        }
                    />
                )}
            </Box>

            {isEditing ? (
                <IconButton onClick={handleEdit} color="primary">
                    <CheckIcon />
                </IconButton>
            ) : (
                <IconButton onClick={() => setIsEditing(true)} color="warning">
                    <EditIcon />
                </IconButton>
            )}

            <IconButton onClick={() => remove(todo.id)} color="error">
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
}
