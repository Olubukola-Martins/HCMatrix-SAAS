import { Component, ReactNode } from "react";
import ErrorImage from "../../assets/images/err.png";
import { AppButton } from "components/button/AppButton";
import { Typography } from "antd";

interface ErrorBoundaryProps {
  message?: string;
  errImageOrIcon?: React.ReactNode;

  children?: ReactNode;
  action?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center flex-col gap-2 my-12">
          <div>
            {this.props?.errImageOrIcon ?? (
              <img
                src={ErrorImage}
                alt="error"
                className="object-contain h-40"
                loading="lazy"
              />
            )}
          </div>
          {/* <h1>
            {this.props?.message ? this.props?.message : "Something went wrong"}
          </h1> */}
          <Typography.Title level={4}>
            {this.props?.message ? this.props?.message : "Something went wrong"}
          </Typography.Title>
          {this.props?.action && (
            <AppButton label="Go back" handleClick={this.props.action} />
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
