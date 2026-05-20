# Fitness OS 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建完整的 AI 健身营养平台 SPA，6大模块，深色模式移动优先，零构建依赖。

**Architecture:** 单 HTML 入口 + ES Modules 多文件 + Hash 路由 + localStorage 持久化。CSS 自定义属性驱动设计系统。每个页面是独立模块，组件可跨页面复用。

**Tech Stack:** HTML5 + CSS3 (Custom Properties) + Vanilla JS (ES Modules) + localStorage

---

### Task 1: 项目脚手架

**Files:**
- Create: `app/fitness-app/index.html`
- Create: `app/fitness-app/css/design-system.css`
- Create: `app/fitness-app/css/layout.css`
- Create: `app/fitness-app/css/components.css`

- [ ] **Step 1: 创建 index.html 骨架**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fitness OS</title>
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <div id="app">
    <aside id="sidebar"></aside>
    <div id="main-area">
      <header id="topbar"></header>
      <main id="content"></main>
    </div>
    <nav id="bottom-nav"></nav>
  </div>
  <script type="module" src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: 创建 design-system.css（CSS 变量层）**

```css
:root {
  --green: #6CFF8F;
  --green-dim: rgba(108, 255, 143, 0.1);
  --blue: #4DA3FF;
  --blue-dim: rgba(77, 163, 255, 0.1);
  --orange: #FFB74D;
  --orange-dim: rgba(255, 183, 77, 0.1);
  --carb: #81be32;
  --protein: #E63946;
  --fat: #FFB703;

  --bg-primary: #0B0F14;
  --bg-secondary: #111823;
  --bg-card: #1A2230;
  --text-primary: #FFFFFF;
  --text-secondary: #A7B0C0;
  --text-muted: #6B7280;
  --border: 1px solid rgba(255, 255, 255, 0.06);
  --radius: 16px;
  --radius-sm: 12px;
  --radius-xs: 8px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  --font-mono: 'SF Mono', 'Cascadia Code', monospace;
  --sidebar-width: 232px;
  --topbar-height: 52px;
  --bottom-nav-height: 64px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
  height: 100vh;
}

#app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

#main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#content {
  flex: 1;
  overflow-y: auto;
  padding: 0 28px 28px;
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: 创建 layout.css（响应式布局）**

```css
#sidebar {
  width: var(--sidebar-width);
  background: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

#topbar {
  height: var(--topbar-height);
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  padding: 0 28px;
  justify-content: space-between;
}

#bottom-nav { display: none; }

@media (max-width: 1023px) {
  #sidebar { display: none; }
}

