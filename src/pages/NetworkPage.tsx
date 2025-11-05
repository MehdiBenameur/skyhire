// pages/NetworkPage.tsx
import React, { useState } from "react";
import Layout from "../components/Layout";
import { FiSearch, FiMessageCircle, FiCheck, FiUserPlus, FiUsers, FiClock, FiSend } from "react-icons/fi";

const NetworkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connections' | 'discover'>('connections');

  const connections = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Flight Attendant",
      airline: "Emirates Airlines",
      connected: true
    },
    {
      id: 2,
      name: "James Wilson", 
      position: "Flight Attendant",
      airline: "Singapore Airlines",
      connected: true
    },
    {
      id: 3,
      name: "Emma Davis",
      position: "Cabin Crew Manager",
      airline: "Qatar Airways", 
      connected: true
    }
  ];

  const discoverProfiles = [
    {
      id: 1,
      name: "Michael Brown",
      position: "Flight Attendant",
      airline: "British Airways",
      mutual: 3
    },
    {
      id: 2,
      name: "Sophia Martinez",
      position: "Senior Cabin Crew",
      airline: "Lufthansa",
      mutual: 2
    },
    {
      id: 3, 
      name: "Alex Chen",
      position: "Aviation Recruiter",
      airline: "SkyHire Recruitment",
      mutual: 5
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      name: "David Brown",
      position: "Flight Attendant",
      airline: "Emirates Airlines"
    },
    {
      id: 2,
      name: "Emma Wilson", 
      position: "Recruiter",
      airline: "Aviation Talent"
    }
  ];

  return (
    <Layout>
      <div className="w-full px-10 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-emirates font-bold text-black mb-3">
            Networking Platform
          </h1>
          <p className="text-gray-600 font-montessart text-lg">
            Connect with aviation professionals, mentors, and recruiters
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-8">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search professionals..."
                className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-4 font-montessart focus:ring-2 focus:ring-[#423772] focus:border-[#423772] outline-none transition-all"
              />
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab('connections')}
                className={`pb-4 font-montessart font-semibold transition-colors ${
                  activeTab === 'connections'
                    ? 'border-b-2 border-[#423772] text-[#423772]'
                    : 'text-gray-500 hover:text-[#423772]'
                }`}
              >
                My Connections ({connections.length})
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className={`pb-4 font-montessart font-semibold transition-colors ${
                  activeTab === 'discover'
                    ? 'border-b-2 border-[#423772] text-[#423772]'
                    : 'text-gray-500 hover:text-[#423772]'
                }`}
              >
                Discover ({discoverProfiles.length})
              </button>
            </div>

            {/* Connections/Discover List */}
            <div className="space-y-6">
              {(activeTab === 'connections' ? connections : discoverProfiles).map((person) => (
                <div 
                  key={person.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#423772]/30"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#423772] to-[#6D5BA6] rounded-2xl flex items-center justify-center text-white font-bold text-lg font-emirates">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    {/* Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 font-montessart">
                        {person.name}
                      </h3>
                      <p className="text-gray-600 font-montessart">
                        {person.position}
                      </p>
                      <p className="text-gray-500 font-montessart text-sm flex items-center gap-2">
                        <FiSend className="text-[#423772]" />
                        {person.airline}
                      </p>
                      {'mutual' in person && (
                        <p className="text-[#423772] font-montessart text-sm font-medium">
                          {person.mutual} mutual connections
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {activeTab === 'connections' ? (
                      <button className="flex items-center gap-2 bg-[#423772] text-white px-6 py-3 rounded-xl font-montessart font-semibold hover:bg-[#312456] transition-colors">
                        <FiMessageCircle className="text-lg" />
                        Message
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 bg-[#423772] text-white px-6 py-3 rounded-xl font-montessart font-semibold hover:bg-[#312456] transition-colors">
                        <FiUserPlus className="text-lg" />
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Network Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#423772] rounded-xl flex items-center justify-center">
                  <FiUsers className="text-2xl text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 font-montessart">
                  Your Network
                </h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-montessart">Total Connections</span>
                  <span className="text-2xl font-bold text-[#423772] font-emirates">48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-montessart">Active This Week</span>
                  <span className="text-xl font-bold text-green-600 font-emirates">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-montessart">Messages</span>
                  <span className="text-xl font-bold text-blue-600 font-emirates">8</span>
                </div>
              </div>
            </div>

            {/* Connection Requests */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <FiClock className="text-2xl text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 font-montessart">
                  Connection Requests
                </h2>
              </div>

              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-800 font-montessart">
                        {request.name}
                      </p>
                      <p className="text-gray-600 font-montessart text-sm">
                        {request.position}
                      </p>
                      <p className="text-gray-500 font-montessart text-xs flex items-center gap-2">
                        <FiSend className="text-[#423772]" />
                        {request.airline}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                        <FiCheck className="text-lg" />
                      </button>
                      <button className="w-10 h-10 bg-gray-400 rounded-xl flex items-center justify-center text-white hover:bg-gray-500 transition-colors">
                        <span className="text-lg font-bold">×</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {pendingRequests.length === 0 && (
                <p className="text-gray-500 font-montessart text-center py-4">
                  No pending requests
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#423772] to-[#6D5BA6] rounded-2xl p-6 text-white">
              <h3 className="font-semibold font-montessart mb-3">Grow Your Network</h3>
              <p className="text-white/80 font-montessart text-sm mb-4">
                Connect with professionals to advance your aviation career
              </p>
              <button className="w-full bg-white text-[#423772] py-3 rounded-xl font-montessart font-semibold hover:bg-gray-100 transition-colors">
                Find Connections
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NetworkPage;