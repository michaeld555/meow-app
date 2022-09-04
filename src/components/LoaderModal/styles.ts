import {StyleSheet} from "react-native";

const modal = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 0,
      borderRadius: 20,
      padding: 0,
      alignItems: "center",
      height: 400,
      width: 200,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  })

  export { modal };