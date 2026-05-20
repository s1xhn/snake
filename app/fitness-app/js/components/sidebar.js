import { el } from '../utils.js';
import { navigate } from '../router.js';
import { getState } from '../store.js';

const navItems = [
  { hash: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { hash: '/calculator', label: 'AI 计算', icon: 'calc' },
  { hash: '/food', label: '饮食系统', icon: 'food' },
  { hash: '/workout', label: '训练系统', icon: 'workout' },
  { hash: '/vision', label: 'AI 识别', icon: 'vision' },
  { hash: '/profile', label: '个人中心', icon: 'profile' }
];

const icons = {
  dashboard: '<rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5" opacity="0.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" opacity="0.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" opacity="0.4"/>',
  calc: '<circle cx="8" cy="8" r="6"/><path d="M8 4v4l3 2" stroke-linecap="round"/>',
  food: '<path d="M2 4h12M2 8h12M2 12h12" stroke-linecap="round"/>',
  workout: '<circle cx="8" cy="8" r="6.5"/><path d="M5 8h6" stroke-linecap="round"/>',
  vision: '<rect x="1.5" y="2.5" width="13" height="10" rx="2"/><circle cx="8" cy="7" r="2"/>',
  profile: '<circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke-linecap="round"/>'
};

export function renderSidebar() {
  const container = document.getElementById('sidebar');
  if (!container) return;
  const current = window.location.hash.slice(1) || '/dashboard';

  container.innerHTML = '';

  const logo = el('div', { style: 'padding:28px 24px 20px;' },
    el('span', { style: 'color:#fff;font-weight:800;font-size:18px;letter-spacing:-0.3px;' }, 'Fitness OS')
  );

  const nav = el('div', { style: 'flex:1;padding:0 12px;' });
  navItems.forEach(item => {
    const active = current.startsWith(item.hash);
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '16'); svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', active ? '#6CFF8F' : '#6B7280');
    svg.setAttribute('stroke-width', '1.2');
    svg.innerHTML = icons[item.icon];

    const itemEl = el('div', {
      className: '',
      style: `border-radius:10px;padding:10px 14px;margin-bottom:2px;color:${active ? '#6CFF8F' : '#6B7280'};font-size:13px;${active ? 'font-weight:600;background:rgba(108,255,143,0.06);' : ''}display:flex;align-items:center;gap:10px;cursor:pointer;line-height:1;`,
      onClick: () => navigate(item.hash)
    }, svg, item.label);
    nav.appendChild(itemEl);
  });

  const { profile } = getState();
  const userSection = el('div', { style: 'padding:12px;margin:12px;' },
    el('div', { style: 'display:flex;align-items:center;gap:10px;padding:10px 12px;background:#1A2230;border-radius:10px;' },
      el('div', { style: 'width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6CFF8F,#4DA3FF);display:flex;align-items:center;justify-content:center;color:#0B0F14;font-weight:700;font-size:13px;' }, profile.nickname[0].toUpperCase()),
      el('div', {},
        el('div', { style: 'color:#fff;font-size:13px;font-weight:600;' }, profile.nickname),
        el('div', { style: 'color:#6B7280;font-size:11px;' }, profile.goal === 'cut' ? '减脂中' : profile.goal === 'bulk' ? '增肌中' : '维持中')
      )
    )
  );

  container.appendChild(logo);
  container.appendChild(nav);
  container.appendChild(userSection);
}
