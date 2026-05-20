# 健身操作系统 (Fitness OS) 设计规格

## 概述

AI 健身营养平台，纯前端 SPA，6 大模块：首页、AI计算、饮食、训练、AI识别、个人中心。

**核心理念**：数据驱动 + AI辅助 + 健身执行闭环。深色模式，移动优先，极简卡片化。

## 技术选型

- **纯 HTML/CSS/JS，零构建依赖**
- ES Modules 多文件模块化
- Hash 路由（`#/dashboard` 等）
- localStorage 持久化
- VS Code Live Server 本地开发

```
app/fitness-app/
├── index.html
├── css/
│   ├── design-system.css
│   ├── layout.css
│   └── components.css
└── js/
    ├── app.js
    ├── router.js
    ├── store.js
    ├── utils.js
    ├── pages/
    │   ├── dashboard.js
    │   ├── calculator.js
    │   ├── food.js
    │   ├── food-detail.js
    │   ├── food-log.js
    │   ├── workout.js
    │   ├── vision.js
    │   └── profile.js
    └── components/
        ├── sidebar.js
        ├── topbar.js
        ├── bottom-nav.js
        ├── base-card.js
        ├── stat-display.js
        ├── macro-bar.js
        └── ai-button.js
```

## 设计系统

### 配色

| 角色 | 色值 | 用途 |
|------|------|------|
| 主色绿 | `#6CFF8F` | 品牌、进度、热量 |
| 辅助蓝 | `#4DA3FF` | AI功能、TDEE |
| 警告橙 | `#FFB74D` | 热量警告、已摄入 |
| 主背景 | `#0B0F14` | 页面底色 |
| 次级背景 | `#111823` | Sidebar/导航 |
| 卡片背景 | `#1A2230` | 所有卡片 |
| 主文字 | `#FFFFFF` | 标题、重要数字 |
| 次文字 | `#A7B0C0` | 标签、描述 |
| 弱文字 | `#6B7280` | 辅助信息 |

营养素进度条颜色：碳水 `#6CFF8F` / 蛋白质 `#E63946` / 脂肪 `#FFB703`

### 字体

- 英文数字：Inter / SF Pro（数字展示用 system-ui fallback）
- 中文：PingFang SC（用 system-ui fallback）

### 卡片

- 圆角 16px，边框 `1px solid rgba(255,255,255,0.06)`
- 阴影 `0 10px 30px rgba(0,0,0,0.3)`
- 背景 `#1A2230`

### 按钮层级

1. **主按钮**：`linear-gradient(135deg, #6CFF8F, #4DA3FF)` + 绿色发光阴影
2. **描边按钮**：透明背景 + `#6CFF8F` 边框 + 绿色文字
3. **普通按钮**：`#1A2230` 背景 + 白字

## 响应式策略

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | < 768px | 单列、底部导航、Topbar + 滚动内容 |
| Tablet | 768-1024px | 收起侧栏、双列网格、顶部汉堡菜单 |
| Desktop | > 1024px | 固定左侧 Sidebar (232px)、多列网格 |

### PC 端布局

```
┌── Sidebar (232px) ──┬── Topbar ─────────────────┐
│ Logo                │                           │
│ Nav × 6             │    Main Content           │
│                     │    (多列卡片网格)           │
│ User Info           │                           │
└─────────────────────┴───────────────────────────┘
```

### 移动端布局

```
Topbar (标题 + 头像)
↓
今日状态卡（大数字热量）
↓
宏量营养素进度条
↓
快捷入口（4宫格）
↓
体重/BMI双卡
↓
BottomNav (首页/饮食/训练/识别/我的)
```

## 路由

| 路由 | 页面 | 默认 |
|------|------|------|
| `#/dashboard` | 首页仪表盘 | ✓ |
| `#/calculator` | AI计算中心 | |
| `#/food` | 饮食搜索+列表 | |
| `#/food/detail/:id` | 食物详情 | |
| `#/food/log` | 饮食记录 | |
| `#/workout` | 训练系统 | |
| `#/vision` | AI识别 | |
| `#/profile` | 个人中心 | |

## 页面功能

### 1. Dashboard
- 今日摄入大数字卡片（已摄入/目标/剩余）
- 宏量营养素进度条（碳水/蛋白质/脂肪）
- 快捷入口4宫格（热量计算/拍照识别/食物查询/训练计划）
- 体重趋势简易柱状图 + 当前体重/BMI
- AI推荐卡片（今日饮食+训练建议，模拟）

### 2. AI计算中心
- 输入：性别、年龄、身高、体重、体脂(可选)、活动水平
- 使用 Mifflin-St Jeor 公式实时计算 BMR/TDEE
- 自动推导减脂热量(TDEE-500)和增肌热量(TDEE+300)
- 数字从0增长动画
- SmartInput 组件：自动单位提示、即时校验

### 3. 饮食系统
- 搜索栏 + 分类标签（主食/肉类/蔬菜/零食/饮料）
- 食物卡片列表，显示每100g热量
- 食物详情页：完整营养数据 + 加入今日饮食
- 饮食记录页：早/中/晚餐分段 + 今日总摄入汇总
- 内置 50-80 种常见食物静态数据

### 4. 训练系统
- 目标选择：减脂/增肌/维持
- 训练计划卡片（Push/Pull/Leg Day）
- 动作列表（动作名 × 组数 × 次数）
- 静态训练数据，无需后端

### 5. AI识别
- 上传区域（模拟文件选择，不做真实识别）
- 扫描动画（扫描线从上到下）
- AI 分析中呼吸动画（3秒模拟）
- 结果卡片渐进展示：食物名 → 重量 → 热量 → 宏量营养素
- 可加入饮食记录

### 6. 个人中心
- 头像+昵称展示
- 当前体重、BMI、目标状态
- 体重变化简易图
- 设置：目标调整、身体数据修改
- 数据导出（JSON 下载）

## 数据模型

### Store 结构

```js
{
  profile: {
    nickname: 's1xhn',
    gender: 'male',
    age: 25, height: 175, weight: 71.8,
    bodyFat: null, activityLevel: 'moderate',
    goal: 'cut' // cut | bulk | maintain
  },
  dailyLog: {
    '2026-05-20': {
      breakfast: [{ foodId, amount }],
      lunch: [{ foodId, amount }],
      dinner: [{ foodId, amount }]
    }
  },
  foodDB: [ /* 静态食物数据 */ ],
  weightHistory: [
    { date: '2026-05-13', weight: 72.5 },
    // ...
  ]
}
```

## AI 模拟策略

- **计算中心**：真实公式（Mifflin-St Jeor），非模拟
- **AI推荐**：基于目标和摄入数据的前端规则匹配
- **AI识别**：文件上传后随机选取预设食物结果，3秒动画模拟分析过程
- **训练建议**：根据目标静态匹配训练方案

## 关键交互

1. **数字增长动画**：requestAnimationFrame，从0缓动到目标值
2. **进度条过渡**：CSS transition，添加食物后实时更新
3. **页面切换**：Hash change → 渲染目标页面 → 无整页刷新
4. **AI扫描动画**：CSS animation，扫描线 + 脉冲呼吸
5. **localStorage 自动同步**：Store 变更时自动写入

## 边缘情况处理

- 首次访问无数据：显示默认引导状态和示例数据
- 无体重记录：趋势图区域显示"暂无数据"
- 饮食记录为空：显示占位提示"尚未记录"
- 路由不存在：重定向到 Dashboard
