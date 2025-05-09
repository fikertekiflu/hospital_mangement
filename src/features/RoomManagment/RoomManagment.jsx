// src/pages/RoomManagementPage.jsx
import React, { useState, useEffect, useCallback } from 'react';

// Corrected individual imports based on your provided snippet
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter, // Not used directly in the provided RoomForm
  DialogHeader,
  DialogTitle,
  // DialogTrigger, // Not used directly
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';

import {
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Save,
  RotateCw,
  ListChecks,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils'; // Adjust path as needed
import { motion, AnimatePresence } from 'framer-motion';

// --- API Request Utility ---
const API_BASE_URL = '/api'; // Adjust if your API base URL is different

const apiRequest = async (endpoint, method, data, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (parseError) {
      // If JSON parsing fails, use the HTTP error message
    }
    throw new Error(errorMessage);
  }
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return { success: true };
  }
  return await response.json();
};

// --- Constants ---
const ROOM_TYPES = [
  'Private',
  'Semi-Private',
  'General Ward',
  'ICU',
  'NICU',
  'Operating Theatre',
  'Recovery Room',
  'Emergency Room',
  'Consultation Room',
  'Utility',
  'Storage',
  'Office',
];

const listItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

// --- Helper Components ---

const RoomList = ({ rooms, onEdit, onDelete, isLoading }) => {
  if (isLoading && rooms.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <RotateCw className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2 text-gray-500">Loading rooms...</p>
      </div>
    );
  }

  if (!isLoading && rooms.length === 0) {
    return <div className="text-center py-10 text-gray-500">No rooms found. Try adjusting your filters.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room No.</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="min-w-[150px]">Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {rooms.map((room) => (
              <motion.tr
                key={room.room_id}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <TableCell>{room.room_number}</TableCell>
                <TableCell>{room.room_type}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.current_occupancy}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      room.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    )}
                  >
                    {room.is_active ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'px-2 py-1 text-xs font-semibold rounded-full',
                      room.is_available
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    )}
                  >
                    {room.is_available ? 'Yes' : 'No'}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600 truncate max-w-xs" title={room.notes || ''}>
                  {room.notes || '-'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(room)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(room.room_id, room.room_number, room.current_occupancy)}
                      disabled={room.current_occupancy > 0}
                      title={room.current_occupancy > 0 ? "Cannot delete occupied room" : "Delete Room"}
                    >
                      <Trash2 className={cn("h-4 w-4", room.current_occupancy > 0 ? "text-gray-400" : "text-red-500")} />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
};

