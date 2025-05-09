import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast'; 

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children} {/* This is where your page content will be rendered */}
      </main>
      <footer className="bg-slate-800 text-slate-300 text-center p-4 text-sm">
        © {new Date().getFullYear()} Hospital Management System. All rights reserved.
      </footer>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
