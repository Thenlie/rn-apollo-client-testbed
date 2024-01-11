import React from "react";
import {
  MockedProvider as ApolloMockedProvider,
  MockedProviderProps,
} from "@apollo/client/testing";
import { Resolvers } from "@apollo/client";

interface MockProviderProps extends MockedProviderProps {
  children?: React.ReactNode;
}

/**
 * Custom provider that wraps the Apollo mocked provider
 */
const MockedProvider = ({
  children,
  mocks = [],
  ...props
}: MockProviderProps) => {
  console.log("In provider", JSON.stringify(mocks));
  const resolvers: Resolvers = {
    Query: {
      event: () => ({
        __typename: "Event",
        appConfig: {
          __typename: "EventAppConfig",
          id: "73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd",
          features: {
            MY_BADGE: {
              isEnabled: true,
            },
            // other features truncated for brevity
          },
        },
      }),
    },
  };

  return (
    <ApolloMockedProvider mocks={mocks} resolvers={resolvers} {...props}>
      {children}
    </ApolloMockedProvider>
  );
};

export default MockedProvider;
