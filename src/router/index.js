import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Appbar } from "../components";
import { AddDeck, Deck, AddCard, Quiz } from "../navigations";

import NavigationDrawer from "./NavigationDrawer";

const navigations = {
  AddDeck: {
    screen: AddDeck,
    title: "New Deck"
  },
  Deck: {
    screen: Deck,
    title: "Deck"
  },
  AddCard: {
    screen: AddCard,
    title: "New Card"
  },
  Quiz: {
    screen: Quiz,
    title: "Quiz"
  }
};

const routes = Object.keys(navigations)
  .map(id => ({ id, item: navigations[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item.screen;
    const Screen = props => <Comp {...props} />;
    Screen.navigationOptions = ({ navigation }) => ({
      header: <Appbar menu={false} title={item.title} navigation={navigation} />
    });
    return {
      ...acc,
      [id]: { screen: Screen }
    };
  }, {});

const NavigationStack = createStackNavigator(
  {
    Drawer: {
      screen: NavigationDrawer,
      navigationOptions: ({ navigation }) => ({
        header: () =>  <Appbar
            menu={true}
            title="Mobile Flashcards"
            navigation={navigation}
        />
      })
    },
    ...routes
  },
  {
    initialRouteName: "Drawer"
  }
);

const Router = createAppContainer(NavigationStack);

export default Router;
