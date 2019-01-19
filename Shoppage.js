import React from 'react';
import { StyleSheet, Text, View,ScrollView,Modal,TouchableHighlight,RefreshControl} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import axios from 'axios';
export default class Shoppage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {orders:[],
        modalVisible:false,
        refreshing: false,
        indexOfModal:0,
        shopId:this.props.shopID
    }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        fetch(`http://192.168.1.34:3000/orders?shopid=${this.props.shopID}`)
        .then(response=>response.json())
        .then((orders)=>{
            this.setState({orders})
        })
        .then(() => {
          this.setState({refreshing: false});
        });
      }
    componentDidMount(){
        fetch(`http://192.168.1.34:3000/orders?shopid=${this.props.shopID}`)
        .then(response=>response.json())
        .then((orders)=>{
            this.setState({orders})
        })
    }
    setModalVisible(visible,time,indexOfModal) {
        this.setState({modalVisible: visible})
        this.setState({time:time})
        this.setState({indexOfModal:indexOfModal})
    }
    updateStatus(status,id){
        fetch(`http://192.168.1.34:3000/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status
      })
    })
    .catch(error=>alert(error))
    }  
    render(){
        return(
            <ScrollView style={{flex: 1,flexDirection: 'column'}}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}/>}
            >
                <View style={{height: 100, backgroundColor: 'powderblue',flexDirection:'row'}} />
                {/* {this.state.orders.map((o,k)=>
                    <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={k}>
                        <Text>
                            {o.status}
                        </Text>
                        <Text>
                            {o.total_price}
                        </Text>
                    </View>     
                )} */}
                {this.state.orders.map((o,k)=>{if(o.status==='uncheck'){return(
                    <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={k}>
                        <Text>
                            {`#000${o.simple_id}`}
                        </Text>
                        <Text>
                            {o.status}
                        </Text>
                        <Text>
                            {o.order_time}
                        </Text>
                        <Icon name='toc'onPress={() => {
                        this.setModalVisible(true,o.order_time,k);
                        }}/>  
                        {/* <Button      onPress={() => {
                        this.setModalVisible(true,o.order_time,k);
                        }} title='PO'/> */}
                    </View>);}     
                })}
                <View style={{backgroundColor:'powderblue',height:50}}></View>
                {this.state.orders.map((o,k)=>{if(o.status==='Able'){return(
                    <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={k}>
                        <Text>
                            {`#000${o.simple_id}`}
                        </Text>
                        <Text>
                            {o.order_time}
                        </Text>
                        <Icon name='done'onPress={this.updateStatus("done",o.id)}/>         
                    </View>     
                );}})}
                 <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    }}>
          <View style={{marginTop: 22}}>
            <View>
            <ScrollView>
            <View style={{flex: 1,flexDirection: 'column'}}>
                {this.state.orders.map((o,i)=>{if(i==this.state.indexOfModal){key={i}
                    return(    
                            o.details.map((d,k)=>
                            <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={k} > 
                                <Text>
                                    {d.drink.name}
                                </Text>
                                <Text>
                                {`X${d.quantity}`}
                                </Text>
                            </View>    
                            )                        
                        )
                    }})}    
            </View>
            </ScrollView>
            {this.state.orders.map((o,i)=>{if(i==this.state.indexOfModal){key={i}
                    return(    
                            <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={i} >
                                <Text>
                                    {`Total: ${o.total_price}`}
                                </Text>
                                <Button title='Able' onPress={this.updateStatus('Able',o.id)}/>
                                <Button title='Unable'onPress={this.updateStatus('Unable',o.id)} />
                            </View>)}})}
              <TouchableHighlight style={styles.buttonclose}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Close Preview</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
            </ScrollView>
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