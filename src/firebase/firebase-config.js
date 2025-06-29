// استدعاء Firebase Core
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ إعداد بيانات مشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBMEqz6m7jxR8LRRmYy9biYxBmHWXAKIYI",
  authDomain: "storyverse-ab035.firebaseapp.com",
  projectId: "storyverse-ab035",
  storageBucket: "storyverse-ab035.appspot.com",
  messagingSenderId: "367847591576",
  appId: "1:367847591576:web:2d706b589da7a17a824aed"
};

// ✅ تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// ✅ الاتصال بقاعدة البيانات والمصادقة
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };