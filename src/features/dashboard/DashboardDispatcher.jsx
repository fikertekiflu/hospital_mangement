import React, { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import { CalendarIcon, Users, ListChecks } from 'lucide-react';
// import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Mock data for demonstration
const recentAppointments = [
    { id: 1, patientName: 'John Doe', date: '2024-07-28', time: '9:00 AM', status: 'Scheduled' },
    { id: 2, patientName: 'Jane Smith', date: '2024-07-29', time: '10:30 AM', status: 'Completed' },
    { id: 3, patientName: 'Robert Jones', date: '2024-07-29', time: '2:00 PM', status: 'Scheduled' },
    { id: 4, patientName: 'Mary Brown', date: '2024-07-30', time: '11:00 AM', status: 'Cancelled' },
    { id: 5, patientName: 'Michael Davis', date: '2024-07-30', time: '3:30 PM', status: 'Completed' },
];

const treatmentsOverview = [
    { id: 1, treatmentName: 'Physical Therapy', patientCount: 120, revenue: 15000 },
    { id: 2, treatmentName: 'Medication Management', patientCount: 200, revenue: 25000 },
    { id: 3, treatmentName: 'Surgery', patientCount: 50, revenue: 50000 },
    { id: 4, treatmentName: 'Checkup', patientCount: 300, revenue: 30000 },
    { id: 5, treatmentName: 'Counseling', patientCount: 80, revenue: 10000 },
];

// Chart data
const chartData = [
    { name: 'Jan', appointments: 40, revenue: 40000 },
    { name: 'Feb', appointments: 30, revenue: 35000 },
    { name: 'Mar', appointments: 50, revenue: 55000 },
    { name: 'Apr', appointments: 45, revenue: 50000 },
    { name: 'May', appointments: 60, revenue: 65000 },
    { name: 'Jun', appointments: 55, revenue: 60000 },
];

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [userCount, setUserCount] = useState(0); // Mock user count

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setLoading(false);
            setUserCount(250);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-6 space-y-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-800"
            >
                Dashboard
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="bg-white shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-2xl font-bold text-gray-700">Loading...</div>
                            ) : (
                                <div className="text-2xl font-bold text-gray-700">{userCount}</div>
                            )}
                            <p className="text-xs text-gray-500">Number of registered users</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card className="bg-white shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Appointments</CardTitle>
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-700">{recentAppointments.length}</div>
                            <p className="text-xs text-gray-500">Number of appointments in the last week</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card className="bg-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <ListChecks className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-700">$85,000</div>
                        <p className="text-xs text-gray-500">Revenue from treatments this month</p>
                    </CardContent>
                  </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle>Appointment Overview</CardTitle>
                            <CardDescription>Monthly appointment statistics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="appointments" fill="#8884d8" name="Appointments" />
                                    <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle>Treatment Overview</CardTitle>
                            <CardDescription>Most common treatments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Treatment</TableHead>
                                        <TableHead>Patients</TableHead>
                                        <TableHead>Revenue</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {treatmentsOverview.map((treatment) => (
                                        <TableRow key={treatment.id}>
                                            <TableCell>{treatment.treatmentName}</TableCell>
                                            <TableCell>{treatment.patientCount}</TableCell>
                                            <TableCell>${treatment.revenue}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
