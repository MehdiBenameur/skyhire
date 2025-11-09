// pages/JobsPage.tsx
import React, { useState } from "react";
import { FiMapPin, FiDollarSign, FiFilter, FiTrendingUp, FiHeart, FiShare2 } from "react-icons/fi";

const JobsPage: React.FC = () => {
  const [visibleJobs, setVisibleJobs] = useState(5);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");

  const jobs = [
    {
      id: 1,
      airline: "Emirates Airlines",
      position: "Flight Attendant",
      location: "Dubai, UAE",
      salary: { min: 3500, max: 4500 },
      matchScore: 92,
      tags: ["Customer Service", "Safety Procedures", "Languages"],
      type: "flight-attendant",
      postedDate: "2 days ago"
    },
    {
      id: 2,
      airline: "Singapore Airlines",
      position: "Cabin Crew", 
      location: "Singapore",
      salary: { min: 3800, max: 4800 },
      matchScore: 90,
      tags: ["Service Excellence", "Multilingual", "Customer Service"],
      type: "cabin-crew",
      postedDate: "1 day ago"
    },
    {
      id: 3,
      airline: "Qatar Airways",
      position: "Cabin Crew",
      location: "Doha, Qatar",
      salary: { min: 3200, max: 4200 },
      matchScore: 88,
      tags: ["Hospitality", "Emergency Response", "Multilingual"],
      type: "cabin-crew",
      postedDate: "3 days ago"
    },
    {
      id: 4,
      airline: "British Airways",
      position: "Flight Attendant",
      location: "London, UK",
      salary: { min: 3300, max: 4300 },
      matchScore: 85,
      tags: ["Customer Care", "Safety", "Communication"],
      type: "flight-attendant",
      postedDate: "5 days ago"
    },
    {
      id: 5,
      airline: "Lufthansa",
      position: "Cabin Crew",
      location: "Frankfurt, Germany",
      salary: { min: 3100, max: 4100 },
      matchScore: 82,
      tags: ["European Routes", "Service", "Languages"],
      type: "cabin-crew",
      postedDate: "1 week ago"
    },
    {
      id: 6,
      airline: "Etihad Airways",
      position: "Senior Cabin Crew",
      location: "Abu Dhabi, UAE",
      salary: { min: 4000, max: 5000 },
      matchScore: 78,
      tags: ["Leadership", "Training", "VIP Service"],
      type: "senior-crew",
      postedDate: "4 days ago"
    },
    {
      id: 7,
      airline: "Air France",
      position: "Flight Attendant",
      location: "Paris, France",
      salary: { min: 3400, max: 4400 },
      matchScore: 75,
      tags: ["French Language", "European Destinations", "Luxury Service"],
      type: "flight-attendant",
      postedDate: "6 days ago"
    }
  ];

  const handleApply = (jobId: number) => {
    alert(`Applying to job #${jobId}`);
    // Navigation vers la page d'application ou ouverture modal
  };

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleLoadMore = () => {
    setVisibleJobs(prev => prev + 5);
  };

  const handleFilter = (filterType: string) => {
    setActiveFilter(filterType);
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
  };

  // Filtrer et trier les jobs
  const filteredAndSortedJobs = jobs
    .filter(job => activeFilter === "all" || job.type === activeFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "salary":
          return b.salary.max - a.salary.max;
        case "recent":
          return a.id - b.id; // Simule la date récente
        case "match":
        default:
          return b.matchScore - a.matchScore;
      }
    })
    .slice(0, visibleJobs);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-emirates font-bold text-black mb-3">
          Job Matcher & Airline Ranking
        </h1>
        <p className="text-gray-600 font-montessart text-lg max-w-2xl mx-auto">
          Discover airlines and positions perfectly matched to your profile
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#423772] rounded-full flex items-center justify-center mx-auto mb-2">
            <FiTrendingUp className="text-lg sm:text-xl text-white" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#423772] font-emirates">{jobs.length}</p>
          <p className="text-gray-600 font-montessart text-xs sm:text-sm">Job Matches</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#423772] font-emirates">92%</p>
          <p className="text-gray-600 font-montessart text-xs sm:text-sm">Best Match</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#423772] font-emirates">$4,800</p>
          <p className="text-gray-600 font-montessart text-xs sm:text-sm">Highest Salary</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
          <p className="text-xl sm:text-2xl font-bold text-[#423772] font-emirates">15+</p>
          <p className="text-gray-600 font-montessart text-xs sm:text-sm">Airlines</p>
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
            <button
              onClick={() => handleFilter("all")}
              className={`px-3 py-2 rounded-lg text-sm font-montessart font-medium transition-colors ${
                activeFilter === "all" 
                  ? "bg-[#423772] text-white hover:bg-[#312456]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Positions
            </button>
            <button
              onClick={() => handleFilter("flight-attendant")}
              className={`px-3 py-2 rounded-lg text-sm font-montessart font-medium transition-colors ${
                activeFilter === "flight-attendant" 
                  ? "bg-[#423772] text-white hover:bg-[#312456]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Flight Attendant
            </button>
            <button
              onClick={() => handleFilter("cabin-crew")}
              className={`px-3 py-2 rounded-lg text-sm font-montessart font-medium transition-colors ${
                activeFilter === "cabin-crew" 
                  ? "bg-[#423772] text-white hover:bg-[#312456]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cabin Crew
            </button>
            <button
              onClick={() => handleFilter("senior-crew")}
              className={`px-3 py-2 rounded-lg text-sm font-montessart font-medium transition-colors ${
                activeFilter === "senior-crew" 
                  ? "bg-[#423772] text-white hover:bg-[#312456]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
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
            <button
              onClick={() => handleSort("match")}
              className={`px-3 py-2 rounded-lg text-sm font-montessart font-medium transition-colors ${
                sortBy === "match" 
                  ? "bg-[#6D5BA6] text-white hover:bg-[#5a4a8a]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Best Match
            </button>
            <button
              onClick={() => handleSort("salary")}
              className={`px-3 py-2 rounded-lg text-sm font-montessart font-medium transition-colors ${
                sortBy === "salary" 
                  ? "bg-[#6D5BA6] text-white hover:bg-[#5a4a8a]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Highest Salary
            </button>
            <button
              onClick={() => handleSort("recent")}
              className={`px-3 py-2 rounded-lg text-sm font-montessart font-medium transition-colors ${
                sortBy === "recent" 
                  ? "bg-[#6D5BA6] text-white hover:bg-[#5a4a8a]" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Most Recent
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 font-montessart">
          Showing {filteredAndSortedJobs.length} of {jobs.length} opportunities
        </p>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {filteredAndSortedJobs.map((job) => (
          <div 
            key={job.id}
            className="flex flex-col lg:flex-row justify-between items-start bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#423772]/30"
          >
            {/* Left Section - Job Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-800 font-emirates">
                      {job.airline}
                    </h2>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-montessart font-medium">
                      {job.postedDate}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-[#423772] font-montessart mb-1">
                    {job.position}
                  </p>
                </div>
                
                {/* Match Score Badge - Desktop */}
                <div className="hidden lg:flex flex-col items-center ml-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg font-emirates">
                      {job.matchScore}%
                    </span>
                  </div>
                  <p className="text-gray-500 font-montessart text-xs mt-1">Match</p>
                </div>
              </div>

              {/* Location and Salary */}
              <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 font-montessart mb-4 gap-2 sm:gap-6">
                <div className="flex items-center">
                  <FiMapPin size={16} className="mr-2 text-[#423772]" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center">
                  <FiDollarSign size={16} className="mr-2 text-[#423772]" />
                  <span className="text-sm">${job.salary.min.toLocaleString()}–${job.salary.max.toLocaleString()}/month</span>
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
            <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto mt-4 lg:mt-0 lg:ml-6 gap-4">
              {/* Mobile Score */}
              <div className="lg:hidden flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm font-emirates">
                    {job.matchScore}%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleSaveJob(job.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      savedJobs.includes(job.id)
                        ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                        : "bg-white border-gray-300 text-gray-600 hover:border-[#423772] hover:text-[#423772]"
                    }`}
                    title={savedJobs.includes(job.id) ? "Remove from saved" : "Save job"}
                  >
                    <FiHeart className={savedJobs.includes(job.id) ? "fill-current" : ""} />
                  </button>
                  <button 
                    className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:border-[#423772] hover:text-[#423772] transition-colors"
                    title="Share job"
                  >
                    <FiShare2 />
                  </button>
                </div>
                <button 
                  onClick={() => handleApply(job.id)}
                  className="bg-[#423772] text-white px-4 py-2 rounded-lg font-montessart font-semibold text-sm hover:bg-[#312456] transition-colors whitespace-nowrap"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleJobs < jobs.length && (
        <div className="text-center mt-8">
          <button 
            onClick={handleLoadMore}
            className="bg-white text-[#423772] border border-[#423772] px-6 py-3 rounded-xl font-montessart font-semibold hover:bg-[#423772] hover:text-white transition-colors"
          >
            Load More Opportunities ({jobs.length - visibleJobs} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsPage;