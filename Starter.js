import React from "react";
import { View, Image, Keyboard } from "react-native"
import { TextInput, Button } from "react-native-paper"

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nickname: "",
      adress: "",
      description: "",
    }
  }
  render() {
    const { name, nickname, adress, description } = this.state
    return (
      <View style={styles.root}>
        <Image source={require("./assets/logo.png")} resizeMode="contain" style={{ width: "100%", marginBottom: 30 }} />
        <TextInput style={styles.inputs} value={name} mode="outlined" label="Nom client" onChangeText={e => this.setState({ name: e })} onSubmitEditing={e => this.nickname.focus()} />
        <TextInput ref={e => this.nickname = e} style={styles.inputs} value={nickname} mode="outlined" label="Prénom client" onChangeText={e => this.setState({ nickname: e })} onSubmitEditing={e => this.adress.focus()} />
        <TextInput ref={e => this.adress = e} style={styles.inputs} value={adress} mode="outlined" label="Adresse client" onChangeText={e => this.setState({ adress: e })} onSubmitEditing={e => this.description.focus()} />
        <TextInput ref={e => this.description = e} style={styles.inputs} value={description} mode="outlined" label="Decription" onChangeText={e => this.setState({ description: e })} onSubmitEditing={e => Keyboard.dismiss()} />
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button icon="check" mode="contained" disabled={!name && !nickname && !adress && !description} onPress={() => {
            this.props.start(this.state)
            this.setState({
              name: "", nickname: "",
              adress: "",
              description: ""
            })
          }} style={{ width: 150, borderRadius: 3, marginTop: 20 }}>
            Démarrer
          </Button>
        </View>
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

export default Starter