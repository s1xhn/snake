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
