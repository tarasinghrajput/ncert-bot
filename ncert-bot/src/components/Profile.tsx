import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext/AuthContext';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase/firebase';

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

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    displayName: '',
    bio: '',
    photoURL: ''
  });
  const [totalScore, setTotalScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          // 1. Fetch profile from profile sub-collection
          const profileRef = doc(db, 'users', currentUser.uid, 'profile', 'userProfile');
          const profileSnap = await getDoc(profileRef);
          
          if (profileSnap.exists()) {
            setProfile(profileSnap.data() as ProfileData);
          }

          // 2. Fetch scores from scores sub-collection
          const scoresRef = collection(db, `users/${currentUser.uid}/scores`);
          const scoresSnap = await getDocs(scoresRef);
          
          let calculatedTotal = 0;
          scoresSnap.forEach(doc => {
            const scoreData = doc.data() as ScoreData;
            calculatedTotal += scoreData.highestScore;
          });

          setTotalScore(calculatedTotal);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700">Display Name</label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => setProfile({...profile, displayName: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your display name"
          />
        </div>
        
        <div>
          <label className="block mb-2 text-gray-700">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
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