import React from "react";
import { Dimensions } from "react-native";
import {Colors} from "react-native-paper";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Drawer } from "../components";
import { AddDeck, DeckList } from "../navigations";

const navigations = {
    DeckList: {
        screen: DeckList,
        title: "Decks"
    },
    DeckAdd: {
        screen: AddDeck,
        title: "New Deck"
    }
};

const routes = Object.keys(navigations)
  .map(id => ({ id, item: navigations[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item.screen;
    const Screen = props => <Comp {...props} />;
    Screen.navigationOptions = ({ navigation }) => ({
      drawerLabel: item.title,
    });
    return {
      ...acc,
      [id]: { screen: Screen }
    };
  }, {});

const NavigationDrawer = createDrawerNavigator(
  {
    ...routes
  },
  {
    contentComponent: props => <Drawer {...props} />,
    initialRouteName: "DeckList",
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: false,
    contentOptions: {
        labelStyle: {
            fontSize: 14,
        },
        activeBackgroundColor: Colors.green200,
        activeTintColor: "#000000",
        inactiveTintColor: 'lightgray',
        itemsContainerStyle: {
            marginTop: 8,
            marginHorizontal: 8
      }
    }
  }
);

export default NavigationDrawer;
