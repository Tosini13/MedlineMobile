import { Stack } from "expo-router";
import { FC } from "react";

const EventsLayout: FC = () => (
  <Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="events/[eventId]"
      options={{
        presentation: "modal",
      }}
    />
  </Stack>
);

export default EventsLayout;
