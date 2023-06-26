import React, { ComponentType } from "react";

interface HOCProps {
  additionalProp: string;
}

function withAdditionalProp<T extends HOCProps>(
  WrappedComponent: ComponentType<T>
) {
  // Define the HOC component
  const WithAdditionalProp: React.FC<Omit<T, keyof HOCProps>> = (props) => {
    // Add the additionalProp to the props passed to the wrapped component
    const newProps = {
      ...(props as T),
      additionalProp: "Hello, HOC!",
    };

    // Render the wrapped component with the modified props
    return <WrappedComponent {...newProps} />;
  };

  return WithAdditionalProp;
}

// Usage example
interface MyComponentProps {
  name: string;
}

const MyComponent: React.FC<MyComponentProps & HOCProps> = ({
  name,
  additionalProp,
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{additionalProp}</p>
    </div>
  );
};

const MyComponentWithHOC = withAdditionalProp(MyComponent);

// Usage:
const App: React.FC = () => {
  return <MyComponentWithHOC name="John" />;
};

export default App;
