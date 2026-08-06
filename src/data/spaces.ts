import type { Space } from "@/lib/types";

export const spaces: Space[] = [
  {
    id: 1,
    kind: "space",
    name: "진주청년센터",
    category: "커뮤니티",
    summary: "상담과 휴식을 함께 할 수 있는 공간",
    description:
      "청년 대상 취업·주거 상담과 휴게 공간을 함께 운영합니다. 목적 없이 들렀다가 정보를 얻어가는 청년들이 많습니다.",
    lat: 35.1800,
    lng: 128.0860,
    photoUrl: null,
    reviews: [
      { author: "익명", content: "상담이 친절했어요." },
      { author: "익명", content: "쉬면서 정책 안내도 받을 수 있어 좋았어요." },
    ],
  },
  {
    id: 2,
    kind: "space",
    name: "진주 청년작당소",
    category: "커뮤니티",
    summary: "청년들이 모여 프로젝트를 벌이는 공간",
    description:
      "소모임, 스터디, 소규모 행사를 열 수 있는 공유공간입니다. 예약하면 무료로 이용할 수 있습니다.",
    lat: 35.1825,
    lng: 128.0901,
    photoUrl: null,
    reviews: [
      { author: "익명", content: "스터디 모임 하기 좋아요." },
      { author: "익명", content: "공간이 아늑해서 자주 방문해요." },
    ],
  },
  {
    id: 3,
    kind: "space",
    name: "진주 일자리센터",
    category: "일자리",
    summary: "취업 상담과 채용 정보를 한눈에",
    description:
      "이력서 클리닉, 모의면접, 지역 채용 정보 게시를 함께 제공하는 공간입니다.",
    lat: 35.1774,
    lng: 128.0838,
    photoUrl: null,
    reviews: [{ author: "익명", content: "이력서 첨삭이 도움이 많이 됐어요." }],
  },
  {
    id: 4,
    kind: "space",
    name: "진주시립도서관 청년열람실",
    category: "문화",
    summary: "조용히 공부하거나 책을 읽을 수 있는 공간",
    description:
      "청년 전용 열람석과 스터디룸을 갖춘 공간으로, 야간에도 이용할 수 있습니다.",
    lat: 35.1889,
    lng: 128.0925,
    photoUrl: null,
    reviews: [{ author: "익명", content: "자리도 넉넉하고 조용해요." }],
  },
  {
    id: 5,
    kind: "space",
    name: "진주 청년주택 상담센터",
    category: "주거",
    summary: "청년 주거 정책 상담 전용 공간",
    description:
      "청년월세지원, 전세대출 등 주거 관련 정책을 한 자리에서 상담받을 수 있습니다.",
    lat: 35.1756,
    lng: 128.0792,
    photoUrl: null,
    reviews: [{ author: "익명", content: "주거 정책이 헷갈렸는데 정리해주셨어요." }],
  },
  {
    id: 6,
    kind: "space",
    name: "진주 문화예술회관 청년라운지",
    category: "문화",
    summary: "공연 전후 쉬어가는 청년 라운지",
    description:
      "문화예술회관 내 청년 전용 라운지로, 공연 정보와 할인 티켓 안내를 받을 수 있습니다.",
    lat: 35.1842,
    lng: 128.1002,
    photoUrl: null,
    reviews: [{ author: "익명", content: "공연 보기 전에 잠깐 쉬기 좋아요." }],
  },
  {
    id: 7,
    kind: "space",
    name: "진주 청년창업허브",
    category: "일자리",
    summary: "창업 준비 청년들의 공유 오피스",
    description:
      "예비 창업자를 위한 공유 오피스와 멘토링 프로그램을 제공합니다.",
    lat: 35.1711,
    lng: 128.0865,
    photoUrl: null,
    reviews: [{ author: "익명", content: "멘토링 프로그램이 실질적으로 도움됐어요." }],
  },
  {
    id: 8,
    kind: "space",
    name: "진주 청년마음건강센터",
    category: "커뮤니티",
    summary: "심리상담과 힐링 프로그램을 운영하는 공간",
    description:
      "정서적 어려움을 겪는 청년을 위한 상담실과 소규모 힐링 프로그램을 운영합니다.",
    lat: 35.1867,
    lng: 128.0784,
    photoUrl: null,
    reviews: [{ author: "익명", content: "상담 선생님이 편하게 들어주셨어요." }],
  },
];
