// src/firebase/db.js
import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * [Repository Layer] 분석 요청 데이터를 Firestore에 저장합니다.
 */
export const saveAnalysisRequest = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "analysis_results"), {
      ...data,
      status: "pending", // AI 분석 전 상태
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Firestore Save Error:", error);
    return { success: false, error: error.message };
  }
};