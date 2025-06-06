'use client';
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

export default function Players() {
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingPlayerId, setEditingPlayerId] = useState(null);

    const [form, setForm] = useState({
        name: '',
        highSchool: '',
        organisation: '',
        grade: '',
        state: '',
        height: '',
        position: '',
        year: '',
        evaluation: '',
        evaluationDate: dayjs(),
    });

    const [players, setPlayers] = useState([]);
    const [filterGrade, setFilterGrade] = useState('');

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const res = await axios.get('/api/players');
            setPlayers(res.data);
        } catch (error) {
            toast.error("Failed to fetch players");
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newDate) => {
        setForm({ ...form, evaluationDate: newDate });
    };

    const resetForm = () => {
        setForm({
            name: '',
            highSchool: '',
            organisation: '',
            grade: '',
            state: '',
            height: '',
            position: '',
            year: '',
            evaluation: '',
            evaluationDate: dayjs(),
        });
        setIsEditMode(false);
        setEditingPlayerId(null);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...form,
                evaluationDate: form.evaluationDate ? form.evaluationDate.toISOString() : null,
            };

            if (isEditMode && editingPlayerId) {
                await axios.put(`/api/players/${editingPlayerId}`, payload);
                toast.success("Player updated successfully!");
            } else {
                await axios.post('/api/players', payload);
                toast.success("Player added successfully!");
            }

            setOpen(false);
            resetForm();
            fetchPlayers();
        } catch (error) {
            toast.error("Failed to save player");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/players/${id}`);
            toast.success("Player deleted");
            fetchPlayers();
        } catch (error) {
            toast.error("Failed to delete player");
            console.error(error);
        }
    };

    const handleEdit = (player) => {
        setForm({
            name: player.name || '',
            highSchool: player.highSchool || '',
            organisation: player.organisation || '',
            grade: player.grade || '',
            state: player.state || '',
            height: player.height || '',
            position: player.position || '',
            year: player.year || '',
            evaluation: player.evaluation || '',
            evaluationDate: player.evaluationDate ? dayjs(player.evaluationDate) : dayjs(),
        });
        setEditingPlayerId(player._id);
        setIsEditMode(true);
        setOpen(true);
    };

    const filteredPlayers = filterGrade
        ? players.filter(player => player.grade === filterGrade)
        : players;

    const uniqueGrades = [...new Set(players.map(player => player.grade))].filter(Boolean);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Current Players</h1>

                <div className="flex items-center gap-4">
                    <TextField
                        select
                        label="Filter by Grade"
                        value={filterGrade}
                        onChange={(e) => setFilterGrade(e.target.value)}
                        size="small"
                        style={{ minWidth: 150 }}
                    >
                        <MenuItem value="">All Grades</MenuItem>
                        {uniqueGrades.map((grade) => (
                            <MenuItem key={grade} value={grade}>
                                {grade}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            resetForm();
                            setOpen(true);
                        }}
                    >
                        Add New
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">High School</th>
                            <th className="p-2 text-left">Organisation</th>
                            <th className="p-2 text-left">Grade</th>
                            <th className="p-2 text-left">State</th>
                            <th className="p-2 text-left">Height</th>
                            <th className="p-2 text-left">Position</th>
                            <th className="p-2 text-left">Year</th>
                            <th className="p-2 text-left">Evaluation</th>
                            <th className="p-2 text-left">Evaluation Date</th>
                            <th className="p-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.map((player) => (
                            <tr key={player._id} className="border-t">
                                <td className="p-2 flex items-center gap-1">
                                    <AccountCircleIcon />
                                    {player.name}
                                </td>
                                <td className="p-2">{player.highSchool}</td>
                                <td className="p-2">{player.organisation}</td>
                                <td className="p-2">{player.grade}</td>
                                <td className="p-2">{player.state}</td>
                                <td className="p-2">{player.height}</td>
                                <td className="p-2">{player.position}</td>
                                <td className="p-2">{player.year || 'N/A'}</td>
                                <td className="p-2">{player.evaluation || '-'}</td>
                                <td className="p-2">{player.evaluationDate ? dayjs(player.evaluationDate).format('YYYY-MM-DD') : '-'}</td>
                                <td className="p-2 flex gap-2">
                                    <Pencil
                                        className="cursor-pointer text-blue-600"
                                        onClick={() => handleEdit(player)}
                                    />
                                    <Trash2
                                        className="cursor-pointer text-red-600"
                                        onClick={() => handleDelete(player._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Dialog
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        resetForm();
                    }}
                    fullWidth
                    maxWidth="sm"
                    scroll="paper"
                >
                    <DialogTitle className="mt-2 text-lg font-semibold">
                        {isEditMode ? 'Edit Player' : 'Add New Player'}
                    </DialogTitle>

                    <DialogContent
                        dividers
                        className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto"
                    >
                        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
                        <TextField label="High School" name="highSchool" value={form.highSchool} onChange={handleChange} fullWidth />
                        <TextField label="Organisation" name="organisation" value={form.organisation} onChange={handleChange} fullWidth />
                        <TextField label="Grade" name="grade" value={form.grade} onChange={handleChange} fullWidth />
                        <TextField label="State" name="state" value={form.state} onChange={handleChange} fullWidth />
                        <TextField label="Height" name="height" value={form.height} onChange={handleChange} fullWidth />
                        <TextField label="Position" name="position" value={form.position} onChange={handleChange} fullWidth />
                        <TextField
                            select
                            label="Year"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            fullWidth
                        >
                            {[2024, 2025, 2026, 2027].map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Evaluation"
                            name="evaluation"
                            value={form.evaluation}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <DatePicker
                            label="Evaluation Date"
                            value={form.evaluationDate}
                            onChange={handleDateChange}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </DialogContent>

                    <DialogActions className="px-6 pb-4">
                        <Button onClick={() => {
                            setOpen(false);
                            resetForm();
                        }}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>
                            {isEditMode ? 'Update' : 'Save'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}
