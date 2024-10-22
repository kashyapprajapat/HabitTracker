
import { Box, Container, Typography } from '@mui/material';
import './App.css'
import useHabitStore from './store/store';
import AddHabit from './componenets/AddHabit';
import HabitList from './componenets/HabitList';
import AddchartIcon from '@mui/icons-material/Addchart';
function App() {

  const store = useHabitStore();
  console.log(store);
  return (
    <Container>
      <Box>
        <Typography variant='h2' component="h1" gutterBottom align='center'>
            Habit Tracker  <AddchartIcon/>
        </Typography>
        {/* Form */}
        <AddHabit/>
       {/* List */}
       <HabitList/>
        {/* stats */}
      </Box>
    </Container>
  )
}

export default App
