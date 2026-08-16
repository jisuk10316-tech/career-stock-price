# Career Stock Price

**이동할수록 달라지는 나의 진로** — 유럽 4개국(프랑스·스위스·독일·네덜란드) 산업·연구·도시 현장 탐방을
경험할 때마다 팀원들의 진로 관심도를 주가처럼 기록하고 시각화하는 인터랙티브 커리어 포트폴리오입니다.

## 주요 기능

- **HOME** — 이동 경로와 네 팀원의 현재 Career Stock 스냅샷
- **JOURNEY** — 국가별 방문 기관과 그곳에서의 진로 관심도 변화, WHY 코멘트
- **CAREER MARKET** — 최정윤 · 양지석 · 서형욱 · 최승원 네 명의 탭을 눌러 각자의 진로 주가 그래프와
  타임라인을 확인
- **SAME PLACE, 4 VIEWS** — 같은 장소에서 네 명이 어떻게 다르게 반응했는지 비교
- **CAREER NEWS** — 크게 움직인 진로 관심도를 증권 뉴스처럼 정리 (급등 · 조정)
- **FINAL PORTFOLIO** — Before → During → After → Next Move로 정리한 진로 탐색 결과

## 기술 스택

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · Recharts

## 개발

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
```

모든 여정·인물·진로 주가 데이터는 `src/data/`에 있습니다.
