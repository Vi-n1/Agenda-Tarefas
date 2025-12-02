import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    form: {
        width: width * 0.8,
    },
    text: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        textAlign: "center",
        color: "#fff",

    },
    inputName: {
        backgroundColor: "#f4ecff",
        marginBottom: 10,
        fontFamily: "sans-serif",
        fontSize: 16,
        width: "auto",
    },
    inputNumber: {
        backgroundColor: "#f4ecff",
        marginBottom: 10,
        fontFamily: "sans-serif",
        fontSize: 16,
        width: "auto",
    },
    datePicker: {
        backgroundColor: "#f4ecff",
        borderRadius: 20,
        marginBottom: 10,
    },
    button: {
        width: width * 0.5,
        left: width * 0.15,
    }

});

export default styles;