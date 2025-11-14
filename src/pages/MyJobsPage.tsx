// pages/MyJobsPage.tsx
import React, { useEffect, useState } from 'react';
import { jobService, RecruiterJob } from '../services/jobService';
import { Link } from 'react-router-dom';
import { FiMapPin, FiUsers, FiEye, FiHeart } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

const MyJobsPage: React.FC = () => {
  const { showError } = useToast();
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = async (targetPage = 1) => {
    try {
      setLoading(true);
      setError(null);
      const { jobs: list, pages: totalPages } = await jobService.getMyJobs({ page: targetPage, limit: 10 });
      setJobs(targetPage === 1 ? list : [...jobs, ...list]);
      setPage(targetPage);
      setPages(totalPages || 1);
    } catch (e: any) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to load jobs';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    if (page < pages) load(page + 1);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-emirates font-bold text-black">My Jobs</h1>
          <p className="text-gray-600 font-montessart">Manage your posted openings</p>
        </div>
        <Link to="/jobs/create" className="bg-[#423772] text-white px-4 py-2 rounded-lg font-montessart font-semibold hover:bg-[#312456] transition-colors">
          Post a Job
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>
      )}

      <div className="space-y-4">
        {jobs.map((j) => (
          <div key={j._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 font-emirates truncate">{j.company}</h3>
                <p className="text-[#423772] font-montessart font-semibold">{j.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-600 font-montessart text-sm">
                  <span className="flex items-center"><FiMapPin className="mr-1 text-[#423772]" />{j.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-gray-700 text-sm"><FiUsers />{j.stats?.applications ?? 0}</span>
                <span className="flex items-center gap-1 text-gray-700 text-sm"><FiEye />{j.stats?.views ?? 0}</span>
                <span className="flex items-center gap-1 text-gray-700 text-sm"><FiHeart />{j.stats?.saves ?? 0}</span>
                <Link to={`/jobs/my/${j._id}/applications`} className="ml-2 bg-white text-[#423772] border border-[#423772] px-3 py-1.5 rounded-lg font-montessart font-semibold hover:bg-[#423772] hover:text-white transition-colors">
                  View Applications
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {page < pages && (
        <div className="text-center mt-8">
          <button onClick={loadMore} disabled={loading} className="bg-white text-[#423772] border border-[#423772] px-6 py-3 rounded-xl font-montessart font-semibold hover:bg-[#423772] hover:text-white transition-colors disabled:opacity-60">
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
