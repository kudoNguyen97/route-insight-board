
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import AppLayout from '../components/AppLayout';
import Dashboard from '../pages/Dashboard';
import Shipments from '../pages/Shipments';
import Orders from '../pages/Orders';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const shipmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shipments',
  component: Shipments,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: Orders,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics',
  component: Analytics,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shipmentsRoute,
  ordersRoute,
  analyticsRoute,
  settingsRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
