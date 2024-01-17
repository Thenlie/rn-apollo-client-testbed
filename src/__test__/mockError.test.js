import React from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import MockedProvider from "../MockProvider";
import { gql, useQuery } from "@apollo/client";

describe("mockApolloProvider test", () => {
  it("properly renders error state for network errors with client directive", async () => {
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

    // Minimal component for demo
    const EventConfigDemo = () => {
      const { loading, error, data } = useQuery(GET_EVENT_CONFIG, {
        variables: { eventId: "73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd" },
      });

      console.log("In component", data, loading, error);

      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>{error.message}</Text>;

      return <Text>{data?.event.appConfig.id}</Text>;
    };

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_EVENT_CONFIG,
              variables: {
                eventId: "73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd",
              },
            },
            error: new Error("Test network error!"),
          },
        ]}
      >
        <EventConfigDemo />
      </MockedProvider>,
    );
    expect(await screen.findByText("Test network error!")).toBeDefined();
  });

  it("properly renders error state for network errors without client directive", async () => {
    const GET_EVENT_CONFIG_NO_CLIENT = gql`
      query getEventConfig($eventId: ID!) {
        event(eventId: $eventId) {
          appConfig {
            id
            features
          }
        }
      }
    `;

    // Minimal component for demo
    const EventConfigDemo = () => {
      const { loading, error, data } = useQuery(GET_EVENT_CONFIG_NO_CLIENT, {
        variables: { eventId: "73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd" },
      });

      console.log("In component", data, loading, error);

      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>{error.message}</Text>;

      return <Text>{data?.event.appConfig.id}</Text>;
    };

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_EVENT_CONFIG_NO_CLIENT,
              variables: {
                eventId: "73dd16a2-ea98-4ec7-bd4e-9f9afcf6dfdd",
              },
            },
            error: new Error("Test network error!"),
          },
        ]}
      >
        <EventConfigDemo />
      </MockedProvider>,
    );
    expect(await screen.findByText("Test network error!")).toBeDefined();
  });
});
