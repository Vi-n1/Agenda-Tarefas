import { StyleSheet, StatusBar } from "react-native";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;


const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: statusBarHeight + 100,
    },
    image: {
        resizeMode: 'stretch',
        width: 200,
        height: 200,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 200 / 2,
    }
});

export default styles;