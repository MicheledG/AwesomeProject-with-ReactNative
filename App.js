/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Picker,
    AppState,
} from 'react-native';

import {Styles} from "./styles/styles";
import Firebase from 'react-native-firebase';
import {FirebaseNotificationController} from './controllers/NotificationController'
import {LocalNotificationButton} from './components/LocalNotificationButton';

const FirebaseCloudMessaging = Firebase.messaging();

export default class App extends Component {
    constructor(props){

        super(props);

        this.state = {
          notificationInterval: -1,
        };

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    componentDidMount(){
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    //we want detect when the application goes background to set up the
    //push notification timer
    handleAppStateChange(appState){
        if(appState === 'background'){
            console.log('app is in background', this.state.notificationInterval);

            const notificationInterval = this.state.notificationInterval;

            if(notificationInterval > 0){

                const scheduledNotification = {
                    title: 'Schedule Notification Test',
                    body: 'This is your scheduled notification',
                    fire_date: new Date().getTime() + 1000 * notificationInterval,
                    id: new Date().getTime().toString(),
                    priority: 'high',
                    show_in_foreground: true,
                };

                FirebaseCloudMessaging.scheduleLocalNotification(scheduledNotification);

                console.log('the notification has been scheduled', scheduledNotification);
            }
        }
    }

    render(){
        return (
            <View style={Styles.container}>
                <Text style={Styles.welcome}>
                    Welcome to AwesomeProject!
                </Text>
                <Text style={Styles.instructions}>
                    Select an interval in seconds to schedule a push notification
                </Text>
                <Picker
                    style={Styles.picker}
                    selectedValue={this.state.notificationInterval}
                    onValueChange={(seconds) => this.setState({notificationInterval: seconds})}
                >
                    <Picker.Item label="5" value={5}/>
                    <Picker.Item label="10" value={10}/>
                    <Picker.Item label="15" value={15}/>
                    <Picker.Item label="OFF" value={-1}/>
                </Picker>
                <LocalNotificationButton/>
                <FirebaseNotificationController/>
            </View>
        );
    }
}