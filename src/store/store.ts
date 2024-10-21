import { create } from "zustand";

export interface Habit {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "Daily" | "Weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
}

const useHabitStore = create<HabitState>()((set, get) => ({
  habits: [],
  addHabit: (name, frequency) =>
    set((state) => ({
      habits: [
        ...state.habits,
        {
          id: Date.now().toString(),
          name,
          frequency,
          completedDates: [],
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    })),
  toggleHabit: (id, date) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedDates: habit.completedDates.includes(date)
                ? habit.completedDates.filter((d) => d !== date)
                : [...habit.completedDates, date],
            }
          : habit
      ),
    })),
}));

export default useHabitStore;
