import { useState, useEffect } from 'react';
import { RefreshCw, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import type { Habit } from './types';

export default function HabitTracker() {
    // Load saved data from localStorage or use defaults
    const loadSavedData = () => {
        try {
            const savedHabits = localStorage.getItem('habitTracker_habits');
            const savedMonth = localStorage.getItem('habitTracker_month');
            const savedYear = localStorage.getItem('habitTracker_year');

            return {
                habits: savedHabits ? JSON.parse(savedHabits) as Habit[] : [
                    { id: 1, name: "Wake Up at Same Time", goal: 31, checks: Array(31).fill(false) },
                    { id: 2, name: "Make Your Bed", goal: 31, checks: Array(31).fill(false) },
                    { id: 3, name: "Morning Walk", goal: 31, checks: Array(31).fill(false) },
                    { id: 4, name: "Breakfast As Per Diet Plan", goal: 28, checks: Array(31).fill(false) },
                    { id: 5, name: "Read 5 Page (Book)", goal: 150, checks: Array(31).fill(false) },
                    { id: 6, name: "Review To-Do List", goal: 50, checks: Array(31).fill(false) },
                    { id: 7, name: "Drink 6-8 Water Glasses", goal: 186, checks: Array(31).fill(false) },
                    { id: 8, name: "Meditation 10 Mins", goal: 310, checks: Array(31).fill(false) },
                    { id: 9, name: "No Junk Food", goal: 31, checks: Array(31).fill(false) },
                    { id: 10, name: "Get Sunlight 5-10 Mins", goal: 155, checks: Array(31).fill(false) },
                    { id: 11, name: "Write Journal", goal: 31, checks: Array(31).fill(false) },
                    { id: 12, name: "Limit Screen Time", goal: 62, checks: Array(31).fill(false) },
                    { id: 13, name: "Daily Prayers", goal: 155, checks: Array(31).fill(false) },
                    { id: 14, name: "Clean Your Room", goal: 30, checks: Array(31).fill(false) },
                    { id: 15, name: "Prepare Tomorrow's Plan", goal: 10, checks: Array(31).fill(false) },
                    { id: 16, name: "Review Your Day", goal: 10, checks: Array(31).fill(false) },
                    { id: 17, name: "No Screen 1 Hour Before Bed", goal: 31, checks: Array(31).fill(false) },
                    { id: 18, name: "Sleep At Same Time", goal: 31, checks: Array(31).fill(false) }
                ] as Habit[],
                month: savedMonth || "May",
                year: savedYear || "2025"
            };
        } catch (error) {
            console.error('Error loading saved data:', error);
            return {
                habits: [
                    { id: 1, name: "Wake Up at Same Time", goal: 31, checks: Array(31).fill(false) },
                    { id: 2, name: "Make Your Bed", goal: 31, checks: Array(31).fill(false) },
                    { id: 3, name: "Morning Walk", goal: 31, checks: Array(31).fill(false) },
                    { id: 4, name: "Breakfast As Per Diet Plan", goal: 28, checks: Array(31).fill(false) },
                    { id: 5, name: "Read 5 Page (Book)", goal: 150, checks: Array(31).fill(false) },
                    { id: 6, name: "Review To-Do List", goal: 50, checks: Array(31).fill(false) },
                    { id: 7, name: "Drink 6-8 Water Glasses", goal: 186, checks: Array(31).fill(false) },
                    { id: 8, name: "Meditation 10 Mins", goal: 310, checks: Array(31).fill(false) },
                    { id: 9, name: "No Junk Food", goal: 31, checks: Array(31).fill(false) },
                    { id: 10, name: "Get Sunlight 5-10 Mins", goal: 155, checks: Array(31).fill(false) },
                    { id: 11, name: "Write Journal", goal: 31, checks: Array(31).fill(false) },
                    { id: 12, name: "Limit Screen Time", goal: 62, checks: Array(31).fill(false) },
                    { id: 13, name: "Daily Prayers", goal: 155, checks: Array(31).fill(false) },
                    { id: 14, name: "Clean Your Room", goal: 30, checks: Array(31).fill(false) },
                    { id: 15, name: "Prepare Tomorrow's Plan", goal: 10, checks: Array(31).fill(false) },
                    { id: 16, name: "Review Your Day", goal: 10, checks: Array(31).fill(false) },
                    { id: 17, name: "No Screen 1 Hour Before Bed", goal: 31, checks: Array(31).fill(false) },
                    { id: 18, name: "Sleep At Same Time", goal: 31, checks: Array(31).fill(false) }
                ] as Habit[],
                month: "May",
                year: "2025"
            };
        }
    };

    const savedData = loadSavedData();
    const [habits, setHabits] = useState<Habit[]>(savedData.habits);
    const [month, setMonth] = useState(savedData.month);
    const [year, setYear] = useState(savedData.year);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editGoal, setEditGoal] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");
    const [newHabitGoal, setNewHabitGoal] = useState("");

    // Save to localStorage whenever habits, month, or year change
    useEffect(() => {
        try {
            localStorage.setItem('habitTracker_habits', JSON.stringify(habits));
        } catch (error) {
            console.error('Error saving habits:', error);
        }
    }, [habits]);

    useEffect(() => {
        try {
            localStorage.setItem('habitTracker_month', month);
            localStorage.setItem('habitTracker_year', year);
        } catch (error) {
            console.error('Error saving calendar settings:', error);
        }
    }, [month, year]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const weeks = ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5'];

    const getDaysInMonth = () => {
        const monthIndex = months.indexOf(month);
        const yearNum = parseInt(year);
        return new Date(yearNum, monthIndex + 1, 0).getDate();
    };

    const getStartDayOfWeek = () => {
        const monthIndex = months.indexOf(month);
        const yearNum = parseInt(year);
        return new Date(yearNum, monthIndex, 1).getDay();
    };

    const daysInMonth = getDaysInMonth();
    const startDayOfWeek = getStartDayOfWeek();

    const toggleCheck = (habitId: number, day: number) => {
        setHabits(habits.map((h: Habit) =>
            h.id === habitId
                ? { ...h, checks: h.checks.map((c: boolean, i: number) => i === day ? !c : c) }
                : h
        ));
    };

    const getCompleted = (habit: Habit) => {
        return habit.checks.slice(0, daysInMonth).filter(Boolean).length;
    };

    const getProgress = (habit: Habit) => {
        const completed = getCompleted(habit);
        return Math.round((completed / habit.goal) * 100);
    };

    const getDailyTotal = (day: number) => {
        return habits.filter((h: Habit) => h.checks[day]).length;
    };

    const getWeeklyData = (weekIndex: number) => {
        const startDay = weekIndex * 7;
        const endDay = Math.min(startDay + 7, daysInMonth);
        const daysInWeek = endDay - startDay;

        let completed = 0;
        for (let day = startDay; day < endDay; day++) {
            completed += getDailyTotal(day);
        }

        const goal = habits.length * daysInWeek;
        const percentage = goal > 0 ? Math.round((completed / goal) * 100) : 0;

        return {
            completed,
            goal,
            left: goal - completed,
            percentage
        };
    };

    const changeMonth = (newMonth: string, newYear: string) => {
        setMonth(newMonth);
        setYear(newYear);

        const monthIndex = months.indexOf(newMonth);
        const yearNum = parseInt(newYear);
        const newDaysInMonth = new Date(yearNum, monthIndex + 1, 0).getDate();

        setHabits(habits.map((h: Habit) => ({
            ...h,
            checks: [...h.checks.slice(0, newDaysInMonth), ...Array(Math.max(0, 31 - newDaysInMonth)).fill(false)]
        })));
    };

    const resetAll = () => {
        if (window.confirm('Are you sure you want to reset all checkboxes?')) {
            setHabits(habits.map((h: Habit) => ({ ...h, checks: Array(31).fill(false) })));
        }
    };

    const startEdit = (habit: Habit) => {
        setEditingId(habit.id);
        setEditName(habit.name);
        setEditGoal(habit.goal.toString());
    };

    const saveEdit = () => {
        if (editingId && editName.trim() && editGoal.trim()) {
            setHabits(habits.map((h: Habit) =>
                h.id === editingId
                    ? { ...h, name: editName, goal: parseInt(editGoal) }
                    : h
            ));
            cancelEdit();
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName("");
        setEditGoal("");
    };

    const deleteHabit = (id: number) => {
        if (window.confirm('Are you sure you want to delete this habit?')) {
            setHabits(habits.filter((h: Habit) => h.id !== id));
        }
    };

    const addNewHabit = () => {
        if (newHabitName.trim() && newHabitGoal.trim()) {
            const newId = Math.max(...habits.map((h: Habit) => h.id), 0) + 1;
            setHabits([...habits, {
                id: newId,
                name: newHabitName,
                goal: parseInt(newHabitGoal),
                checks: Array(31).fill(false)
            }]);
            setShowAddForm(false);
            setNewHabitName("");
            setNewHabitGoal("");
        }
    };

    const calculateOverall = () => {
        let totalCompleted = 0;
        let totalGoal = 0;

        habits.forEach((habit: Habit) => {
            totalCompleted += getCompleted(habit);
            totalGoal += habit.goal;
        });

        const percentage = totalGoal > 0 ? Math.round((totalCompleted / totalGoal) * 100) : 0;

        return {
            completed: totalCompleted,
            goal: totalGoal,
            percentage
        };
    };

    const overall = calculateOverall();

    const getTopHabits = () => {
        return habits
            .map((habit: Habit) => ({
                id: habit.id,
                name: habit.name,
                progress: getProgress(habit)
            }))
            .sort((a, b) => b.progress - a.progress)
            .slice(0, 10);
    };

    const topHabits = getTopHabits();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
            <div className="max-w-[1600px] mx-auto space-y-4">
                <div className="grid grid-cols-12 gap-4">
                    {/* Title */}
                    <div className="col-span-2 bg-white border-4 border-black p-4 flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">HABIT TRACKER</h1>
                        <p className="text-sm">- {month} -</p>
                    </div>

                    {/* Daily Progress Chart */}
                    <div className="col-span-7 bg-white border-2 border-gray-300 p-4">
                        <div className="text-sm font-bold mb-2 text-center">Daily Completion Progress</div>
                        <div className="h-32 flex items-end justify-around gap-1">
                            {[...Array(daysInMonth)].map((_, i) => {
                                const total = getDailyTotal(i);
                                const height = habits.length > 0 ? (total / habits.length) * 100 : 0;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center justify-end">
                                        <div
                                            className="w-full bg-green-400 rounded-t transition-all"
                                            style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-gray-600">
                            <span>0.0%</span>
                            <span>25.0%</span>
                            <span>50.0%</span>
                            <span>75.0%</span>
                            <span>100.0%</span>
                        </div>
                    </div>

                    {/* Overall Progress Donut */}
                    <div className="col-span-3 bg-green-200 border-2 border-gray-300 p-4">
                        <div className="text-center font-bold mb-2">OVERVIEW DAILY PROGRESS</div>
                        <div className="flex items-center justify-center">
                            <div className="relative w-24 h-24">
                                <svg className="transform -rotate-90 w-24 h-24">
                                    <circle cx="48" cy="48" r="40" fill="none" stroke="#FED7AA" strokeWidth="16" />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        fill="none"
                                        stroke="#86EFAC"
                                        strokeWidth="16"
                                        strokeDasharray={`${overall.percentage * 2.51} 251`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-xs">
                                    <div className="font-bold">COMPLETED</div>
                                    <div>{overall.percentage}%</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-center mt-2">
                            <div>LEFT</div>
                            <div>{100 - overall.percentage}%</div>
                        </div>
                    </div>
                </div>

                {/* Calendar Settings */}
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-2 bg-green-200 border-2 border-gray-300 p-3">
                        <div className="font-bold text-sm mb-2">CALENDAR SETTINGS</div>
                        <div className="space-y-2 text-xs">
                            <div>
                                <label className="block mb-1">YEAR</label>
                                <input
                                    type="number"
                                    value={year}
                                    onChange={(e) => changeMonth(month, e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                    min="2020"
                                    max="2030"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">MONTH</label>
                                <select
                                    value={month}
                                    onChange={(e) => changeMonth(e.target.value, year)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                >
                                    {months.map((m: string) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-7"></div>

                    <div className="col-span-3 bg-green-200 border-2 border-gray-300 p-3">
                        <div className="font-bold text-sm text-center mb-2">TOP 10 DAILY HABITS</div>
                        <div className="space-y-1 text-xs">
                            {topHabits.map((habit, idx: number) => (
                                <div key={habit.id} className="flex items-center gap-2">
                                    <span className="font-bold w-4">{idx + 1}</span>
                                    <span className="flex-1 truncate">{habit.name}</span>
                                    <span className="font-bold">- {habit.progress}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Overview and Weekly Stats */}
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-2 bg-green-200 border-2 border-gray-300 p-3">
                        <div className="font-bold text-center mb-3">OVERVIEW</div>
                        <div className="text-xs">
                            <div className="mb-4">
                                <div className="font-bold mb-1">WEEKLY PROGRESS BY GRAPH</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-10 bg-white border-2 border-gray-300">
                        <div className="grid grid-cols-5 h-full">
                            {weeks.map((week, weekIdx) => {
                                const weekData = getWeeklyData(weekIdx);
                                const bgColor = weekIdx === 0 ? 'bg-red-200' : weekIdx === 1 ? 'bg-purple-200' : weekIdx === 2 ? 'bg-blue-200' : weekIdx === 3 ? 'bg-blue-300' : 'bg-yellow-200';
                                const startDay = weekIdx * 7;

                                if (startDay >= daysInMonth) return null;

                                return (
                                    <div key={week} className={`${bgColor} border-r border-gray-300 last:border-r-0 p-2`}>
                                        <div className="font-bold text-center text-sm mb-2">{week}</div>
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {[...Array(7)].map((_, dayIdx) => {
                                                const actualDay = weekIdx * 7 + dayIdx;
                                                if (actualDay >= daysInMonth) return <div key={dayIdx}></div>;
                                                const dayOfWeek = (startDayOfWeek + actualDay) % 7;
                                                return (
                                                    <div key={dayIdx} className="text-center">
                                                        <div className="text-xs font-bold">{daysOfWeek[dayOfWeek]}</div>
                                                        <div className="text-xs">{actualDay + 1}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="h-20 bg-white border border-gray-300 mb-2 rounded overflow-hidden relative">
                                            <div className="absolute inset-0 flex flex-col">
                                                <div
                                                    className="w-full bg-green-400 transition-all"
                                                    style={{ height: `${weekData.percentage}%`, minHeight: weekData.percentage > 0 ? '4px' : '0' }}
                                                />
                                                <div className="flex-1 bg-red-300" />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-2xl font-bold text-gray-700 drop-shadow">{weekData.percentage}%</div>
                                            </div>
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <div className="flex justify-between">
                                                <span>COMPLETED</span>
                                                <span className="font-bold">{weekData.completed}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>GOAL</span>
                                                <span className="font-bold">{weekData.goal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>LEFT</span>
                                                <span className="font-bold">{weekData.left}</span>
                                            </div>
                                            <div className="text-center font-bold text-sm border-t border-gray-400 pt-1">
                                                {weekData.completed}/{weekData.goal}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Habit Grid */}
                <div className="bg-white border-2 border-gray-300 overflow-x-auto">
                    <div className="flex justify-end p-2 border-b-2 border-gray-300">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Habit
                        </button>
                    </div>

                    {showAddForm && (
                        <div className="bg-yellow-50 border-b-2 border-yellow-300 p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={newHabitName}
                                        onChange={(e) => setNewHabitName(e.target.value)}
                                        placeholder="Enter habit name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div className="w-32">
                                    <input
                                        type="number"
                                        value={newHabitGoal}
                                        onChange={(e) => setNewHabitGoal(e.target.value)}
                                        placeholder="Goal"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <button
                                    onClick={addNewHabit}
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors"
                                    title="Save"
                                >
                                    <Save className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setNewHabitName("");
                                        setNewHabitGoal("");
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                                    title="Cancel"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="bg-green-200 border-r border-gray-300 p-2 sticky left-0 z-10 w-8">#</th>
                                <th className="bg-green-200 border-r border-gray-300 p-2 sticky left-8 z-10 min-w-[180px] text-left">DAILY HABITS</th>
                                <th className="bg-green-200 border-r border-gray-300 p-2 sticky left-[228px] z-10 w-16">GOALS</th>
                                {weeks.map((week, weekIdx) => (
                                    <th key={week} colSpan={7} className={`${weekIdx === 0 ? 'bg-red-200' : weekIdx === 1 ? 'bg-purple-200' : weekIdx === 2 ? 'bg-blue-200' : weekIdx === 3 ? 'bg-blue-300' : 'bg-yellow-200'} border-r border-gray-300 p-2`}>
                                        {week}
                                    </th>
                                ))}
                                <th className="bg-green-200 border-r border-gray-300 p-2 w-20">COMPLETED</th>
                                <th className="bg-green-200 p-2 w-24">PROGRESS</th>
                            </tr>
                            <tr className="border-b border-gray-300">
                                <th className="bg-green-200 border-r border-gray-300 sticky left-0 z-10"></th>
                                <th className="bg-green-200 border-r border-gray-300 sticky left-8 z-10"></th>
                                <th className="bg-green-200 border-r border-gray-300 sticky left-[228px] z-10"></th>
                                {[...Array(daysInMonth)].map((_, i) => {
                                    const dayOfWeek = (startDayOfWeek + i) % 7;
                                    return (
                                        <th key={i} className="border-r border-gray-300 p-1 font-normal">
                                            <div className="text-center">
                                                <div className="text-xs">{daysOfWeek[dayOfWeek]}</div>
                                                <div className="font-bold">{i + 1}</div>
                                            </div>
                                        </th>
                                    );
                                })}
                                <th className="bg-green-200 border-r border-gray-300"></th>
                                <th className="bg-green-200"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {habits.map((habit: Habit) => {
                                const completed = getCompleted(habit);
                                const progress = getProgress(habit);
                                const isEditing = editingId === habit.id;

                                return (
                                    <tr key={habit.id} className="border-b border-gray-300 hover:bg-gray-50">
                                        <td className="bg-green-200 border-r border-gray-300 p-2 text-center font-bold sticky left-0 z-10">{habit.id}</td>
                                        <td className="bg-green-200 border-r border-gray-300 p-2 sticky left-8 z-10">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-between gap-2">
                                                    <span>{habit.name}</span>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => startEdit(habit)}
                                                            className="p-1 hover:bg-green-300 rounded transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteHabit(habit.id)}
                                                            className="p-1 hover:bg-red-300 rounded transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="bg-green-200 border-r border-gray-300 p-2 text-center font-bold sticky left-[228px] z-10">
                                            {isEditing ? (
                                                <div className="flex gap-1 justify-center">
                                                    <input
                                                        type="number"
                                                        value={editGoal}
                                                        onChange={(e) => setEditGoal(e.target.value)}
                                                        className="w-16 px-2 py-1 border border-gray-300 rounded text-xs text-center"
                                                    />
                                                    <button
                                                        onClick={saveEdit}
                                                        className="p-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                                                        title="Save"
                                                    >
                                                        <Save className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="p-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                habit.goal
                                            )}
                                        </td>
                                        {[...Array(daysInMonth)].map((_, day) => (
                                            <td key={day} className="border-r border-gray-300 p-2 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={habit.checks[day] || false}
                                                    onChange={() => toggleCheck(habit.id, day)}
                                                    className="w-4 h-4 cursor-pointer"
                                                />
                                            </td>
                                        ))}
                                        <td className="bg-green-200 border-r border-gray-300 p-2 text-center font-bold">{completed}</td>
                                        <td className="bg-green-200 p-2 text-center">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <span className="font-bold w-12">{progress}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                    <button
                        onClick={resetAll}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
                    >
                        <RefreshCw className="w-5 h-5" />
                        RESET ALL CHECKBOXES
                    </button>
                </div>
            </div>
        </div>
    );
}