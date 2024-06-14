export const getEventDate = (
  date:
    | string
    | {
        seconds: number;
      },
) => {
  return typeof date === "string"
    ? date
    : new Date(date.seconds * 1000).toISOString();
};
