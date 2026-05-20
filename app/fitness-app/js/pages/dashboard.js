import { el, today, animateNumber } from '../utils.js';
import { navigate } from '../router.js';
import { getState, getDailyTotals, subscribe } from '../store.js';
import { calcBMR, calcTDEE, goalCalories, macroSplit } from '../utils.js';

export function dashboardPage() {
  const content = document.getElementById('content');
  let unsub;

  function render() {
    const state = getState();
    const { profile, weightHistory } = state;
    const totals = getDailyTotals(today());
    const bmr = calcBMR(profile.gender, profile.weight, profile.height, profile.age);
    const tdee = calcTDEE(bmr, profile.activityLevel);
    const goal = goalCalories(tdee, profile.goal);
    const macros = macroSplit(goal, profile.goal);
    const lastWeight = weightHistory[weightHistory.length - 1];
    const prevWeight = weightHistory[weightHistory.length - 2];
    const weightDiff = prevWeight ? (lastWeight.weight - prevWeight.weight).toFixed(1) : '0.0';

    content.innerHTML = '';

    const quickIcon = (name) => {
      const icons = {
        calc: '<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 1v6l5 3M8 7L3 4M8 7v8" stroke="#6CFF8F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        vision: '<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="10" rx="2" stroke="#4DA3FF" stroke-width="1.2"/><circle cx="8" cy="7" r="2" stroke="#4DA3FF" stroke-width="1.2"/></svg>',
        food: '<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#FFB74D" stroke-width="1.2"/><path d="M5.5 8h5M8 5.5v5" stroke="#FFB74D" stroke-width="1.2" stroke-linecap="round"/></svg>',
        workout: '<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="5" height="12" rx="1" stroke="#A7B0C0" stroke-width="1.2"/><rect x="10" y="2" width="5" height="12" rx="1" stroke="#A7B0C0" stroke-width="1.2"/></svg>'
      };
      return icons[name] || '';
    };

    const quickEntry = (label, route, iconName, bgColor) => el('div', {
      className: 'card-sm', style: `text-align:center;cursor:pointer;border:1px solid rgba(255,255,255,0.04);`,
      onClick: () => navigate(route)
    },
      el('div', { style: `width:40px;height:40px;border-radius:10px;background:${bgColor};margin:0 auto 10px;display:flex;align-items:center;justify-content:center;`, innerHTML: quickIcon(iconName) }),
      el('div', { style: 'color:#fff;font-size:13px;font-weight:600;' }, label)
    );

    const macroRow = (label, current, target, color) => el('div', {},
      el('div', { className: 'macro-label' },
        el('span', { style: 'color:#A7B0C0;' }, label),
        el('span', { style: 'color:#fff;font-weight:600;' }, current + el('span', { style: 'color:#6B7280;font-weight:400;font-size:12px;' }, ` / ${target}g`).outerHTML)
      ),
      el('div', { className: 'progress-bar' },
        el('div', { className: 'progress-fill', style: `width:${Math.min((current/target)*100, 100)}%;background:${color};` })
      )
    );

    content.appendChild(
      el('div', { style: 'display:flex;flex-direction:column;gap:18px;' },
        // Row 1: 热量大卡 + 宏量营养素
        el('div', { className: 'grid-2' },
          el('div', { className: 'card', style: 'position:relative;overflow:hidden;' },
            el('div', { style: 'position:absolute;right:-20px;top:-20px;width:100px;height:100px;border:2px solid rgba(108,255,143,0.08);border-radius:50%;' }),
            el('div', { style: 'position:absolute;right:-8px;top:-8px;width:76px;height:76px;border:2px solid rgba(108,255,143,0.12);border-radius:50%;' }),
            el('div', { className: 'stat-label' }, '今日摄入'),
            el('div', { className: 'stat-number', id: 'stat-kcal', style: 'color:#fff;margin:6px 0;' }, '0'),
            el('div', { style: 'color:#6CFF8F;font-size:14px;' }, `kcal · 剩余 ${Math.max(goal - totals.kcal, 0)}`)
          ),
          el('div', { className: 'card' },
            el('div', { className: 'stat-label', style: 'margin-bottom:12px;' }, '宏量营养素'),
            el('div', { style: 'display:flex;flex-direction:column;gap:12px;' },
              macroRow('碳水', totals.carbs, macros.carbs, '#81be32'),
              macroRow('蛋白质', totals.protein, macros.protein, '#E63946'),
              macroRow('脂肪', totals.fat, macros.fat, '#FFB703')
            )
          )
        ),
        // Row 2: 快捷入口
        el('div', { className: 'grid-4' },
          quickEntry('热量计算', '/calculator', 'calc', 'rgba(108,255,143,0.1)'),
          quickEntry('拍照识别', '/vision', 'vision', 'rgba(77,163,255,0.1)'),
          quickEntry('食物查询', '/food', 'food', 'rgba(255,183,77,0.1)'),
          quickEntry('训练计划', '/workout', 'workout', 'rgba(255,255,255,0.05)')
        ),
        // Row 3: 体重趋势 + 当前体重
        el('div', { className: 'grid-2' },
          el('div', { className: 'card' },
            el('div', { className: 'stat-label' }, '体重趋势'),
            el('div', { style: 'display:flex;align-items:flex-end;gap:8px;height:80px;margin-top:8px;' },
              ...weightHistory.map((w, i) => {
                const maxW = Math.max(...weightHistory.map(x => x.weight));
                const minW = Math.min(...weightHistory.map(x => x.weight));
                const range = maxW - minW || 1;
                const h = ((w.weight - minW) / range) * 60 + 20;
                return el('div', { style: `flex:1;height:${h}%;background:rgba(108,255,143,${0.1 + i*0.03});border-radius:3px 3px 0 0;` });
              })
            ),
            el('div', { style: 'display:flex;justify-content:space-between;margin-top:8px;' },
              ...weightHistory.map(w => el('span', { style: 'color:#6B7280;font-size:10px;' }, w.date.slice(5)))
            )
          ),
          el('div', { className: 'card', style: 'display:flex;flex-direction:column;justify-content:space-between;' },
            el('div', {},
              el('div', { className: 'stat-label' }, '当前体重'),
              el('div', { style: 'font-size:36px;font-weight:800;letter-spacing:-1px;margin:6px 0;' }, String(lastWeight.weight)),
              el('div', { style: `color:${+weightDiff < 0 ? '#6CFF8F' : '#E63946'};font-size:13px;` }, `kg · ${+weightDiff >= 0 ? '↑' : '↓'} ${Math.abs(+weightDiff)}`)
            ),
            el('div', { style: 'border-top:1px solid rgba(255,255,255,0.06);padding-top:16px;' },
              el('div', { style: 'display:flex;justify-content:space-between;' },
                el('span', { style: 'color:#6B7280;font-size:12px;' }, 'BMI'),
                el('span', { style: 'color:#4DA3FF;font-size:14px;font-weight:600;' }, (profile.weight / ((profile.height/100) ** 2)).toFixed(1))
              )
            )
          )
        )
      )
    );

    setTimeout(() => {
      const kcalEl = document.getElementById('stat-kcal');
      if (kcalEl) animateNumber(kcalEl, 0, totals.kcal);
    }, 100);
  }

  render();
  unsub = subscribe(render);
  return { destroy: () => { if (unsub) unsub(); } };
}
