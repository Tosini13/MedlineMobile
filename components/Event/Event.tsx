import { eventTypesTranslationKeys } from "@/constants";
import { API } from "@/services/api";
import { EventType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FC } from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DocumentTile from "../DocumentTile/DocumentTile";
import EventIcon from "../EventIcon/EventIcon";
import { Text, View } from "../Themed";

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

type EventPropsType = { event: EventType; lineId: string };

const Event: FC<EventPropsType> = ({
  event: { title, description, date, type, id, documents },
  lineId,
}) => {
  const documentsPaths = documents?.map((doc) => doc.path) ?? [];
  const { data: documentsPage } = useQuery({
    queryKey: ["documents", lineId, id, ...documentsPaths],
    queryFn: () => API.events.getDocuments(lineId, id),
    staleTime: STALE_TIME,
  });
  return (
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
      <View className="flex flex-row flex-wrap items-center justify-start border-t border-gray-500/20 pt-2">
        {documentsPage ? (
          documentsPage.items?.map((item) => (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(item.url).catch((err) => {
                  console.error(err);
                })
              }
            >
              <DocumentTile
                key={item.url}
                name={item.name}
                url={item.url}
                mimeType={
                  documents?.find((doc) => doc.path === item.fullPath)?.type
                }
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text className="w-full text-center text-base font-light text-[#061C49]">
            No documents
          </Text>
        )}
      </View>
    </View>
  );
};

export default Event;
