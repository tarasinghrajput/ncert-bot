// src/components/PaymentFailed.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed ❌</h1>
        <p className="text-gray-600">Redirecting to homepage...</p>
      </div>
    </div>
  );
};

export default PaymentFailed;