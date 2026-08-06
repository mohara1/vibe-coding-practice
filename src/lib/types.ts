export type Category = "주거" | "일자리" | "문화" | "커뮤니티";
export type Status = "대학생" | "직장인";

/** 6하원칙 상세 정보 */
export type FiveW1H = {
  who: string;
  when: string;
  where: string;
  what: string;
  how: string;
  why: string;
};

export type Policy = {
  id: number;
  kind: "policy";
  title: string;
  category: Category;
  summary: string;
  description: string;
  applyUrl: string;
  /** 추천 대상 신분. 빈 배열이면 모든 신분에게 추천 */
  targetStatus: Status[];
  /** 실제 사진 경로. 카드 썸네일에만 사용, 상세 화면에는 표시하지 않음 */
  photoUrl: string | null;
  /** 신청 마감일(YYYY-MM-DD). null이면 상시모집 */
  applyEnd: string | null;
  detail: FiveW1H;
};

export type Review = {
  author: string;
  content: string;
};

export type Space = {
  id: number;
  kind: "space";
  name: string;
  category: Category;
  summary: string;
  description: string;
  lat: number;
  lng: number;
  /** 실제 사진 경로. 없으면(null) 카테고리 아이콘 플레이스홀더로 표시 */
  photoUrl: string | null;
  /** 홈 화면 카드에 D-day 뱃지를 표시하기 위한 임의 날짜(YYYY-MM-DD). 공간은 실제 마감 개념이 없어 의미 없는 값 */
  applyEnd: string | null;
  reviews: Review[];
  detail: FiveW1H;
};

export type FeedItem = Policy | Space;
