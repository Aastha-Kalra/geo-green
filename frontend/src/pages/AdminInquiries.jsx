import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const AdminInquiries = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return navigate("/admin");
    const load = async () => {
      try {
        const res = await api.get(`/api/inquiries${statusFilter ? `?status=${statusFilter}` : ""}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiries(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate, statusFilter]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("adminToken");
    await api.patch(`/api/inquiries/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    setInquiries((prev) => prev.map((i) => (i._id === id ? { ...i, status } : i)));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2">
            <option value="">All</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        {inquiries.length === 0 ? (
          <p className="text-gray-500">No inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.map((inq) => (
                  <tr key={inq._id}>
                    <td className="px-6 py-4 text-sm">{inq.productName || inq.productId}</td>
                    <td className="px-6 py-4 text-sm">{inq.name}</td>
                    <td className="px-6 py-4 text-sm">{inq.email}</td>
                    <td className="px-6 py-4 text-sm">{inq.message}</td>
                    <td className="px-6 py-4 text-sm">
                      <select value={inq.status} onChange={(e) => updateStatus(inq._id, e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;


