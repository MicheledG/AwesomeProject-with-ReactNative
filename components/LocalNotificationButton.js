import React,{Component} from "react";
import {Button} from "react-native";
import Firebase from 'react-native-firebase';

const FirebaseCloudMessaging = Firebase.messaging();

export class LocalNotificationButton extends Component {

    constructor(props){
        super(props);
    }

    sendLocalNotification(){
        FirebaseCloudMessaging.createLocalNotification({
            title: 'Local Notification Test',
            body: 'This is your notification',
            show_in_foreground: true,
            priority: 'high',
        });
    }

    render(){
        return(
            <Button
                title="Send Notification Now"
                onPress={this.sendLocalNotification}/>
        );
    }
}