import { routes } from '@/config';
import { ChartPage, NotePage, ScorePage, ToolsPage } from '@/pages';
import { FeatureRoutesType, RoutesType } from '@/shared';
import { ErrorContent } from '@cpns/shared';

export const featureRoutes: FeatureRoutesType = [
  {
    path: routes.notes,
    color: 'bg-purple-500',
    title: 'Note',
    content: 'Ideal place to keep your mind on',
  },
  {
    path: routes.subjects,
    color: 'bg-sky-500',
    title: 'Score',
    content: 'Manage all your score records',
  },
  {
    path: routes.analytics,
    color: 'bg-teal-400',
    title: 'Analytics',
    content: 'Variant useful charts',
  },
  {
    path: routes.tools,
    color: 'bg-red-400',
    title: 'Tools',
    content: 'Helpful tools make school life be better',
  },
];

export const publicRoutes: RoutesType = [
  {
    path: routes.notes,
    component: NotePage || ErrorContent,
  },
  {
    path: routes.subjects,
    component: ScorePage || ErrorContent,
  },
  {
    path: routes.analytics,
    component: ChartPage || ErrorContent,
  },
  {
    path: routes.tools,
    component: ToolsPage || ErrorContent,
  },
];

export const privateRoutes: RoutesType = [];
