import { el } from '../utils.js';

const titles = {
  '/dashboard': 'Dashboard',
  '/calculator': 'AI 计算中心',
  '/food': '饮食系统',
  '/workout': '训练系统',
  '/vision': 'AI 识别',
  '/profile': '个人中心'
};

export function renderTopbar() {
  const container = document.getElementById('topbar');
  if (!container) return;
  const current = window.location.hash.slice(1) || '/dashboard';
  let title = 'Dashboard';
  for (const [k, v] of Object.entries(titles)) {
    if (current.startsWith(k)) { title = v; break; }
  }

  const now = new Date();
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${weekdays[now.getDay()]}`;

  container.innerHTML = '';
  container.appendChild(el('span', { style: 'color:#fff;font-weight:700;font-size:16px;letter-spacing:-0.2px;' }, title));
  container.appendChild(el('span', { style: 'color:#6B7280;font-size:12px;' }, dateStr));
}
