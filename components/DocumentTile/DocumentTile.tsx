import { FontAwesome } from "@expo/vector-icons";
import { DocumentPickerAsset } from "expo-document-picker";
import { Box } from "native-base";
import { FC } from "react";
import { Circle } from "react-native-progress";
import { Text, View } from "../Themed";

const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

type DocumentTilePropsType = {
  name: string;
  url: string;
  mimeType: DocumentPickerAsset["mimeType"];
  uploadingPercentage?: number;
};

const DocumentTile: FC<DocumentTilePropsType> = ({
  name,
  url,
  mimeType,
  uploadingPercentage,
}) => (
  <View className="m-1 w-20 space-y-0.5" data-testid="document_tile">
    <Box className="relative flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-500/20">
      {mimeType === "application/pdf" && (
        <FontAwesome name="file-pdf-o" size={32} color="red" />
      )}
      {mimeType && imageMimeTypes.includes(mimeType) && (
        <FontAwesome name="file-image-o" size={32} color="red" />
      )}
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

    <Text numberOfLines={1} className="text-center">
      {name}
    </Text>
  </View>
);

export default DocumentTile;
