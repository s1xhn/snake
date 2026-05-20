import { el } from '../utils.js';
import { navigate } from '../router.js';
import { getState } from '../store.js';

export function foodPage() {
  const content = document.getElementById('content');
  let searchTerm = '';
  let category = '全部';

  function render() {
    const { foodDB } = getState();
    const categories = ['全部', '主食', '肉类', '蔬菜', '零食', '饮料'];
    let filtered = foodDB.filter(f => f.name.includes(searchTerm));
    if (category !== '全部') filtered = filtered.filter(f => f.category === category);

    content.innerHTML = '';

    const searchInput = el('input', {
      type: 'text', placeholder: '搜索食物...', value: searchTerm,
      style: 'width:100%;background:#1A2230;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px 16px;color:#fff;font-size:14px;outline:none;margin-bottom:16px;',
      onInput: (e) => { searchTerm = e.target.value; render(); }
    });

    const tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:16px;overflow-x:auto;' });
    categories.forEach(cat => {
      tabs.appendChild(el('div', {
        style: `padding:8px 16px;border-radius:20px;font-size:13px;cursor:pointer;white-space:nowrap;${cat === category ? 'background:#6CFF8F;color:#0B0F14;font-weight:600;' : 'background:#1A2230;color:#A7B0C0;'}`,
        onClick: () => { category = cat; render(); }
      }, cat));
    });

    const grid = el('div', { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;' });
    filtered.forEach(food => {
      const colors = { '主食': '#FFB74D', '肉类': '#E63946', '蔬菜': '#6CFF8F', '零食': '#4DA3FF', '饮料': '#A7B0C0' };
      grid.appendChild(el('div', {
        className: 'card-sm', style: 'cursor:pointer;border:1px solid rgba(255,255,255,0.04);',
        onClick: () => navigate(`/food/detail/${food.id}`)
      },
        el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;' },
          el('div', {},
            el('div', { style: 'color:#fff;font-weight:600;font-size:15px;' }, food.name),
            el('div', { style: 'color:#6B7280;font-size:12px;' }, food.unit)
          ),
          el('div', { style: `background:${colors[food.category] || '#6B7280'};color:#0B0F14;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;` }, food.category)
        ),
        el('div', { style: 'display:flex;gap:12px;font-size:12px;color:#A7B0C0;' },
          el('span', {}, `${food.kcal} kcal`),
          el('span', {}, `P:${food.protein}g`),
          el('span', {}, `C:${food.carbs}g`),
          el('span', {}, `F:${food.fat}g`)
        )
      ));
    });

    const logBtn = el('button', {
      className: 'btn btn-outline', style: 'width:100%;margin-top:16px;',
      onClick: () => navigate('/food/log')
    }, '查看今日饮食记录');

    content.appendChild(el('div', {}, searchInput, tabs, grid, logBtn));
  }

  render();
  return { destroy: () => {} };
}
