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
  FiMapPin,
  FiUsers,
  FiGlobe,
} from "react-icons/fi";

const Dream = () => {
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [selectedDream, setSelectedDream] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const getDreamData = async () => {
    try {
      const { data } = await axios.get(
        "https://crm-ghar-se-frar.onrender.com/dream/all"
      );
      setDreams(data?.data || []);
      setFilteredDreams(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDreamData();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let result = dreams;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (dream) =>
          dream.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dream.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dream.contactNumber?.includes(searchTerm) ||
          dream.startingCity
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          dream.travelGroup?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    if (filter !== "all") {
      result = result.filter((dream) => {
        const today = new Date();
        const dreamDate = new Date(dream.createdAt);
        const diffTime = Math.abs(today - dreamDate);
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

    setFilteredDreams(result);
  }, [searchTerm, filter, dreams]);

  const openModal = (dream) => {
    setSelectedDream(dream);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDream(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTravelDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateDaysUntilTrip = (departureDate) => {
    const today = new Date();
    const departure = new Date(departureDate);
    const diffTime = departure - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FiGlobe className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dream Packages
          </h1>
          <p className="text-gray-600">
            Explore your customers' dream travel plans
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
                placeholder="Search dream packages..."
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
                All Dreams
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
            Showing {filteredDreams.length} of {dreams.length} dream packages
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Traveler
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trip Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Travel Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Starting City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days Until Trip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDreams.map((dream) => (
                  <tr
                    key={dream._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {dream.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Dream Package
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {formatTravelDate(dream.departureDate)} -{" "}
                        {formatTravelDate(dream.returnDate)}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {dream.durationType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiUsers className="w-4 h-4 mr-2 text-gray-400" />
                        {dream.travelGroup}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {dream.startingCity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{dream.email}</div>
                      <div className="text-sm text-gray-500">
                        {dream.contactNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          calculateDaysUntilTrip(dream.departureDate) <= 7
                            ? "bg-red-100 text-red-800"
                            : calculateDaysUntilTrip(dream.departureDate) <= 30
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {calculateDaysUntilTrip(dream.departureDate)} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(dream)}
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
          {filteredDreams.map((dream) => (
            <div
              key={dream._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-900">
                      {dream.name}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {dream.durationType}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    calculateDaysUntilTrip(dream.departureDate) <= 7
                      ? "bg-red-100 text-red-800"
                      : calculateDaysUntilTrip(dream.departureDate) <= 30
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {calculateDaysUntilTrip(dream.departureDate)} days
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                  {formatTravelDate(dream.departureDate)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiUsers className="w-4 h-4 mr-2 text-gray-400" />
                  {dream.travelGroup}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {dream.startingCity}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiPhone className="w-4 h-4 mr-2 text-gray-400" />
                  {dream.contactNumber}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Added {formatDate(dream.createdAt)}
                </div>
                <button
                  onClick={() => openModal(dream)}
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
        {filteredDreams.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiGlobe className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No dream packages found
            </h3>
            <p className="text-gray-500">
              {dreams.length === 0
                ? "No dream packages available yet. Dream packages will appear here when customers submit their travel dreams."
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedDream && (
          <div className="fixed inset-0 backdrop-blur-sm k bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dream Package Details
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
                    {selectedDream.name}
                  </h2>
                  <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full inline-block mt-2">
                    Dream Package
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Trip Details */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Trip Details
                    </h4>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Departure Date</p>
                        <p className="text-gray-900 font-semibold">
                          {formatTravelDate(selectedDream.departureDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Return Date</p>
                        <p className="text-gray-900 font-semibold">
                          {formatTravelDate(selectedDream.returnDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-gray-900 font-semibold">
                          {selectedDream.durationType}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">
                        Days Until Trip
                      </p>
                      <div
                        className={`text-sm font-semibold px-3 py-2 rounded-lg inline-block ${
                          calculateDaysUntilTrip(selectedDream.departureDate) <=
                          7
                            ? "bg-red-100 text-red-800"
                            : calculateDaysUntilTrip(
                                selectedDream.departureDate
                              ) <= 30
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {calculateDaysUntilTrip(selectedDream.departureDate)}{" "}
                        days
                      </div>
                    </div>
                  </div>

                  {/* Traveler Information */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">
                      Traveler Information
                    </h4>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiUsers className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Travel Group</p>
                        <p className="text-gray-900 font-semibold">
                          {selectedDream.travelGroup}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiMapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Starting City</p>
                        <p className="text-gray-900 font-semibold">
                          {selectedDream.startingCity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiPhone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Contact Number</p>
                        <p className="text-gray-900 font-semibold">
                          {selectedDream.contactNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FiMail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900 font-semibold">
                          {selectedDream.email}
                        </p>
                      </div>
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
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  Contact Traveler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dream;
