import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { BookData } from '../types';
import '../App.css'


const ProductPage = () => {
    // console.log('PDF.js version:', pdfjs.version);
    // const location = useLocation();
    // const { productId, pdfUrl } = useParams<{ productId: string, pdfUrl: string }>();
    const [activeTab, setActiveTab] = useState<'summary' | 'mcq' | 'fill' | 'qna'>('summary');
    const { productId } = useParams<{ productId: string }>();
    const location = useLocation();
    const pdfUrl = location.state?.pdfUrl;

    const [bookData, setBookData] = useState<BookData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // MCQ
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});

    // Fill in the blanks
    const [selectedBlankAnswers, setSelectedBlankAnswers] = useState<{ 
        [key: string]: string 
      }>({});
    //   QnA
    const [expandedQnas, setExpandedQnas] = useState<{ [key: string]: boolean }>({});



    useEffect(() => {
        const fetchBookData = async () => {
            try {
                if (!pdfUrl) {
                    throw new Error('PDF URL not found');
                }

                // Extract book name from PDF URL
                const bookName = pdfUrl.split('/').pop(); // Extracts "6th-English-NCERT-Chapter-3.pdf"

                const response = await fetch(
                    `https://www.ncertexplained.com/api/fetch_book_data?book_name=${encodeURIComponent(bookName)}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }

                const data: BookData = await response.json();
                setBookData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchBookData();
    }, [pdfUrl]);

    // Adding a handler for radio button changes in the mcq
    const handleAnswerSelect = (mcqId: string, optionId: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [mcqId]: optionId
        }));
    };

    // Adding a  handler for blank selection in the Fill in the blanks
const handleBlankSelect = (questionId: string, optionId: string) => {
    setSelectedBlankAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Adding toggle handler for the QnAs
const toggleQna = (questionId: string) => {
    setExpandedQnas(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };





    if (!productId || !pdfUrl) {
        return <div>PDF not found</div>;
    }

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    // Sample data - replace with actual data
    const product = {
        id: productId,
        title: 'English Class 4',
        pdfUrl: '/pdf/english-fourth.pdf',
        summary: 'Comprehensive guide to Class 4 English...',
        mcq: [
            { question: 'What is the value of π?', options: ['3.14', '22/7', 'Both', 'None'], answer: 2 },
            // Add more MCQs
        ],
        fillInBlanks: [
            { statement: 'The square root of 25 is ___.', answer: '5' },
            // Add more fill in blanks
        ],
        qna: [
            { question: 'Explain Pythagoras theorem', answer: 'In a right-angled triangle...' },
            // Add more QnA
        ]
    };

    // const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    //     setNumPages(numPages);
    // };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Breadcrumbs */}
            <nav className="mb-6 flex items-center text-sm text-gray-600">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <ChevronRightIcon className="h-4 w-4 mx-2" />
                <Link to="/products" className="hover:text-blue-600">Products</Link>
                <ChevronRightIcon className="h-4 w-4 mx-2" />
                <span className="text-gray-800">{product.title}</span>
            </nav>

            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Left Section - PDF Viewer */}
                <iframe src={`${pdfUrl}`} width="100%" height="500px" title="PDF Viewer"></iframe>

                {/* Right Section - Tabs */}
                <div className="bg-white rounded-lg shadow-lg p-6 h-[80vh] overflow-auto">
                    <div className="flex space-x-4 mb-6 border-b">
                        {['summary', 'mcq', 'fill', 'qna'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as typeof activeTab)}
                                className={`pb-2 px-4 ${activeTab === tab
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'summary' && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Summary</h3>
                            <p className="text-gray-600 text-left">
                                {bookData?.summary.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}

                    {activeTab === 'mcq' && (
                        <div className="space-y-6">
                            {bookData?.mcqs?.map((mcq) => {
                                const isCorrect = selectedAnswers[mcq.mcq_id] === mcq.correct_option;
                              

                                return (
                                    <div key={mcq.mcq_id} className="bg-white p-4 rounded-lg shadow">
                                        <h4 className="text-lg font-medium mb-3">{mcq.question}</h4>
                                        <div className="space-y-2">
                                            {mcq.options.map((option) => (
                                                <div key={option.option_id} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={`${mcq.mcq_id}-${option.option_id}`}
                                                        name={`mcq-${mcq.mcq_id}`}
                                                        className="mr-2"
                                                        value={option.option_id}
                                                        onChange={() => handleAnswerSelect(mcq.mcq_id, option.option_id)}
                                                    />
                                                    <label
                                                        htmlFor={`${mcq.mcq_id}-${option.option_id}`}
                                                        className={`cursor-pointer ${selectedAnswers[mcq.mcq_id] === option.option_id ? 'font-medium' : ''}`}
                                                    >
                                                        {option.option_value}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Show answer only if correct option is selected */}
                                        {isCorrect && (
                                            <div className="mt-3 p-3 bg-green-50 rounded animate-fade-in">
                                                <p className="text-green-800 font-medium">✓ Correct Answer!</p>
                                                <p className="text-green-700 mt-1">{mcq.answer_explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}


{activeTab === 'fill' && (
  <div className="space-y-6">
    {bookData?.["fill-in-the-blanks"]?.map((blank) => {
      const selectedOption = selectedBlankAnswers[blank.question_id];
      const isCorrect = selectedOption === blank.correct_option;
      
      return (
        <div key={blank.question_id} className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-3">{blank.question}</h4>
          
          <div className="grid grid-cols-1 gap-2">
            {blank.options.map((option) => {
              const isSelected = selectedOption === option.option_id;
              let bgColor = 'bg-white';
              
              if (isSelected) {
                bgColor = option.option_id === blank.correct_option 
                  ? 'bg-green-100 border-green-500' 
                  : 'bg-red-100 border-red-500';
              }

              return (
                <button
                  key={option.option_id}
                  onClick={() => handleBlankSelect(blank.question_id, option.option_id)}
                  className={`p-3 text-left rounded border ${bgColor} ${
                    !isSelected ? 'hover:bg-gray-50' : ''
                  } transition-colors`}
                >
                  {option.option_value}
                  
                  {isSelected && (
                    <span className="ml-2">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <div className={`mt-3 p-3 rounded ${
              isCorrect ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`font-medium ${
                isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {isCorrect ? 'Correct!' : 'Incorrect. Correct answer:'} {blank.correct_option}
              </p>
              <p className={`mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {blank.answer_explanation}
              </p>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}




{activeTab === 'qna' && (
  <div className="space-y-6">
    {bookData?.qnas?.map((qna) => (
      <div key={qna.question_id} className="bg-white p-4 rounded-lg shadow">
        <div 
          className="cursor-pointer group"
          onClick={() => toggleQna(qna.question_id)}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium mb-3">{qna.question}</h4>
            <span className={`transform transition-transform ${
              expandedQnas[qna.question_id] ? 'rotate-180' : ''
            }`}>
              ▼
            </span>
          </div>
        </div>
        
        {expandedQnas[qna.question_id] && (
          <div className="mt-2 p-3 bg-gray-50 rounded animate-fade-in">
            <p className="text-gray-700">{qna.answer}</p>
          </div>
        )}
      </div>
    ))}
  </div>
)}









                </div>
            </div>
        </div>
    );
};


export default ProductPage;