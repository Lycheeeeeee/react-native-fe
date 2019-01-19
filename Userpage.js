import React from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput, Modal,TouchableHighlight,Radio,RefreshControl} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Spinner from 'react-native-loading-spinner-overlay';
var radio_props = [
    {label: '10mins', value: 10 },
    {label: '15mins', value: 15 },
    {label: '30mins', value: 30 }
  ]
  var test=[];
export default class Userpage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {drinks:[],
            quantitys:[0,0,0,0,0,0,0,0,0,0,0], 
            total:0,
            modalVisible:false,
            showPhase:'inputing',
            orderid:'',
            spinner:true,
            simpleId:'',
            order_time:'',
            receive_time:10,
            details:[],
            refreshing: false,
            // detail:{drink_name:'aaa',quantity:0},
            shopId:this.props.shopId,         
        }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        {
         fetch(`http://192.168.1.34:3000/orders/byorderid/${this.state.orderid}`)
            .then(response=>response.json())
            .then((responseJson)=>{
            this.setState({showPhase:responseJson.status})
            })
          }
      }
    componentDidMount(){
        fetch('http://192.168.1.34:3000/drinks')
        .then(response=>response.json())
        .then((drinks)=>{
            this.setState({drinks})
        })
    }
    add(index,price){
        // this.setState(({quantitys}) => ({
        //     quantitys: [
        //       ...quantitys.slice(0,i),
        //       {
        //         ...quantitys[i],
        //         number:quantitys[i].number + 1
        //       },
        //       ...quantitys.slice(i+1)
        //     ]
        //   }))
        //   alert(this.state.quantitys[i].number)
        //   this.setState({total:this.state.total+price*(this.state.quantitys[i].number)})
       
        let quantityss=[...this.state.quantitys]
        quantityss[index]=this.state.quantitys[index]+1
        this.setState({quantitys:quantityss})
        this.setState({total:this.state.total+price})
     
    }
    remove(index,price){
            if(this.state.quantitys[index]>0){
            let quantitys=[...this.state.quantitys]
            quantitys[index]=quantitys[index]-1
            this.setState({quantitys:quantitys})
            this.setState({total:this.state.total-price})
            }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible})
    }
    submitOrder() {
        this.state.quantitys.map((q,i)=>{if(q!==0){
            test.push({drink_name:this.state.drinks[i].name,quantity:q})
    }   
        }
        )
        
        this.setState({showPhase:'waiting'})
        fetch('http://192.168.1.34:3000/orders', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            receive_time: this.state.receive_time,
            status: 'uncheck',
            shop_id: this.state.shopId,
            details:test,
            total_price:this.state.total
          })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({simpleId:responseJson.simple_id})
            this.setState({orderid:responseJson.id})
            this.setState({order_time:responseJson.order_time})})
        // .then(()=>{setInterval(this.updateStatus(this.state.orderid),1000)})
        .catch((error) => { 
            alert(error)
          });
        
      }
    //   updateStatus(orderid){
    //     fetch(`http://192.168.1.34:3000/orders/byorderid/${orderid}`)
    //     .then(response=>response.json())
    //     .then((responseJson)=>{
    //         this.setState({status:responseJson.status})
    //         if(responseJson.status!=='uncheck'){
    //             this.setState({spinner:false})
    //         }
    //     })
    //   }
      showLoading(){
          this.setState({showLoadingPage:true})
      }

    render(){
        const {details} = this.state;
        if(this.state.showPhase=='waiting'){
        return(
        <ScrollView style={{flexDirection:'column'}}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>}
        >
            <View style={{backgroundColor:'powderblue',height:150}}/>
            <Text>
                Please waiting for shop response...(pull down for refresh)
            </Text>
            {/* <Spinner
          visible={this.state.spinner}
          textContent={'Please Wait For Shop Response...'}
          textStyle={styles.spinnerTextStyle}
        /> */}
        </ScrollView>
        )
        }else if(this.state.showPhase=='inputing'){
        return(
            <View>
            <View style={{height: 50, backgroundColor: 'white',flexDirection:'row',justifyContent:'flex-end'}}>
            <Button      onPress={() => {
            this.setModalVisible(true);
          }} title='Preview order'/>
            </View> 
            <ScrollView>
            <View style={{flex: 1,flexDirection: 'column'}}>
                {this.state.drinks.map((d,i)=>
                    <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={i}> 
                        <Text>
                            {d.name}
                        </Text>
                        <Text>
                            {d.price}
                        </Text>
                        <Icon name='remove' onPress={()=>this.remove(i,d.price)}/>
                        <TextInput value={JSON.stringify(this.state.quantitys[i])}/>
                        <Icon name='add' onPress={()=>this.add(i,d.price)}/>
                    </View>     
                )}
            </View>
            </ScrollView>
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
                {this.state.quantitys.map((q,k)=>{if(q!=0){return(
                 <View style={{height:70,justifyContent:'space-between',flexDirection:'row'}} key={k}> 
                 <Text>
                     {this.state.drinks[k].name}
                 </Text>
                 <Text>
                     {`X${q}`}
                 </Text>
                </View>)    
            }}
                        
                )}
            </View>
            </ScrollView>
            <Text>
                    {`Total: ${this.state.total} VND`}
            </Text>
<RadioForm radio_props={radio_props} initial={0} onPress={(value) => {this.setState({receive_time:value})}}/>

            <Button title='Submit order' onPress={()=>this.submitOrder(this.state.order)}/>
              <TouchableHighlight style={styles.buttonclose}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Close Preview</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
            </View>
        );}else if(this.state.showPhase==='Able'){
            return(
                <View>
                    <View style={{backgroundColor:'powderblue',height:50}}/>
                    <Text>
                    {`You can pick up the order #000${this.state.simpleId} at ${this.state.order_time} `}    
                    </Text>        
                </View>
            );
        }
        else if(this.state.showPhase==='Unable'){
            return(
                <View>
                    <View style={{backgroundColor:'powderblue',height:50}}/>
                    <Text>
                    Sorry, we cannot handle your order, please orders with less items or try other branch!  
                    </Text>        
                </View>
            );
        }
    }  

}
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
      },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  