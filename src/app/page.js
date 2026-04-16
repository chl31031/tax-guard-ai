"use client";

import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";

export default function TaxForm() {
  const { formData, setFormData } = useChatStore();
  
  const [attachedFiles, setAttachedFiles] = useState([]); 
  const [selectedMainIssue, setSelectedMainIssue] = useState(""); 
  const [currentStep, setCurrentStep] = useState(""); 
  const [isManualBusiness, setIsManualBusiness] = useState(false);
  const [selectedTaxType, setSelectedTaxType] = useState(""); // 3번 세목 선택 상태

  const subProblemOptions = {
    "매출 누락 의심": ["현금 매출", "차명 계좌 사용", "배달앱 매출", "기타"],
    "경비 부인/증빙 부족": ["가공세금계산서", "가공 인건비", "업무 무관 경비", "기타"],
    "법인 자금 문제": ["대표이사 가지급금", "법인 카드 사적 사용", "자본금 가장납입", "기타"],
    "자금 출처 조사": ["부동산 취득 자금 부족", "고액 예금/주식 증가", "부채 상환 자금 출처", "기타"],
    "상속 재산 누락 의심": ["사전 증여 재산 누락", "현금, 예금 등 금융재산 누락", "차명 재산(부동산, 주식 등)", "기타"]
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-8 space-y-10 bg-white shadow-xl my-10 rounded-lg border border-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-2 text-black">TaxGuard AI</h1>
        <p className="text-gray-700 text-sm font-bold border-b pb-4">입력하신 모든 정보는 분석할 때만 사용됩니다.</p>
      </div>

      {/* 1. 세무조사(소명) 진행 단계 - 유지 */}
      <section className="space-y-3">
        <div className="space-y-1">
          <label className="font-extrabold text-lg text-blue-900">세무조사(소명) 진행 단계</label>
          <p className="text-xs text-gray-600 font-bold">해당하는 항목을 선택해주세요.</p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {["1. 세무조사 통지서를 받을까봐 두렵습니다.", "2. 해명 안내문을 받았습니다.", "3. 세무조사 통지서를 받았습니다.", "4. 현재 세무조사가 진행 중입니다.", "5. 세무조사가 끝나고 세금 고지서/결과통지서를 받았습니다."].map(step => (
            <button key={step} onClick={() => setCurrentStep(step)}
              className={`text-left p-4 rounded text-sm font-bold border ${currentStep === step ? "bg-blue-600 text-white border-blue-700 shadow-md" : "bg-blue-50 text-gray-800 border-blue-100 hover:bg-blue-100"}`}>
              {step}
            </button>
          ))}
        </div>
      </section>

      {/* 2. 주종목(업종) - 유지 (기타 입력 포함) */}
      <section className="space-y-3">
        <div className="space-y-1">
          <label className="font-extrabold text-lg text-blue-900">주종목(업종)</label>
          <p className="text-xs text-gray-600 font-bold">해당하는 업종을 선택해주시고, 해당하는 선택지가 없으면 기타를 선택한 후 직접 입력해주세요.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["음식점업", "소매업", "도매업", "제조업", "건설업", "서비스업", "부동산업", "운수업", "정보통신", "전문직", "기타"].map(item => (
            <button key={item} 
              onClick={() => { setFormData('businessType', item); setIsManualBusiness(item === "기타"); }}
              className={`px-4 py-2 rounded-full text-sm font-black border-2 ${formData.businessType === item ? "bg-purple-600 text-white border-purple-700" : "bg-purple-100 text-purple-800 border-purple-200"}`}>
              {item}
            </button>
          ))}
        </div>
        {isManualBusiness && (
          <input type="text" placeholder="업종을 직접 입력해주세요." className="w-full p-3 border-2 border-purple-200 rounded-lg mt-2 text-gray-900 font-bold outline-none focus:border-purple-500" />
        )}
      </section>

      {/* 3. 쟁점 세목 및 예산 추징액 - 수정 완료 */}
      <section className="space-y-3">
        <div className="space-y-1">
          <label className="font-extrabold text-lg text-blue-900">쟁점 세목 및 예산 추징액</label>
          <p className="text-xs text-gray-600 font-bold">해당하는 세목을 선택한 후에 추징액을 작성해주세요.(기타를 선택할 시에 세목과 추징액을 둘 다 작성하여주세요.)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["법인세/종합소득세", "부가가치세", "양도소득세", "상속세/증여세", "기타"].map(tax => (
            <button 
              key={tax} 
              onClick={() => setSelectedTaxType(tax)}
              className={`px-4 py-2 rounded-full text-sm font-black border-2 transition-all ${selectedTaxType === tax ? "bg-purple-600 text-white border-purple-700 shadow-md" : "bg-purple-100 text-purple-800 border-purple-200"}`}
            >
              {tax}
            </button>
          ))}
        </div>
        {selectedTaxType && (
          <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-1">
            {selectedTaxType === "기타" && (
              <input type="text" placeholder="세목을 입력해주세요." className="w-full p-3 border-2 border-purple-200 rounded-lg text-gray-900 font-bold outline-none focus:border-purple-500" />
            )}
            <div className="relative">
              <input type="number" placeholder="예상 추징액을 입력해주세요." className="w-full p-3 border-2 border-purple-200 rounded-lg text-gray-900 font-bold outline-none focus:border-purple-500 pr-12" />
              <span className="absolute right-4 top-3.5 text-gray-600 font-bold">만원</span>
            </div>
          </div>
        )}
      </section>

      {/* 4. 국세청 주요 지적 사항 - 유지 */}
      <section className="space-y-3">
        <div className="space-y-1">
          <label className="font-extrabold text-lg text-blue-900">국세청 주요 지적 사항</label>
          <p className="text-xs text-gray-600 font-bold">해당하는 상황을 선택해주세요.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(subProblemOptions).map(issue => (
            <button key={issue} onClick={() => { setSelectedMainIssue(issue); setFormData('selectedIssue', ""); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold border ${selectedMainIssue === issue ? "bg-purple-700 text-white border-purple-800 shadow-lg" : "bg-purple-100 text-purple-900 border-purple-200"}`}>
              {issue}
            </button>
          ))}
        </div>
      </section>

      {/* 5. 세부 문제 선택 - 유지 */}
      <section className={`space-y-3 transition-all duration-300 ${selectedMainIssue ? "opacity-100" : "opacity-40"}`}>
        <div className="space-y-1">
          <label className="font-extrabold text-lg text-blue-900">세부 문제 선택</label>
          <p className="text-xs text-gray-600 font-bold">해당하는 항목을 선택해주세요.</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {selectedMainIssue ? subProblemOptions[selectedMainIssue].map(sub => (
            <button key={sub} onClick={() => setFormData('selectedIssue', sub)}
              className={`p-4 border-2 rounded-xl text-sm text-left font-bold ${formData.selectedIssue === sub ? "bg-gray-800 text-white border-black" : "bg-white text-gray-900 border-gray-200"}`}>
              {sub}
            </button>
          )) : <p className="text-red-600 text-sm font-black p-4 bg-red-50 rounded-lg border border-red-100 italic">위의 '국세청 주요 지적 사항'을 먼저 선택해주세요.</p>}
        </div>
      </section>

      {/* 6. 상세 상황 설명(필수) - 유지 (예시 문구 포함) */}
      <section className="space-y-3">
        <div className="space-y-1">
          <label className="font-extrabold text-lg text-blue-900">상세 상황 설명(필수)</label>
          <p className="text-xs text-gray-600 font-bold">아래 예시를 참고하여 상황을 자유롭게 작성해주세요.</p>
        </div>
        <textarea className="w-full p-4 bg-gray-50 border-2 border-blue-100 rounded-lg min-h-[150px] outline-none text-gray-900 font-medium" 
          placeholder="최근 3년 동안 음식점 장사하면서, 손님들한테 사업자 통장이 아니라 제 개인 통장으로 돈을 받은 적이 있습니다. 그런데 오늘 세무서에서 이 문제로 세무조사를 하겠다고 처음 연락이 왔습니다."
          value={formData.currentSituation}
          onChange={(e) => setFormData('currentSituation', e.target.value)}
        />
      </section>

      {/* 7. 파일 첨부 - 유지 (수정 없음) */}
      <section className="space-y-3">
        <div className="space-y-1">
          <label className="font-extrabold text-lg text-blue-900">파일 첨부(권장)</label>
          <p className="text-xs text-gray-600 font-bold">필수는 아니지만 세무조사 관련 파일을 올리면 분석 결과가 더 정확해집니다.</p>
        </div>
        <label className="block w-full p-8 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg text-center cursor-pointer hover:bg-blue-50">
          <input type="file" className="hidden" multiple onChange={handleFileChange} />
          <p className="text-blue-700 underline font-black text-lg">여기를 눌러 업로드할 파일을 선택해주세요.</p>
          <p className="text-xs text-gray-600 mt-2 font-bold">사전 통지서, 재무제표(3년 이내), 부가세 신고서 등을 첨부해주세요.</p>
        </label>
        {attachedFiles.length > 0 && (
          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-gray-200">
            <p className="text-sm font-black text-black mb-2 border-b pb-1">선택된 파일 {attachedFiles.length}개</p>
            {attachedFiles.map((file, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded">
                <span className="text-gray-900 font-medium italic">📄 {file.name}</span>
                <button onClick={() => removeFile(idx)} className="text-red-600 font-black ml-2">삭제</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="pt-10 space-y-4">
        <p className="text-center text-xs text-gray-500 font-bold">입력하신 모든 정보는 분석 후 즉시 파기 됩니다.</p>
        <button className="w-full py-6 bg-blue-600 text-white font-black text-2xl rounded-xl shadow-2xl hover:bg-blue-700 transition-all active:scale-95">
          모의 세무조사 시작하기
        </button>
      </footer>
    </main>
  );
}