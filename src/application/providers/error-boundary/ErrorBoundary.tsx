import { Component, type ReactNode } from 'react';
import { ErrorComponent } from '@/shared/ui/error-component';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('App error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}
