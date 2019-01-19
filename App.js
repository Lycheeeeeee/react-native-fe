import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login'
import Signup from './Signup';
import Branchselection from './Branchselection';
import Userpage from './Userpage';
import axios from 'axios';
import Shoppage from './Shoppage';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show:'login',shopId:'' };
  }
  signIn(account) {
    fetch('http://192.168.1.34:3000/accounts/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: account.username,
        digest_password: account.password
      })
    })
      .then((response)=>response.json())
      .then((reponseJson)=>{
        if(reponseJson.type=="user"){
          this.setState({show:'branch'})
        }else if(reponseJson.type=="staff"){
          this.setState({show:'staff'})
          this.setState({shopId:reponseJson.shop_id})
        }else if(reponseJson.error!=''){
          alert(reponseJson.error)
        }
      })
      .catch((error) => {
        alert(error)
      });
  }
  // signIn(account){
  //   axios.post('http://192.168.1.34:3000/accounts/login',{
  //     user_name: account.username,
  //     digest_password: account.password
  //   })
  //     .then((response)=>response.json())
  //     .then((reponseJson)=>{
  //     if(reponseJson.type=="user"){
  //       this.setState({show:'branch'})
  //     }else if(reponseJson.type=="staff"){
  //       this.setState({show:'staff'})
  //     }else if(reponseJson.error!=''){
  //       alert(reponseJson.error)
  //     }
  //   })
  //   .catch((error) => {
  //     alert(error)
  //   });
  // }
  signUp(account) {
    fetch('http://192.168.1.34:3000/accounts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: account.username,
        digest_password: account.password
      })
    })
      .then((response)=>response.json())
      .then((reponseJson)=>{
        if(reponseJson.status=="sign up success"){
          {()=>this.setState({showLogin:true})}
          alert(reponseJson.status)
        }else {
          alert('user name is already exist, please enter unique user name')
        }
      })
  }
  recieveShopId(shopId){
    // ()=>{
    // this.setState({shopId:shopId})
    // }
    this.setState({shopId:shopId})
    this.setState({show:'userpage'})
  }
  render() {
    if(this.state.show=='login'){
      return (
        <Login signIn={this.signIn.bind(this)} showSignUp={()=>this.setState({show:'signup'})}/>
      );
    }if(this.state.show=='signup'){
      return(<Signup signUp={this.signUp.bind(this)} backToLogIn={()=>this.setState({show:'login'})}/>);
    }if(this.state.show=='branch'){
      return(
        <Branchselection sendShopId={this.recieveShopId.bind(this)}/>
      );
    }if(this.state.show=='userpage'){
      return(
      <Userpage shopId={this.state.shopId}/>
      );
    }if(this.state.show=='staff'){
      return(
      <Shoppage shopId={this.state.shopId}/>
      );
    }
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
