export const PROFESSION_OPTIONS = [
  { value: "engineer-fe", label: "프론트엔드 개발자" },
  { value: "engineer-be", label: "백엔드 개발자" },
  { value: "engineer-fs", label: "풀스택 개발자" },
  { value: "engineer-mobile", label: "모바일 개발자" },
  { value: "engineer-data", label: "데이터 엔지니어" },
  { value: "engineer-ml", label: "ML 엔지니어" },
  { value: "designer-product", label: "프로덕트 디자이너" },
  { value: "designer-ui", label: "UI 디자이너" },
  { value: "designer-ux", label: "UX 디자이너" },
  { value: "designer-graphic", label: "그래픽 디자이너" },
  { value: "pm", label: "프로덕트 매니저" },
  { value: "po", label: "프로덕트 오너" },
  { value: "marketer-growth", label: "그로스 마케터" },
  { value: "marketer-content", label: "콘텐츠 마케터" },
  { value: "marketer-performance", label: "퍼포먼스 마케터" },
  { value: "sales", label: "세일즈" },
  { value: "hr", label: "HR" },
  { value: "finance", label: "재무/회계" },
  { value: "researcher", label: "리서처" },
  { value: "student", label: "학생" },
  { value: "other", label: "기타" },
] as const;

export const PROFESSION_MAP = PROFESSION_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<string, string>
);

export function getProfessionLabel(value: string | null | undefined): string {
  if (!value) return "설정되지 않음";
  return PROFESSION_MAP[value] || value;
}