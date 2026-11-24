/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  isChunkLoadError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, isChunkLoadError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const isChunkLoad = error instanceof TypeError &&
      (error.message.includes('dynamically imported module') ||
       error.message.includes('fetch'));
    return { hasError: true, error, isChunkLoadError: isChunkLoad };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 bg-coffee-red/10 text-coffee-red rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-serif font-bold text-teal">Something went wrong</h2>
              <p className="text-sm text-teal/70 leading-relaxed">
                {this.state.isChunkLoadError
                  ? 'A network error occurred while loading this page. Please check your connection and try again.'
                  : 'We hit an unexpected error loading this page. Please try again or return to the homepage.'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (this.state.isChunkLoadError) {
                    window.location.reload();
                  } else {
                    this.setState({ hasError: false, error: null, isChunkLoadError: false });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-teal text-linen-white rounded-xl text-sm font-semibold hover:bg-teal/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 border border-teal/20 text-teal rounded-xl text-sm font-semibold hover:bg-teal/5 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
