
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "safar-41ae2.firebaseapp.com",
  projectId: "safar-41ae2",
  storageBucket: "safar-41ae2.firebasestorage.app",
  messagingSenderId: "449075427956",
  appId: "1:449075427956:web:6808c0fe98fa5b0d742f21",
  measurementId: "G-0M88S98BQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 getAnalytics(app);


export const firebaseDb = getFirestore(app)

// Initialize the Gemini Developer API backend service
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance with a model that supports your use case
export const GeminAiModel = getGenerativeModel(ai, { model: "gemini-2.5-flash" });



