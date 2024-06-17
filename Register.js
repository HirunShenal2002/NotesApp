import {
  ImageBackground,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  Pressable,
  Alert,
  StatusBar,
} from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";

export function RegisterUi({ navigation }) {
  const [getMobile, setMobile] = useState("");
  const [getFName, setFName] = useState("");
  const [getLName, setLName] = useState("");
  const [getPassword, setPassword] = useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#427B70"  barStyle="dark-content"/>
      <BlurView intensity={100} style={{ width: "100%", height: "100%" }}>
        <ImageBackground
          source={require("./assets/Background/background.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.txtView01}>
            <Text style={styles.text1}>First Name</Text>
          </View>
          <TextInput
            style={styles.input}
            value={getFName}
            onChangeText={(text) => setFName(text)}
          />

          <View style={styles.txtView}>
            <Text style={styles.text1}>Last Name</Text>
          </View>
          <TextInput
            style={styles.input}
            value={getLName}
            onChangeText={(text) => setLName(text)}
          />

          <View style={styles.txtView}>
            <Text style={styles.text1}>Mobile</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={getMobile}
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

          <Pressable
            style={styles.btn01}
            onPress={() => {
              // navigation.navigate("LogIn", "OK");
              const details = {
                mobile: getMobile,
                firstName: getFName,
                lastName: getLName,
                password: getPassword,
              };

              fetch("http://10.0.2.2/MyNotes/sign_up.php", {
                method: "POST",
                body: JSON.stringify(details),
              })
                .then((response) => {
                  return response.text();
                })
                .then((text) => {
                  if (text == "Success") {
                    Alert.alert("Success", text);
                    navigation.navigate("LogIn");

                  } else if (text =="User with the same email address or mobile number already exsist") {

                    Alert.alert("Warning",text);

                    navigation.navigate("LogIn");

                  } else {
                    Alert.alert("Warning",text);
                    
                  }
                })
                .catch((error) => {
                  Alert.alert("Error", error);
                });
            }}
          >
            <View style={styles.btnView}>
              <Text style={styles.text3}>Sign Up</Text>
            </View>
          </Pressable>

          <Pressable style={styles.btn} onPress={goToSignIn}>
            <View style={styles.btnView}>
              <Text style={styles.text2}>Sign In</Text>
            </View>
          </Pressable>
          
        </ImageBackground>
      </BlurView>
    
    </SafeAreaView>

    
  );

  function goToSignIn() {
    navigation.navigate("LogIn");
  }
  return ui;

  
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
    marginTop: 50,
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
