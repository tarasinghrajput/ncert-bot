// src/components/PaymentSuccess.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/AuthContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const updateSubscription = async () => {
      if (currentUser) {
        await setDoc(doc(db, 'users', currentUser.uid, 'subscriptions', 'active'), {
          plan: 'premium',
          status: 'active',
          startedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        });
      }
      setTimeout(() => navigate('/profile'), 3000);
    };

    updateSubscription();
  }, [navigate, currentUser, db]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
        <p className="text-gray-600">Redirecting to your profile...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;