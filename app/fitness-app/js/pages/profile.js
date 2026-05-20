import { el } from '../utils.js';
import { getState, dispatch, subscribe } from '../store.js';
import { calcBMR, calcTDEE } from '../utils.js';

export function profilePage() {
  const content = document.getElementById('content');
  let unsub;

  function render() {
    const { profile, weightHistory } = getState();
    const bmr = calcBMR(profile.gender, profile.weight, profile.height, profile.age);
    const tdee = calcTDEE(bmr, profile.activityLevel);
    const bmi = (profile.weight / ((profile.height / 100) ** 2)).toFixed(1);
    const lastW = weightHistory[weightHistory.length - 1];

    content.innerHTML = '';

    content.appendChild(
      el('div', { style: 'max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:18px;' },

        el('div', { className: 'card', style: 'display:flex;align-items:center;gap:16px;' },
          el('div', { style: 'width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#6CFF8F,#4DA3FF);display:flex;align-items:center;justify-content:center;color:#0B0F14;font-weight:800;font-size:28px;flex-shrink:0;' }, profile.nickname[0].toUpperCase()),
          el('div', {},
            el('div', { style: 'font-size:18px;font-weight:700;' }, profile.nickname),
            el('div', { style: 'color:#A7B0C0;font-size:13px;' }, `${profile.gender === 'male' ? '男' : '女'} · ${profile.age}岁 · ${profile.height}cm`),
            el('div', { style: 'color:#6CFF8F;font-size:12px;margin-top:2px;' }, profile.goal === 'cut' ? '目标：减脂' : profile.goal === 'bulk' ? '目标：增肌' : '目标：维持')
          )
        ),

        el('div', { className: 'card' },
          el('div', { className: 'stat-label', style: 'margin-bottom:12px;' }, '身体数据'),
          el('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;' },
            el('div', { style: 'background:#111823;border-radius:12px;padding:16px;' },
              el('div', { style: 'color:#fff;font-size:24px;font-weight:700;' }, String(lastW?.weight || profile.weight)),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, '体重 kg')
            ),
            el('div', { style: 'background:#111823;border-radius:12px;padding:16px;' },
              el('div', { style: 'color:#4DA3FF;font-size:24px;font-weight:700;' }, bmi),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, `BMI · ${bmi < 18.5 ? '偏瘦' : bmi < 24 ? '正常' : bmi < 28 ? '偏重' : '肥胖'}`)
            ),
            el('div', { style: 'background:#111823;border-radius:12px;padding:16px;' },
              el('div', { style: 'color:#6CFF8F;font-size:24px;font-weight:700;' }, tdee),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, 'TDEE')
            )
          )
        ),

        el('div', { className: 'card' },
          el('div', { className: 'stat-label', style: 'margin-bottom:12px;' }, '修改身体数据'),
          el('div', { style: 'display:flex;flex-direction:column;gap:10px;' },
            ['nickname', 'age', 'height', 'weight'].map(field => {
              const labels = { nickname: '昵称', age: '年龄', height: '身高 (cm)', weight: '体重 (kg)' };
              return el('div', { style: 'display:flex;align-items:center;gap:10px;' },
                el('span', { style: 'color:#A7B0C0;font-size:13px;width:80px;flex-shrink:0;' }, labels[field]),
                el('input', {
                  type: field === 'nickname' ? 'text' : 'number',
                  value: profile[field],
                  id: `profile-${field}`,
                  style: 'flex:1;background:#111823;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px;color:#fff;font-size:14px;outline:none;'
                })
              );
            }),
            el('button', {
              className: 'btn btn-primary', style: 'width:100%;margin-top:6px;',
              onClick: () => {
                const nickname = document.getElementById('profile-nickname').value;
                const age = +document.getElementById('profile-age').value;
                const height = +document.getElementById('profile-height').value;
                const weight = +document.getElementById('profile-weight').value;
                dispatch('UPDATE_PROFILE', { nickname, age, height, weight });
              }
            }, '保存修改')
          )
        ),

        el('div', { className: 'card' },
          el('div', { className: 'stat-label', style: 'margin-bottom:12px;' }, '体重记录'),
          el('div', { style: 'display:flex;flex-direction:column;gap:8px;' },
            ...weightHistory.slice().reverse().map(w => el('div', {
              style: 'display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);'
            },
              el('span', { style: 'color:#A7B0C0;' }, w.date),
              el('span', { style: 'color:#fff;font-weight:600;' }, `${w.weight} kg`)
            ))
          ),
          el('div', { style: 'display:flex;gap:10px;margin-top:12px;' },
            el('input', {
              type: 'number', placeholder: '今日体重', id: 'new-weight',
              style: 'flex:1;background:#111823;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px;color:#fff;font-size:14px;outline:none;'
            }),
            el('button', {
              className: 'btn btn-primary',
              onClick: () => {
                const w = +document.getElementById('new-weight').value;
                if (w > 0) { dispatch('ADD_WEIGHT', { weight: w }); document.getElementById('new-weight').value = ''; }
              }
            }, '记录')
          )
        ),

        el('div', { className: 'card' },
          el('div', { style: 'display:flex;gap:10px;' },
            el('button', {
              className: 'btn btn-ghost', style: 'flex:1;border:1px solid rgba(255,255,255,0.06);',
              onClick: () => {
                const data = JSON.stringify(getState(), null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'fitness-data.json';
                a.click();
              }
            }, '导出数据'),
            el('button', {
              className: 'btn btn-ghost', style: 'flex:1;border:1px solid rgba(255,255,255,0.06);color:#E63946;',
              onClick: () => { if (confirm('确定要重置所有数据？此操作不可撤销。')) dispatch('RESET_ALL'); }
            }, '重置数据')
          )
        )
      )
    );
  }

  render();
  unsub = subscribe(render);
  return { destroy: () => { if (unsub) unsub(); } };
}
