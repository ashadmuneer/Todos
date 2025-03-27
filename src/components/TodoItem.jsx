import { ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import dayjs from 'dayjs';

export default function TodoItem({ todo, remove, toggle }) {
    const priorityColors = {
        High: '#ff4d4d',  // Red
        Medium: '#ffa500', // Orange
        Low: '#4caf50'     // Green
    };

    return (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px' }}>
            <IconButton onClick={() => toggle(todo.id)} color={todo.completed ? 'success' : 'default'}>
                {todo.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
            
            <Box sx={{ flex: 1 }}>
                <ListItemText 
                    primary={
                        <Typography sx={{ textDecoration: todo.completed ? 'line-through' : 'none', fontWeight: '500' }}>
                            {todo.text}
                        </Typography>
                    }
                    secondary={
                        <>
                            <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
                                Added: {dayjs(todo.date).format('DD MMM YYYY')}
                            </Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: priorityColors[todo.priority] }}>
                                Priority: {todo.priority}
                            </Typography>
                        </>
                    }
                />
            </Box>

            <IconButton onClick={() => remove(todo.id)} color="error">
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
}
