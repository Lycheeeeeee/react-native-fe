import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableHighlight,Button } from 'react-native';


export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { account:{username: 'Enter your desired user name',password:' Enter your desired password',type:'user'}};
      }
    render(){
        return( <View style={{
            flex: 1,
            flexDirection: 'column',
          }}>
            <View style={{height: 50, backgroundColor: 'powderblue'}} />
            <View style={{height: 100, backgroundColor: 'white',flexDirection: 'row',justifyContent: 'center'}} >
                <Text style={{fontSize:30}}>SIGNUP</Text>
            </View>
            <View style={{height: 70, backgroundColor: 'skyblue',justifyContent: 'flex-start'}} >
                <TextInput onChangeText={(tt) => this.setState({account:{...this.state.account,username:tt}})}
                value={this.state.account.username}/>
            </View>     
            <View style={{height: 70, backgroundColor: 'steelblue',justifyContent: 'flex-start'}} >
                <TextInput onChangeText={(tt) => this.setState({account:{...this.state.account,password:tt}})}
                value={this.state.account.password}/>
            </View>
            <View style={{height: 50, backgroundColor: 'white',flexDirection: 'row',justifyContent: 'flex-end'}}>
                <Button title="SIGN UP" onPress={()=>this.props.signUp(this.state.account)}/>
                <Button title="BACK" onPress={()=>this.props.backToLogIn()}/>
            </View>    
          </View>);
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  