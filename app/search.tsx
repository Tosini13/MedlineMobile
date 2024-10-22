import Input from "@/components/form/Input/Input";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Box, IconButton, Text } from "native-base";
import { useState } from "react";

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  return (
    <Box className="space-y-3 bg-primary p-5" flex={1}>
      <Text className="mr-auto text-3xl font-semibold">Search</Text>
      <Box className="bg-[#EFF2F6]">
        <Input
          placeholder="Search"
          onChange={(e) => setSearch(e.nativeEvent.text)}
          value={search}
          InputLeftElement={
            <Box className="ml-3">
              <Feather name="search" size={22} color="black" />
            </Box>
          }
          InputRightElement={
            search ? (
              <IconButton
                className="ml-3 mr-1"
                onPress={() => setSearch("")}
                _pressed={{
                  backgroundColor: "transparent",
                }}
              >
                <Ionicons name="close-circle" size={22} color="black" />
              </IconButton>
            ) : undefined
          }
        />
      </Box>
    </Box>
  );
}
