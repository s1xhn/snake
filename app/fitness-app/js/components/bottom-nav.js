import { el } from '../utils.js';
import { navigate } from '../router.js';

const items = [
  { hash: '/dashboard', label: '首页' },
  { hash: '/food', label: '饮食' },
  { hash: '/workout', label: '训练' },
  { hash: '/vision', label: '识别' },
  { hash: '/profile', label: '我的' }
];

export function renderBottomNav() {
  const container = document.getElementById('bottom-nav');
  if (!container) return;
  const current = window.location.hash.slice(1) || '/dashboard';

  container.innerHTML = '';
  items.forEach(item => {
    const active = current.startsWith(item.hash);
    const navItem = el('div', {
      style: `flex:1;text-align:center;padding:6px 0;cursor:pointer;`,
      onClick: () => navigate(item.hash)
    },
      active ? el('div', { style: 'width:24px;height:2px;background:#6CFF8F;border-radius:1px;margin:0 auto 4px;' }) : '',
      el('span', { style: `font-size:11px;${active ? 'color:#6CFF8F;font-weight:600;' : 'color:#6B7280;'}` }, item.label)
    );
    container.appendChild(navItem);
  });
}
