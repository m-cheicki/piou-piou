import {StyleSheet } from "react-native";

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
        //paddingVertical: 25,
        //paddingLeft: 45,
    },
    selectFile: {
        // backgroundColor: colors.salmon,
        // padding: 10,
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
    header: {
        marginTop: 18,
        // backgroundColor: colors.salmon,
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
    chooseFile: {
        height: '100%', 
        flex: 1, 
        justifyContent: "center", 
        paddingLeft: 16, 
    },
    playButtonIcon: {
        height: '100%', 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        paddingLeft: 10, 
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
        paddingHorizontal: 24
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

export const shadowOpt = {
    width: 160,
    height: 170,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 }
 };


export const styles = StyleSheet.create({
    darkShadow: {
        shadowColor: "#000", 
        shadowOffset: {
            width: 12,
            height: 12,
        }, 
        shadowOpacity: 0.25,
        shadowRadius: 10,
    }, 
    lightShadow: {
        shadowColor: "#FFF", 
        shadowOffset: {
            width: -2,
            height: -2,
        }, 
        shadowOpacity: 0.03,
        shadowRadius: 10,
    },
    border: {
        borderColor: colors.white,
        borderWidth: 1, 
        borderStyle: "solid",
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        //elevation: 1,
    }
});