const RoomForm = ({ room, onSave, onCancel, isSubmitting, formError, clearFormError }) => {
  const [formData, setFormData] = useState({
    room_number: room?.room_number || '',
    room_type: room?.room_type || ROOM_TYPES[0],
    capacity: room?.capacity?.toString() || '1', // Ensure capacity is string for input
    notes: room?.notes || '',
    is_active: room?.is_active ?? true,
  });

  useEffect(() => {
    if (room) {
      setFormData({
        room_number: room.room_number || '',
        room_type: room.room_type || ROOM_TYPES[0],
        capacity: room.capacity?.toString() || '1',
        notes: room.notes || '',
        is_active: room.is_active ?? true,
      });
    } else {
      setFormData({
        room_number: '',
        room_type: ROOM_TYPES[0],
        capacity: '1',
        notes: '',
        is_active: true, // Default for new rooms
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearFormError();
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    clearFormError();
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (name, value) => {
    clearFormError();
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      capacity: parseInt(formData.capacity, 10),
      // is_active is already in formData
    };
    // No need to add room_id here, it's handled by the distinction in onSave (PUT vs POST)
    await onSave(dataToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <div>
        <label htmlFor="room_number" className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
        <Input
          id="room_number"
          name="room_number"
          value={formData.room_number}
          onChange={handleChange}
          required
          placeholder="e.g., 101A"
        />
      </div>
      <div>
        <label htmlFor="room_type" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
        <Select
          name="room_type"
          value={formData.room_type}
          onValueChange={(value) => handleSelectChange('room_type', value)}
        >
          <SelectTrigger id="room_type">
            <SelectValue placeholder="Select room type" />
          </SelectTrigger>
          <SelectContent>
            {ROOM_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          required
          min="1"
          placeholder="e.g., 2"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <Input
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any specific notes about the room"
        />
      </div>
      {/* MODIFICATION: 'is_active' field is now always visible */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Active</label>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="is_active"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.is_active === true}
              onChange={() => handleRadioChange('is_active', true)}
            />
            <span className="text-sm">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="is_active"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.is_active === false}
              onChange={() => handleRadioChange('is_active', false)}
            />
            <span className="text-sm">No</span>
          </label>
        </div>
        {!room && (
            <p className="text-xs text-gray-500 mt-1">
                Note: New rooms are created as 'Active' by default on the backend.
                To create an inactive room, backend modifications are required.
            </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="min-w-[100px]">
          {isSubmitting ? (
            <RotateCw className="animate-spin h-4 w-4 mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {room ? 'Save Changes' : 'Create Room'}
        </Button>
      </div>
    </form>
  );
};


// --- Main Component ---
const RoomManagementPage = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageError, setPageError] = useState(null);
  const [formError, setFormError] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    room_type: '',
    is_active: '',
    only_available: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const token = localStorage.getItem('token');

  const fetchRooms = useCallback(async () => {
    if (!token) {
        setPageError("Authentication token not found. Please log in.");
        return;
    }
    setIsLoading(true);
    setPageError(null);
    try {
      const queryParams = new URLSearchParams();
      if (filters.room_type) queryParams.append('room_type', filters.room_type);
      if (filters.is_active !== '') queryParams.append('is_active', filters.is_active);
      if (filters.only_available === 'true') queryParams.append('only_available', 'true');

      const endpoint = `/rooms?${queryParams.toString()}`;
      const data = await apiRequest(endpoint, 'GET', undefined, token);
      setRooms(data || []);
    } catch (err) {
      setPageError(err.message || 'Failed to fetch rooms.');
      setRooms([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, filters]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleOpenDialog = (room = null) => {
    setCurrentRoom(room);
    setFormError(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentRoom(null);
    setFormError(null);
  };

  const handleSaveRoom = async (roomData) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      if (currentRoom?.room_id) { // Update
        // For updates, room_id is part of currentRoom, not roomData from form.
        // The data sent to PUT should not contain room_id in its body.
        const { ...updateData } = roomData; // roomData here includes is_active
        await apiRequest(`/rooms/${currentRoom.room_id}`, 'PUT', updateData, token);
      } else { // Create
        // roomData for POST can include is_active if backend is modified to use it.
        // Current backend model for create hardcodes is_active=TRUE.
        await apiRequest('/rooms', 'POST', roomData, token);
      }
      handleCloseDialog();
      fetchRooms();
    } catch (err) {
      setFormError(err.message || `Failed to ${currentRoom ? 'update' : 'create'} room.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRoom = async (roomId, roomNumber, currentOccupancy) => {
    if (currentOccupancy > 0) {
        setPageError(`Cannot delete room ${roomNumber} as it is currently occupied. Please discharge patients first.`);
        // Clear the error after a few seconds
        setTimeout(() => setPageError(null), 5000);
        return;
    }
    if (window.confirm(`Are you sure you want to delete room ${roomNumber || roomId}? This action cannot be undone.`)) {
      setIsLoading(true);
      setPageError(null);
      try {
        await apiRequest(`/rooms/${roomId}`, 'DELETE', undefined, token);
        fetchRooms();
      } catch (err) {
        setPageError(err.message || 'Failed to delete room.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({ room_type: '', is_active: '', only_available: '' });
  };


  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-blue-600" /> Room Management
            </CardTitle>
            <CardDescription>View, add, edit, and manage hospital rooms.</CardDescription>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} title="Toggle Filters" className="flex-1 sm:flex-none">
                <SlidersHorizontal className="h-4 w-4 mr-0 md:mr-2"/> <span className="hidden md:inline">Filters</span>
            </Button>
            <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
              <Plus className="h-4 w-4 mr-2" /> Add Room
            </Button>
          </div>
        </CardHeader>
        <AnimatePresence>
        {showFilters && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <CardContent className="border-t pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                        <div>
                            <label htmlFor="filter_room_type" className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                            <Select value={filters.room_type} onValueChange={(value) => handleFilterChange('room_type', value)}>
                                <SelectTrigger id="filter_room_type">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Types</SelectItem>
                                    {ROOM_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="filter_is_active" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <Select value={filters.is_active} onValueChange={(value) => handleFilterChange('is_active', value)}>
                                <SelectTrigger id="filter_is_active">
                                    <SelectValue placeholder="Any Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Any Status</SelectItem>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="filter_only_available" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                            <Select value={filters.only_available} onValueChange={(value) => handleFilterChange('only_available', value)}>
                                <SelectTrigger id="filter_only_available">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All (Occupied & Available)</SelectItem>
                                    <SelectItem value="true">Only Available</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button variant="ghost" onClick={clearFilters} className="w-full lg:w-auto">
                            <X className="h-4 w-4 mr-2" /> Clear Filters
                        </Button>
                    </div>
                </CardContent>
            </motion.div>
        )}
        </AnimatePresence>
        <CardContent className={cn("pt-4", showFilters ? "border-t" : "border-t" )}> {/* Ensure consistent top padding/border */}
          {pageError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{pageError}</AlertDescription>
            </Alert>
          )}
          <RoomList rooms={rooms} onEdit={handleOpenDialog} onDelete={handleDeleteRoom} isLoading={isLoading} />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) handleCloseDialog(); else setIsDialogOpen(true); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
            <DialogDescription>
              {currentRoom ? 'Update the details of this room.' : 'Enter the details for the new room.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RoomForm
              room={currentRoom}
              onSave={handleSaveRoom}
              onCancel={handleCloseDialog}
              isSubmitting={isSubmitting}
              formError={formError}
              clearFormError={() => setFormError(null)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomManagementPage;