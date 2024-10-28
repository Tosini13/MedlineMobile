import { FontAwesome } from "@expo/vector-icons";
import { DocumentPickerAsset } from "expo-document-picker";
import { Box } from "native-base";
import { FC } from "react";
import { Circle } from "react-native-progress";
import { Text, useThemeColor } from "../Themed";

const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

type DocumentTileWidePropsType = {
  name: string;
  mimeType: DocumentPickerAsset["mimeType"];
  uploadingPercentage?: number;
};

const DocumentTileWide: FC<DocumentTileWidePropsType> = ({
  name,
  mimeType,
  uploadingPercentage,
}) => {
  const iconColor = useThemeColor({}, "secondary");
  const color = useThemeColor({}, "secondary-accent");
  return (
    <Box
      className="relative flex flex-row items-center space-x-3 overflow-hidden rounded-md border border-primary-accent-2 bg-primary-accent px-5 py-4"
      data-testid="document_tile"
    >
      <Box className="h-6 w-6">
        {typeof uploadingPercentage === "number" ? (
          <Circle
            size={23}
            progress={uploadingPercentage}
            color={iconColor}
            borderColor={color}
            borderWidth={1}
            indeterminate={uploadingPercentage === 0}
          />
        ) : (
          <>
            {mimeType === "application/pdf" && (
              <FontAwesome name="file-pdf-o" size={24} color="red" />
            )}
            {mimeType && imageMimeTypes.includes(mimeType) && (
              <FontAwesome name="file-image-o" size={24} color="red" />
            )}
          </>
        )}
      </Box>

      <Text numberOfLines={1} className="flex-1 text-sm text-secondary">
        {name}
      </Text>
    </Box>
  );
};

export default DocumentTileWide;
