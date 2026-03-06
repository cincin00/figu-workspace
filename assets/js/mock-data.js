(function () {
  const STORAGE_STOCK_KEY = 'figu_stock_state';
  const STORAGE_HISTORY_KEY = 'figu_draw_history';

  const products = [
    {
      id: 'onepiece-egghead',
      title: '원피스 Egghead 쿠지',
      series: '반프레스토 Ichiban Kuji',
      thumbnail: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&w=900&q=80',
      description: '일본 편의점 신상으로 구성된 Egghead 에디션 라인업입니다.',
      price: 12000,
      grades: [
        { rank: 'A', total: 2, probability: 0.03, rewards: ['루피 기어5 피규어', '조로 배틀 포즈 피규어'] },
        { rank: 'B', total: 4, probability: 0.08, rewards: ['상디 디오라마 피규어', '나미 피규어'] },
        { rank: 'C', total: 12, probability: 0.22, rewards: ['아크릴 스탠드 세트', '미니 쿠션'] },
        { rank: 'D', total: 16, probability: 0.27, rewards: ['러버 키링', '클리어 파일 세트'] },
        { rank: 'E', total: 20, probability: 0.35, rewards: ['캔뱃지 랜덤', '스티커 팩'] },
        { rank: 'LAST', total: 1, probability: 0.05, rewards: ['라스트원상 루피 스페셜 컬러'] }
      ]
    },
    {
      id: 'evangelion-rise',
      title: '에반게리온 RISE 쿠지',
      series: '세가 럭키쿠지',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
      description: '신극장판 테마의 피규어와 굿즈로 구성된 한정 라인업입니다.',
      price: 10500,
      grades: [
        { rank: 'A', total: 1, probability: 0.02, rewards: ['에바 초호기 대형 피규어'] },
        { rank: 'B', total: 3, probability: 0.06, rewards: ['아스카 피규어', '레이 피규어'] },
        { rank: 'C', total: 8, probability: 0.19, rewards: ['아트보드', '포스터 세트'] },
        { rank: 'D', total: 15, probability: 0.33, rewards: ['텀블러', '머그컵'] },
        { rank: 'E', total: 18, probability: 0.35, rewards: ['메탈 키링', '엽서 세트'] },
        { rank: 'LAST', total: 1, probability: 0.05, rewards: ['라스트원상 아스카 스페셜'] }
      ]
    }
  ];

  function formatPrice(value) {
    return `${value.toLocaleString('ko-KR')}원`;
  }

  function getDefaultStock(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return {};
    return Object.fromEntries(product.grades.map((grade) => [grade.rank, grade.total]));
  }

  function readJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getStock(productId) {
    const allStock = readJson(STORAGE_STOCK_KEY, {});
    if (!allStock[productId]) {
      allStock[productId] = getDefaultStock(productId);
      saveJson(STORAGE_STOCK_KEY, allStock);
    }
    return allStock[productId];
  }

  function setStock(productId, nextStock) {
    const allStock = readJson(STORAGE_STOCK_KEY, {});
    allStock[productId] = nextStock;
    saveJson(STORAGE_STOCK_KEY, allStock);
  }

  function getHistory() {
    return readJson(STORAGE_HISTORY_KEY, []);
  }

  function pushHistory(entry) {
    const history = getHistory();
    history.push(entry);
    saveJson(STORAGE_HISTORY_KEY, history);
  }

  window.FIGU_DATA = {
    products,
    formatPrice,
    getStock,
    setStock,
    getHistory,
    pushHistory
  };
})();
