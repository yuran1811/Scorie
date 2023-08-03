import { FullScreenLoading } from '@cpns/shared';
import { Suspense } from 'react';

interface WithLazyProps {}

export function withLazy<T extends WithLazyProps = WithLazyProps>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const HOComponent = (props: Omit<T, keyof WithLazyProps>) => (
    <Suspense fallback={<FullScreenLoading />}>
      <WrappedComponent {...(props as T)} />
    </Suspense>
  );

  HOComponent.displayName = `withLazy(${displayName})`;

  return HOComponent;
}
