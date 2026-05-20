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
