import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Starter from './Starter';
import { Notifications } from 'expo';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import DisplayState from './DisplayState';
import Historic from './Historic';

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
      selectedNotif: null,
      historic: false,
    }
  }


  componentDidMount() {
    Notifications.addListener(this.handleNotifClick)
  }

  handleNotifClick = (notif) => {
    if (notif.origin !== "selected") return
    console.log(notif)
    this.start(notif.data, true)
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
    }).then(id => {
      this.setState({ selectedNotif: { notificationId: id, data: data } })
      return id
    })
  }

  render() {
    const { selectedNotif, historic } = this.state
    console.log(this.state.selectedNotif)
    return (
      <PaperProvider theme={theme} >
        <View style={styles.container}>
          {!selectedNotif && !historic && <Starter start={this.start} />}
          {selectedNotif && <DisplayState notif={selectedNotif} quitNotifDetails={() => this.setState({ selectedNotif: null })} />}
          {historic && !selectedNotif && <Historic quitHistoric={() => this.setState({ historic: false })} goToDetails={data => this.setState({ selectedNotif: { data: data } })} />}
          {!historic && !selectedNotif && <Button icon="clock" mode="contained" color="#F1F1F1" onPress={() => console.log('Pressed')} style={{ width: 150, borderRadius: 3, position: "absolute", bottom: 30, right: 30 }} onPress={() => this.setState({ historic: true })}>
            Historique
        </Button>}
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
