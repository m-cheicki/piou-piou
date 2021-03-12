import { StyleSheet } from "react-native";

// Color palette
export const colors = {
    "white": "#F8F8F8", 
    "yellow": "#FECA57",
    "black": "#323232", 
    "blue": "#0892A5", 
    "salmon" : "#FF785A"
}; 

export const shadows = {
    light : {
        offsetX: -12,
        offsetY: -12,
        blur: 30, 
        radius: 30,
        color: "#383838"
    }, 
    dark: {
        offsetX: 10,
        offsetY: 10,
        blur: 30, 
        radius: 30,
        color: "#262626"
    }
}


export const buttons = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center", 
        backgroundColor: colors.black,
        color : colors.white, 
        padding: 4, 
        marginVertical: 12, 
        borderRadius: 8
    }, 
    play: {
        backgroundColor: colors.black,
        color: colors.yellow, 
        width: 125,  
        height: 125, 
        borderRadius: 150, 
    },
    selectFile: {
        width: "100%", 
        height: 48
    }, 
    settings: {
        backgroundColor: colors.black,
        color: colors.white, 
        width: 50,  
        height: 50, 
        borderRadius: 50, 
    }, 
})

// Containers
export const containers = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        backgroundColor: colors.black,
        paddingVertical: 12,
    }, 
    button: {
        width: 175,
        height: 48,
        borderRadius: 16,
    },
    chooseFile: {
        height: '100%', 
        flex: 1, 
        justifyContent: "center", 
        paddingLeft: 16, 
    },
    header: {
        marginTop: 18,
        flexGrow: 1, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingHorizontal: 18, 
    },
    playButtonContainer: {
        flexGrow: 2, 
        alignItems: "center",
    },
    playButtonIcon: {
        height: '100%', 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        paddingLeft: 10, 
    },
    playButtonShadow: {
        backgroundColor: colors.black,
        width: 125,
        height: 125,
        borderRadius: 100,
    },
    receiveFile: {
        alignItems: "center",
        justifyContent: "center", 
        flexGrow: 2, 
    }, 
    sendFile: {
        flexGrow: 4, 
        paddingHorizontal: 48, 
    },
}); 

export const text = StyleSheet.create({
    blueText: {
        color: colors.blue, 
    }, 
    button: {
        fontWeight: "bold", 
        textTransform: "uppercase", 
        paddingVertical: 8,  
        paddingHorizontal: 24,
    }, 
    mainActionTitle: {
        fontWeight: "normal", 
        fontSize: 24, 
    }, 
    salmonText: {
        color: colors.salmon, 
    }, 
    title: {
        fontWeight: "bold", 
        fontSize: 20, 
        color: colors.yellow, 
    }, 
    sendFileTitle: {
        fontWeight: "bold", 
        fontSize: 20, 
        color: colors.blue, 
    }, 
    whiteText: {
        color: colors.white
    }
}); 

export const styles = StyleSheet.create({
    border: {
        borderColor: colors.white,
        borderWidth: 1, 
        borderStyle: "solid",
    }
});



