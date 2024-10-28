import Input from "@/components/form/Input/Input";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Box } from "native-base";
import { FC, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { useThemeColor } from "../Themed";

type SearchFormPropsType = {
  isPending?: boolean;
  onSubmit: (values: string) => void;
};

const SearchForm: FC<SearchFormPropsType> = ({ isPending, onSubmit }) => {
  const text = useThemeColor({}, "secondary");
  const textAccent = useThemeColor({}, "secondary-accent");
  const [keyword, setKeyword] = useState("");
  const debounced = useDebouncedCallback((value) => {
    onSubmit(value);
  }, 400);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Input
      className="py-3"
      placeholder="Search"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={(text) => {
        setKeyword(text);
        debounced(text);
      }}
      value={keyword}
      accessibilityLabel="Search input"
      accessibilityHint="Enter text to search"
      leftElement={
        <Box className="pl-2">
          <Feather
            name="search"
            size={24}
            color={isFocused ? text : textAccent}
            accessibilityRole="image"
            accessibilityLabel="Search icon"
          />
        </Box>
      }
      rightElement={
        isPending || keyword ? (
          <Box className="pr-2">
            {isPending ? (
              <ActivityIndicator
                size={24}
                color={isFocused ? text : textAccent}
                accessibilityLabel="Loading results"
              />
            ) : (
              <Pressable
                onPress={() => {
                  setKeyword("");
                  onSubmit("");
                }}
                accessibilityLabel="Clear search"
                accessibilityRole="button"
                android_ripple={{ color: textAccent }}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color={isFocused ? text : textAccent}
                />
              </Pressable>
            )}
          </Box>
        ) : undefined
      }
    />
  );
};

export default SearchForm;
