import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Button as PaperButton, Colors, Text } from "react-native-paper";
import { Main, Button } from "../components";
import { handleDeleteDeck } from "../actions";

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
  };

  onAddCardPress(id) {
    this.props.navigation.navigate("AddCard", {
      deckId: id
    });
  }

  onStartQuizPress(id) {
    this.props.navigation.navigate("Quiz", {
      deckId: id
    });
  }

  onDeleteDeckPress(id) {
    this.props.deleteDeck(id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.deck) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const { deck } = this.props;
    if (deck) {
      return (
          <Main>
            <View style={styles.container}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.count}>{deck.questions.length} cards</Text>
              <Button mode="contained" disabled={deck.questions.length <= 0} onPress={() => this.onStartQuizPress(deck.id)}>Start Quiz</Button>
              <Button mode="contained" onPress={() => this.onAddCardPress(deck.id)}>Add New Card</Button>
              <PaperButton style={styles.buttonDeleteDeck} labelStyle={styles.buttonDeleteDeckLabel} mode="text" onPress={() => this.onDeleteDeckPress(deck.id)}>Delete Deck</PaperButton>
            </View>
          </Main>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  },
  deckTitle: {
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.green200,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  count: {
    marginBottom: 20
  },
  buttonDeleteDeckLabel: {
    color: Colors.red500,
    textTransform: "none",
    marginTop: 20
  }
});

function mapStateToProps({ decks }, props) {
  const { deckId } = props.navigation.state.params;
  return {
    deck: decks[deckId]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteDeck: deckId => {
      dispatch(handleDeleteDeck(deckId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
