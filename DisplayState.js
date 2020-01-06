import React from "react";
import { View, Image, Keyboard, AsyncStorage } from "react-native"
import { TextInput, Button, Text, IconButton } from "react-native-paper"
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Notifications } from 'expo';

const moment = extendMoment(Moment);

class DisplayState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nickname: "",
      adress: "",
      description: "",
    }
  }

  line = (label, value) => {
    return (<View style={styles.line}>
      <Text style={styles.label}>{label + ": "}</Text>
      <Text style={styles.value}>{value || "n/a"}</Text>
    </View>)
  }

  CloseIt = () => {
    AsyncStorage.getItem("hitoric").then(historic => {
      historic = JSON.parse(historic) || []
      const data = this.props.notif.data
      data.end = Date.now()
      historic.push(data)
      AsyncStorage.setItem("historic", JSON.stringify(historic))
      Notifications.dismissNotificationAsync(this.props.notif.notificationId)
      this.props.quitNotifDetails()
    })
  }

  render() {
    const data = this.props.notif.data
    const duration = moment.range(moment(data.start), moment(data.end || Date.now())).valueOf()
    return (
      <View style={styles.root}>
        <IconButton icon="arrow-left" style={{ position: "absolute", top: 40, left: 10 }} onPress={this.props.quitNotifDetails} />
        <Image source={require("./assets/logo.png")} resizeMode="contain" style={{ width: "100%", marginBottom: 30 }} />
        {this.line("Nom", data.name)}
        {this.line("Prénom", data.nickname)}
        {this.line("Adress", data.adress)}
        {this.line("Déscription", data.description)}
        {this.line("Début", new Date(data.start).toLocaleDateString() + " à " + new Date(data.start).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }))}
        {data.end && this.line("Fin", new Date(data.end).toLocaleDateString() + " à " + new Date(data.end).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }))}
        {!data.end && this.line("Durée", (duration / 1000 / 60).toFixed(0) + "min")}
        {!data.end &&
          <View style={{ width: "100%", alignItems: "center", marginTop: 50 }}>
            <Button icon="check-circle-outline" color='rgb(212, 40,40)' mode="contained" onPress={() => this.props.start(this.state)} style={{ width: 150, borderRadius: 3, marginTop: 20 }}
              onPress={this.CloseIt}
            >
              Cloturer
            </Button>
          </View>
        }
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
  },
  label: {
    fontWeight: "bold",
    fontSize: 20
  },
  value: {
    fontSize: 20
  },
  line: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 10,
  }
}

export default DisplayState