import { getFirestore, doc, setDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebase';

interface ScoreData {
  score: number;
  totalQuestions: number;
  timestamp: Date;
}

interface UserScore {
  pdfId: string;
  pdfTitle: string;
  highestScore: number;
  attempts: ScoreData[];
  lastAttempt: Date;
}

const db = getFirestore(app);
const auth = getAuth(app);

export const submitScore = async (pdfId: string, score: number, totalQuestions: number, pdfTitle: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userScoreRef = doc(db, `users/${user.uid}/scores/${pdfId}`);
    const docSnap = await getDoc(userScoreRef);
    
    const existingData = docSnap.exists() ? docSnap.data() as UserScore : null;
    const newHighest = existingData ? Math.max(existingData.highestScore, score) : score;

    const scoreData: ScoreData = {
      score,
      totalQuestions,
      timestamp: new Date(),
    };

    await setDoc(userScoreRef, {
      pdfId,
      pdfTitle,
      highestScore: newHighest,
      attempts: arrayUnion(scoreData),
      lastAttempt: new Date(),
    }, { merge: true });

    return true;
  } catch (error) {
    console.error('Error submitting score:', error);
    return false;
  }
};

export const getScoreHistory = async (pdfId: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userScoreRef = doc(db, `users/${user.uid}/scores/${pdfId}`);
    const docSnap = await getDoc(userScoreRef);
    
    if (!docSnap.exists()) return null;
    return docSnap.data() as UserScore;
  } catch (error) {
    console.error('Error fetching score history:', error);
    return null;
  }
};