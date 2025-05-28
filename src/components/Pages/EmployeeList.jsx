import React, { useEffect, useState } from 'react';
import { fetchEmployees, deleteEmployee, getEmployeeById, saveEmployee } from '../api/employeeApi';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit modal state
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    ID: '',
    NAME: '',
    EMAIL_ADDRESS: '',
    CONTACT_NUMBER: '',
    GENDER: '',
    DOB: '',
    STATE_CODE: '',
    FATHER_NAME: '',
    MOTHER_NAME: '',
    COUNTRY_CODE: '',
    EMPLOYEE_PROFILE_NAME: '',
    EMPLOYEE_PROFILE_Base64String: '',
  });

  const [saving, setSaving] = useState(false);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data.data['select-employee'] || []);
    } catch (error) {
      alert('Failed to load employees.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await deleteEmployee(id);
      alert('Employee deleted successfully.');
      loadEmployees();
    } catch (error) {
      alert('Failed to delete employee.');
    }
  };

  const openEditModal = async (id) => {
    try {
      const res = await getEmployeeById(id);
      const emp = res.data;

      setEditFormData({
        ID: emp.ID || '',
        NAME: emp.NAME || '',
        EMAIL_ADDRESS: emp.EMAIL_ADDRESS || '',
        CONTACT_NUMBER: emp.CONTACT_NUMBER || '',
        GENDER: emp.GENDER || '',
        DOB: emp.DOB || '',
        STATE_CODE: emp.STATE_CODE || '',
        FATHER_NAME: emp.FATHER_NAME || '',
        MOTHER_NAME: emp.MOTHER_NAME || '',
        COUNTRY_CODE: emp.COUNTRY_CODE || '',
        EMPLOYEE_PROFILE_NAME: emp.EMPLOYEE_PROFILE_NAME || '',
        EMPLOYEE_PROFILE_Base64String: emp.EMPLOYEE_PROFILE_Base64String || '',
      });

      setEditingEmployee(id);
    } catch (error) {
      alert('Failed to load employee details.');
    }
  };

  const closeEditModal = () => {
    setEditingEmployee(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveEmployee(editFormData);
      alert('Employee updated successfully.');
      setEditingEmployee(null);
      loadEmployees();
    } catch {
      alert('Failed to save employee.');
    }
    setSaving(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employee List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading employees...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Full Name</th>
                <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Contact</th>
                <th className="py-3 px-6 text-left text-gray-600 font-medium uppercase tracking-wider">Gender</th>
                <th className="py-3 px-6 text-center text-gray-600 font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">No employees found.</td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp.ID} className="hover:bg-gray-50 border-t border-gray-200">
                    <td className="py-4 px-6">{emp.NAME}</td>
                    <td className="py-4 px-6">{emp.EMAIL_ADDRESS}</td>
                    <td className="py-4 px-6">{emp.CONTACT_NUMBER}</td>
                    <td className="py-4 px-6">{emp.GENDER}</td>
                    <td className="py-4 px-6 flex justify-center space-x-4">
                      <button
                        onClick={() => openEditModal(emp.ID)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        aria-label={`Edit ${emp.NAME}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.ID)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        aria-label={`Delete ${emp.NAME}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>

            <label className="block mb-2">
              <span className="text-gray-700">Full Name</span>
              <input
                type="text"
                name="NAME"
                value={editFormData.NAME}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                name="EMAIL_ADDRESS"
                value={editFormData.EMAIL_ADDRESS}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Contact Number</span>
              <input
                type="text"
                name="CONTACT_NUMBER"
                value={editFormData.CONTACT_NUMBER}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Gender</span>
              <select
                name="GENDER"
                value={editFormData.GENDER}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Date of Birth</span>
              <input
                type="date"
                name="DOB"
                value={editFormData.DOB}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">State Code</span>
              <input
                type="text"
                name="STATE_CODE"
                value={editFormData.STATE_CODE}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Father's Name</span>
              <input
                type="text"
                name="FATHER_NAME"
                value={editFormData.FATHER_NAME}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Mother's Name</span>
              <input
                type="text"
                name="MOTHER_NAME"
                value={editFormData.MOTHER_NAME}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Country Code</span>
              <input
                type="text"
                name="COUNTRY_CODE"
                value={editFormData.COUNTRY_CODE}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            <label className="block mb-2">
              <span className="text-gray-700">Profile Name</span>
              <input
                type="text"
                name="EMPLOYEE_PROFILE_NAME"
                value={editFormData.EMPLOYEE_PROFILE_NAME}
                onChange={handleEditChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </label>

            {/* Optional: Display Base64 string or a preview if you want */}
            {/* For editing profile image, ideally you'd use a file input and convert it to base64 */}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
