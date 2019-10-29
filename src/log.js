import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView,Alert, Image } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Grid, Col } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


const signIn = () => {
   // alert(this.state.inputs.placeholder)
    Actions.dd()
};
const signUp = () => {
    Actions.up()
};
const fff= () => {
    Actions.frgt()
};

  
 
class Log extends Component {
   
    
    render() {
        
        return (
            
            <View style={styles.container}>
<ScrollView >
           
             
            
               {/* <Image resizeMode="contain" style={styles.logo} source={require('../images/dg.jpeg')} />  */}

                <Text style={styles.text1}>Sign In</Text>
                <Content>
                   
                    <Form>
                        <Item stackedLabel last>
                            <Label style={{ color: 'black' }}>Mobile Number</Label>
                            <Input placeholder="Enter your Mobile Number" maxLength={12} keyboardType='numeric' style={{ opacity: 1,color: 'black', fontSize: 16, paddingBottom: 1 }} onChangeText={value => {
                                this.onInputChange({ id: "passwordSignin", value }) />
                        </Item>
                        <Item stackedLabel last>
                            <Label style={{ color: 'black' }}>Password</Label>
                            <Input placeholder="Enter your password" secureTextEntry={true} style={{ opacity: 1,color: 'black',fontSize:18 }} />
                        </Item>
                        <Text style={styles.text4} onPress = { fff }>Forgot Password?</Text>
                        <Button full Regular
                            style={{ marginTop: 15, marginLeft: 10, marginRight: 10 ,backgroundColor:"#4682b4"}} onPress = { signIn }>
                            <Text style={{ color: 'black',fontSize:22 }}>Sign In</Text>
                        </Button>
                       
                       
                        <Text style={styles.text2}>Don't have an account? <Text onPress = { signUp } style={styles.text3}>Sign up</Text></Text>
                    </Form>
                  
                </Content>
            
            </ScrollView>
            </View>
        );
    }
}
export default Log;

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        

    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor:"#59cbbd",
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    logo: {
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 2,
        marginBottom: 2,
        alignSelf:"center"
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:"center",
        fontWeight:"bold"
    },
    text1: {
        fontSize: 25,
        marginTop: 20,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#4682b4',
        marginBottom: 40,
        

    },
    text2: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    

    },
    text3: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: "#4682b4"
    },
    socialIcons: {
        width: 50,
        height: 50,
    },
    socialIconsFacebook: {
        width: 30,
        height: 30,
    },
    socialIconsGoogle: {
        width: 30,
        height: 30,
    },
    text4: {
        fontSize: 16,
    
        textAlign: 'right',
        marginTop: 5,
        fontWeight:"bold",
        marginBottom: 5,
        color: '#4682b4',
        
    },
    gridStyles:{
        margin: 15,
        marginTop:5, 
        backgroundColor: 'white', 
        borderRadius: 100
    }
})
