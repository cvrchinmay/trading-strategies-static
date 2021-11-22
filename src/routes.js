import FilterList from './components/filters/FilterList.vue';
import FilterView from './components/filters/FilterView.vue';

export const routes = [
  { path: '/', component: FilterList, name: 'home' },
  { path: '/:filter', component: FilterView, name: 'stockFilter' },
  { path: '/:link', component: FilterView, name: 'paramView' },
];
