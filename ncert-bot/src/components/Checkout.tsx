// src/components/Checkout.tsx
import { useEffect } from 'react';
import { useAuth } from '../contexts/authContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/firebase';

const Checkout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  const handlePremiumSubscribe = async () => {
    try {
      // In real implementation, use Stripe.js
      window.location.href = 'https://buy.stripe.com/test_dR6cOmezo4ixcq4bII';
    } catch (error) {
      console.error('Payment initiation failed:', error);
      navigate('/payment-failed');
    }
  };

  return (
    <div className="min-h bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Free Tier</h3>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basic Features
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                5 PDFs/Month
              </li>
            </ul>
            <Link
              to="/product-listing-1"
              className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors block text-center"
            >
              Continue Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-2 border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">Premium</h3>
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Popular</span>
            </div>
            <p className="text-gray-600 mb-6">₹99/month - Unlimited Access</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Unlimited PDF Access
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Priority Support
              </li>
            </ul>
            <button
              onClick={handlePremiumSubscribe}
              className="w-full bg-blue-600 text-black px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;