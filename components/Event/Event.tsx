import { eventTypesTranslationKeys } from "@/constants";
import { API } from "@/services/api";
import { DocumentType, EventType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Box } from "native-base";
import { FC } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventDateTime from "../EventDateTime/EventDateTime";
import { Text, useThemeColor, View } from "../Themed";

import { useRouter } from "expo-router";

import React from "react";

import PlusIcon from "@/components/icons/PlusIcon";
import ScreenButton from "@/components/ScreenButton/ScreenButton";
import DocumentTileWide from "../DocumentTile/DocumentTileWide";
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
      <View className="space-y-2">
        {data.items?.map((item) => (
          <TouchableOpacity
            key={item.url}
            onPress={() =>
              Linking.openURL(item.url).catch((err) => {
                console.error(err);
              })
            }
          >
            <DocumentTileWide
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
}) => {
  const color = useThemeColor({}, "secondary");
  const router = useRouter();
  return (
    <View data-testid="event" className="flex flex-col items-stretch space-y-4">
      <Box className="space-y-2">
        <Text className="text-2xl font-medium text-secondary">{title}</Text>
        <Box className="flex flex-row items-center gap-x-2">
          <Box className="rounded-full border border-primary-accent p-1 px-3">
            <Text className="text-base text-secondary-accent">
              {eventTypesTranslationKeys[type]}
            </Text>
          </Box>
          <Box className="rounded-full border border-primary-accent p-1 px-3">
            <EventDateTime date={date} color={color} />
          </Box>
        </Box>
      </Box>
      <Box className="border-b border-primary-accent" />
      {description && (
        <Box className="space-y-1">
          <Text className="text-base text-secondary-accent">Description</Text>
          <Text className="text-sm">{description}</Text>
        </Box>
      )}

      <Box className="space-y-2">
        <Text className="text-base text-secondary-accent">Documents</Text>
        {documents && (
          <Box>
            <DocumentsList documents={documents} eventId={id} lineId={lineId} />
          </Box>
        )}
        <Box>
          <ScreenButton
            onPress={() => router.navigate(`/lines/${lineId}/events/create`)}
          >
            <PlusIcon className="h-4 w-4 text-secondary-accent" />
            <Text className="text-xl text-secondary-accent">Add document</Text>
          </ScreenButton>
        </Box>
      </Box>
    </View>
  );
};

export default Event;
