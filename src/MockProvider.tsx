import React from "react";
import {
  MockedProvider as ApolloMockedProvider,
  MockedProviderProps,
} from "@apollo/client/testing";

interface MockProviderProps extends MockedProviderProps {
  children?: React.ReactNode;
}

/**
 * Custom provider that wraps the Apollo mocked provider
 */
const MockedProvider = ({
  children,
  mocks = [],
  resolvers,
  ...props
}: MockProviderProps) => {
  console.log(!!resolvers);
  if (!!resolvers) {
    console.log("Yes resolvers");
    return (
      <ApolloMockedProvider mocks={mocks} resolvers={resolvers} {...props}>
        {children}
      </ApolloMockedProvider>
    );
  } else {
    console.log("No resolvers");
    return (
      <ApolloMockedProvider mocks={mocks} {...props}>
        {children}
      </ApolloMockedProvider>
    );
  }
};

export default MockedProvider;
