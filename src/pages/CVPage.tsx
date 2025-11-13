// pages/CVPage.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FiUpload, FiTrendingUp, FiChevronDown, FiLoader } from 'react-icons/fi';
import { AiFillFilePdf } from 'react-icons/ai';
import { FaFileWord } from 'react-icons/fa';
import { uploadCVFile, pollCVAnalysis, CVAnalysis } from '../services/cvService';

const CVPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      setError(null);
      setAnalysis(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setAnalysis(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Étape 1: Upload du fichier
      const uploadResult = await uploadCVFile(file);
      if (uploadResult.success && uploadResult.fileId) {
        // Étape 2: Polling d'analyse côté backend
        setIsAnalyzing(true);
        const analysisResult = await pollCVAnalysis(uploadResult.fileId);
        setAnalysis(analysisResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
  };

  const roadmapSteps = [
    'Improve Language Skills',
    'Add Certifications',
    'Build Network',
    'Practice Interviews',
  ];

  return (
    
      <div className="w-full px-10 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-emirates font-bold text-black mb-3">
            CV Reader & Career Roadmap
          </h1>
          <p className="text-gray-600 font-montessart text-lg">
            Upload your CV for AI-powered analysis and personalized career guidance
          </p>
        </div>

        {/* Main row: two cards equal height */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-10">
          {/* Upload Card */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex-1 flex flex-col justify-between rounded-2xl border-2 border-dashed border-[#dccfe8] p-8 bg-white shadow-lg min-h-[460px]"
          >
            {/* top area with icon and texts */}
            <div className="flex flex-col items-center">
              {/* big upload icon inside a soft square like capture */}
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white/60 border border-gray-200 mb-6 shadow-sm">
                {isAnalyzing ? (
                  <FiLoader className="text-4xl text-[#423772] animate-spin" />
                ) : (
                  <FiUpload className="text-4xl text-[#423772]" />
                )}
              </div>

              <h3 className="text-2xl font-emirates text-black mb-2">Upload your CV</h3>
              <p className="text-gray-600 font-montessart mb-2 text-center">
                Drag and drop your CV or click to browse
              </p>
              <p className="text-gray-500 font-montessart text-sm mb-6">(PDF, DOC, DOCX)</p>

              {/* choose file button with icons */}
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploading || isAnalyzing}
              />
              <label
                htmlFor="file-upload"
                className={`inline-flex items-center gap-3 px-6 py-2 rounded-lg cursor-pointer text-white font-montessart font-medium transition-colors ${
                  isUploading || isAnalyzing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#423772] hover:bg-[#312456]'
                }`}
              >
                <span>
                  {isUploading ? 'Uploading...' : isAnalyzing ? 'Analyzing...' : 'Choose file...'}
                </span>
                <span className="flex items-center gap-2">
                  <AiFillFilePdf className="text-[18px]" />
                  <FaFileWord className="text-[18px]" />
                </span>
              </label>
            </div>

            {/* bottom area: file selected / analyze */}
            <div className="mt-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-700 font-montessart text-sm">{error}</p>
                  <button 
                    onClick={handleReset}
                    className="mt-2 text-red-600 font-montessart text-sm hover:text-red-800"
                  >
                    Try again
                  </button>
                </div>
              )}

              {file && !analysis && !isAnalyzing && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700 font-montessart font-medium text-sm mb-3">
                    ✅ Selected: {file.name}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="bg-green-600 text-white px-4 py-2 rounded-md font-montessart text-sm hover:bg-green-700 transition disabled:bg-gray-400"
                    >
                      {isUploading ? 'Uploading...' : 'Analyze CV'}
                    </button>
                    <button 
                      onClick={handleReset}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md font-montessart text-sm hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <FiLoader className="text-purple-600 animate-spin" />
                    <p className="text-purple-700 font-montessart text-sm">
                      AI is analyzing your CV... This may take a few seconds.
                    </p>
                  </div>
                </div>
              )}

              {analysis && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <p className="text-green-700 font-montessart font-semibold">
                      Analysis Complete! Score: {analysis.score}%
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="bg-[#423772] text-white px-4 py-2 rounded-md font-montessart text-sm hover:bg-[#312456] transition"
                  >
                    Analyze Another CV
                  </button>
                </div>
              )}

              {!file && !isUploading && !isAnalyzing && (
                <div className="mt-2 text-center text-sm text-gray-500 font-montessart">
                  <span>Or drop your CV anywhere in the box</span>
                </div>
              )}
            </div>
          </div>

          {/* Career Roadmap Card */}
          <div className="flex-1 relative bg-[#f5f3f6] rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[460px]">
            {/* top title with icon */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <FiTrendingUp className="text-3xl text-[#423772]" />
              <h3 className="text-2xl font-emirates text-black">Career roadmap</h3>
            </div>

            {/* Affichage des résultats d'analyse ou roadmap par défaut */}
            {analysis ? (
              <div className="space-y-4">
                {/* Score */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm">
                    <span className="text-2xl font-bold text-[#423772]">{analysis.score}%</span>
                    <span className="text-gray-600 font-montessart">CV Match Score</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-[#423772] mb-2 font-montessart">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skills.map((skill, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-montessart">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-[#423772] mb-2 font-montessart">Suggestions</h4>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700 font-montessart">
                        <span className="text-[#423772] mt-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              /* Roadmap par défaut quand pas d'analyse */
              <div className="relative flex gap-6">
                {/* vertical timeline container */}
                <div className="w-14 flex flex-col items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <FiChevronDown className="text-[#423772] text-lg rotate-180" />
                  </div>
                  <div className="flex-1 w-[2px] bg-[#d5cfe3] mx-auto" />
                  <div className="w-6 h-6 flex items-center justify-center">
                    <FiChevronDown className="text-[#423772] text-lg" />
                  </div>
                </div>

                {/* items stacked aligned to the line */}
                <div className="flex-1 space-y-5 py-1">
                  {roadmapSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-9 h-9 flex items-center justify-center rounded-md bg-[#423772] text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-3">
                        <p className="font-montessart text-gray-800">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="absolute bottom-6 left-8 right-8">
              <p className="text-xs text-gray-500 text-center font-montessart">
                {analysis 
                  ? 'Use these insights to strengthen your candidacy and improve your CV score.'
                  : 'Follow these steps to strengthen your candidacy — practice interviews and build certifications for best results.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default CVPage;