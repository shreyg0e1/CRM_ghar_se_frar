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
} from "react-icons/fi";

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://crm-ghar-se-frar.onrender.com/contact/all"
      );
      setContacts(data?.data || []);
      setFilteredContacts(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let result = contacts;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.mobile.includes(searchTerm)
      );
    }

    // Apply category filter
    if (filter !== "all") {
      result = result.filter((contact) => {
        const today = new Date();
        const contactDate = new Date(contact.createdAt);
        const diffTime = Math.abs(today - contactDate);
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

    setFilteredContacts(result);
  }, [searchTerm, filter, contacts]);

  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Management
          </h1>
          <p className="text-gray-600">
            Manage and view all your contacts in one place
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
                placeholder="Search contacts..."
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
                All Contacts
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
            Showing {filteredContacts.length} of {contacts.length} contacts
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contact.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contact.mobile}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(contact)}
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
          {filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <FiPhone className="w-4 h-4" />
                      {contact.mobile}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  {formatDate(contact.createdAt)}
                </div>
                <button
                  onClick={() => openModal(contact)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                  <FiEye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No contacts found
            </h3>
            <p className="text-gray-500">
              {contacts.length === 0
                ? "No contacts available. Start by adding some contacts."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedContact && (
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Details
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
                    {selectedContact.firstName} {selectedContact.lastName}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiMail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedContact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="text-gray-900">{selectedContact.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="text-gray-900">
                        {formatDate(selectedContact.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FiCalendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-gray-900">
                        {formatDate(selectedContact.updatedAt)}
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

export default ContactUs;
