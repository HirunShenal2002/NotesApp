import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  Image,
  Button,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ViewNoteUi({ navigation, route }) {
  const [getTitle, setTitle] = useState(route.params.title);
  const [getDescription, setDescription] = useState(route.params.description);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(route.params.catId);
  const [items, setItems] = useState([
    { label: "Study", value: "1" },
    { label: "Travel", value: "2" },
    { label: "Personal", value: "3" },
    { label: "Work", value: "4" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#427B70" barStyle="dark-content" />
      <View style={styles.mainView}>
        <View style={styles.compView}>
          <TextInput
            style={styles.textInputTitle}
            value={getTitle}
            onChangeText={(text) => setTitle(text)}
            placeholder="Enter Note Title"
          />
        </View>
        <View style={styles.compViewDropDown}>
          <DropDownPicker
            style={styles.mainText}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            textStyle={styles.mainText}
          />
        </View>
        <View style={styles.compView}>
          <TextInput
            style={styles.textInput}
            editable
            multiline
            numberOfLines={31}
            textAlignVertical="top"
            value={getDescription}
            onChangeText={(text) => setDescription(text)}
            placeholder="Write your own Note here"
          />
        </View>
        <View style={styles.btnViewMainFlex}>
          <View style={styles.buttonAreaFooter}>
            <View style={{ margin: 20 }}>
              <Pressable
                onPress={async () => {
                  const mobile = await AsyncStorage.getItem("mobile");

                  const details = {
                    noteTitle: getTitle,
                    noteId: route.params.id,
                    category: value,
                    description: getDescription,
                  };

                  fetch("http://10.0.2.2/MyNotes/update_note.php", {
                    method: "POST",
                    body: JSON.stringify(details),
                  })
                    .then((response) => {
                      return response.text();
                    })
                    .then((text) => {
                      if (text == "Success") {
                        Alert.alert("Message", "Successfully updated..");
                        navigation.navigate("My Note");
                      } else {
                        Alert.alert("Warning", text);
                      }
                    })
                    .catch((error) => {
                      Alert.alert("Error", error);
                    });
                }}
                style={styles.btn}
              >
                <View style={styles.btnView01}>
                  <Image
                    source={require("./assets/Img/Save.png")}
                    style={styles.btnNewNote}
                  />
                </View>
              </Pressable>
            </View>

            <View style={{ margin: 20 }}>
              <Pressable
                onPress={() => {


                    const details = {
                      noteId: route.params.id,
                    };
  
                    fetch("http://10.0.2.2/MyNotes/delete_note.php", {
                      method: "POST",
                      body: JSON.stringify(details),
                    })
                      .then((response) => {
                        return response.text();
                      })
                      .then((text) => {
                        if (text == "Success") {
                          Alert.alert("Message", "Note Deleted Successfully..");
                          navigation.navigate("My Note");
                        } else {
                          Alert.alert("Warning", text);
                        }
                      })
                      .catch((error) => {
                        Alert.alert("Error", error);
                      });
                }}
                style={styles.btn}
              >
                <View style={styles.btnView01}>
                  <Image
                    source={require("./assets/Img/Delete.png")}
                    style={styles.btnNewNote}
                  />
                </View>
              </Pressable>
            </View>

            <View style={{ margin: 20 }}>
              <Pressable
                onPress={() => {
                  navigation.navigate("My Note");
                }}
                style={styles.btn}
              >
                <View style={styles.btnView01}>
                  <Image
                    source={require("./assets/Img/NoteList.png")}
                    style={styles.btnNewNote}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFD5D3",
    alignItems: "center",
    justifyContent: "center",
  },
  compViewDropDown: {
    height: 50,
    zIndex: 2,
    fontSize: 18,
    borderColor: "#68DFC8",
    color: "#427B70",
    backgroundColor: "white",
    borderRadius: 20,
  },
  textInput: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderColor: "#68DFC8",
    color: "#427B70",
    height: 400,
    backgroundColor: "white",
  },
  mainText: {
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    borderColor: "#68DFC8",
    color: "#427B70",
    backgroundColor: "white",
    zIndex: 2,
    height: 40,
  },
  compView: {
    marginVertical: 15,
  },
  mainView: {
    flex: 1,
    padding: 3,
    width: 350,
  },
  btnSign: {
    backgroundColor: "#1F45FC",
    Text: "center",
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  btnText: {
    padding: 6,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  btnView: {
    marginVertical: 10,
    alignItems: "center",
  },
  textInputTitle: {
    borderStyle: "solid",
    borderRadius: 20,
    paddingLeft: 20,
    borderWidth: 1,
    padding: 5,
    fontSize: 20,
    borderColor: "#68DFC8",
    color: "#427B70",
    height: 40,
    backgroundColor: "white",
    zIndex: 1,
  },

  btnView01: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 60,
  },
  btnView02: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    backgroundColor: "#CFD5D3",
  },
  btnView03: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CFD5D3",
  },
  btnView04: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "#CFD5D3",
  },
  text2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E544D",
    justifyContent: "center",
    alignItems: "center",
  },
  btnViewMainFlex: {
    flex: 1,
    flexDirection: "row",
  },
  btnNewNote: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#CFD5D3",
    borderColor: "#68DFC8",
  },
  buttonAreaFooter: {
    flexDirection: "row",
    width: 345,
    justifyContent: "center",
  },
});
