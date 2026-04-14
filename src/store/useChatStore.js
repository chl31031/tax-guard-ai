import { create } from 'zustand';

/**
 * [Service Layer] 사용자가 입력하는 세무 데이터를 관리합니다.
 */
export const useChatStore = create((set) => ({
  // 상태 (State)
  formData: {
    taxpayerType: 'personal', // 개인 또는 법인
    businessType: '',        // 업종
    annualRevenue: '',       // 연매출
    employeeCount: '',       // 직원 수
    currentSituation: '',    // 상세 상황 (필수)
  },

  // 액션 (Actions)
  setFormData: (field, value) => 
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  // 데이터 초기화
  resetForm: () => set({
    formData: {
      taxpayerType: 'personal',
      businessType: '',
      annualRevenue: '',
      employeeCount: '',
      currentSituation: '',
    }
  }),
}));