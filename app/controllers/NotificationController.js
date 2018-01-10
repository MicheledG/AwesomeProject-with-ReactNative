import React, {Component} from 'react';
import Firebase from 'react-native-firebase';

const FirebaseCloudMessaging = Firebase.messaging();

export class FirebaseNotificationController extends Component {

    constructor(props){
        super(props);

        this.state = {
            token: '',
        };

        this.tokenHandler = this.tokenHandler.bind(this);
        this.initialNotificationHandler = this.initialNotificationHandler.bind(this);
        this.foregroundBackgroundNotificationHandler = this.foregroundBackgroundNotificationHandler.bind(this);
    }

    componentDidMount(){

        FirebaseCloudMessaging.getToken()
            .then(this.tokenHandler)
            .catch(function(error){
                console.log("Error retrieving FCM token", error);
            });

        FirebaseCloudMessaging.onTokenRefresh(this.tokenHandler);

        FirebaseCloudMessaging.getInitialNotification()
            .then(this.initialNotificationHandler);

        FirebaseCloudMessaging.onMessage(this.foregroundBackgroundNotificationHandler);

    }

    componentWillUnmount(){

    }

    //update the FCM token in the state with the newest one
    tokenHandler(token){
        console.log("Received FCM token",{token: token});
        this.setState(
            ()=>{return {token: token}},
            ()=>{console.log("Stored FCM token", {token: this.state.token});}
        );
    }

    //handle the notification that opens the app
    initialNotificationHandler(notification){
        console.log("Initial notification", notification);
        if(notification.hasOwnProperty('fcm')){
            if(notification.fcm.action === 'android.intent.action.MAIN'){
                //the app has been opened by tapping on the app icon
                this.props.onNotification('Welcome to AwesomeProject', "You've just opened the app");
            }
            else{
                //the app has been opened tapping on a notification
                this.props.onNotification(notification.title, notification.body);
            }
        }
    }

    //handle notifications arrived when the app is foreground or background
    foregroundBackgroundNotificationHandler(notification){
        console.log("Foreground/Background notification", notification);
        if(notification.hasOwnProperty('title') && notification.hasOwnProperty('body')) {
            //the application received an app notification
            this.props.onNotification(notification.title, notification.body);
        }
        else {
            //the user recalled the app from background by tapping on the app icon
            this.props.onNotification('Welcome back to AwesomeProject', "You've just recalled the app");
        }
    }


    render(){
        return null;
    }

}
