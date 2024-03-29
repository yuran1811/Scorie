import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorContent } from './shared';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ hasError: true });
  }

  public render(): any {
    if (this.state.hasError)
      return (
        <div className="fullscreen bg-ctbg">
          <ErrorContent errorBoundaries />
        </div>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
