import { el } from '../utils.js';
import { navigate } from '../router.js';
import { dispatch } from '../store.js';

export function visionPage() {
  const content = document.getElementById('content');
  let result = null;

  const mockResults = [
    { name: '鸡腿饭', weight: 450, kcal: 720, protein: 35, carbs: 80, fat: 28 },
    { name: '牛肉面', weight: 500, kcal: 580, protein: 28, carbs: 65, fat: 22 },
    { name: '蔬菜沙拉', weight: 300, kcal: 180, protein: 5, carbs: 12, fat: 14 },
    { name: '三明治', weight: 250, kcal: 420, protein: 22, carbs: 38, fat: 18 },
    { name: '寿司拼盘', weight: 350, kcal: 510, protein: 24, carbs: 72, fat: 12 }
  ];

  function simulateScan() {
    content.innerHTML = '';
    result = null;

    const scanBox = el('div', {
      style: 'position:relative;width:100%;max-width:360px;margin:0 auto;height:280px;background:#1A2230;border:2px dashed rgba(255,255,255,0.1);border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;'
    },
      el('div', { style: 'color:#6B7280;text-align:center;' },
        el('div', { style: 'font-size:48px;margin-bottom:12px;' }, '📷'),
        el('div', { style: 'font-size:14px;' }, '扫描识别中...')
      )
    );

    const scanLine = el('div', {
      style: 'position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#6CFF8F,transparent);animation:scan 2s ease-in-out infinite;'
    });
    scanBox.appendChild(scanLine);

    const style = el('style', {}, `
      @keyframes scan { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
      @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `);

    content.appendChild(style);
    content.appendChild(el('div', { style: 'max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:18px;' },
      el('div', { className: 'card', style: 'text-align:center;' },
        el('div', { style: 'font-size:18px;font-weight:700;margin-bottom:16px;' }, 'AI 食物识别'),
        el('div', { style: 'margin-bottom:16px;' }, scanBox),
        el('div', {
          className: 'card-sm', style: 'text-align:center;padding:20px;cursor:pointer;border:1px solid rgba(255,255,255,0.06);',
          onClick: () => {
            result = mockResults[Math.floor(Math.random() * mockResults.length)];
            render();
          }
        }, '点击模拟上传图片（立即出结果）')
      ),
      el('div', { id: 'vision-result' })
    ));

    setTimeout(() => {
      if (!result) {
        result = mockResults[Math.floor(Math.random() * mockResults.length)];
        render();
      }
    }, 3000);
  }

  function render() {
    if (!result) { simulateScan(); return; }

    content.innerHTML = '';
    content.appendChild(
      el('div', { style: 'max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:18px;' },

        el('div', { className: 'card', style: 'text-align:center;' },
          el('div', { style: 'font-size:18px;font-weight:700;margin-bottom:16px;' }, '识别完成'),
          el('div', { style: 'font-size:48px;margin-bottom:12px;' }, '🍱'),
          el('div', { style: 'font-size:22px;font-weight:700;margin-bottom:4px;' }, result.name),
          el('div', { style: 'color:#6B7280;font-size:13px;' }, `预估重量：${result.weight}g`)
        ),

        el('div', { className: 'card' },
          el('div', { style: 'display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:center;' },
            el('div', { style: 'animation:fadeIn 0.5s ease;' },
              el('div', { style: 'color:#6CFF8F;font-size:28px;font-weight:700;' }, result.kcal),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, 'kcal')
            ),
            el('div', { style: 'animation:fadeIn 0.5s 0.1s ease both;' },
              el('div', { style: 'color:#E63946;font-size:28px;font-weight:700;' }, result.protein),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, '蛋白质g')
            ),
            el('div', { style: 'animation:fadeIn 0.5s 0.2s ease both;' },
              el('div', { style: 'color:#81be32;font-size:28px;font-weight:700;' }, result.carbs),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, '碳水g')
            ),
            el('div', { style: 'animation:fadeIn 0.5s 0.3s ease both;' },
              el('div', { style: 'color:#FFB703;font-size:28px;font-weight:700;' }, result.fat),
              el('div', { style: 'color:#6B7280;font-size:11px;' }, '脂肪g')
            )
          )
        ),

        el('button', {
          className: 'btn btn-primary', style: 'width:100%;',
          onClick: () => navigate('/food/log')
        }, '查看饮食记录'),

        el('button', {
          className: 'btn btn-outline', style: 'width:100%;',
          onClick: () => { result = null; simulateScan(); }
        }, '重新识别')
      )
    );
  }

  render();
  return { destroy: () => {} };
}
