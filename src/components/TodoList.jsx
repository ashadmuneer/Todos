import List from "@mui/material/List";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Box, Typography, createTheme, ThemeProvider, MenuItem, Select } from "@mui/material";
import FilterBtn from "./FilterBtn";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { addTodo, removeTodo, toggleTodo, setFilter, setSortBy, reorderTodos, editTodo } from "../store/todoSlice";

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
});

const styles = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    m: 3,
    backgroundColor: "white",
    paddingBottom: "40px",
    margin: "3rem 0 3rem 0",
    padding: "1rem",
    position: "relative",
    webkitBoxShadow: "0px 15px 0px -5px #ef8257, 0px 30px 0px -10px #f39e7c, 5px 5px 15px 5px rgba(0,0,0,0)",
    boxShadow: "0px 14px 0px -5px #ef8257, 0px 28px 0px -10px #f39e7c, 5px 5px 15px 5px rgba(0,0,0,0)",
    border: "2px solid #252422",
    maxWidth: "38rem",
    marginLeft: "auto",
    marginRight: "auto",
};

const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoList() {
    const { todos, filter, sortBy } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };

    const sortedTodos = [...todos]
        .filter(FILTER_MAP[filter])
        .sort((a, b) => {
            if (sortBy === "date") return new Date(a.date) - new Date(b.date);
            if (sortBy === "priority") return priorityOrder[a.priority.trim()] - priorityOrder[b.priority.trim()];
            return 0;
        });

    const onDragEnd = (result) => {
        if (!result.destination) return;
        dispatch(reorderTodos({ sourceIndex: result.source.index, destinationIndex: result.destination.index }));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className="TodoList" sx={styles}>
                <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper", fontFamily: "inherit" }}>
                    <Typography variant="h5" component="h4" sx={{ color: "#eb5e28", paddingBottom: "10px", fontWeight: "500", textAlign: "center" }}>
                        what&apos;s on the docket for today?
                    </Typography>

                    <TodoForm addTodo={(text, priority) => dispatch(addTodo({ text, priority }))} />

                    <Select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))} sx={{ marginBottom: "10px" }}>
                        <MenuItem value="date">Sort by Date</MenuItem>
                        <MenuItem value="priority">Sort by Priority</MenuItem>
                    </Select>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="todoList">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {sortedTodos.map((todo, index) => (
                                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <TodoItem 
                                                        todo={todo} 
                                                        remove={() => dispatch(removeTodo(todo.id))} 
                                                        toggle={() => dispatch(toggleTodo(todo.id))} 
                                                        editTodo={(id, newText) => dispatch(editTodo({ id, newText }))}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <Typography variant="h5" component="h5" sx={{ display: "flex", marginTop: "10px", justifyContent: "space-between" }}>
                        {sortedTodos.length} task{sortedTodos.length !== 1 && "s"} left
                        <span>
                            {FILTER_NAMES.map((name) => (
                                <FilterBtn key={name} name={name} isPressed={name === filter} setFilter={() => dispatch(setFilter(name))} />
                            ))}
                        </span>
                    </Typography>
                </List>
            </Box>
        </ThemeProvider>
    );
}
