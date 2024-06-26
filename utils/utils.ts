export const envs = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
  defaultStaleTime: Number(process.env.EXPO_PUBLIC_DEFAULT_STALE_TIME) ?? 0,
  testOwnerId: process.env.EXPO_PUBLIC_TEST_OWNER_ID ?? "",
};

export const returnPromiseError = (message: string) =>
  new Promise(() => {
    throw new Error(message);
  }).then(() => null);

export const routes = {
  lines: "lines",
  createLine: "lines/create",
  editLine: "lines/[lineId]/edit",
  events: "lines/[lineId]/events",
  event: "lines/[lineId]/events/[eventId]",
  createEvent: "lines/[lineId]/events/create",
  editEvent: "lines/[lineId]/events/[eventId]/edit",
  search: "search",
  menu: "menu",
  login: "(non-authorized)/login",
  signup: "(non-authorized)/signup",
};
