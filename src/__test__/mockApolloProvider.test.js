import React from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { MockedResponse } from "@apollo/client/testing";
import MockedProvider from "../MockProvider";
import { gql, useQuery } from "@apollo/client";

const GET_EVENT_CONFIG = gql`
  query getEventConfig($eventId: ID!) {
    event(eventId: $eventId) @client {
      appConfig @client {
        id
        features
      }
    }
  }
`;

/**
 * Example mock response object
 * The request field must match they query being used in the test, including variables
 * The result field is what will be returned by the query
 * https://www.apollographql.com/docs/react/development-testing/testing/#defining-mocked-responses
 */
const mockResponse = {
  delay: Infinity,
  request: {
    query: GET_EVENT_CONFIG,
    variables: {
      eventId: "73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd",
    },
  },
  result: {
    data: {
      event: {
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
      },
    },
  },
};

// Minimal component for demo
const EventConfigDemo = () => {
  const { loading, error, data } = useQuery(GET_EVENT_CONFIG, {
    variables: { eventId: "73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd" },
  });

  console.log("In component", data, loading, error);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  return <Text>{data.event.appConfig.id}</Text>;
};

describe("mockApolloProvider test", () => {
  it("properly renders infinite loading state", async () => {
    render(
      <MockedProvider mocks={[mockResponse]}>
        <EventConfigDemo />
      </MockedProvider>,
    );
    expect(await screen.findByText("Loading...")).toBeDefined();
    expect(
      screen.queryByText("73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd"),
    ).toBeNull();
  });
});