@media (max-width: 767px) {
  #bottom-nav {
    display: flex;
    height: var(--bottom-nav-height);
    background: var(--bg-secondary);
    border-top: var(--border);
    padding: 10px 16px 14px;
    gap: 4px;
  }
  #content { padding: 0 16px 16px; }
  #topbar { padding: 0 16px; }
}
```

- [ ] **Step 4: 创建 components.css（组件样式）**

```css
.card {
  background: var(--bg-card);
  border: var(--border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

.card-sm { padding: 16px; border-radius: var(--radius-sm); }

.stat-number {
  font-size: 38px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1;
}

.stat-label { color: var(--text-muted); font-size: 12px; }

.btn {
  border: none;
  border-radius: var(--radius-sm);
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn:active { transform: scale(0.97); }

.btn-primary {
  background: linear-gradient(135deg, var(--green), var(--blue));
  color: var(--bg-primary);
  box-shadow: 0 4px 20px rgba(108, 255, 143, 0.25);
}

.btn-outline {
  background: transparent;
  border: 1.5px solid var(--green);
  color: var(--green);
}

.btn-ghost {
  background: var(--bg-card);
  color: var(--text-primary);
}

.progress-bar {
  height: 4px;
  background: #111823;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.macro-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
  font-size: 12px;
}

.section-title {
  color: var(--text-muted);
  font-size: 12px;
  margin-bottom: 12px;
}

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }

@media (max-width: 767px) {
  .grid-2 { grid-template-columns: 1fr; }
  .grid-4 { grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .card { padding: 16px; }
  .stat-number { font-size: 28px; }
}

.page { display: none; }
.page.active { display: block; }
```

- [ ] **Step 5: 验证** — 用 Live Server 打开 index.html，确认无控制台错误，背景为深色 `#0B0F14`。

---

### Task 2: 工具函数

**File:** Create `app/fitness-app/js/utils.js`

- [ ] **Step 1: 创建 utils.js**

```js
export function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

export function fmt(n, d = 0) { return Number(n).toFixed(d); }

// Mifflin-St Jeor
export function calcBMR(gender, weight, height, age) {
  const s = gender === 'male' ? 5 : -161;
  return Math.round(10 * weight + 6.25 * height - 5 * age + s);
}

export function calcTDEE(bmr, level) {
  const m = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, intense: 1.9 };
  return Math.round(bmr * (m[level] || 1.55));
}

export function goalCalories(tdee, goal) {
  if (goal === 'cut') return tdee - 500;
  if (goal === 'bulk') return tdee + 300;
  return tdee;
}

export function macroSplit(calories, goal) {
  const splits = {
    cut:  { protein: 0.40, carbs: 0.30, fat: 0.30 },
    bulk: { protein: 0.30, carbs: 0.45, fat: 0.25 },
    maintain: { protein: 0.30, carbs: 0.40, fat: 0.30 }
  };
  const s = splits[goal] || splits.maintain;
  return {
    protein: Math.round((calories * s.protein) / 4),
    carbs: Math.round((calories * s.carbs) / 4),
    fat: Math.round((calories * s.fat) / 9)
  };
}

export function today() { return new Date().toISOString().slice(0, 10); }

export function animateNumber(el, from, to, duration = 800) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'className') e.className = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v);
  });
  children.forEach(c => {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else if (c instanceof Node) e.appendChild(c);
  });
  return e;
}
```

- [ ] **Step 2: 验证** — 浏览器控制台 `import('./js/utils.js')` 无报错。

---

### Task 3: 状态管理

**File:** Create `app/fitness-app/js/store.js`

- [ ] **Step 1: 创建 store.js**

```js
import { today, calcBMR, calcTDEE, goalCalories, macroSplit } from './utils.js';

const STORAGE_KEY = 'fitness-os';

const defaultState = {
  profile: {
    nickname: 's1xhn',
    gender: 'male', age: 25, height: 175, weight: 71.8,
    bodyFat: null, activityLevel: 'moderate', goal: 'cut'
  },
  dailyLog: {},
  foodDB: [],
  weightHistory: [
    { date: '2026-05-13', weight: 72.5 }, { date: '2026-05-14', weight: 72.3 },
    { date: '2026-05-15', weight: 72.1 }, { date: '2026-05-16', weight: 71.9 },
    { date: '2026-05-17', weight: 72.0 }, { date: '2026-05-18', weight: 71.8 },
    { date: '2026-05-19', weight: 71.8 }
  ]
};

function loadFoodDB() {
  return [
    { id: '1', name: '鸡胸肉', category: '肉类', kcal: 133, protein: 31, carbs: 0, fat: 1.2, unit: '100g' },
    { id: '2', name: '米饭', category: '主食', kcal: 116, protein: 2.6, carbs: 25.6, fat: 0.3, unit: '100g' },
    { id: '3', name: '鸡蛋', category: '肉类', kcal: 144, protein: 13.3, carbs: 1.5, fat: 9.5, unit: '100g(约2个)' },
    { id: '4', name: '三文鱼', category: '肉类', kcal: 208, protein: 20.4, carbs: 0, fat: 13.4, unit: '100g' },
    { id: '5', name: '西兰花', category: '蔬菜', kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4, unit: '100g' },
    { id: '6', name: '牛奶', category: '饮料', kcal: 65, protein: 3.2, carbs: 4.8, fat: 3.6, unit: '100ml' },
    { id: '7', name: '牛肉(瘦)', category: '肉类', kcal: 125, protein: 22.3, carbs: 0.2, fat: 4.2, unit: '100g' },
    { id: '8', name: '全麦面包', category: '主食', kcal: 246, protein: 10.4, carbs: 41.3, fat: 3.4, unit: '100g(约2片)' },
    { id: '9', name: '红薯', category: '主食', kcal: 86, protein: 1.6, carbs: 20.1, fat: 0.1, unit: '100g' },
    { id: '10', name: '燕麦', category: '主食', kcal: 377, protein: 13.5, carbs: 66.3, fat: 6.5, unit: '100g(干)' },
    { id: '11', name: '虾仁', category: '肉类', kcal: 99, protein: 20.3, carbs: 0.2, fat: 1.2, unit: '100g' },
    { id: '12', name: '豆腐', category: '蔬菜', kcal: 84, protein: 8.1, carbs: 1.9, fat: 4.2, unit: '100g' },
    { id: '13', name: '香蕉', category: '零食', kcal: 93, protein: 1.4, carbs: 20.8, fat: 0.4, unit: '100g(约1根)' },
    { id: '14', name: '苹果', category: '零食', kcal: 53, protein: 0.3, carbs: 13.8, fat: 0.2, unit: '100g' },
    { id: '15', name: '酸奶(原味)', category: '饮料', kcal: 72, protein: 3.5, carbs: 10, fat: 2.5, unit: '100ml' },
    { id: '16', name: '土豆', category: '蔬菜', kcal: 81, protein: 2, carbs: 17.5, fat: 0.6, unit: '100g' },
    { id: '17', name: '鸡腿肉', category: '肉类', kcal: 181, protein: 20, carbs: 0, fat: 11, unit: '100g' },
    { id: '18', name: '意大利面(干)', category: '主食', kcal: 351, protein: 12, carbs: 71, fat: 1.5, unit: '100g' },
    { id: '19', name: '牛油果', category: '零食', kcal: 160, protein: 2, carbs: 8.5, fat: 14.7, unit: '100g(约半个)' },
    { id: '20', name: '杏仁', category: '零食', kcal: 579, protein: 21.2, carbs: 21.6, fat: 49.9, unit: '100g' },
    { id: '21', name: '金枪鱼(罐头)', category: '肉类', kcal: 116, protein: 26, carbs: 0, fat: 1, unit: '100g' },
    { id: '22', name: '菠菜', category: '蔬菜', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, unit: '100g' },
    { id: '23', name: '番茄', category: '蔬菜', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, unit: '100g' },
    { id: '24', name: '胡萝卜', category: '蔬菜', kcal: 37, protein: 0.9, carbs: 8.8, fat: 0.2, unit: '100g' },
    { id: '25', name: '猪瘦肉', category: '肉类', kcal: 143, protein: 20.3, carbs: 1.5, fat: 6.2, unit: '100g' },
    { id: '26', name: '馒头', category: '主食', kcal: 223, protein: 7, carbs: 44.2, fat: 1.1, unit: '100g(约1个)' },
    { id: '27', name: '豆浆', category: '饮料', kcal: 31, protein: 3, carbs: 1.2, fat: 1.6, unit: '100ml' },
    { id: '28', name: '鸡蛋白', category: '肉类', kcal: 48, protein: 11, carbs: 0.7, fat: 0.2, unit: '100g(约3个)' },
    { id: '29', name: '玉米', category: '主食', kcal: 112, protein: 4, carbs: 22.8, fat: 1.2, unit: '100g' },
    { id: '30', name: '黑巧克力(70%)', category: '零食', kcal: 546, protein: 7.8, carbs: 34, fat: 42.6, unit: '100g' },
    { id: '31', name: '橙汁', category: '饮料', kcal: 45, protein: 0.7, carbs: 10.4, fat: 0.2, unit: '100ml' },
    { id: '32', name: '腰果', category: '零食', kcal: 553, protein: 18.2, carbs: 30.2, fat: 43.8, unit: '100g' },
    { id: '33', name: '生菜', category: '蔬菜', kcal: 15, protein: 1.4, carbs: 2.8, fat: 0.2, unit: '100g' },
    { id: '34', name: '鸭肉', category: '肉类', kcal: 240, protein: 15.5, carbs: 0.2, fat: 19.7, unit: '100g' },
    { id: '35', name: '小米粥', category: '主食', kcal: 46, protein: 1.4, carbs: 8.4, fat: 0.7, unit: '100g' },
    { id: '36', name: '蛋白粉(乳清)', category: '饮料', kcal: 380, protein: 75, carbs: 8, fat: 5, unit: '100g(约3勺)' },
    { id: '37', name: '黄瓜', category: '蔬菜', kcal: 15, protein: 0.7, carbs: 2.9, fat: 0.1, unit: '100g' },
    { id: '38', name: '葡萄', category: '零食', kcal: 67, protein: 0.7, carbs: 16.8, fat: 0.4, unit: '100g' },
    { id: '39', name: '面条(煮)', category: '主食', kcal: 110, protein: 3.5, carbs: 22, fat: 0.5, unit: '100g' },
    { id: '40', name: '羊肉', category: '肉类', kcal: 203, protein: 19, carbs: 0, fat: 14.1, unit: '100g' }
  ];
}

let state = null;
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...defaultState, ...parsed, foodDB: loadFoodDB() };
    } else {
      state = { ...defaultState, foodDB: loadFoodDB() };
    }
  } catch { state = { ...defaultState, foodDB: loadFoodDB() }; }
}

function save() {
  const { foodDB, ...persist } = state;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
}

export function getState() { return state; }

export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function dispatch(action, payload) {
  const d = today();
  if (!state.dailyLog[d]) state.dailyLog[d] = { breakfast: [], lunch: [], dinner: [] };

  switch (action) {
    case 'UPDATE_PROFILE':
      state.profile = { ...state.profile, ...payload };
      break;
    case 'ADD_FOOD': {
      const { meal, foodId, amount } = payload;
      const existing = state.dailyLog[d][meal].find(e => e.foodId === foodId);
      if (existing) existing.amount += amount;
      else state.dailyLog[d][meal].push({ foodId, amount });
      break;
    }
    case 'REMOVE_FOOD': {
      const { meal: m, foodId: fid } = payload;
      state.dailyLog[d][m] = state.dailyLog[d][m].filter(e => e.foodId !== fid);
      break;
    }
    case 'ADD_WEIGHT':
      state.weightHistory.push({ date: d, weight: payload.weight });
      state.profile.weight = payload.weight;
      break;
    case 'UPDATE_GOAL':
      state.profile.goal = payload;
      break;
    case 'RESET_ALL':
      state = { ...defaultState, foodDB: loadFoodDB() };
      break;
  }
  save();
  listeners.forEach(fn => fn(state));
}

export function getDailyTotals(date) {
  const log = state.dailyLog[date];
  if (!log) return { kcal: 0, protein: 0, carbs: 0, fat: 0 };
  let kcal = 0, protein = 0, carbs = 0, fat = 0;
  ['breakfast', 'lunch', 'dinner'].forEach(meal => {
    (log[meal] || []).forEach(entry => {
      const food = state.foodDB.find(f => f.id === entry.foodId);
      if (food) {
        const scale = entry.amount / 100;
        kcal += food.kcal * scale;
        protein += food.protein * scale;
        carbs += food.carbs * scale;
        fat += food.fat * scale;
      }
    });
  });
  return {
    kcal: Math.round(kcal),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat)
  };
}

load();
```

- [ ] **Step 2: 验证** — 控制台 `import('./js/store.js')`，然后 `(await import('./js/store.js')).getState()` 返回完整初始状态。

---

### Task 4: 路由系统

**File:** Create `app/fitness-app/js/router.js`

- [ ] **Step 1: 创建 router.js**

```js
const routes = [];
let currentPage = null;

export function register(hash, handler) {
  routes.push({ hash, pattern: hashToPattern(hash), handler });
}

function hashToPattern(hash) {
  const parts = hash.split('/');
  return parts.map(p => p.startsWith(':') ? '([^/]+)' : p).join('\\/');
}

function match(hash) {
  for (const r of routes) {
    const re = new RegExp(`^${r.pattern}$`);
    const m = hash.match(re);
    if (m) return { handler: r.handler, params: m.slice(1) };
  }
  return null;
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function start() {
  window.addEventListener('hashchange', handleRoute);
  if (!window.location.hash) window.location.hash = '#/dashboard';
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || '/dashboard';
  const result = match(hash);
  if (result) {
    if (currentPage && currentPage.destroy) currentPage.destroy();
    currentPage = result.handler(...result.params);
  } else {
    navigate('/dashboard');
  }
}
```

- [ ] **Step 2: 验证** — 控制台无报错即可。

---

### Task 5: 应用入口

**File:** Create `app/fitness-app/js/app.js`

- [ ] **Step 1: 创建 app.js**

```js
import { start } from './router.js';
import { register } from './router.js';
import { subscribe } from './store.js';
import { renderSidebar } from './components/sidebar.js';
import { renderTopbar } from './components/topbar.js';
import { renderBottomNav } from './components/bottom-nav.js';
import { dashboardPage } from './pages/dashboard.js';
import { calculatorPage } from './pages/calculator.js';
import { foodPage } from './pages/food.js';
import { foodDetailPage } from './pages/food-detail.js';
import { foodLogPage } from './pages/food-log.js';
import { workoutPage } from './pages/workout.js';
import { visionPage } from './pages/vision.js';
import { profilePage } from './pages/profile.js';

register('/dashboard', dashboardPage);
register('/calculator', calculatorPage);
register('/food', foodPage);
register('/food/detail/:id', foodDetailPage);
register('/food/log', foodLogPage);
register('/workout', workoutPage);
register('/vision', visionPage);
register('/profile', profilePage);

function updateLayout() {
  renderSidebar();
  renderTopbar();
  renderBottomNav();
}

subscribe(updateLayout);
updateLayout();
start();
```

- [ ] **Step 2: 验证** — 此步骤需要后续任务完成后才完整验证。当前确保 import 路径正确即可。

---

### Task 6: Sidebar 组件

**File:** Create `app/fitness-app/js/components/sidebar.js`

- [ ] **Step 1: 创建 sidebar.js**

```js
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
```

- [ ] **Step 2: 验证** — 浏览器打开，确认左侧 232px 宽 Sidebar 显示 Logo + 6 项导航 + 用户信息，当前页高亮为绿色。

---

### Task 7: Topbar 组件

**File:** Create `app/fitness-app/js/components/topbar.js`

- [ ] **Step 1: 创建 topbar.js**

```js
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
```

- [ ] **Step 2: 验证** — 切换不同 hash 路由，确认 Topbar 标题跟随变化。

---

### Task 8: BottomNav 组件

**File:** Create `app/fitness-app/js/components/bottom-nav.js`

- [ ] **Step 1: 创建 bottom-nav.js**

```js
import { el } from '../utils.js';
import { navigate } from '../router.js';

const items = [
  { hash: '/dashboard', label: '首页' },
  { hash: '/food', label: '饮食' },
  { hash: '/workout', label: '训练' },
  { hash: '/vision', label: '识别' },
  { hash: '/profile', label: '我的' }
];

export function renderBottomNav() {
  const container = document.getElementById('bottom-nav');
  if (!container) return;
  const current = window.location.hash.slice(1) || '/dashboard';

  container.innerHTML = '';
  items.forEach(item => {
    const active = current.startsWith(item.hash);
    const navItem = el('div', {
      style: `flex:1;text-align:center;padding:6px 0;cursor:pointer;`,
      onClick: () => navigate(item.hash)
    },
      active ? el('div', { style: 'width:24px;height:2px;background:#6CFF8F;border-radius:1px;margin:0 auto 4px;' }) : '',
      el('span', { style: `font-size:11px;${active ? 'color:#6CFF8F;font-weight:600;' : 'color:#6B7280;'}` }, item.label)
    );
    container.appendChild(navItem);
  });
}
```

- [ ] **Step 2: 验证** — 缩小浏览器至 767px 以下，确认底部出现导航栏，点击切换页面。

---

### Task 9: Dashboard 页面

**File:** Create `app/fitness-app/js/pages/dashboard.js`

- [ ] **Step 1: 创建 dashboard.js**

```js
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

    // 快捷入口图标
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
        el('span', { style: 'color:#fff;font-weight:600;' },
          `${current}` + el('span', { style: 'color:#6B7280;font-weight:400;font-size:12px;' }, ` / ${target}g`).outerHTML
        )
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
```

- [ ] **Step 2: 验证** — 打开 Dashboard，确认热量数字从0增长动画、宏量进度条显示、4宫格可点击跳转。

---

### Task 10: AI计算中心页面

**File:** Create `app/fitness-app/js/pages/calculator.js`

- [ ] **Step 1: 创建 calculator.js**

```js
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
```

- [ ] **Step 2: 验证** — 输入身体数据，点击"开始计算"，确认 BMR/TDEE/减脂/增肌 数字从0增长动画。

---

### Task 11: 饮食系统页面

**File:** Create `app/fitness-app/js/pages/food.js`

- [ ] **Step 1: 创建 food.js**

```js
import { el } from '../utils.js';
import { navigate } from '../router.js';
import { getState, dispatch, subscribe, today } from '../store.js';

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

    // Search
    const searchInput = el('input', {
      type: 'text', placeholder: '搜索食物...', value: searchTerm,
      style: 'width:100%;background:#1A2230;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px 16px;color:#fff;font-size:14px;outline:none;margin-bottom:16px;',
      onInput: (e) => { searchTerm = e.target.value; render(); }
    });

    // Category tabs
    const tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:16px;overflow-x:auto;' });
    categories.forEach(cat => {
      tabs.appendChild(el('div', {
        style: `padding:8px 16px;border-radius:20px;font-size:13px;cursor:pointer;white-space:nowrap;${cat === category ? 'background:#6CFF8F;color:#0B0F14;font-weight:600;' : 'background:#1A2230;color:#A7B0C0;'}`,
        onClick: () => { category = cat; render(); }
      }, cat));
    });

    // Food grid
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

    // Add to log button
    const logBtn = el('button', {
      className: 'btn btn-outline', style: 'width:100%;margin-top:16px;',
      onClick: () => navigate('/food/log')
    }, '查看今日饮食记录');

    content.appendChild(el('div', {}, searchInput, tabs, grid, logBtn));
  }

  render();
  return { destroy: () => {} };
}
```

- [ ] **Step 2: 验证** — 搜索食物、切换分类标签正常过滤，点击食物卡片跳转到详情页。

---

### Task 12: 食物详情页

**File:** Create `app/fitness-app/js/pages/food-detail.js`

- [ ] **Step 1: 创建 food-detail.js**

```js
import { el } from '../utils.js';
import { navigate } from '../router.js';
import { getState, dispatch, today } from '../store.js';

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
```

- [ ] **Step 2: 验证** — 从食物列表进入详情，选择餐次和份量，点击加入记录后跳转到饮食记录页。

---

### Task 13: 饮食记录页

**File:** Create `app/fitness-app/js/pages/food-log.js`

- [ ] **Step 1: 创建 food-log.js**

```js
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
        // Summary card
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
```

- [ ] **Step 2: 验证** — 确认三餐分区显示，添加/删除食物后汇总数据实时更新。

---

### Task 14: 训练系统页面

**File:** Create `app/fitness-app/js/pages/workout.js`

- [ ] **Step 1: 创建 workout.js**

```js
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
        // Goal selector
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

        // Plan name
        el('div', { style: 'font-size:18px;font-weight:700;' }, currentPlan.name),

        // Training days
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
```

- [ ] **Step 2: 验证** — 切换减脂/增肌/维持目标，训练计划跟随更新，动作列表显示组数×次数。

---

### Task 15: AI识别页面

**File:** Create `app/fitness-app/js/pages/vision.js`

- [ ] **Step 1: 创建 vision.js**

```js
import { el } from '../utils.js';
import { navigate } from '../router.js';
import { getState, dispatch } from '../store.js';

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

    // Scanning state
    const scanBox = el('div', {
      style: 'position:relative;width:100%;max-width:360px;margin:0 auto;height:280px;background:#1A2230;border:2px dashed rgba(255,255,255,0.1);border-radius:16px;display:flex;align-items:center;justify-content:center;overflow:hidden;'
    },
      el('div', { style: 'color:#6B7280;text-align:center;' },
        el('div', { style: 'font-size:48px;margin-bottom:12px;' }, '📷'),
        el('div', { style: 'font-size:14px;' }, '扫描识别中...')
      )
    );

    // Scan line animation
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
        el('div', { style: 'margin-bottom:16px;' },
          el('div', {
            className: 'card-sm', style: 'text-align:center;padding:40px 20px;cursor:pointer;border:1px solid rgba(255,255,255,0.06);',
            onClick: () => {
              const newResult = mockResults[Math.floor(Math.random() * mockResults.length)];
              result = newResult;
              render();
            }
          },
            el('div', { style: 'color:#6B7280;' }, '点击此处模拟上传图片')
          )
        )
      ),

      // Result section
      el('div', { id: 'vision-result' })
    ));

    // Simulate scanning animation
    setTimeout(() => {
      const newResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      result = newResult;
      render();
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
          onClick: () => {
            // Register as a mock food for the log
            dispatch('ADD_FOOD', { meal: 'lunch', foodId: 'custom-' + Date.now(), amount: result.weight });
            navigate('/food/log');
          }
        }, '加入饮食记录'),

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
```

- [ ] **Step 2: 验证** — 打开 AI 识别页，看到扫描动画，3秒后显示随机结果卡，可点击重新识别。

---

### Task 16: 个人中心页面

**File:** Create `app/fitness-app/js/pages/profile.js`

- [ ] **Step 1: 创建 profile.js**

```js
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

        // Avatar + Nickname
        el('div', { className: 'card', style: 'display:flex;align-items:center;gap:16px;' },
          el('div', { style: 'width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#6CFF8F,#4DA3FF);display:flex;align-items:center;justify-content:center;color:#0B0F14;font-weight:800;font-size:28px;flex-shrink:0;' }, profile.nickname[0].toUpperCase()),
          el('div', {},
            el('div', { style: 'font-size:18px;font-weight:700;' }, profile.nickname),
            el('div', { style: 'color:#A7B0C0;font-size:13px;' }, `${profile.gender === 'male' ? '男' : '女'} · ${profile.age}岁 · ${profile.height}cm`),
            el('div', { style: 'color:#6CFF8F;font-size:12px;margin-top:2px;' }, profile.goal === 'cut' ? '目标：减脂' : profile.goal === 'bulk' ? '目标：增肌' : '目标：维持')
          )
        ),

        // Body stats
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

        // Settings form
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

        // Weight history
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

        // Export
        el('div', { className: 'card' },
          el('div', { style: 'display:flex;gap:10px;' },
            el('button', {
              className: 'btn btn-ghost', style: 'flex:1;border:1px solid rgba(255,255,255,0.06);',
              onClick: () => {
                const data = JSON.stringify(getState(), null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const a = el('a', { href: URL.createObjectURL(blob), download: 'fitness-data.json' });
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
```

- [ ] **Step 2: 验证** — 修改昵称/体重等并保存，确认数据持久化。记录体重后列表更新。导出 JSON 文件正常下载。

---

### Task 17: 最终集成验证

- [ ] **Step 1: 确认所有 import 路径正确**

检查 `app.js` 中所有 import 的路径与实际文件匹配。

- [ ] **Step 2: 全流程验证**
  - 打开 Dashboard: 数字动画、进度条、快捷入口跳转 ✓
  - AI计算: 输入数据 → 计算结果动画 → BMR/TDEE显示 ✓
  - 饮食搜索: 搜索+分类过滤 → 点击进入详情 → 加入记录 ✓
  - 饮食记录: 三餐展示 → 删除 → 汇总更新 ✓
  - 训练系统: 切换目标 → 训练计划更新 ✓
  - AI识别: 模拟扫描 → 结果显示 → 重新识别 ✓
  - 个人中心: 修改数据 → 保存 → 体重记录 ✓
  - 响应式: 缩小窗口 → 平板隐藏侧栏 → 手机显示底部导航 ✓
  - 持久化: 刷新页面 → 所有数据保留 ✓

- [ ] **Step 3: 提交所有文件**

```bash
git add app/fitness-app/
git commit -m "feat: 完成Fitness OS全部6大模块开发"
```

---

### 文件清单总览

| 文件 | 行数(估) | 职责 |
|------|---------|------|
| index.html | 25 | SPA 骨架 |
| css/design-system.css | 50 | CSS变量 + 全局重置 |
| css/layout.css | 35 | 响应式布局 |
| css/components.css | 70 | 组件样式 |
| js/utils.js | 55 | 公式+DOM工具 |
| js/store.js | 130 | 状态+localStorage+食物库 |
| js/router.js | 35 | Hash路由 |
| js/app.js | 30 | 入口+注册路由 |
| js/components/sidebar.js | 70 | 桌面侧栏 |
| js/components/topbar.js | 25 | 顶栏 |
| js/components/bottom-nav.js | 35 | 移动底栏 |
| js/pages/dashboard.js | 120 | 首页仪表盘 |
| js/pages/calculator.js | 120 | AI计算中心 |
| js/pages/food.js | 80 | 饮食搜索+列表 |
| js/pages/food-detail.js | 80 | 食物详情 |
| js/pages/food-log.js | 90 | 饮食记录 |
| js/pages/workout.js | 130 | 训练系统 |
| js/pages/vision.js | 130 | AI识别 |
| js/pages/profile.js | 130 | 个人中心 |
| **总计** | **~1400** | |
