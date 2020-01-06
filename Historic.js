import React from "react";
import { View, Image, Keyboard, BackHandler, AsyncStorage, TouchableOpacity, ScrollView } from "react-native"
import { TextInput, Button, IconButton, Text } from "react-native-paper"

class Historic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historic: []
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.quitHistoric()
      return true;
    });
    AsyncStorage.getItem("historic").then(historic => {
      historic = JSON.parse(historic) || []
      this.setState({ historic: historic })
    })
  }

  render() {
    return (
      <View style={styles.root}>
        <Image source={require("./assets/logo.png")} resizeMode="contain" style={{ width: "100%", marginBottom: 30 }} />
        <IconButton icon="arrow-left" style={{ position: "absolute", top: 40, left: 10 }} onPress={this.props.quitHistoric} />
        <ScrollView style={{ width: "100%", padding: 20, paddingVertical: 0, flex: 1 }}>
          {this.state.historic.sort((a, b) => a.start - b.start).map((row, id) => {
            return <TouchableOpacity key={id} onPress={() => this.props.goToDetails(row)} style={{ backgroundColor: "#FEFEFE", margin: 1, elevation: 10, height: 30, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
              <Text style={{ marginLeft: 10 }}>{row.name + " " + row.nickname}</Text>
              <Text style={{ marginRight: 10 }}>{new Date(row.start).toLocaleDateString() + " " + new Date(row.start).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  root: {
    justifyContent: "flex-start",
    paddingTop: 100,
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    padding: 10,
  },
  inputs: {
    marginTop: 10,
    width: "100%"
  }
}

export default Historic