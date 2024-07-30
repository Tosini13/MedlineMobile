export const eventType = {
  appointment: "MA",
  occurrence: "O",
  test: "MT",
  surgery: "S",
  other: "other",
} as const;

export const eventTypesTranslationKeys = {
  [eventType.appointment]: "Appointment",
  [eventType.occurrence]: "Occurrence",
  [eventType.test]: "Test",
  [eventType.surgery]: "Surgery",
  [eventType.other]: "Other",
};
