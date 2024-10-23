import { FontAwesome6 } from "@expo/vector-icons";
import { DocumentPickerAsset } from "expo-document-picker";
import { Box, Image } from "native-base";
import { FC } from "react";
import { Circle } from "react-native-progress";
import { Text } from "../Themed";

const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

type DocumentTileWidePropsType = {
  name: string;
  url: string;
  mimeType: DocumentPickerAsset["mimeType"];
  uploadingPercentage?: number;
};

const DocumentTileWide: FC<DocumentTileWidePropsType> = ({
  name,
  url,
  mimeType,
  uploadingPercentage,
}) => (
  <Box
    className="border-primary-accent-2 relative flex flex-row items-center space-x-3 overflow-hidden rounded-md border bg-primary-accent px-5 py-4"
    data-testid="document_tile"
  >
    <Box>
      {mimeType === "application/pdf" && (
        <FontAwesome6 name="file-pdf" size={24} color="red" />
      )}
      {mimeType && imageMimeTypes.includes(mimeType) && (
        <Image
          className="mb-1 h-full w-full object-cover object-left-top"
          alt={name}
          source={{
            uri: url,
          }}
        />
      )}
    </Box>

    <Text numberOfLines={1} className="flex-1 text-sm text-secondary">
      {name}
    </Text>

    {typeof uploadingPercentage === "number" ? (
      <Box className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-700/80">
        <Circle
          size={30}
          progress={uploadingPercentage}
          color="white"
          borderColor="transparent"
        />
      </Box>
    ) : null}
  </Box>
);

export default DocumentTileWide;
