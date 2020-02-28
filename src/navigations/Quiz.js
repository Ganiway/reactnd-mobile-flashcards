import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Colors, FAB, Text } from "react-native-paper";
import CardFlip from "react-native-card-flip";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Main, Button } from "../components";
import { handleDeleteDeck } from "../actions";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends React.Component {
  state = {
    cardRotated: false,
    questionIndex: 0,
    correctCount: 0,
    quizCompleted: false,
    viewedAnswer: 0,
    actionsDisabled: false,
    actionsFadeValue: new Animated.Value(1)
  };

  _handleActionsFade = () => {
    Animated.timing(this.state.actionsFadeValue, {
      toValue: 0.3,
      duration: 500
    }).start();
  };

  handleCardFlip() {
    if (!this.state.quizCompleted) {
      this.card.flip();
      if (!this.state.cardRotated) {
        this.setState({
          viewedAnswer: ++this.state.viewedAnswer
        });
        console.log("view count: " + this.state.viewedAnswer);
      }
    }
  }

  setupNotification() {
    clearLocalNotification().then(setLocalNotification);
  }

  handleMarkQuestion(isCorrect) {
    if (!this.state.quizCompleted) {
      const updatedQuestionIndex = this.state.questionIndex + 1;
      this.state.viewedAnswer === 0 && this.handleCardFlip();
      this._handleActionsFade();
      this.setState({
        actionsDisabled: true
      });

      setTimeout(
        function() {
          if (this.props.deck.questions.length !== updatedQuestionIndex) {
            this.handleCardFlip();
            this._handleActionsFade();
          }
          setTimeout(
            function() {
              this.setState((state, props) => {
                return {
                  correctCount: isCorrect
                    ? ++state.correctCount
                    : state.correctCount,
                  questionIndex: updatedQuestionIndex,
                  quizCompleted:
                    props.deck.questions.length === updatedQuestionIndex,
                  viewedAnswer: 0,
                  actionsDisabled: false
                };
              });
            }.bind(this),
            400
          );
        }.bind(this),
        1000
      );
    } else {
      this.setupNotification();
    }
  }

  render() {
    if (this.state.quizCompleted) {
      return this.renderQuizCompleted();
    } else {
      return this.renderQuiz();
    }
  }

  restartQuiz() {
    this.setState({
      cardRotated: false,
      correctCount: 0,
      questionIndex: 0,
      quizCompleted: false,
      viewedAnswer: 0
    });
    if (!this.state.cardRotated) {
      this.handleCardFlip();
    }
  }

  renderQuiz() {
    const { questions } = this.props.deck;
    const { questionIndex } = this.state;

    return (
      <Main>
        <View style={styles.cardContainer}>
          <CardFlip style={styles.cardFlip} ref={card => (this.card = card)}>
            <TouchableOpacity
              style={[styles.card, styles.card1]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}>
              <Text style={[styles.label, styles.label1]}>
                {questions[questionIndex].question}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, styles.card2]}
              activeOpacity={0.9}
              onPress={() => this.handleCardFlip()}>
              <Text style={[styles.label, styles.label2]}>
                {questions[questionIndex].answer}
              </Text>
            </TouchableOpacity>
          </CardFlip>
          <Text style={styles.remainingQuestionText}>
            {this.props.deck.questions.length - questionIndex}{" "}
            {this.props.deck.questions.length - questionIndex > 1
              ? "questions "
              : "question "}
            remaining
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <FAB style={[
                styles.fab,
                styles.fabCenter,
                this.state.actionsDisabled && {
                  opacity: this.state.actionsFadeValue
                }
              ]}
              disabled={this.state.actionsDisabled}
              color={Colors.white}
              small
              icon="rotate-right"
              onPress={() => this.handleCardFlip()}/>
          <Button mode="contained" style={styles.button} onPress={() => this.handleMarkQuestion(true)}>Correct</Button>
          <Button mode="contained" style={styles.button} onPress={() => this.handleMarkQuestion(false)}>Incorrect</Button>
        </View>
      </Main>
    );
  }

  renderQuizCompleted() {
    return (
      <Main>
        <View style={styles.quizCompletedContainer}>
          <Text style={styles.deckTitle}>Quiz Completed</Text>
          <Text style={styles.count}>You have answered{" "}{Math.round((this.state.correctCount / this.props.deck.questions.length) * 100)} % correct</Text>
          <Button mode="contained" onPress={() => this.restartQuiz()}>Restart Quiz</Button>
          <Button mode="contained" onPress={() => this.props.navigation.goBack()}>Back to Deck</Button>
        </View>
      </Main>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  animatedCardContainer: { flex: 1 },
  cardContainer: {
    flex: 1,
    alignItems: "center"
  },
  cardFlip: {
    flex: 1,
    height: hp("100%"),
    width: wp("100%") - 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10
  },
  actionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  card: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 2,
      height: 1
    },
    shadowOpacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  card1: {
    backgroundColor: Colors.white
  },
  card2: {
    backgroundColor: Colors.orange100
  },
  label: {
    textAlign: "center",
    fontSize: 30,
    padding: 20
  },
  fab: {
    position: "relative",
    zIndex: 9999,
    borderWidth: 5,
    borderRadius: 50,
    backgroundColor: "#FFF"
  },
  fabCenter: {
    marginBottom: 30,
    borderWidth: 0,
    backgroundColor: Colors.orange100
  },
  remainingQuestionText: {
    fontSize: 14,
    paddingTop: 20,
    textTransform: "uppercase",
    color: Colors.grey500
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
  quizCompletedContainer: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  },
  count: {
    marginBottom: 20
  },
});
