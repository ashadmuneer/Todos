import { useState } from "react";
import { TextField, Button, Select, MenuItem, Box } from "@mui/material";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addTodo(text, priority);
    setText("");
    setPriority("Medium"); 
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}
    >
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Add a task..."
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        size="small"
        sx={{ width: "100px" }}
      >
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </Select>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#ef8257",
          "&:hover": { backgroundColor: "#d76b46" },
        }}
      >
        Add
      </Button>
    </Box>
  );
}
