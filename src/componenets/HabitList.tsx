import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import useHabitStore from '../store/store';
import  CheckCircleIcon from '@mui/icons-material/CheckCircle';
import  DeleteIcon from '@mui/icons-material/Delete';


const HabitList = () => {
  const { habits, removeHabit,toggleHabit } = useHabitStore();

  const todaydate = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined"
                 color={
                    habit.completedDates.includes(todaydate) ? "sucess" : "primary"
                 }
                 startIcon={<CheckCircleIcon/>}
                 onClick={()=> toggleHabit(habit.id,todaydate)}

                 >
                    {
                        habit.completedDates.includes(todaydate) ? "Completed" : "Mark Completed"
                    }
                </Button>
                <Button variant="outlined" color='error' startIcon={<DeleteIcon/>} onClick={()=> removeHabit(habit.id)}>Remove</Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
