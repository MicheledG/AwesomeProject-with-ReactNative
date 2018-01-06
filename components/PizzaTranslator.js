import React,{Component} from "react";
import {
    View,
    Text,
    TextInput
} from "react-native";

export class PizzaTranslator extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        };
    }

    render(){
        return(
            <View style={{width: 300}}>
                <TextInput
                    style={{height:40}}
                    placeholder='Type here to translate to PIZZA LANGUAGE!'
                    onChangeText={(input) => this.setState({text: input})}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>
        );
    }
}