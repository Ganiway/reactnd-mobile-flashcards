import React from "react";
import { connect } from "react-redux";
import {StyleSheet, ScrollView, View, KeyboardAvoidingView } from "react-native";
import { handleAddDecks, resetNewDeckId } from "../actions";
import { TextHeader, Button, TextInput } from "../components";
import Main from "../components/Dashboard";

class AddDeck extends React.Component {
  state = {
    deckTitle: ""
  };

  onAddCreateDeckPress() {
    if (!this.state.deckTitle) {
      return alert("Please Enter Deck Title");
    }
    this.props.addDeck(this.state.deckTitle);
  }

  handleOnChange = name => value => {
    this.setState({ [name]: value });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.newDeckId !== this.props.newDeckId) {
      this.props.navigation.navigate("Deck", {
        deckId: nextProps.newDeckId,
        title: this.state.deckTitle
      });
      this.setState({ deckTitle: "" });
    }
  }

  render() {
    return (
        <Main>
          <View style={styles.container}>
            <ScrollView>
              <KeyboardAvoidingView behavior="padding">
                <TextHeader>What's the title of your new deck?</TextHeader>
                <TextInput
                    style={styles.textInput}
                    label="Deck Title"
                    returnKeyType="done"
                    value={this.state.deckTitle}
                    onChangeText={this.handleOnChange("deckTitle")}
                    autoCapitalize="sentences"/>
                <Button mode="contained" onPress={() => this.onAddCreateDeckPress()} style={styles.button}>Create New Deck</Button>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Main>
    );
  }
}

function mapStateToProps({ newDeckId }) {
  return {
    newDeckId: newDeckId.newDeckId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: deckTitle => {
      dispatch(handleAddDecks(deckTitle));
    },
    resetNewDeckId: () => {
      dispatch(resetNewDeckId());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF"
  }
});
