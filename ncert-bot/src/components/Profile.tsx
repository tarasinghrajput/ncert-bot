// src/components/Profile.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '..//contexts/authContext/AuthContext';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../firebase/firebase';

interface ProfileData {
  displayName: string;
  bio: string;
  photoURL: string;
}

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    displayName: '',
    bio: '',
    photoURL: ''
  });
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as ProfileData);
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, db]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        ...profile,
        lastUpdated: new Date()
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {profile.displayName ? profile.displayName : "Your Profile"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Display Name</label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => setProfile({...profile, displayName: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-500 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;