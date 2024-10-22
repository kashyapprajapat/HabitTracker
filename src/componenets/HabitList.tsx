import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import useHabitStore, { Habit } from '../store/store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const HabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  const todayDate = new Date().toISOString().split('T')[0];

  // Calculate the streak for a given habit
  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      if (habit.completedDates.includes(currentDate.toISOString().split('T')[0])) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  // Calculate Total Habits
  const totalHabits = habits.length;

  // Calculate Completed Habits for Today
  const completedToday = habits.filter((habit) =>
    habit.completedDates.includes(todayDate)
  ).length;

  // Calculate Longest Streak across all habits
  const longestStreak = habits.reduce((maxStreak, habit) => {
    const streak = getStreak(habit);
    return streak > maxStreak ? streak : maxStreak;
  }, 0);

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
                <Button
                  variant="outlined"
                  color={habit.completedDates.includes(todayDate) ? 'success' : 'primary'}
                  startIcon={<CheckCircleIcon />}
                  onClick={() => toggleHabit(habit.id, todayDate)}
                >
                  {habit.completedDates.includes(todayDate) ? 'Completed' : 'Mark Completed'}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => removeHabit(habit.id)}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography>Current Streak: {getStreak(habit)}</Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
              sx={{ mt: 1 }}
            />
          </Box>
        </Paper>
      ))}
        <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h5">Habit Statistics  <QueryStatsIcon/></Typography>
        <Typography>Total Habits: {totalHabits}</Typography>
        <Typography>Completed Today: {completedToday}</Typography>
        <Typography>Longest Streak: {longestStreak} Days</Typography>
      </Paper>
    </Box>
  );
};

export default HabitList;
