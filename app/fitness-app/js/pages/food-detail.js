import { el } from '../utils.js';
import { navigate } from '../router.js';
import { getState, dispatch } from '../store.js';

export function foodDetailPage(id) {
  const content = document.getElementById('content');
  const { foodDB } = getState();
  const food = foodDB.find(f => f.id === id);

  function render() {
    if (!food) { navigate('/food'); return; }
    content.innerHTML = '';

    const mealSelect = el('select', {
      style: 'width:100%;background:#111823;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;color:#fff;font-size:14px;margin-bottom:12px;'
    },
      el('option', { value: 'breakfast' }, '早餐'),
      el('option', { value: 'lunch' }, '午餐'),
      el('option', { value: 'dinner' }, '晚餐')
    );

    const amountInput = el('input', {
      type: 'number', placeholder: '克数', value: 100,
      style: 'width:100%;background:#111823;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;color:#fff;font-size:14px;outline:none;margin-bottom:12px;'
    });

    content.appendChild(
      el('div', { style: 'max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:18px;' },
        el('button', {
          className: 'btn btn-ghost', style: 'align-self:flex-start;',
          onClick: () => navigate('/food')
        }, '← 返回'),
        el('div', { className: 'card', style: 'text-align:center;' },
          el('div', { style: 'font-size:40px;margin-bottom:12px;' }, '🍽️'),
          el('div', { style: 'font-size:22px;font-weight:700;margin-bottom:4px;' }, food.name),
          el('div', { style: 'color:#6B7280;font-size:13px;' }, food.unit)
        ),
        el('div', { className: 'card' },
          el('div', { style: 'display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:center;' },
            el('div', {}, el('div', { style: 'color:#6CFF8F;font-size:24px;font-weight:700;' }, food.kcal), el('div', { style: 'color:#6B7280;font-size:11px;' }, 'kcal')),
            el('div', {}, el('div', { style: 'color:#E63946;font-size:24px;font-weight:700;' }, food.protein), el('div', { style: 'color:#6B7280;font-size:11px;' }, '蛋白质g')),
            el('div', {}, el('div', { style: 'color:#81be32;font-size:24px;font-weight:700;' }, food.carbs), el('div', { style: 'color:#6B7280;font-size:11px;' }, '碳水g')),
            el('div', {}, el('div', { style: 'color:#FFB703;font-size:24px;font-weight:700;' }, food.fat), el('div', { style: 'color:#6B7280;font-size:11px;' }, '脂肪g'))
          )
        ),
        el('div', { className: 'card' },
          el('div', { className: 'stat-label', style: 'margin-bottom:8px;' }, '加入今日饮食'),
          el('div', { className: 'stat-label', style: 'margin-bottom:6px;' }, '餐次'),
          mealSelect,
          el('div', { className: 'stat-label', style: 'margin-bottom:6px;' }, '份量 (g)'),
          amountInput,
          el('button', {
            className: 'btn btn-primary', style: 'width:100%;',
            onClick: () => {
              dispatch('ADD_FOOD', { meal: mealSelect.value, foodId: food.id, amount: +amountInput.value });
              navigate('/food/log');
            }
          }, '加入记录')
        )
      )
    );
  }

  render();
  return { destroy: () => {} };
}
