import React from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card , Colors } from "react-native-paper";
import Main from "../components/Dashboard";

class DeckList extends React.Component {
  state = {
    decks: null
  };

  onDeckCardPress(deck) {
    this.props.navigation.navigate("Deck", {
      deckId: deck.id,
      title: deck.title,
      navigation: this.props.navigation
    });
  }

  render() {
    const { decks } = this.props;

    return (
        <Main>
          <ScrollView>
            {decks &&
            Object.keys(decks).map(id => (
                <TouchableOpacity key={id} onPress={() => this.onDeckCardPress(decks[id])}>
                  <Card style={styles.card}>
                    <Card.Title title={decks[id].title} right={props => (<Avatar.Text size={30} style={styles.avatarText} label={decks[id].questions.length}/>)}/>
                  </Card>
                </TouchableOpacity>
            ))}
          </ScrollView>
        </Main>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFF"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500"
  },
  avatarText: {
    marginRight: 16,
    backgroundColor: Colors.orange100
  }
});

function mapStateToProps({ decks }) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
