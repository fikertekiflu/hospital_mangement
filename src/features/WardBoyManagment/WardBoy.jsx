import React, { useState, useEffect, useCallback } from 'react';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { AlertCircle, Plus, User, Edit, Trash2, Save, RotateCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Utility function for API requests (replace with your actual API URL) ---
const API_BASE_URL = '/api'; // Adjust as needed

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
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (parseError) {
      // If JSON parsing fails, keep the generic message
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

// --- Helper Components ---
const listItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
};

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>License Number</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {doctors.map((doctor) => (
            <motion.tr
              key={doctor.doctor_id}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <TableCell>{doctor.doctor_id}</TableCell>
              <TableCell>{doctor.first_name}</TableCell>
              <TableCell>{doctor.last_name}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.phone_number}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.license_number}</TableCell>
              <TableCell>{doctor.is_active ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(doctor)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(doctor.doctor_id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
};

const DoctorForm = ({ doctor, onSave, onCancel, isSubmitting, error }) => {
  const [systemUserId, setSystemUserId] = useState(doctor?.system_user_id || '');
  const [firstName, setFirstName] = useState(doctor?.first_name || '');
  const [lastName, setLastName] = useState(doctor?.last_name || '');
  const [specialization, setSpecialization] = useState(doctor?.specialization || '');
  const [phoneNumber, setPhoneNumber] = useState(doctor?.phone_number || '');
  const [email, setEmail] = useState(doctor?.email || '');
  const [licenseNumber, setLicenseNumber] = useState(doctor?.license_number || '');
  const [isActive, setIsActive] = useState(doctor?.is_active ?? true);

    const handleSave = async () => {
        const doctorData = {
            system_user_id: systemUserId ? parseInt(systemUserId, 10) : null,
            first_name: firstName,
            last_name: lastName,
            specialization,
            phone_number: phoneNumber,
            email,
            license_number: licenseNumber,
            is_active: isActive
        };
        if(doctor?.doctor_id){
            doctorData.doctor_id = doctor.doctor_id;
        }
        await onSave(doctorData);
    }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <Input
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <Input
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
            Specialization
          </label>
          <Input
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <Input
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional"
            />
          </div>
        <div>
          <label htmlFor="license_number" className="block text-sm font-medium text-gray-700">
            License Number
          </label>
          <Input
            id="license_number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="system_user_id" className="block text-sm font-medium text-gray-700">
          System User ID
        </label>
        <Input
          id="system_user_id"
          value={systemUserId}
          onChange={(e) => setSystemUserId(e.target.value)}
          placeholder="Optional"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Active
        </label>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={isActive}
              onChange={() => setIsActive(true)}
            />
            <span className="text-sm">Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={!isActive}
              onChange={() => setIsActive(false)}
            />
            <span className="text-sm">No</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSubmitting} className="flex items-center gap-2">
          {isSubmitting ? (
            <>
              <RotateCw className="animate-spin h-4 w-4" /> Saving...
            </>
          ) : (
            <><Save className="h-4 w-4" /> Save</>
          )}
        </Button>
      </div>
    </div>
  );
};

const WardBoyManagementPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(); // Or useState(null)
  const token = localStorage.getItem('token'); // Replace with your actual auth token retrieval

  const fetchDoctors = useCallback(async () => {
    if (!token) return;
    setIsSubmitting(true);
    setError(undefined); // or setError(null)
    try {
      const data = await apiRequest('/doctors', 'GET', undefined, token);
      setDoctors(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch doctors');
    } finally {
      setIsSubmitting(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

    const handleCreateDoctor = async (doctorData) => {
        setIsSubmitting(true);
        setError(undefined); // or setError(null)
        try {
            const data = await apiRequest('/doctors', 'POST', doctorData, token);
            // setDoctors(prevDoctors => [...prevDoctors, data]); // Can be simplified if fetchDoctors is called
            setIsDialogOpen(false);
            setEditDoctor(null);
            fetchDoctors(); // Refetch to get the latest list including the new doctor
        } catch (error) {
            setError(error.message || 'Failed to create doctor');
        } finally {
            setIsSubmitting(false);
        }
    };

  const handleUpdateDoctor = async (doctorData) => {
    setIsSubmitting(true);
    setError(undefined); // or setError(null)
    try {
      const { doctor_id, ...updateData } = doctorData;
      const data = await apiRequest(`/doctors/${doctor_id}`, 'PUT', updateData, token);
    //   if(data?.updated){ // This check might be API specific
    //     setDoctors(prevDoctors =>
    //         prevDoctors.map(doctor => doctor.doctor_id === doctor_id ? { ...doctor, ...updateData} : doctor)
    //     );
    //   }
      setIsDialogOpen(false);
      setEditDoctor(null);
      fetchDoctors(); // Refetch to get the updated list
    } catch (err) {
      setError(err.message || 'Failed to update doctor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    setIsSubmitting(true);
    setError(undefined); // or setError(null)
    try {
      await apiRequest(`/doctors/${doctorId}`, 'DELETE', undefined, token);
      // setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor.doctor_id !== doctorId)); // Can be simplified
      setIsDialogOpen(false);
      setEditDoctor(null);
      fetchDoctors(); // Refetch to get the list without the deleted doctor
    } catch (err) {
      setError(err.message || 'Failed to delete doctor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditDoctor = (doctor) => {
    setEditDoctor(doctor);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditDoctor(null);
    setError(undefined); // or setError(null)
  };

  return (
    <div className="p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Doctor Management
          </CardTitle>
          <CardDescription>Manage Doctors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Doctor List</h2>
            <Button onClick={() => { setIsDialogOpen(true); setEditDoctor(null); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Doctor
            </Button>
          </div>
          {isSubmitting && !doctors.length && <div className="text-gray-500">Loading...</div>} {/* Show loading only if doctors not yet loaded */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isSubmitting && doctors.length > 0 ? (
            <DoctorList doctors={doctors} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
          ) : (!isSubmitting && !error) ? (
            <div className="text-gray-500">No doctors found.</div>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editDoctor ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
            <DialogDescription>
              {editDoctor
                ? 'Make changes to the doctor details below.'
                : 'Create a new doctor.'}
            </DialogDescription>
          </DialogHeader>
          <DoctorForm
            doctor={editDoctor || undefined} // Pass undefined for new doctor
            onSave={editDoctor ? handleUpdateDoctor : handleCreateDoctor}
            onCancel={handleCancel}
            isSubmitting={isSubmitting} // Pass submitting state for the form
            error={error} // Pass error state for the form
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WardBoyManagementPage;