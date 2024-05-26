type EventsTitleData = {
  lineName: string;
  incomingEvents: number;
};

export const setEventsTitleData = (titleData: EventsTitleData) =>
  JSON.stringify(titleData);
export const getEventsTitleData = (title: string) => {
  if (title) {
    try {
      return JSON.parse(title) as EventsTitleData;
    } catch (e) {
      console.error("error !log", e);
    }
  }
};

type CreateEventTitleData = {
  lineName: string;
};

export const setCreateEventTitleData = (titleData: CreateEventTitleData) =>
  JSON.stringify(titleData);
export const getCreateEventTitleData = (title: string) => {
  if (title) {
    try {
      return JSON.parse(title) as CreateEventTitleData;
    } catch (e) {
      console.error("error !log", e);
    }
  }
};
