import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Starter from './Starter';
import { Notifications } from 'expo';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DisplayState from './DisplayState';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(212, 2, 2)',
    accent: '#f1c40f',
  },
};


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedNotif: null
    }
  }


  componentDidMount() {
    Notifications.addListener(this.handleNotifClick)
  }

  handleNotifClick = (notif) => {
    if (notif.origin !== "selected") return
    console.log(notif)
    this.start(notif.data, true).then(id => {
      notif.notificationId = id
      this.setState({ selectedNotif: notif })
    })
  }


  start = (datas, recall = false) => {
    const data = { ...datas }
    if (!recall) data.start = Date.now()
    return Notifications.presentLocalNotificationAsync({
      title: "Déplacement pour Aptor en cours",
      data: data,
      body: datas.nickname || datas.name ? "Chez " + datas.nickname + " " + datas.name : (datas.adress) ? "Au " + datas.adress : datas.description,
      android: { sticky: true },
      ios: { _displayInForeground: true }
    })
  }

  render() {
    const { selectedNotif } = this.state
    return (
      <PaperProvider theme={theme} >
        <View style={styles.container}>
          {!selectedNotif && <Starter start={this.start} />}
          {selectedNotif && <DisplayState notif={selectedNotif} quitNotifDetails={() => this.setState({ selectedNotif: null })} />}
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
