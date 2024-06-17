import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Alert,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeUi({ navigation }) {
  const [getNote, setNote] = useState([]);

  loadNote();

  async function loadNote() {
    const details = {
      mobile: await AsyncStorage.getItem("mobile"),
    };

    fetch("http://10.0.2.2/MyNotes/load_note.php", {
      method: "POST",
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.json();
      })
      .then((text) => {
        setNote(text);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }
  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#427B70" barStyle="dark-content" />
      <View style={styles.btnView01}>
        <Image
          source={require("./assets/Img/Note_List.png")}
          style={{ width: 400, height: 280, backgroundColor: "#CFD5D3" }}
        />
      </View>

      <View style={styles.mainView04}>
        <Pressable
          style={styles.btn01}
          onPress={async () => {
            await AsyncStorage.removeItem("mobile");
            navigation.navigate("LogIn");
          }}
        >
          <View style={styles.btnView05}>
            <Image
              source={require("./assets/Img/Logout.png")}
              style={styles.btnNewNote01}
            />
          </View>
        </Pressable>
      </View>

      <FlatList data={getNote} renderItem={UserUi} />

      <View style={styles.newNoteView}>
        <Pressable
          onPress={() => {
            navigation.navigate("New Note");
          }}
          style={styles.btnNewNote}
        >
          <Image
            source={require("./assets/Img/NewNote.gif")}
            style={styles.btnNewNote}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );

  function UserUi({ item }) {
    let image_root;

    let category_name = new Array(item.name);

    if (category_name == "Study") {
      image_root = require("./assets/Category/Study.png");
    } else if (category_name == "Travel") {
      image_root = require("./assets/Category/Travel.png");
    } else if (category_name == "Personal") {
      image_root = require("./assets/Category/Personal.png");
    } else if (category_name == "Work") {
      image_root = require("./assets/Category/Work.png");
    }

    const ui = (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Pressable style={styles.mainView01}>
            <View style={styles.proImgView}>
              <Image style={styles.proImg} source={image_root} />
            </View>
          </Pressable>

          <View style={styles.mainView02}>
            <Text style={styles.text1}>{item.title}</Text>
            <Text style={styles.text3}>{item.date}</Text>
          </View>

          <View style={styles.mainView03}>
            <Pressable
              style={styles.btn}
              onPress={() => {
                navigation.navigate("View Note", item);
              }}
            >
              <View style={styles.btnView}>
                <Text style={styles.text2}>View</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
    return ui;
  }

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFD5D3",
  },

  proImgView: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: 8,
    width: 8,
    objectFit: "contain",
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 22,
    borderColor: "#68DFC8",
    marginBottom: 18,
  },

  mainView: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },

  mainView01: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: 40,
    width: 5,
    margin: 10,
    backgroundColor: "white",
  },

  mainView02: {
    flex: 3,
    justifyContent: "flex-start",
    margin: 10,
    alignItems: "flex-start",
  },

  mainView03: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    zIndex: 2,
  },

  mainView04: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    position: "absolute",
    marginTop: 250,
    marginLeft: 260,
    borderRadius: 50,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E544D",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 46,
  },
  text3: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2E544D",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 26,
  },
  btnView: {
    height: 30,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },

  btnView05: {
    height: 30,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    marginBottom: 30,
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
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#68DFC8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    borderColor: "#68DFC8",
  },
  btn01: {
    height: 40,
    width: 100,
    margin: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    borderColor: "#68DFC8",
  },
  btnNewNote: {
    width: 40,
    alignItems: "flex-end",
    paddingVertical: 5,
    marginBottom: 5,
    borderRadius: 50,
  },

  btnNewNote01: {
    width: 50,
    height: 50,
    alignItems: "flex-end",
    paddingVertical: 5,
    marginBottom: 5,
    borderRadius: 50,
    marginLeft: 40,
  },
  newNoteView: {
    position: "absolute",
    bottom: 1,
    alignSelf: "flex-end",
    right: 20,
  },
  btnView01: {
    marginVertical: 10,
    alignItems: "center",
    zIndex: 1,
  },
});
