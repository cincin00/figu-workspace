(function () {
  const { products, getStock, setStock, pushHistory } = window.FIGU_DATA;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const paid = params.get('paid') === '1';

  const product = products.find((item) => item.id === productId);
  const titleEl = document.getElementById('draw-title');
  const capsule = document.getElementById('capsule');
  const capsuleInner = capsule.querySelector('.capsule-inner');
  const startButton = document.getElementById('draw-start');
  const statusEl = document.getElementById('draw-status');

  if (!product || !paid) {
    titleEl.textContent = '잘못된 접근입니다.';
    startButton.disabled = true;
    statusEl.textContent = '상품 상세에서 결제를 완료한 뒤 추첨 페이지로 이동해주세요.';
    return;
  }

  titleEl.textContent = `${product.title} 추첨`;

  function pickWeightedGrade(grades, stock) {
    const available = grades.filter((grade) => (stock[grade.rank] ?? 0) > 0);
    if (!available.length) return null;

    const sum = available.reduce((acc, grade) => acc + grade.probability, 0);
    const random = Math.random() * sum;

    let threshold = 0;
    for (const grade of available) {
      threshold += grade.probability;
      if (random <= threshold) return grade;
    }

    return available[available.length - 1];
  }

  function drawOnce() {
    const stock = { ...getStock(product.id) };
    const grade = pickWeightedGrade(product.grades, stock);
    if (!grade) {
      statusEl.textContent = '모든 경품이 소진되었습니다. 다음 라인업을 기다려주세요.';
      return;
    }

    const reward = grade.rewards[Math.floor(Math.random() * grade.rewards.length)];
    stock[grade.rank] = Math.max(0, (stock[grade.rank] ?? 0) - 1);
    setStock(product.id, stock);

    pushHistory({
      productId: product.id,
      productTitle: product.title,
      rank: grade.rank,
      reward,
      createdAt: new Date().toISOString()
    });

    statusEl.innerHTML = `축하합니다! <strong>${grade.rank}상 · ${reward}</strong> 당첨 🎉`;
    capsuleInner.textContent = grade.rank;
    capsuleInner.style.color = grade.rank === 'A' || grade.rank === 'LAST' ? '#ffd166' : '#f0f4ff';
  }

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    statusEl.textContent = '캡슐 오픈 중...';
    capsule.classList.remove('animate');
    void capsule.offsetWidth;
    capsule.classList.add('animate');

    window.setTimeout(() => {
      drawOnce();
      startButton.textContent = '다시 추첨하기';
      startButton.disabled = false;
    }, 1300);
  });
})();
