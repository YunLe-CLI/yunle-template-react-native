import React, { Component } from 'react';


sexport default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError (error) {
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    logErrorToService(error, info.componentStack)
  }

  render () {
    return this.state.hasError
      ? <FallbackComponent />
      : this.props.children
  }
}