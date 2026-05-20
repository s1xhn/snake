import { today } from './utils.js';

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
