import React,{Component} from "react";
import {Alert, Button} from "react-native";

export class AlertButton extends Component {

    showAlert(){
        Alert.alert('You tapped the alert button');
    }

    render(){
        return(
            <Button
                title="Press Me"
                onPress={this.showAlert}/>
        );
    }
}