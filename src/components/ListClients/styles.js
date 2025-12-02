import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    rowLayout: {
        marginBottom: 5,
        flexWrap: "wrap",
        width: "100%",
        padding: 3,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "${rgba(244, 236, 255, 0.9)}",
        marginBottom: 5,
        
    },
    textName: {
        fontFamily: "notoserif",
        fontSize: 16,
        fontWeight: "bold",
        flexShrink: 1,
        color: "${rgba(36, 3, 252, 1.0)}",
        elevation: 6,
        textShadowColor: "rgba(255, 89, 222, 1.0)",
        textShadowOffset: { width: 4, height: 3 },
        textShadowRadius: 10,

    },

});

export default styles;