import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const LeadPage = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    axios.get("https://test-backend-v4ym.onrender.com/api/leads")
      .then(response => setLeads(response.data))
      .catch(error => console.error("Error fetching leads:", error));
  }, []);

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email || !newLead.phone) return;
    axios.post("https://test-backend-v4ym.onrender.com/api/leads", newLead)
      .then(response => {
        setLeads([...leads, response.data]);
        setNewLead({ name: "", email: "", phone: "" });
      })
      .catch(error => console.error("Error adding lead:", error));
  };

  const handleDeleteLead = (id) => {
    axios.delete(`https://test-backend-v4ym.onrender.com/api/leads/${id}`)
      .then(() => {
        setLeads(leads.filter(lead => lead._id !== id));
      })
      .catch(error => console.error("Error deleting lead:", error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl backdrop-blur-md bg-white/70 rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">📋 Lead Management</h1>

        {/* Add Lead Form */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">➕ Add New Lead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["name", "email", "phone"].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  value={newLead[field]}
                  onChange={(e) => setNewLead({ ...newLead, [field]: e.target.value })}
                  className="peer w-full border border-gray-300 bg-white/60 backdrop-blur-sm rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  placeholder=" "
                />
                <label
                  htmlFor={field}
                  className="absolute text-gray-600 text-sm top-2 left-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddLead}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center gap-2 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="text-lg" />
            <span>Add Lead</span>
          </button>
        </div>

        {/* Lead List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">📑 Lead List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="bg-white/80 backdrop-blur-md rounded-lg shadow-md transition hover:scale-[1.01] duration-300"
                  >
                    <td className="px-4 py-4 rounded-l-lg">{lead.name}</td>
                    <td className="px-4 py-4">{lead.email}</td>
                    <td className="px-4 py-4">{lead.phone}</td>
                    <td className="px-4 py-4 rounded-r-lg">
                      <button
                        onClick={() => handleDeleteLead(lead._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-6">
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadPage;
