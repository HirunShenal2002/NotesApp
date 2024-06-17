import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import { BlurView } from "expo-blur";

export function MainUi({ navigation }) {
  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#427B70"  barStyle="dark-content"/>
      <BlurView intensity={100} style={{ width: "100%", height: "100%" }}>
        <ImageBackground
          source={require("./assets/Background/background.png")}
          style={styles.backgroundImage}
        >
          <Pressable style={styles.mainView01}>
            <View style={styles.proImgView}>
              <Image
                style={styles.proImg}
                source={require("./assets/Img/Note.png")}
              />
            </View>
          </Pressable>

          <Pressable style={styles.btn} onPress={goToSignIn}>
            <View style={styles.btnView}>
              <Text style={styles.text2}>Get Start</Text>
            </View>
          </Pressable>
        </ImageBackground>
      </BlurView>
    </SafeAreaView>
  );
  return ui;

  

  function goToSignIn() {
    navigation.navigate("LogIn");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  proImgView: {
    justifyContent: "center",
    alignItems: "center",
    objectFit: "contain",
  },

  mainView01: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    objectFit: "contain",
    marginLeft:150,
    width: 100,
    margin: 10,

  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#68DFC8",
    justifyContent: "center",
    alignItems: "center",
  },
  btnView: {
    height: 30,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  text2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E544D",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#68DFC8",
    color: "#427B70",
    fontSize: 20,
  },
  txtView: {
    height: 30,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  txtView01: {
    height: 30,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    marginTop: 150,
  },
  btn: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    marginTop: 20,
    borderColor: "#68DFC8",
    marginBottom:35,
  },
});
