import { el, animateNumber, calcBMR, calcTDEE, goalCalories, macroSplit } from '../utils.js';
import { getState, dispatch } from '../store.js';

export function calculatorPage() {
  const content = document.getElementById('content');
  const state = getState();
  const { profile } = state;

  function render() {
    content.innerHTML = '';

    const inputGroup = (label, children) => el('div', {},
      el('div', { className: 'stat-label', style: 'margin-bottom:6px;' }, label),
      ...children
    );

    const selectInput = (options, selected) => {
      const sel = el('select', { style: 'width:100%;background:#111823;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;color:#fff;font-size:14px;' });
      options.forEach(o => {
        const opt = el('option', { value: o.value }, o.label);
        if (o.value === selected) opt.selected = true;
        sel.appendChild(opt);
      });
      return sel;
    };

    const numInput = (placeholder, value, unit) => el('div', { style: 'position:relative;' },
      el('input', {
        type: 'number', placeholder, value,
        style: 'width:100%;background:#111823;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px 48px 12px 12px;color:#fff;font-size:14px;outline:none;'
      }),
      el('span', { style: 'position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#6B7280;font-size:12px;pointer-events:none;' }, unit)
    );

    let bmr = 0, tdee = 0;

    content.appendChild(
      el('div', { style: 'max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:18px;' },
        el('div', { className: 'card' },
          el('div', { style: 'font-size:16px;font-weight:700;margin-bottom:16px;' }, '身体数据'),
          el('div', { className: 'grid-2', style: 'margin-bottom:12px;' },
            inputGroup('性别', [
              selectInput([{ value: 'male', label: '男' }, { value: 'female', label: '女' }], profile.gender)
            ]),
            inputGroup('年龄', [numInput('年龄', profile.age, '岁')])
          ),
          el('div', { className: 'grid-2', style: 'margin-bottom:12px;' },
            inputGroup('身高', [numInput('身高', profile.height, 'cm')]),
            inputGroup('体重', [numInput('体重', profile.weight, 'kg')])
          ),
          el('div', { style: 'margin-bottom:12px;' },
            inputGroup('活动水平', [
              selectInput([
                { value: 'sedentary', label: '久坐不动' },
                { value: 'light', label: '轻度活动 (1-2天/周)' },
                { value: 'moderate', label: '中度活动 (3-5天/周)' },
                { value: 'active', label: '高强度活动 (6-7天/周)' },
                { value: 'intense', label: '运动员级别' }
              ], profile.activityLevel)
            ])
          ),
          el('button', {
            className: 'btn btn-primary', style: 'width:100%;margin-top:8px;',
            onClick: () => {
              const inputs = content.querySelectorAll('input');
              const selects = content.querySelectorAll('select');
              const gender = selects[0].value;
              const age = +inputs[0].value;
              const height = +inputs[1].value;
              const weight = +inputs[2].value;
              const level = selects[1].value;
              bmr = calcBMR(gender, weight, height, age);
              tdee = calcTDEE(bmr, level);
              dispatch('UPDATE_PROFILE', { gender, age, height, weight, activityLevel: level });

              document.getElementById('result-bmr').textContent = '0';
              document.getElementById('result-tdee').textContent = '0';
              document.getElementById('result-cut').textContent = '0';
              document.getElementById('result-bulk').textContent = '0';
              document.getElementById('results').style.display = 'block';

              setTimeout(() => {
                animateNumber(document.getElementById('result-bmr'), 0, bmr);
                animateNumber(document.getElementById('result-tdee'), 0, tdee);
                animateNumber(document.getElementById('result-cut'), 0, tdee - 500);
                animateNumber(document.getElementById('result-bulk'), 0, tdee + 300);
              }, 100);
            }
          }, '开始计算')
        ),
        el('div', { id: 'results', className: 'card', style: 'display:none;' },
          el('div', { style: 'font-size:16px;font-weight:700;margin-bottom:16px;' }, '计算结果'),
          el('div', { className: 'grid-2', style: 'margin-bottom:16px;' },
            el('div', { style: 'text-align:center;padding:16px;background:#111823;border-radius:12px;' },
              el('div', { style: 'color:#6B7280;font-size:11px;margin-bottom:4px;' }, '基础代谢率 (BMR)'),
              el('div', { id: 'result-bmr', className: 'stat-number', style: 'color:#6CFF8F;' }, '—'),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, 'kcal/day')
            ),
            el('div', { style: 'text-align:center;padding:16px;background:#111823;border-radius:12px;' },
              el('div', { style: 'color:#6B7280;font-size:11px;margin-bottom:4px;' }, '每日总消耗 (TDEE)'),
              el('div', { id: 'result-tdee', className: 'stat-number', style: 'color:#4DA3FF;' }, '—'),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, 'kcal/day')
            )
          ),
          el('div', { className: 'grid-2' },
            el('div', { style: 'text-align:center;padding:16px;background:#111823;border-radius:12px;' },
              el('div', { style: 'color:#6B7280;font-size:11px;margin-bottom:4px;' }, '减脂热量'),
              el('div', { id: 'result-cut', className: 'stat-number', style: 'color:#FFB74D;' }, '—'),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, 'kcal/day')
            ),
            el('div', { style: 'text-align:center;padding:16px;background:#111823;border-radius:12px;' },
              el('div', { style: 'color:#6B7280;font-size:11px;margin-bottom:4px;' }, '增肌热量'),
              el('div', { id: 'result-bulk', className: 'stat-number', style: 'color:#E63946;' }, '—'),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, 'kcal/day')
            )
          )
        )
      )
    );
  }

  render();
  return { destroy: () => {} };
}
