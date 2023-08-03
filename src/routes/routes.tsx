import { routes } from '@/config';
import { withLazy } from '@/hocs';
import { HomePage } from '@/pages';
import { NoteDetail } from '@cpns/features/notes/NoteDetail';
import { ErrorContent } from '@cpns/shared';
import { lazy } from 'react';
import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';

const ChartPage = lazy(() => import('@/pages/ChartPage'));
const NotePage = lazy(() => import('@/pages/NotePage'));
const ScorePage = lazy(() => import('@/pages/ScorePage'));
const ToolsPage = lazy(() => import('@/pages/ToolsPage'));

const LazyChartPage = withLazy(ChartPage);
const LazyNotePage = withLazy(NotePage);
const LazyScorePage = withLazy(ScorePage);
const LazyToolsPage = withLazy(ToolsPage);

const privateRoutes: RouteObject[] = [];

const publicRoutes: RouteObject[] = [
  {
    path: routes.notes,
    element: (
      <>
        <LazyNotePage />
        <Outlet />
      </>
    ),
    errorElement: <ErrorContent />,
    children: [
      {
        path: 'detail',
        element: (
          <>
            {/* <NoNoteChosen /> */}
            <Outlet />
          </>
        ),
        errorElement: <ErrorContent />,
        children: [
          {
            path: ':noteId',
            index: true,
            element: <NoteDetail />,
            errorElement: <ErrorContent />,
          },
        ],
      },
    ],
  },
  {
    path: routes.subjects,
    element: <LazyScorePage />,
    errorElement: <ErrorContent />,
  },
  {
    path: routes.analytics,
    element: <LazyChartPage />,
    errorElement: <ErrorContent />,
  },
  {
    path: routes.tools,
    element: <LazyToolsPage />,
    errorElement: <ErrorContent />,
  },
];

export const treeRoutes: RouteObject[] = [
  {
    path: '/',
    index: true,
    element: <HomePage />,
    errorElement: <ErrorContent />,
  },
  ...publicRoutes,
  ...privateRoutes,
  {
    path: '*',
    element: <ErrorContent />,
    errorElement: <ErrorContent />,
  },
];

export const treeBrowserRouter = createBrowserRouter(treeRoutes);
