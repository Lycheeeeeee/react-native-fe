import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableHighlight,Button } from 'react-native';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { account:{username: 'User Name',password:' Password'}};
      }
    render(){
        return( <View style={{
            flex: 1,
            flexDirection: 'column',
          }}>
            <View style={{height: 50, backgroundColor: 'powderblue'}} />
            <View style={{height: 100, backgroundColor: 'white',flexDirection: 'row',justifyContent: 'center'}} >
                <Text style={{fontSize:30}}>LOGIN</Text>
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
                <Button title="SIGN IN" onPress={()=>this.props.signIn(this.state.account)}/>
                <Button title="Create new account" onPress={()=>this.props.showSignUp()}/>
                {/* <TouchableHighlight onPress={()=>this.props.showSignUp}>
                    <Text>
                        Create an account?
                    </Text>
                </TouchableHighlight>  */}
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
  