import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiFilter,
  FiEye,
  FiX,
  FiPhone,
  FiMail,
  FiCalendar,
  FiUser,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";

const ShortEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const getShortEnquiry = async () => {
    try {
      const { data } = await axios.get(
        "https://crm-ghar-se-frar.onrender.com/enquiry/all"
      );
      // Filter only short enquiries
      const shortEnquiries =
        data?.data?.filter((enquiry) => enquiry.shortEnquiry === true) || [];
      setEnquiries(shortEnquiries);
      setFilteredEnquiries(shortEnquiries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShortEnquiry();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let result = enquiries;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (enquiry) =>
          enquiry.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.mobile?.includes(searchTerm) ||
          enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    if (filter !== "all") {
      result = result.filter((enquiry) => {
        const today = new Date();
        const enquiryDate = new Date(enquiry.createdAt);
        const diffTime = Math.abs(today - enquiryDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (filter) {
          case "today":
            return diffDays === 1;
          case "week":
            return diffDays <= 7;
          case "month":
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    setFilteredEnquiries(result);
  }, [searchTerm, filter, enquiries]);

  const openModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FiMessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Short Enquiries
          </h1>
          <p className="text-gray-600">
            Quick enquiries from potential customers
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  filter === "all"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FiFilter className="w-4 h-4" />
                All Enquiries
              </button>
              <button
                onClick={() => setFilter("today")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  filter === "today"
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setFilter("week")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  filter === "week"
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setFilter("month")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  filter === "month"
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                This Month
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredEnquiries.length} of {enquiries.length} short
            enquiries
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Travellers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {enquiry.fullName || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            Short Enquiry
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enquiry.email || "No email"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enquiry.mobile}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiUsers className="w-4 h-4 mr-1 text-gray-400" />
                        {enquiry.traveller || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enquiry.date || formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {enquiry.message || "No message provided"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(enquiry)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1 transition-colors"
                      >
                        <FiEye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-900">
                      {enquiry.fullName || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <FiPhone className="w-4 h-4" />
                      {enquiry.mobile}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Short
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600 line-clamp-2">
                  {enquiry.message || "No message provided"}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  
                  <div className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    {enquiry.date || formatDate(enquiry.createdAt)}
                  </div>
                </div>
                <button
                  onClick={() => openModal(enquiry)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm "
                >
                  <FiEye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEnquiries.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No short enquiries found
            </h3>
            <p className="text-gray-500">
              {enquiries.length === 0
                ? "No short enquiries available."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedEnquiry && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Enquiry Details
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUser className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedEnquiry.fullName || "N/A"}
                  </h2>
                  <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full inline-block mt-2">
                    Short Enquiry
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="text-gray-900">{selectedEnquiry.mobile}</p>
                    </div>
                  </div>

                  {selectedEnquiry.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiMail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{selectedEnquiry.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiUsers className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Travellers</p>
                      <p className="text-gray-900">
                        {selectedEnquiry.traveller || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Travel Date</p>
                      <p className="text-gray-900">
                        {selectedEnquiry.date || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {selectedEnquiry.message && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Message</p>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {selectedEnquiry.message}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Submitted On</p>
                      <p className="text-gray-900">
                        {formatDate(selectedEnquiry.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortEnquiry;
