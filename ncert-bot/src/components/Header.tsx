import { useAuth } from '../contexts/authContext/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { userLoggedIn } = useAuth();

    return (
        <div className="min-h w-full bg-gray-50">
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
                    {userLoggedIn && (
                        <Link to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={`w-14 h-14 rounded-full bg-gray-200`}>
                                <circle cx="50" cy="50" r="50" fill="#E5E7EB" />
                                <ellipse cx="50" cy="42" rx="22" ry="22" fill="#4B5563" />
                                <path d="M50 64 C30 64, 20 84, 20 94 L80 94 C80 84, 70 64, 50 64" fill="#4B5563" />
                            </svg>
                        </Link>
                    )}
                    {/* {userLoggedIn && (
            <Link to="/login">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 ml-4">Login</button>
            </Link>
          )} */}
                </div>
            </nav>
        </div>
    );
};

export default Header;