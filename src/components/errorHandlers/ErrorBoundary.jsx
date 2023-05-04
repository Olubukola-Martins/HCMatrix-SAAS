import React, { Component } from "react";
import ErrorImage from "../../assets/images/err.png";
import { AppButton } from "components/button/AppButton";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(err) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center flex-col gap-2">
          <div>
            <img src={ErrorImage} alt="error" className="object-contain h-40" />
          </div>
          <h1>
            {this.props?.message ? this.props?.message : "Something went wrong"}
          </h1>
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
