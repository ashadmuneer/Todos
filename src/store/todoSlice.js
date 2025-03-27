import { createSlice } from "@reduxjs/toolkit";

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"));
    return data || [];
};

const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: getInitialData(),
        filter: "All",
        sortBy: "date",
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: crypto.randomUUID(),
                text: action.payload.text,
                completed: false,
                date: new Date().toISOString(),
                priority: action.payload.priority || "Medium",
            });
            saveToLocalStorage(state.todos);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            saveToLocalStorage(state.todos);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveToLocalStorage(state.todos);
            }
        },
        editTodo: (state, action) => {
            const { id, newText } = action.payload;
            const todo = state.todos.find((t) => t.id === id);
            if (todo) {
                todo.text = newText;
                saveToLocalStorage(state.todos);
            }
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;

            if (action.payload === "priority") {
                const priorityOrder = { High: 1, Medium: 2, Low: 3 };

                state.todos = state.todos.slice().sort((a, b) => {
                    return priorityOrder[a.priority.trim()] - priorityOrder[b.priority.trim()];
                });
            } else if (action.payload === "date") {
                state.todos = state.todos.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            saveToLocalStorage(state.todos);
        },
        reorderTodos: (state, action) => {
            const { sourceIndex, destinationIndex } = action.payload;
            const movedItem = state.todos.splice(sourceIndex, 1)[0];
            state.todos.splice(destinationIndex, 0, movedItem);
            saveToLocalStorage(state.todos);
        },
    },
});

export const { addTodo, removeTodo, toggleTodo, editTodo, setFilter, setSortBy, reorderTodos } = todoSlice.actions;
export default todoSlice.reducer;
