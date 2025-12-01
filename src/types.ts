// Type definitions for Habit Tracker

export interface Habit {
    id: number;
    name: string;
    goal: number;
    checks: boolean[];
}

export interface WeeklyData {
    completed: number;
    goal: number;
    left: number;
    percentage: number;
}

export interface OverallData {
    completed: number;
    goal: number;
    percentage: number;
}

export interface TopHabit {
    id: number;
    name: string;
    progress: number;
}
