import React, { Component, ReactNode } from 'react'
import Error from '../Error/Error'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: any, errorInfo: any): void {
    this.setState({ hasError: true })
    console.error('Error caught by error boundary:', error, errorInfo)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <Error error={'Something went wrong'} reset={null} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
