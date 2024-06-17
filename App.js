import {
  Pressable,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LogInUi } from "./LogIn";
import { RegisterUi } from "./Register";
import { HomeUi } from "./Home";
import { MainUi } from "./MainView";
import{AddNoteUi} from "./AddNote";
import{ViewNoteUi} from "./ViewNote";


const Stack = createNativeStackNavigator();

function app() {
  const ui = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainUi}
          options={{
            headerTitleStyle: {
              color: "white",
              fontSize:25,
            },
            headerStyle: { backgroundColor: "#427B70" },
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name="Register" component={RegisterUi} 
        options={{
          headerTitleStyle: {
            color: "white",
            fontSize:25,
          },
          headerStyle: { backgroundColor: "#427B70" },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        />
        <Stack.Screen name="LogIn" component={LogInUi} 
        options={{
          headerTitleStyle: {
            color: "white",
            fontSize:25,
          },
          headerStyle: { backgroundColor: "#427B70" },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        />
        <Stack.Screen name="My Note" component={HomeUi} 
        options={{
          headerTitleStyle: {
            color: "white",
            fontSize:25,
          },
          headerStyle: { backgroundColor: "#427B70" },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerBackVisible:false,

          headerLeft: () => (
            <Pressable onPress={()=>{
              
            }}
            >
              <Image source={require("./assets/Img/menu.png")} style={{width: 27, height: 27}}/>
            </Pressable>
          ),

        }}
        />
        <Stack.Screen name="New Note" component={AddNoteUi} 
        options={{
          headerTitleStyle: {
            color: "white",
            fontSize:25,
          },
          headerStyle: { backgroundColor: "#427B70" },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        />
        <Stack.Screen name="View Note" component={ViewNoteUi} 
        options={{
          headerTitleStyle: {
            color: "white",
            fontSize:25,
          },
          headerStyle: { backgroundColor: "#427B70" },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return ui;
}

export default app;
