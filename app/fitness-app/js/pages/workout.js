import { el } from '../utils.js';
import { getState, dispatch } from '../store.js';

const plans = {
  cut: {
    name: '减脂训练计划',
    days: [
      { name: 'Push Day', focus: '胸·肩·三头', exercises: [
        { name: '平板卧推', sets: 4, reps: '8-10' },
        { name: '上斜哑铃推举', sets: 3, reps: '10-12' },
        { name: '侧平举', sets: 4, reps: '12-15' },
        { name: '绳索下压', sets: 3, reps: '12-15' },
        { name: 'Burpee 跳', sets: 3, reps: '15' }
      ]},
      { name: 'Pull Day', focus: '背·二头', exercises: [
        { name: '硬拉', sets: 4, reps: '6-8' },
        { name: '引体向上', sets: 4, reps: '8-10' },
        { name: '坐姿划船', sets: 3, reps: '10-12' },
        { name: '哑铃弯举', sets: 3, reps: '12-15' },
        { name: '面拉', sets: 3, reps: '15' }
      ]},
      { name: 'Leg Day', focus: '腿·核心', exercises: [
        { name: '深蹲', sets: 4, reps: '8-10' },
        { name: '罗马尼亚硬拉', sets: 3, reps: '10-12' },
        { name: '腿举', sets: 3, reps: '12-15' },
        { name: '提踵', sets: 4, reps: '15-20' },
        { name: '平板支撑', sets: 3, reps: '60s' }
      ]}
    ]
  },
  bulk: {
    name: '增肌训练计划',
    days: [
      { name: 'Push Day', focus: '胸·肩·三头', exercises: [
        { name: '平板卧推', sets: 5, reps: '6-8' },
        { name: '上斜哑铃推举', sets: 4, reps: '8-10' },
        { name: '哑铃飞鸟', sets: 3, reps: '10-12' },
        { name: '杠铃推举', sets: 4, reps: '8-10' },
        { name: '窄距卧推', sets: 3, reps: '10-12' }
      ]},
      { name: 'Pull Day', focus: '背·二头', exercises: [
        { name: '硬拉', sets: 5, reps: '5-6' },
        { name: '杠铃划船', sets: 4, reps: '8-10' },
        { name: '高位下拉', sets: 4, reps: '8-10' },
        { name: '杠铃弯举', sets: 3, reps: '10-12' },
        { name: '锤式弯举', sets: 3, reps: '10-12' }
      ]},
      { name: 'Leg Day', focus: '腿·核心', exercises: [
        { name: '深蹲', sets: 5, reps: '6-8' },
        { name: '腿举', sets: 4, reps: '8-10' },
        { name: '腿弯举', sets: 3, reps: '10-12' },
        { name: '提踵', sets: 4, reps: '15-20' },
        { name: '负重卷腹', sets: 3, reps: '15' }
      ]}
    ]
  },
  maintain: {
    name: '维持训练计划',
    days: [
      { name: '全身训练 A', focus: '上肢主导', exercises: [
        { name: '卧推', sets: 3, reps: '8-10' },
        { name: '划船', sets: 3, reps: '8-10' },
        { name: '推举', sets: 3, reps: '10-12' }
      ]},
      { name: '全身训练 B', focus: '下肢主导', exercises: [
        { name: '深蹲', sets: 3, reps: '8-10' },
        { name: '硬拉', sets: 3, reps: '6-8' },
        { name: '弓步蹲', sets: 3, reps: '10/side' }
      ]}
    ]
  }
};

export function workoutPage() {
  const content = document.getElementById('content');
  const { profile } = getState();
  const currentPlan = plans[profile.goal] || plans.maintain;

  function render() {
    content.innerHTML = '';

    const goals = [
      { key: 'cut', label: '减脂', icon: '🔥' },
      { key: 'bulk', label: '增肌', icon: '💪' },
      { key: 'maintain', label: '维持', icon: '⚖️' }
    ];

    content.appendChild(
      el('div', { style: 'max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:18px;' },
        el('div', { className: 'card' },
          el('div', { className: 'stat-label', style: 'margin-bottom:12px;' }, '训练目标'),
          el('div', { style: 'display:flex;gap:8px;' },
            ...goals.map(g => el('button', {
              className: `btn ${g.key === profile.goal ? 'btn-primary' : 'btn-ghost'}`,
              style: 'flex:1;',
              onClick: () => { dispatch('UPDATE_GOAL', g.key); }
            }, `${g.icon} ${g.label}`))
          )
        ),

        el('div', { style: 'font-size:18px;font-weight:700;' }, currentPlan.name),

        ...currentPlan.days.map((day, i) => el('div', { className: 'card' },
          el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;' },
            el('div', {},
              el('div', { style: 'font-weight:600;font-size:16px;' }, day.name),
              el('div', { style: 'color:#6B7280;font-size:12px;' }, day.focus)
            ),
            el('div', { style: 'background:rgba(108,255,143,0.1);color:#6CFF8F;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;' }, `Day ${i + 1}`)
          ),
          el('div', { style: 'display:flex;flex-direction:column;gap:0;' },
            ...day.exercises.map((ex, j) => el('div', {
              style: `display:flex;justify-content:space-between;align-items:center;padding:10px 0;${j < day.exercises.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.04);' : ''}`
            },
              el('span', { style: 'color:#fff;' }, ex.name),
              el('span', { style: 'color:#A7B0C0;font-size:13px;' }, `${ex.sets}×${ex.reps}`)
            ))
          )
        ))
      )
    );
  }

  render();
  return { destroy: () => {} };
}
