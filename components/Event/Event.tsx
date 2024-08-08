import { eventTypesTranslationKeys } from "@/constants";
import { API } from "@/services/api";
import { DocumentType, EventType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FC } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DocumentTile from "../DocumentTile/DocumentTile";
import EventIcon from "../EventIcon/EventIcon";
import { Text, View } from "../Themed";

type DocumentsListPropsType = {
  lineId: string;
  eventId: string;
  documents: DocumentType[];
};

const DocumentsList: FC<DocumentsListPropsType> = ({
  lineId,
  eventId,
  documents,
}) => {
  const documentsPaths = documents?.map((doc) => doc.path) ?? [];
  const { data, status } = useQuery({
    queryKey: ["documents", lineId, eventId, ...documentsPaths],
    queryFn: () => API.events.getDocuments(lineId, eventId),
    staleTime: STALE_TIME,
  });

  if (status === "pending") {
    return (
      <View className="mt-2 flex flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "error") {
    return (
      <Text className="w-full text-center text-base font-light text-[#061C49]">
        Error loading documents
      </Text>
    );
  }

  if (status === "success" && data.items.length > 0) {
    return (
      <View className="flex flex-row flex-wrap items-center justify-start">
        {data.items?.map((item) => (
          <TouchableOpacity
            key={item.url}
            onPress={() =>
              Linking.openURL(item.url).catch((err) => {
                console.error(err);
              })
            }
          >
            <DocumentTile
              name={item.name}
              url={item.url}
              mimeType={
                documents?.find((doc) => doc.path === item.fullPath)?.type
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <Text className="w-full text-center text-base font-light text-[#061C49]">
      No documents
    </Text>
  );
};

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

type EventPropsType = { event: EventType; lineId: string };

const Event: FC<EventPropsType> = ({
  event: { title, description, date, type, id, documents },
  lineId,
}) => (
  <View data-testid="event" className="flex flex-col items-stretch gap-y-2">
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center justify-between">
        <EventIcon type={type} />
        <Text className="ml-2 text-lg font-medium text-[#061C49] first-letter:capitalize">
          {eventTypesTranslationKeys[type]}
        </Text>
      </View>
      <Text className="text-lg">{format(date, "HH:mm dd MMM yyyy")}</Text>
    </View>
    <Text className="text-2xl font-medium text-[#061C49]">{title}</Text>
    <Text className="text-base font-light text-[#061C49]">{description}</Text>
    <View className="border-t border-gray-500/20 pt-2" />
    {documents ? (
      <DocumentsList documents={documents} eventId={id} lineId={lineId} />
    ) : (
      <Text className="w-full text-center text-base font-light text-[#061C49]">
        No documents
      </Text>
    )}
  </View>
);

export default Event;
