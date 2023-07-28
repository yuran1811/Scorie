import { useStore } from '@/store';
import { LogInRequired } from '@cpns/features/auth/LogInRequired';

interface WithSignInProps {}

export function withSignIn<T extends WithSignInProps = WithSignInProps>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const HOComponent = (props: Omit<T, keyof WithSignInProps>) => {
    const currentUser = useStore((s) => s.currentUser);
    return currentUser === null ? <LogInRequired /> : <WrappedComponent {...(props as T)} />;
  };

  HOComponent.displayName = `withSignIn(${displayName})`;

  return HOComponent;
}
