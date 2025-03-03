import { BookOpenIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-2xl font-bold text-blue-600">NCERT-BOT</span>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="/courses" className="text-gray-600 hover:text-blue-600">All Courses</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600">About Us</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            </div>
          </div>
          <Link to="/login">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 ml-4">Login</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Master Your Studies with NCERT-BOT Expertise</h1>
          <p className="text-xl mb-8">Interactive activities, personalized questions, and AI-powered Learning</p>
          <a href="ProductListing.tsx">
            <Link to="/products">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
            GET STARTED
          </button>
          </Link>
          </a>
        </div>
      </div>
  


      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <BookOpenIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Best PDF Summarizer</h3>
            <p className="text-gray-600">Top 100% of our PDF will be summarised in every given form.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ClockIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
            <p className="text-gray-600">Optimized time management (2020-2021: 6:00–12:00) at your personal line.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <DocumentTextIcon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Generate Q&A</h3>
            <p className="text-gray-600">Professional Q&A from experienced professors.</p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Student Benefits</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Interactive Activities</li>
              <li>• Personalized Questions</li>
              <li>• AI-powered Learning</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Institution Features</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Learning Analytics</li>
              <li>• Custom Question Banks</li>
              <li>• Resource Management</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Parent Resources</h4>
            <ul className="space-y-2 text-gray-600">
              <li>• Progress Tracking</li>
              <li>• Support Tools</li>
              <li>• Engagement Portal</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                {/* Footer <li><a href="/learn" className="hover:text-blue-400">Learn</a></li>
                <li><a href="/courses" className="hover:text-blue-400">All Courses</a></li>
                <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
                <li><a href="/contact" className="hover:text-blue-400">Contact</a></li> */}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Address</h5>
              <p className="text-sm">90 feet road, Pragati nagar Nallasopara-East<br/>
              Classroom book library<br/>
              Number: 000001</p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <p className="text-sm">Email: singhsr376@gmail.com</p>
              <p className="text-sm mt-2">Powered by your@cab.net | Industry</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>Copyright © 2024 Saurav Singh reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;