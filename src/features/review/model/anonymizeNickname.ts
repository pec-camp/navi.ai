/**
 * 닉네임을 익명화하는 유틸 함수
 * 가운데 글자들을 ● 으로 마스킹
 * @param nickname 원본 닉네임
 * @returns 익명화된 닉네임
 */
export function anonymizeNickname(nickname?: string): string {
  if (!nickname) return "Anonymous";

  // 2글자 이하는 마지막 글자만 마스킹
  if (nickname.length <= 2) {
    return nickname[0] + "*";
  }

  // 3글자 이상은 첫 글자와 마지막 글자만 보여주고 가운데 마스킹
  if (nickname.length === 3) {
    return nickname[0] + "*" + nickname[2];
  }

  // 4글자 이상은 첫 글자와 마지막 글자 보여주고 가운데는 모두 마스킹
  const firstChar = nickname[0];
  const lastChar = nickname[nickname.length - 1];
  const maskedMiddle = "*".repeat(nickname.length - 2);

  return firstChar + maskedMiddle + lastChar;
}

/**
 * 직업 키를 사용자 친화적 레이블로 변환
 * @param professionKey 직업 키
 * @returns 포맷팅된 직업명
 */
function formatProfession(professionKey?: string): string | undefined {
  if (!professionKey) return undefined;

  const PROFESSION_LABELS: Record<string, string> = {
    pm: "PM/PO",
    designer: "디자이너",
    "engineer-fe": "프론트엔드 개발자",
    "engineer-be": "백엔드 개발자",
    "engineer-ai": "AI 엔지니어",
    "data-analyst": "데이터 분석가",
    "data-scientist": "데이터 사이언티스트",
    marketer: "마케터",
    researcher: "리서처",
    ops: "운영",
  };

  return PROFESSION_LABELS[professionKey] || professionKey;
}

/**
 * 사용자 ID를 시드로 DiceBear 아바타 URL 생성
 * @param userId 사용자 ID
 * @returns 아바타 URL
 */
export function generateAvatarUrl(userId: string): string {
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${userId}`;
}

/**
 * 직업 정보를 포맷팅하여 반환
 * @param professionKey 직업 키
 * @returns 포맷팅된 직업명 또는 undefined
 */
export function formatProfessionForDisplay(
  professionKey?: string,
): string | undefined {
  return formatProfession(professionKey);
}
