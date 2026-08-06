import type { Policy } from "@/lib/types";

export const policies: Policy[] = [
  {
    id: 1,
    kind: "policy",
    title: "청년월세지원",
    category: "주거",
    summary: "월 최대 20만원 월세 지원",
    description:
      "진주시 거주 청년을 대상으로 월세 일부를 지원하는 정책입니다. 무주택 청년이 대상이며, 최대 12개월간 지원받을 수 있습니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: [],
  },
  {
    id: 2,
    kind: "policy",
    title: "청년 구직활동지원금",
    category: "일자리",
    summary: "구직 중인 청년에게 활동비 지원",
    description:
      "미취업 청년의 구직 활동을 돕기 위해 면접비, 교통비 등 구직 관련 비용을 지원합니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: ["대학생"],
  },
  {
    id: 3,
    kind: "policy",
    title: "청년 첫걸음 창업지원",
    category: "일자리",
    summary: "예비 창업자를 위한 초기 자금 지원",
    description:
      "진주 지역에서 창업을 준비하는 청년에게 사업화 자금과 멘토링을 함께 제공합니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: ["직장인"],
  },
  {
    id: 4,
    kind: "policy",
    title: "청년 전세보증금 대출이자 지원",
    category: "주거",
    summary: "전세보증금 대출 이자의 일부를 지원",
    description:
      "전세로 거주 중인 청년의 대출이자 부담을 줄여주는 정책으로, 연 1회 신청할 수 있습니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: [],
  },
  {
    id: 5,
    kind: "policy",
    title: "청년 문화활동비 지원",
    category: "문화",
    summary: "공연·전시 관람비 연 10만원 지원",
    description:
      "진주 지역 청년의 문화생활을 장려하기 위해 공연, 전시, 영화 관람비를 지원합니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: [],
  },
  {
    id: 6,
    kind: "policy",
    title: "청년 마음건강 상담 지원",
    category: "커뮤니티",
    summary: "심리상담 비용 최대 8회 지원",
    description:
      "정서적 어려움을 겪는 청년에게 전문 상담기관 연계와 상담비 일부를 지원합니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: [],
  },
  {
    id: 7,
    kind: "policy",
    title: "청년 자격증 취득비 지원",
    category: "일자리",
    summary: "직무 관련 자격증 응시료 지원",
    description:
      "취업에 필요한 자격증 취득을 준비하는 청년에게 응시료와 교재비 일부를 지원합니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: ["대학생"],
  },
  {
    id: 8,
    kind: "policy",
    title: "청년 공유주거 입주 지원",
    category: "주거",
    summary: "셰어하우스 입주 시 보증금 일부 지원",
    description:
      "청년들이 함께 거주하는 공유주거(셰어하우스) 입주 시 초기 보증금 부담을 줄여줍니다.",
    applyUrl: "https://young.jinju.go.kr/young/business/list/0",
    targetStatus: ["직장인"],
  },
];
