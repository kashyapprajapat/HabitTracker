import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import useHabitStore from '../store/store';


// Fix the Default Daily to user choice 

function AddHabit() {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily");

  
   const {habits,addHabit} = useHabitStore();

   console.log(habits);
   const handleSubmit = (e:React.FormEvent)=>{
       e.preventDefault();
       if(name.trim()){
        addHabit(name,frequency);
       }
   };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <TextField label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter Habit Name'
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Frequancy</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={frequency}
            label="Frequancy"
            onChange={(e) => setFrequency(e.target.value as "Daily" | "Weekly")}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type='submit' variant='contained' color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  )
}

export default AddHabit