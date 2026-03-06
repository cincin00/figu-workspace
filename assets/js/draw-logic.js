(function () {
  const { kujiItems, KRW, addOrder, addInventory } = window.FIGU;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const qty = Number(params.get('qty') || 1);
  const item = kujiItems.find((v) => v.id === id);

  const titleEl = document.getElementById('draw-title');
  const summaryEl = document.getElementById('order-summary');
  const payBtn = document.getElementById('pay-draw-btn');
  const statusEl = document.getElementById('draw-status');

  if (!item) {
    titleEl.textContent = '존재하지 않는 쿠지입니다.';
    payBtn.disabled = true;
    return;
  }

  titleEl.textContent = `${item.title} 결제·즉시추첨`;
  summaryEl.innerHTML = `수량 ${qty} · 상품금액 ${KRW(item.price * qty)} · 예상배송비 ${KRW(3500)}`;

  const randomGrade = () => {
    const index = Math.floor(Math.random() * item.grades.length);
    return item.grades[index];
  };

  payBtn.addEventListener('click', () => {
    const checked = Array.from(document.querySelectorAll('input[type="checkbox"]')).every((v) => v.checked);
    if (!checked) {
      statusEl.textContent = '필수 고지(확률·철회·배송)를 모두 확인해주세요.';
      return;
    }

    payBtn.disabled = true;
    statusEl.textContent = '결제 승인 및 추첨 처리 중...';

    setTimeout(() => {
      const grade = randomGrade();
      const orderId = `ORD-${Date.now()}`;
      const reward = grade.reward;

      addOrder({ orderId, productId: item.id, productTitle: item.title, qty, grade: grade.rank, reward, createdAt: new Date().toISOString() });
      addInventory({ orderId, productTitle: item.title, reward, grade: grade.rank, status: '보관중' });

      location.href = `result.html?orderId=${orderId}`;
    }, 800);
  });
})();
