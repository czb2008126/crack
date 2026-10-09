const filters = document.querySelectorAll('[data-filter]');
const milestones = document.querySelectorAll('.timeline > li');
const status = document.querySelector('#filter-status');
document.documentElement.classList.add('js-enabled');

for (const button of filters) {
  button.addEventListener('click', () => {
    let visible = 0;
    for (const milestone of milestones) {
      milestone.hidden = button.dataset.filter !== 'all' && milestone.dataset.region !== button.dataset.filter;
      if (!milestone.hidden) visible++;
    }
    for (const filter of filters) {
      const selected = filter === button;
      filter.classList.toggle('selected', selected);
      filter.setAttribute('aria-pressed', String(selected));
    }
    status.textContent = `${button.textContent}，显示 ${visible} 条历史足迹。`;
  });
}
