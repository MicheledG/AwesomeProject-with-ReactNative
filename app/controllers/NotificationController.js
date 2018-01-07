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
        this.foregroundNotificationHandler = this.foregroundNotificationHandler.bind(this);
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

        FirebaseCloudMessaging.onMessage(this.foregroundNotificationHandler);

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

    //handle a notification that opens the app
    initialNotificationHandler(notification){
        console.log("Initial notification", notification);
        this.props.onNotification(notification.title, notification.body);
    }

    //handle notifications arrived when the app is foreground
    foregroundNotificationHandler(notification){
        console.log("Foreground notification", notification);
    }


    render(){
        return null;
    }

}
