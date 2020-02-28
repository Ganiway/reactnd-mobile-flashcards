import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View, KeyboardAvoidingView } from "react-native";
import { Button, TextHeader, TextInput } from "../components";
import Main from "../components/Dashboard";
import { handleAddCardToDeck } from "../actions";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  onAddCardPress() {
    const { deckId } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    if (!question || !answer) {
      return alert("Please Enter all the fields");
    }
    this.props.addCardToDeck(deckId, {
      question,
      answer
    });
    this.props.navigation.goBack();
  }

  handleChange = name => value => {
    this.setState({ [name]: value });
  };

  render() {
    return (
        <Main>
          <View style={styles.container}>
            <ScrollView>
              <KeyboardAvoidingView behavior="padding">
                <TextHeader>What's the title of your card?</TextHeader>
                <TextInput
                    label="Question"
                    returnKeyType="done"
                    onChangeText={this.handleChange("question")}
                    autoCapitalize="sentences"
                />
                <TextHeader>What's the answer of your card?</TextHeader>
                <TextInput
                    label="Answer"
                    returnKeyType="done"
                    onChangeText={this.handleChange("answer")}
                    autoCapitalize="sentences"
                />
                <Button mode="contained" style={styles.button} onPress={() => this.onAddCardPress()}>Add New Card</Button>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Main>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCardToDeck: (deckId, card) => {
      dispatch(handleAddCardToDeck(deckId, card));
    }
  };
}

export default connect(null, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF"
  }
});
