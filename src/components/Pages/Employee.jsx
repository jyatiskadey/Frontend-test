import React, { useEffect, useState } from 'react';
import { fetchInitialData, saveEmployee } from '../api/employeeApi';
import { isValidContact, isValidEmail } from '@/utils/validation';

const initialForm = {
  id: '',
  name: '',
  dob: '',
  fatheR_NAME: '',
  motheR_NAME: '',
  gender: '',
  countrY_CODE: '',
  statE_CODE: '',
  emaiL_ADDRESS: '',
  contacT_NUMBER: '',
  EMPLOYEE_PROFILE_NAME: '',
  EMPLOYEE_PROFILE_Base64String: '',
};

const EmployeeForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchInitialData().then(data => {
      setCountries(data.data.CountryList);
      setAllStates(data.data.StateList);
    });
  }, []);

  const handleCountryChange = (e) => {
    const code = e.target.value;
    setFormData({ ...formData, countrY_CODE: code, statE_CODE: '' });
    const filteredStates = allStates.filter(s => s.PARENT_RECORD_ID === code);
    setStates(filteredStates);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, EMPLOYEE_PROFILE_NAME: file.name });
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          EMPLOYEE_PROFILE_Base64String: reader.result.split(',')[1]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required.";
    if (!formData.fatheR_NAME.trim()) tempErrors.fatheR_NAME = "Father's Name is required.";
    if (!formData.motheR_NAME.trim()) tempErrors.motheR_NAME = "Mother's Name is required.";
    if (!formData.dob) tempErrors.dob = "Date of Birth is required.";
    if (!formData.gender) tempErrors.gender = "Gender is required.";
    if (!formData.countrY_CODE) tempErrors.countrY_CODE = "Country is required.";
    if (!formData.statE_CODE) tempErrors.statE_CODE = "State is required.";
    if (!formData.emaiL_ADDRESS) tempErrors.emaiL_ADDRESS = "Email is required.";
    else if (!isValidEmail(formData.emaiL_ADDRESS)) tempErrors.emaiL_ADDRESS = "Invalid Email format.";
    if (!formData.contacT_NUMBER) tempErrors.contacT_NUMBER = "Contact Number is required.";
    else if (!isValidContact(formData.contacT_NUMBER)) tempErrors.contacT_NUMBER = "Invalid Contact Number.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const res = await saveEmployee(formData);
      alert(res.message);
      setFormData(initialForm);
      setErrors({});
      setStates([]);
    } catch (error) {
      alert("Failed to save employee. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Employee Registration</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
      >
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            placeholder="Enter full name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Father's Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="fatherName">Father's Name</label>
          <input
            id="fatherName"
            type="text"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.fatheR_NAME ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            placeholder="Enter father's name"
            value={formData.fatheR_NAME}
            onChange={e => setFormData({ ...formData, fatheR_NAME: e.target.value })}
          />
          {errors.fatheR_NAME && <p className="text-red-500 text-sm mt-1">{errors.fatheR_NAME}</p>}
        </div>

        {/* Mother's Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="motherName">Mother's Name</label>
          <input
            id="motherName"
            type="text"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.motheR_NAME ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            placeholder="Enter mother's name"
            value={formData.motheR_NAME}
            onChange={e => setFormData({ ...formData, motheR_NAME: e.target.value })}
          />
          {errors.motheR_NAME && <p className="text-red-500 text-sm mt-1">{errors.motheR_NAME}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.dob ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            value={formData.dob}
            onChange={e => setFormData({ ...formData, dob: e.target.value })}
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="MALE"
                checked={formData.gender === 'MALE'}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="form-radio text-blue-600"
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="FEMALE"
                checked={formData.gender === 'FEMALE'}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="form-radio text-pink-600"
              />
              Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="country">Country</label>
          <select
            id="country"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.countrY_CODE ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            value={formData.countrY_CODE}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c.RECORD_ID} value={c.RECORD_ID}>{c.RECORD_NAME}</option>
            ))}
          </select>
          {errors.countrY_CODE && <p className="text-red-500 text-sm mt-1">{errors.countrY_CODE}</p>}
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="state">State</label>
          <select
            id="state"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.statE_CODE ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            value={formData.statE_CODE}
            onChange={e => setFormData({ ...formData, statE_CODE: e.target.value })}
            disabled={!formData.countrY_CODE}
          >
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.RECORD_ID} value={s.RECORD_ID}>{s.RECORD_NAME}</option>
            ))}
          </select>
          {errors.statE_CODE && <p className="text-red-500 text-sm mt-1">{errors.statE_CODE}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.emaiL_ADDRESS ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            placeholder="Enter email address"
            value={formData.emaiL_ADDRESS}
            onChange={e => setFormData({ ...formData, emaiL_ADDRESS: e.target.value })}
          />
          {errors.emaiL_ADDRESS && <p className="text-red-500 text-sm mt-1">{errors.emaiL_ADDRESS}</p>}
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="contact">Contact Number</label>
          <input
            id="contact"
            type="text"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.contacT_NUMBER ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
            placeholder="Enter contact number"
            value={formData.contacT_NUMBER}
            onChange={e => setFormData({ ...formData, contacT_NUMBER: e.target.value })}
          />
          {errors.contacT_NUMBER && <p className="text-red-500 text-sm mt-1">{errors.contacT_NUMBER}</p>}
        </div>

        {/* Profile Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="profile">Employee Profile Picture</label>
          <input
            id="profile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            "
          />
          {formData.EMPLOYEE_PROFILE_NAME && (
            <p className="mt-2 text-sm text-gray-600">Selected file: <span className="font-medium">{formData.EMPLOYEE_PROFILE_NAME}</span></p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300"
        >
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
