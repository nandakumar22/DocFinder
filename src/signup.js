import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image,ScrollView } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, Form,icon,label, Item, Input, Label, Button, Grid, Col,Row,Icon,ListItem,Left,Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

const ind = () => {
  
    Actions.indv()
};
const grp = () => {
    Actions.grp()
};
class Signup extends Component {
    static navigationOptions = {  
        title: "Sign-Up",  
        color:'white',
        TextColor:'white',
        headerStyle: {  
            backgroundColor:'#00b0e6',
            color:'white',
            TextColor:'white',
            
          
           

        },   
        //header TintColor: '#0ff',  
        headerTitleStyle: {  
            fontWeight: 'bold',  
            color:'white',
            TextColor:'white',
         
           flex:0.8,
            fontSize:20,
            textAlign:'center',
            justifyContent:'center',
           alignItems:'center'
           
        },    
       
    }; 

    render() {
        return (


<ScrollView style={styles.container}>

     
<View  style={{   flexDirection: 'column',alignSelf:"center",flex:1,alignContent:"center",justifyContent:'space-between',padding:60 }}>
        <Row >                  
<Item onPress = { ind }>
 <Image resizeMode="contain" style={styles.ind} source={require('../images/ind.png')} onPress = { ind } />

</Item>


</Row>
<Text style={{fontSize:20, flex:1, textAlign:"center" , justifyContent:"center",alignSelf:"center",alignItems:"center"}}>Indivdual</Text>

</View>
<View style={{   flexDirection: 'column',alignSelf:"center",flex:1,alignContent:"center",justifyContent:'space-between',padding:10 }}>

<Row>  
<Item onPress = { grp}>
<Image resizeMode="contain" style={styles.group} source={require('../images/grp.jpg')} />
</Item>
</Row> 
<Text style={{textAlign:"center",fontSize:20}}>Non-profit</Text> 

</View>
</ScrollView>
);
}
}
export default Signup;
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: 'white',
        
    },
    group: {
        width: 180,
        height: 180,
        
       
      
     
    },
    ind: {
        width: 160,
        height: 160,
        
        
      
        
        
    },
   
})