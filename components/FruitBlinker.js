import React,{Component} from "react";
import {Image} from 'react-native';

export class FruitBlinker extends Component {

    constructor(props){
        super(props);
        this.state = {showApple: true};

        //set a timer to change the fruit shown
        setInterval(()=>{
            this.setState((previousState)=>{
                console.log('fruit change...')
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