import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const LeadPage = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    // Fetch leads on initial load
    axios.get("http://localhost:5000/api/leads")
      .then(response => setLeads(response.data))
      .catch(error => console.error("Error fetching leads:", error));
  }, []);

  // Add lead
  const handleAddLead = () => {
    axios.post("http://localhost:5000/api/leads", newLead)
      .then(response => {
        setLeads([...leads, response.data]);
        setNewLead({ name: "", email: "", phone: "" }); // Clear form
      })
      .catch(error => console.error("Error adding lead:", error));
  };

  // Delete lead
  const handleDeleteLead = (id) => {
    axios.delete(`http://localhost:5000/api/leads/${id}`)
      .then(() => {
        setLeads(leads.filter(lead => lead._id !== id));
      })
      .catch(error => console.error("Error deleting lead:", error));
  };

  return (
    <div className="container mx-auto my-10 p-6 max-w-4xl bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Lead Management</h1>

      {/* Add New Lead Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Lead</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
            className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddLead}
            className="bg-blue-500 text-white p-3 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="text-xl" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Lead List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lead List</h2>
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50">
                <td className="border p-3 text-sm text-gray-700">{lead.name}</td>
                <td className="border p-3 text-sm text-gray-700">{lead.email}</td>
                <td className="border p-3 text-sm text-gray-700">{lead.phone}</td>
                <td className="border p-3 text-sm text-gray-700">
                  <button
                    onClick={() => handleDeleteLead(lead._id)}
                    className="bg-red-500 text-white p-2 rounded-md flex items-center justify-center space-x-2 hover:bg-red-600 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadPage;
