import { el, today } from '../utils.js';
import { navigate } from '../router.js';
import { getState, dispatch, getDailyTotals, subscribe } from '../store.js';

export function foodLogPage() {
  const content = document.getElementById('content');
  let unsub;

  function render() {
    const state = getState();
    const d = today();
    const log = state.dailyLog[d] || { breakfast: [], lunch: [], dinner: [] };
    const totals = getDailyTotals(d);
    const meals = [
      { key: 'breakfast', label: '早餐', emoji: '🌅' },
      { key: 'lunch', label: '午餐', emoji: '☀️' },
      { key: 'dinner', label: '晚餐', emoji: '🌙' }
    ];

    content.innerHTML = '';

    const mealSection = (meal) => {
      const items = log[meal.key] || [];
      const section = el('div', { className: 'card' },
        el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;' },
          el('div', { style: 'font-weight:600;' }, `${meal.emoji} ${meal.label}`),
          el('button', {
            className: 'btn btn-ghost', style: 'padding:6px 12px;font-size:12px;',
            onClick: () => navigate('/food')
          }, '+ 添加')
        )
      );

      if (items.length === 0) {
        section.appendChild(el('div', { style: 'color:#6B7280;font-size:13px;padding:12px 0;' }, '尚未记录'));
      } else {
        items.forEach(item => {
          const food = state.foodDB.find(f => f.id === item.foodId);
          if (!food) return;
          const scale = item.amount / 100;
          section.appendChild(el('div', {
            style: 'display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);'
          },
            el('div', {},
              el('div', { style: 'color:#fff;font-weight:500;' }, food.name),
              el('div', { style: 'color:#6B7280;font-size:12px;' }, `${item.amount}g · ${Math.round(food.kcal * scale)} kcal`)
            ),
            el('button', {
              className: 'btn btn-ghost', style: 'padding:4px 8px;font-size:11px;color:#E63946;',
              onClick: () => { dispatch('REMOVE_FOOD', { meal: meal.key, foodId: item.foodId }); }
            }, '删除')
          ));
        });
      }
      return section;
    };

    content.appendChild(
      el('div', { style: 'max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:18px;' },
        el('div', { className: 'card' },
          el('div', { style: 'font-size:16px;font-weight:700;margin-bottom:12px;' }, '今日总摄入'),
          el('div', { style: 'display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:center;' },
            el('div', {}, el('div', { style: 'color:#6CFF8F;font-size:24px;font-weight:700;' }, totals.kcal), el('div', { style: 'color:#6B7280;font-size:11px;' }, 'kcal')),
            el('div', {}, el('div', { style: 'color:#E63946;font-size:24px;font-weight:700;' }, totals.protein), el('div', { style: 'color:#6B7280;font-size:11px;' }, '蛋白质')),
            el('div', {}, el('div', { style: 'color:#81be32;font-size:24px;font-weight:700;' }, totals.carbs), el('div', { style: 'color:#6B7280;font-size:11px;' }, '碳水')),
            el('div', {}, el('div', { style: 'color:#FFB703;font-size:24px;font-weight:700;' }, totals.fat), el('div', { style: 'color:#6B7280;font-size:11px;' }, '脂肪'))
          )
        ),

        ...meals.map(mealSection),

        el('button', {
          className: 'btn btn-outline', style: 'width:100%;',
          onClick: () => navigate('/food')
        }, '添加更多食物')
      )
    );
  }

  render();
  unsub = subscribe(render);
  return { destroy: () => { if (unsub) unsub(); } };
}
