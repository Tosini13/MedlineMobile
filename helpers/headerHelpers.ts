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

type EventFormTitleData = {
  lineName: string;
};

export const setEventFormTitleData = (titleData: EventFormTitleData) =>
  JSON.stringify(titleData);
export const getEventFormTitleData = (title: string) => {
  if (title) {
    try {
      return JSON.parse(title) as EventFormTitleData;
    } catch (e) {
      console.error("error !log", e);
    }
  }
};
