(function () {
  const { kujiItems, addOrder, addInventory } = window.FIGU;
  const formatKRW = (value) => `${value.toLocaleString('ko-KR')}원`;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const qty = Math.max(1, Number(params.get('qty') || 1));
  const item = kujiItems.find((v) => v.id === id) || kujiItems[0];

  const titleEl = document.getElementById('draw-title');
  const summaryEl = document.getElementById('order-summary');
  const payBtn = document.getElementById('pay-draw-btn');
  const statusEl = document.getElementById('draw-status');
  const animationEl = document.getElementById('draw-animation');

  titleEl.textContent = `${item.title} Draw`;
  summaryEl.innerHTML = `Kuji: ${item.title}<br/>Price: ${formatKRW(item.price)}<br/>Quantity: ${qty}<br/>Total: ${formatKRW(item.price * qty)}`;

  const randomGrade = () => {
    const total = item.grades.reduce((sum, grade) => sum + grade.quantity, 0);
    let seed = Math.floor(Math.random() * total);
    for (const grade of item.grades) {
      seed -= grade.quantity;
      if (seed < 0) return grade;
    }
    return item.grades[item.grades.length - 1];
  };

  payBtn.addEventListener('click', () => {
    payBtn.disabled = true;
    statusEl.textContent = '결제 승인 완료. 추첨 진행 중...';
    animationEl.hidden = false;

    setTimeout(() => {
      const grade = randomGrade();
      const orderId = `ORD-${Date.now()}`;
      addOrder({ orderId, productId: item.id, productTitle: item.title, qty, grade: grade.rank, reward: grade.reward, createdAt: new Date().toISOString() });
      addInventory({ orderId, productTitle: item.title, reward: grade.reward, grade: grade.rank, status: 'Stored' });
      location.href = `result.html?orderId=${orderId}`;
    }, 1500);
  });
})();
