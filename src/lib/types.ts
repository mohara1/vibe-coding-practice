export type Category = "주거" | "일자리" | "문화" | "커뮤니티";
export type Status = "대학생" | "직장인";

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
  reviews: Review[];
};

export type FeedItem = Policy | Space;
