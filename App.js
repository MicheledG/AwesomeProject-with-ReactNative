/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Image,
    Text,
    TextInput
} from 'react-native';

class FruitBlinker extends Component {

    constructor(props){
        super(props);
        this.state = {showApple: true};

        //set a timer to change the fruit shown
        setInterval(()=>{
           this.setState((previousState)=>{
               return {showApple: ! previousState.showApple};
           })}, 1000);

    };

    render() {

        const apple = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/1024px-Honeycrisp.jpg';
        const bananas = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'

        let pic = {};
        if(this.state.showApple == true){
            pic.uri = apple;
        }
        else{
            pic.uri = bananas
        }

        return (
            <Image source={pic} style={{width:300, height:200}}/>
        );
    }
}

export default class PizzaTranslator extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        };

    }

    render(){
        return(
            <View style={{padding:10}}>
                <TextInput
                    style={{height:40}}
                    placeholder='Type here to translate to PIZZA DICTIONARY!'
                    onChangeText={(input) => this.setState({text: input})}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>
        );
    }
}

class App extends Component {
    render(){
        return (
            <View style={{
                flex:1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FruitBlinker/>
                <PizzaTranslator/>
            </View>
        );
    }
}