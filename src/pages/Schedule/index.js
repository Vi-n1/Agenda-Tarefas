import React from "react";
import { View, ImageBackground } from "react-native";

import Form from "../../components/Form";
import styles from "./styles";

const Schedule = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require("./assets/background.jpg")} style={styles.background} />
            <Form />
        </View>
    );
}

export default Schedule;