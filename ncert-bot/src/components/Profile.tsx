import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext/AuthContext';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase/firebase';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface ProfileData {
  displayName: string;
  bio: string;
  photoURL: string;
}

interface ScoreData {
  highestScore: number;
  attempts: Array<{
    score: number;
    totalQuestions: number;
    timestamp: Date;
  }>;
}

interface SubscriptionData {
  plan: string;
  status: string;
  expiresAt: Date;
}

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    displayName: '',
    bio: '',
    photoURL: ''
  });
  const [totalScore, setTotalScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const db = getFirestore(app);


  // Update the main fetchData useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          // 1. Fetch profile
          const profileRef = doc(db, 'users', currentUser.uid, 'profile', 'userProfile');
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            setProfile(profileSnap.data() as ProfileData);
          }

          // 2. Fetch scores
          const scoresRef = collection(db, `users/${currentUser.uid}/scores`);
          const scoresSnap = await getDocs(scoresRef);

          let calculatedTotal = 0;
          scoresSnap.forEach(doc => {
            const scoreData = doc.data() as ScoreData;
            calculatedTotal += scoreData.highestScore;
          });

          setTotalScore(calculatedTotal);
        } catch (error) {
          setError('Failed to load profile data. Please try again later.');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [currentUser, db]);






  useEffect(() => {
    const fetchSubscription = async () => {
      if (currentUser) {
        try {
          const subRef = doc(db, 'users', currentUser.uid, 'subscriptions', 'active');
          const subSnap = await getDoc(subRef);
          if (subSnap.exists()) {
            const data = subSnap.data();
            setSubscription({
              plan: data.plan,
              status: data.status,
              expiresAt: data.expiresAt.toDate() // Convert Firestore Timestamp to JS Date
            });
          }
        } catch (error) {
          setError('Failed to load profile data. Please try again later.');
          console.error('Error fetching subscription:', error);
        }
      }
    };
    fetchSubscription();
  }, [currentUser, db]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      // Save to profile sub-collection
      await setDoc(doc(db, 'users', currentUser.uid, 'profile', 'userProfile'), {
        ...profile,
        lastUpdated: new Date()
      }, { merge: true });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2" />
        <span className="text-gray-600">Profile</span>
        <div className="min-full">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </nav>
      <h1 className="text-2xl font-bold mb-4">
        {profile.displayName || "Your Profile"}
      </h1>

      {/* Total Score Display */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">Your Total Score</h3>
        <div className="text-3xl font-bold text-blue-600 mt-2">
          {totalScore}
        </div>
        <p className="text-sm text-blue-600 mt-1">Points earned across all quizzes</p>
      </div>

      {/* Subscription Status */}
      {subscription && new Date() < subscription.expiresAt ? (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          {/* Active subscription UI */}
          {subscription && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Subscription Status</h3>
              <div className="mt-2">
                <p>Plan: {subscription.plan}</p>
                <p>Status: {subscription.status}</p>
                <p>Expires: {subscription.expiresAt.toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <p>No active subscription</p>
          <Link to="/checkout" className="text-blue-600 hover:underline">
            Upgrade to Premium
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700">Display Name</label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your display name"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about yourself..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;