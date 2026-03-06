(function () {
  const KEY = {
    orders: 'figu_orders',
    inventory: 'figu_inventory',
    shipping: 'figu_shipping_requests'
  };

  const kujiItems = [
    {
      id: 'onepiece-egghead',
      title: '원피스 Egghead 이치방 쿠지',
      brand: '반프레스토',
      series: 'anime',
      releaseMonth: '2026-02',
      price: 12000,
      remain: 48,
      status: '판매중',
      image: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&w=900&q=80',
      grades: [
        { rank: 'A', probability: '3%', quantity: 2, reward: '루피 기어5 피규어' },
        { rank: 'B', probability: '8%', quantity: 8, reward: '조로 배틀 포즈' },
        { rank: 'C', probability: '22%', quantity: 18, reward: '아크릴 스탠드' },
        { rank: 'D', probability: '27%', quantity: 20, reward: '러버 키링' },
        { rank: 'E', probability: '35%', quantity: 28, reward: '캔뱃지' },
        { rank: 'LAST', probability: '5%', quantity: 4, reward: '라스트원상 스페셜' }
      ]
    },
    {
      id: 'eva-rise',
      title: '에반게리온 RISE 럭키쿠지',
      brand: '세가',
      series: 'anime',
      releaseMonth: '2026-01',
      price: 10500,
      remain: 31,
      status: '판매중',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
      grades: [
        { rank: 'A', probability: '2%', quantity: 2, reward: '초호기 대형 피규어' },
        { rank: 'B', probability: '6%', quantity: 6, reward: '아스카/레이 피규어' },
        { rank: 'C', probability: '19%', quantity: 16, reward: '아트보드' },
        { rank: 'D', probability: '33%', quantity: 24, reward: '머그컵' },
        { rank: 'E', probability: '35%', quantity: 28, reward: '메탈 키링' },
        { rank: 'LAST', probability: '5%', quantity: 4, reward: '아스카 스페셜' }
      ]
    },
    {
      id: 'pokemon-palette',
      title: '포켓몬 PALLET 컬렉션 쿠지',
      brand: '타카라토미',
      series: 'game',
      releaseMonth: '2026-03',
      price: 9800,
      remain: 56,
      status: '판매중',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=900&q=80',
      grades: [
        { rank: 'A', probability: '3%', quantity: 2, reward: '피카츄 라이트 피규어' },
        { rank: 'B', probability: '9%', quantity: 8, reward: '이브이 쿠션' },
        { rank: 'C', probability: '20%', quantity: 16, reward: '포스터 세트' },
        { rank: 'D', probability: '28%', quantity: 20, reward: '텀블러' },
        { rank: 'E', probability: '35%', quantity: 30, reward: '스티커 팩' },
        { rank: 'LAST', probability: '5%', quantity: 4, reward: '뮤 스페셜 라스트원' }
      ]
    },
    {
      id: 'gundam-seed-freedom',
      title: '건담 SEED FREEDOM 프리미엄 쿠지',
      brand: '반다이',
      series: 'movie',
      releaseMonth: '2026-04',
      price: 13500,
      remain: 24,
      status: '곧 마감',
      image: 'https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?auto=format&fit=crop&w=900&q=80',
      grades: [
        { rank: 'A', probability: '2%', quantity: 2, reward: '스트라이크 프리덤 흉상' },
        { rank: 'B', probability: '7%', quantity: 6, reward: '아크릴 디오라마' },
        { rank: 'C', probability: '19%', quantity: 16, reward: '파일 세트' },
        { rank: 'D', probability: '31%', quantity: 24, reward: '랜덤 컵받침' },
        { rank: 'E', probability: '36%', quantity: 28, reward: '캔배지 세트' },
        { rank: 'LAST', probability: '5%', quantity: 4, reward: '메탈릭 사양 한정상' }
      ]
    }
  ];

  const seedData = {
    orders: [
      {
        orderId: 'ORD-20260110-1001',
        productId: 'onepiece-egghead',
        productTitle: '원피스 Egghead 이치방 쿠지',
        qty: 2,
        grade: 'B',
        reward: '조로 배틀 포즈',
        createdAt: '2026-01-10T12:33:00.000Z'
      },
      {
        orderId: 'ORD-20260117-1044',
        productId: 'eva-rise',
        productTitle: '에반게리온 RISE 럭키쿠지',
        qty: 1,
        grade: 'D',
        reward: '머그컵',
        createdAt: '2026-01-17T03:05:00.000Z'
      }
    ],
    inventory: [
      {
        orderId: 'ORD-20260110-1001',
        productTitle: '원피스 Egghead 이치방 쿠지',
        reward: '조로 배틀 포즈',
        grade: 'B',
        status: 'Stored'
      },
      {
        orderId: 'ORD-20260117-1044',
        productTitle: '에반게리온 RISE 럭키쿠지',
        reward: '머그컵',
        grade: 'D',
        status: 'Stored'
      }
    ],
    shipping: [
      {
        name: '김피규',
        phone: '010-1234-5678',
        addr: '서울시 마포구 독막로 00, 101동 1204호',
        createdAt: '2026-01-18T08:20:00.000Z'
      }
    ]
  };

  const KRW = (n) => `${n.toLocaleString('ko-KR')}원`;

  const read = (k, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const seedIfMissing = () => {
    if (!localStorage.getItem(KEY.orders)) write(KEY.orders, seedData.orders);
    if (!localStorage.getItem(KEY.inventory)) write(KEY.inventory, seedData.inventory);
    if (!localStorage.getItem(KEY.shipping)) write(KEY.shipping, seedData.shipping);
  };

  seedIfMissing();

  const getOrders = () => read(KEY.orders, []);
  const addOrder = (order) => {
    const orders = getOrders();
    orders.push(order);
    write(KEY.orders, orders);
  };

  const getInventory = () => read(KEY.inventory, []);
  const addInventory = (item) => {
    const inv = getInventory();
    inv.push(item);
    write(KEY.inventory, inv);
  };

  const addShipping = (request) => {
    const data = read(KEY.shipping, []);
    data.push(request);
    write(KEY.shipping, data);
  };

  window.FIGU = {
    kujiItems,
    KRW,
    getOrders,
    addOrder,
    getInventory,
    addInventory,
    addShipping
  };
})();
