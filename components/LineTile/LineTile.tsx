import { FC } from "react";
import { Text, View } from "../Themed";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

const styles = StyleSheet.create({
    tile: {
        position: "relative",
        borderRadius: 10,
        backgroundColor: "#F0F5FC"
    },
    name: {
        color: "#061C49",
        fontSize: 16
    }
  });


type LineType = {
    id: string;
    name: string;
    color: string;
}

type LineTilePropsType = {
line: LineType
}

const LineTile:FC<LineTilePropsType> = ({line}) => (
    <Link href="/modal">
<View style={styles.tile}>
    <Text style={styles.name}>
        {line.name}
    </Text>
</View>
</Link>)

export default LineTile;

  