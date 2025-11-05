// pages/JobsPage.tsx
import React from "react";
import Layout from '../components/Layout';
import { FiMapPin, FiDollarSign, FiFilter, FiTrendingUp } from "react-icons/fi";

const JobsPage: React.FC = () => {
  const jobs = [
    {
      id: 1,
      airline: "Emirates Airlines",
      position: "Flight Attendant",
      location: "Dubai, UAE",
      salary: { min: 3500, max: 4500 },
      matchScore: 92,
      tags: ["Customer Service", "Safety Procedures", "Languages"],
      color: "rose"
    },
    {
      id: 2,
      airline: "Singapore Airlines",
      position: "Cabin Crew", 
      location: "Singapore",
      salary: { min: 3800, max: 4800 },
      matchScore: 90,
      tags: ["Service Excellence", "Multilingual", "Customer Service"],
      color: "rose"
    },
    {
      id: 3,
      airline: "Qatar Airways",
      position: "Cabin Crew",
      location: "Doha, Qatar",
      salary: { min: 3200, max: 4200 },
      matchScore: 88,
      tags: ["Hospitality", "Emergency Response", "Multilingual"],
      color: "rose"
    },
    {
      id: 4,
      airline: "British Airways",
      position: "Flight Attendant",
      location: "London, UK",
      salary: { min: 3300, max: 4300 },
      matchScore: 85,
      tags: ["Customer Care", "Safety", "Communication"],
      color: "rose"
    },
    {
      id: 5,
      airline: "Lufthansa",
      position: "Cabin Crew",
      location: "Frankfurt, Germany",
      salary: { min: 3100, max: 4100 },
      matchScore: 82,
      tags: ["European Routes", "Service", "Languages"],
      color: "rose"
    }
  ];

  return (
    <Layout>
      <div className="w-full px-10 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-emirates font-bold text-black mb-3">
            Job Matcher & Airline Ranking
          </h1>
          <p className="text-gray-600 font-montessart text-lg">
            Discover airlines and positions perfectly matched to your profile
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
            <div className="w-12 h-12 bg-[#423772] rounded-full flex items-center justify-center mx-auto mb-2">
              <FiTrendingUp className="text-xl text-white" />
            </div>
            <p className="text-2xl font-bold text-[#423772] font-emirates">{jobs.length}</p>
            <p className="text-gray-600 font-montessart text-sm">Job Matches</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
            <p className="text-2xl font-bold text-[#423772] font-emirates">92%</p>
            <p className="text-gray-600 font-montessart text-sm">Best Match</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
            <p className="text-2xl font-bold text-[#423772] font-emirates">$4,800</p>
            <p className="text-gray-600 font-montessart text-sm">Highest Salary</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
            <p className="text-2xl font-bold text-[#423772] font-emirates">15+</p>
            <p className="text-gray-600 font-montessart text-sm">Airlines</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Position Type Filter */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FiFilter className="text-[#423772]" />
              <h3 className="font-semibold text-gray-800 font-montessart">Position Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-lg bg-[#423772] text-white text-sm font-montessart font-medium transition-colors hover:bg-[#312456]">
                All Positions
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-montessart font-medium transition-colors hover:bg-gray-200">
                Flight Attendant
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-montessart font-medium transition-colors hover:bg-gray-200">
                Cabin Crew
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-montessart font-medium transition-colors hover:bg-gray-200">
                Senior Crew
              </button>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="flex-1 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FiTrendingUp className="text-[#423772]" />
              <h3 className="font-semibold text-gray-800 font-montessart">Sort By</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-lg bg-[#6D5BA6] text-white text-sm font-montessart font-medium transition-colors hover:bg-[#5a4a8a]">
                Best Match
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-montessart font-medium transition-colors hover:bg-gray-200">
                Highest Salary
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-montessart font-medium transition-colors hover:bg-gray-200">
                Top Rated
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-montessart font-medium transition-colors hover:bg-gray-200">
                Most Recent
              </button>
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="flex flex-col lg:flex-row justify-between items-start bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#423772]/30"
            >
              {/* Left Section - Job Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 font-emirates">
                      {job.airline}
                    </h2>
                    <p className="text-lg font-semibold text-[#423772] font-montessart">
                      {job.position}
                    </p>
                  </div>
                  
                  {/* Match Score Badge */}
                  <div className="hidden lg:flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg font-emirates">
                        {job.matchScore}%
                      </span>
                    </div>
                    <p className="text-gray-500 font-montessart text-xs mt-1">Match</p>
                  </div>
                </div>

                {/* Location and Salary */}
                <div className="flex items-center text-gray-600 font-montessart mb-4">
                  <div className="flex items-center mr-6">
                    <FiMapPin size={16} className="mr-2 text-[#423772]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign size={16} className="mr-2 text-[#423772]" />
                    <span>${job.salary.min.toLocaleString()}–${job.salary.max.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-[#423772]/10 to-[#6D5BA6]/10 text-[#423772] text-xs px-3 py-1.5 rounded-full font-montessart font-medium border border-[#423772]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Section - Actions and Mobile Score */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto mt-4 lg:mt-0 lg:ml-6">
                {/* Mobile Score */}
                <div className="lg:hidden flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm font-emirates">
                      {job.matchScore}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex lg:flex-col gap-2">
                  <button className="bg-[#423772] text-white px-6 py-2 rounded-lg font-montessart font-semibold text-sm hover:bg-[#312456] transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                  <button className="bg-white text-[#423772] border border-[#423772] px-6 py-2 rounded-lg font-montessart font-semibold text-sm hover:bg-[#423772] hover:text-white transition-colors whitespace-nowrap">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white text-[#423772] border border-[#423772] px-8 py-3 rounded-xl font-montessart font-semibold hover:bg-[#423772] hover:text-white transition-colors">
            Load More Opportunities
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;