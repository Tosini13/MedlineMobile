import { EventType } from "@/types";

export const invokeAsyncWithDelay = async <T>(
  getData: () => T | false,
  delay: number = 1000,
): Promise<T> => {
  const response = getData();
  return await new Promise<T>((resolve, reject) =>
    setTimeout(() => (response ? resolve(response) : reject(null)), delay),
  );
};

export const getEventIcon = (type: EventType["type"]) => {
  switch (type) {
    case "appointment":
      return "🩺";
    case "test":
      return "🧪";
    case "surgery":
      return "🔪";
    case "occurrence":
      return "🩹";
    case "other":
      return "📌";
  }
};
