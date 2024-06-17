import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  StatusBar
} from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export function LogInUi({ navigation }) {
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  

  useFocusEffect(() => {
    autologing();
  });

  async function autologing(){
    const mobile = await AsyncStorage.getItem("mobile");

    if(mobile != null){

      navigation.navigate("My Note");

    }
  }

  

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#427B70"  barStyle="dark-content"/>
      <BlurView intensity={100} style={{ width: "100%", height: "100%" }}>
        <ImageBackground
          source={require("./assets/Background/background.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.txtView01}>
            <Text style={styles.text1}>Mobile</Text>
          </View>
          <TextInput
            style={styles.input}
            value={getMobile}
            keyboardType="numeric"
            onChangeText={(text) => setMobile(text)}
          />

          <View style={styles.txtView}>
            <Text style={styles.text1}>Password</Text>
          </View>
          <TextInput
            style={styles.input}
            value={getPassword}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />

          <Pressable style={styles.btn01} onPress={goToHome}>
            <View style={styles.btnView}>
              <Text style={styles.text3}>Sign In</Text>
            </View>
          </Pressable>

          <Pressable style={styles.btn} onPress={goToSignUp}>
            <View style={styles.btnView}>
              <Text style={styles.text2}>Sign Up</Text>
            </View>
          </Pressable>
        </ImageBackground>
      </BlurView>
    </SafeAreaView>
  );

  function goToSignUp() {
    navigation.navigate("Register");
  }
  return ui;

  function goToHome() {


    const logDetails = {
      mobile: getMobile,
      password: getPassword,
    };

    fetch("http://10.0.2.2/MyNotes/sign_in.php", {
      method: "POST",
      body: JSON.stringify(logDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        
        if(text == "Success"){
          saveDetails();
          Alert.alert("Success", text);
          navigation.navigate("My Note");
        }else{
          Alert.alert("Invalid", text);
        }
       
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });

    
  }

  async function saveDetails(){
    await AsyncStorage.setItem("mobile",getMobile)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  btnView01: {
    height: 30,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  text2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E544D",
    justifyContent: "center",
    alignItems: "center",
  },
  text3: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
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
  },

  btn01: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#427B70",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginTop: 20,
    borderColor: "#68DFC8",
  },
});
