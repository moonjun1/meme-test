import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCncJVldTNyxV2yUrBX97PWUVhyLP4ghrc",
  authDomain: "test-165c3.firebaseapp.com",
  projectId: "test-165c3",
  storageBucket: "test-165c3.firebasestorage.app",
  messagingSenderId: "668258490640",
  appId: "1:668258490640:web:8554c5284c246cafdb2d95",
  measurementId: "G-JMFEGKTL7F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// AdMob 관련 설정
export const adUnitIds = {
  banner: 'ca-app-pub-3940256099942544/6300978111', // 테스트 광고 ID
  interstitial: 'ca-app-pub-3940256099942544/1033173712', // 테스트 광고 ID
  rewarded: 'ca-app-pub-3940256099942544/5224354917' // 테스트 광고 ID
};

export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  logEvent(analytics, eventName, eventParams);
};

export { app, analytics };