import { routes } from '@/config';
import { FeatureRoutesType, RoutesType } from '@/shared';
import { ErrorContent } from '@cpns/shared';
import { lazy } from 'react';

const ChartPage = lazy(() => import('@/pages/ChartPage'));
const NotePage = lazy(() => import('@/pages/NotePage'));
const ScorePage = lazy(() => import('@/pages/ScorePage'));
const ToolsPage = lazy(() => import('@/pages/ToolsPage'));

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
    Component: NotePage || ErrorContent,
  },
  {
    path: routes.subjects,
    Component: ScorePage || ErrorContent,
  },
  {
    path: routes.analytics,
    Component: ChartPage || ErrorContent,
  },
  {
    path: routes.tools,
    Component: ToolsPage || ErrorContent,
  },
];

export const privateRoutes: RoutesType = [];
