type EventsTitleData = {
  lineName: string;
  lineId: string;
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

type LineFormTitleData = {
  lineName?: string;
};

export const setLineFormTitleData = (titleData: LineFormTitleData) =>
  JSON.stringify(titleData);

export const getLineFormTitleData = (titleData: string) => {
  if (titleData) {
    try {
      return JSON.parse(titleData) as LineFormTitleData;
    } catch (e) {
      console.error("error !log", e);
    }
  }
};
