import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PDFBook } from '../types';

const ProductListing = () => {
  // Sample data - replace with actual data from your backend/API
  const [pdfs] = useState<PDFBook[]>([
    { id: 1, subject: 'English', grade: 'Class 6', year: '2025', pdfUrl: '/pdf/6th-English-NCERT-Chapter-3.pdf' },
    { id: 2, subject: 'Science', grade: 'Class 7', year: '2025', pdfUrl: '/pdf/7th-Science-NCERT-Chapter-1.pdf' },
    { id: 3, subject: 'Mathematics', grade: 'Class 5', year: '2025', pdfUrl: '/pdf/5th-Maths-NCERT-Chapter-2.pdf' },
    { id: 4, subject: 'Science', grade: 'Class 8', year: '2025', pdfUrl: '/pdf/ch-11-science-8th-1.pdf' },
    { id: 5, subject: 'Geography', grade: 'Class 7', year: '2025', pdfUrl: '/pdf/ncert-geography-chapter-7.pdf' },
    { id: 6, subject: 'Mathematics', grade: 'Class 8', year: '2025', pdfUrl: '/pdf/ch-02-math-8th.pdf' },
    { id: 7, subject: 'Social Science', grade: 'Class 8', year: '2025', pdfUrl: '/pdf/ch-01-social-science-Social-and-Political-Life-III-8th.pdf' },
    { id: 8, subject: 'Social Science', grade: 'Class 6', year: '2025', pdfUrl: '/pdf/6th-Social-Science-NCERT-Chapter-2.pdf' },
    { id: 9, subject: 'Mathmatics', grade: 'Class 6', year: '2025', pdfUrl: '/pdf/6th-Maths-NCERT-Chapter-1.pdf' },
    { id: 10, subject: 'English', grade: 'Class 5', year: '2025', pdfUrl: '/pdf/5th-English-NCERT-Chapter-9.pdf' },
    // Add more entries as needed
  ]);


  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');

  // Get unique subjects and grades for filter options
  const subjects = Array.from(new Set(pdfs.map((pdf) => pdf.subject)));
  const grades = Array.from(new Set(pdfs.map((pdf) => pdf.grade)));

  // Filtered PDFs
  const filteredPdfs = pdfs.filter(pdf => {
    const matchesSearch = 
    pdf.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pdf.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject ? pdf.subject === selectedSubject : true;
    const matchesGrade = selectedGrade ? pdf.grade === selectedGrade : true;
    
    return matchesSearch && matchesSubject && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Left Side - PDF Listings */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">NCERT Books & Resources</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {filteredPdfs.map(pdf => (
              <div 
                key={pdf.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                <div className="flex items-center justify-between">
                  <Link to={`/products/${pdf.id}`} state={{ pdfUrl: pdf.pdfUrl }} className="view-button">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{pdf.subject}</h3>
                    <p className="text-gray-600">{pdf.grade}</p>
                    <p className="text-sm text-gray-500 mt-2">Academic Year: {pdf.year}</p>
                  </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Filters */}
        <div className="w-80 shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Filter Resources</h2>
            
            {/* Search Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search books..."
              />
            </div>

            {/* Subject Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Grade Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('');
                setSelectedGrade('');
              }}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;