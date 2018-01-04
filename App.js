/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {ScrollView} from 'react-native';

import {FruitBlinker} from './components/fruitblinker';
import {PizzaTranslator} from './components/pizzatranslator';
import {AlertButton} from "./components/alertbutton";

import PushNotification from 'react-native-push-notifications';

//set up code to enable PushNotifications
PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "800011711124",


    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true,
});

export default class App extends Component {
    render(){
        return (
            <ScrollView>
                <FruitBlinker/>
                <AlertButton/>
                <PizzaTranslator/>
            </ScrollView>
        );
    }
}