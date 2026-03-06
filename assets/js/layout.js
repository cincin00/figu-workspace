(() => {
  const page = document.body.dataset.page || 'home';
  const pageMeta = {
    home: { title: '홈', desc: '신규/인기 쿠지를 빠르게 탐색하고 신뢰 정보를 먼저 확인할 수 있어요.' },
    kuji: { title: '쿠지 리스트', desc: '브랜드·가격·남은 수량 기준으로 쿠지를 비교해 보세요.' },
    detail: { title: '쿠지 상세', desc: '결제 전 확률/구성/총비용 정보를 한 화면에서 확인할 수 있어요.' },
    draw: { title: '결제·즉시추첨', desc: '필수 고지 동의 후 바로 결제하고 결과를 즉시 확인합니다.' },
    result: { title: '추첨 결과', desc: '획득한 경품을 확인하고 보관 또는 배송 단계로 이동하세요.' },
    mypage: { title: '마이라운지', desc: '보관함 아이템과 주문 로그를 한 번에 관리하세요.' },
    shipping: { title: '배송관리', desc: '배송 정보 입력, 최근 요청 확인을 한 화면에서 처리할 수 있어요.' },
    help: { title: '고객센터', desc: '자주 묻는 질문을 검색해 정책과 이용 방법을 빠르게 찾을 수 있습니다.' },
  };

  const flow = [
    { key: 'home', label: '탐색' },
    { key: 'detail', label: '상세 확인' },
    { key: 'draw', label: '결제·추첨' },
    { key: 'result', label: '결과 확인' },
    { key: 'mypage', label: '보관/배송' },
  ];

  const visibleActive =
    page === 'kuji' ? 'home' : page === 'shipping' ? 'mypage' : page === 'help' ? 'home' : page;

  const intro = document.createElement('section');
  intro.className = 'container mockup-layout panel';
  intro.innerHTML = `
    <div class="layout-head">
      <p class="kicker">Mockup Common Layout</p>
      <h2>${pageMeta[page]?.title || 'Figu Lounge'}</h2>
      <p class="muted">${pageMeta[page]?.desc || ''}</p>
    </div>
    <div class="flow-chips">
      ${flow
        .map(
          (step, idx) =>
            `<span class="flow-chip ${step.key === visibleActive ? 'active' : ''}">${idx + 1}. ${step.label}</span>`
        )
        .join('')}
    </div>
  `;

  const main = document.querySelector('main');
  if (main) {
    main.before(intro);
  }

  if (!document.querySelector('.footer')) {
    const footer = document.createElement('footer');
    footer.className = 'container footer';
    footer.textContent = '이용약관 · 개인정보처리방침 · 환불정책 · 확률고지';
    document.body.appendChild(footer);
  }
})();
