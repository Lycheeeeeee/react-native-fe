import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import axios from 'axios';
export default class Branchselection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shops:[]}
    }
    componentDidMount(){
        fetch('http://192.168.1.34:3000/shops')
        .then(response=>response.json())
        .then((shops)=>{
            this.setState({shops})
        })
    }  
    render(){
        return(
            <View style={{flex: 1,flexDirection: 'column'}}>
                <View style={{height: 100, backgroundColor: 'powderblue',flexDirection:'row'}} />
                {this.state.shops.map((s,i)=>
                    <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={i}>
                        <Text>
                            {s.address}
                        </Text>
                            <Icon name='forward'onPress={()=>this.props.sendShopId(s.id)}/>
                    </View>     
                )}
            </View>
        );
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