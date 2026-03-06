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
      releaseMonth: '2026-02',
      price: 12000,
      remain: 48,
      status: '판매중',
      image: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&w=900&q=80',
      grades: [
        { rank: 'A', probability: '3%', reward: '루피 기어5 피규어' },
        { rank: 'B', probability: '8%', reward: '조로 배틀 포즈' },
        { rank: 'C', probability: '22%', reward: '아크릴 스탠드' },
        { rank: 'D', probability: '27%', reward: '러버 키링' },
        { rank: 'E', probability: '35%', reward: '캔뱃지' },
        { rank: 'LAST', probability: '5%', reward: '라스트원상 스페셜' }
      ]
    },
    {
      id: 'eva-rise',
      title: '에반게리온 RISE 럭키쿠지',
      brand: '세가',
      releaseMonth: '2026-01',
      price: 10500,
      remain: 31,
      status: '판매중',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
      grades: [
        { rank: 'A', probability: '2%', reward: '초호기 대형 피규어' },
        { rank: 'B', probability: '6%', reward: '아스카/레이 피규어' },
        { rank: 'C', probability: '19%', reward: '아트보드' },
        { rank: 'D', probability: '33%', reward: '머그컵' },
        { rank: 'E', probability: '35%', reward: '메탈 키링' },
        { rank: 'LAST', probability: '5%', reward: '아스카 스페셜' }
      ]
    }
  ];

  const KRW = (n) => `${n.toLocaleString('ko-KR')}원`;

  const read = (k, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

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
