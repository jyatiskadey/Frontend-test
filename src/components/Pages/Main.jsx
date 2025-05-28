// Main.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeList from './EmployeeList';
import EmployeeForm from './Employee';

const Main = () => {
  const [employees, setEmployees] = useState([]);
  const [pageData, setPageData] = useState({ countries: [], states: [] });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchPageLoad();
    fetchEmployees();
  }, []);

  const fetchPageLoad = async () => {
    const res = await axios.get('https://ppm-api.cludocloud.com/Auth/PageLoadForEmployeeDemoProfile');
    setPageData(res.data);
  };

  const fetchEmployees = async () => {
    const res = await axios.get('https://ppm-api.cludocloud.com/Auth/SelectEmployeeDemoProfile');
    setEmployees(res.data);
  };

  const handleSave = async (data) => {
    await axios.post('https://ppm-api.cludocloud.com/Auth/InsertUpdateEmployeeDemoProfile', data);
    fetchEmployees();
    setEditingEmployee(null);
  };

  const handleEdit = async (id) => {
    const res = await axios.post('https://ppm-api.cludocloud.com/Auth/EditEmployeeDemoProfile', { id });
    setEditingEmployee(res.data);
  };

  const handleDelete = async (id) => {
    await axios.post('https://ppm-api.cludocloud.com/Auth/DeleteEmployeeDemoProfile', { id });
    fetchEmployees();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Master</h1>
      <EmployeeForm
        pageData={pageData}
        onSave={handleSave}
        editingEmployee={editingEmployee}
      />
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Main;