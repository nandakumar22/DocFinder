import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Grid,
  Col,
  Picker,
  DatePicker,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown';
import {validationService} from './validation/service';
import Firebase from './firebase/firebase';

const ups = () => {
  Actions.lgg();
};
const ips = () => {
  Actions.up();
};
class Username extends Component {
  render() {
    return <Text style={styles.error}>* Username Already Exists</Text>;
  }
}
class PasswordEquality extends Component {
  render() {
    return <Text style={styles.error}>* Password Mismatch</Text>;
  }
}
class EmptyPassword extends Component {
  render() {
    return <Text style={styles.error}>* Required Field</Text>;
  }
}
class EmptyConfirmPassword extends Component {
  render() {
    return <Text style={styles.error}>* Required Field</Text>;
  }
}
class PasswordLength extends Component {
  render() {
    return (
      <Text style={styles.error}>
        * Password length atleast 6 characters long
      </Text>
    );
  }
}

class SignupInd extends Component {
  static navigationOptions = {
    title: 'Sign-Up Individual',
    color: 'white',
    TextColor: 'white',

    headerStyle: {
      backgroundColor: '#00b0e6',

      TextColor: 'white',
      color: 'white',
    },
    //header TintColor: '#0ff',
    headerTitleStyle: {
      fontWeight: 'bold',
      TextColor: 'white',
      color: 'white',
      flex: 0.8,
      fontSize: 20,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          visible: true,
        }),
      2000,
    ); // show toast after 2s

    setTimeout(
      () =>
        this.setState({
          visible: false,
        }),
      5000,
    ); // hide toast after 5s
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      firstname: '',
      email: '',
      password: '',
      confirmpassword: '',
      showResults: false,
      errorFree: false,
      emptyErr: false,
      emptyErrConfirm: false,
      passwordLengthCheck: false,
      passwordCheckEqual: false,
      loading: false,
      inputs: {
        firstname: {
          type: 'firstname',
          value: '',
          errorLabel: '',
        },
        lastname: {
          type: 'lastname',
          value: '',
          errorLabel: '',
        },
        phone: {
          type: 'phone',
          value: '',
          errorLabel: '',
        },
        email: {
          type: 'email',
          value: '',
          errorLabel: '',
        },
        password: {
          type: 'password',
          value: '',
          errorLabel: '',
        },

        confirmPassword: {
          type: 'confirmPassword',
          value: '',
          errorLabel: '',
        },
      },
    };
    // var key = Firebase.database()
    //   .ref('users')
    //   .push();

    // key.set({
    //   email: this.state.emaIl,
    //   firstname: this.state.firstname,
    //   lastname: this.state.lastname,
    // });
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    /*--Calling Validation Service--*/
    toggleDropdown: false;
    selected1: '';
    selected2: '';
    //  this.setDate = this.setDate.bind(this);
    this.states = [];
    this.cities = [];
  }
  renderError(id) {
    const {inputs} = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  changeValue(event) {
    this.setState({
      showResults: false,
      errorFree: false,
    });
  }

  changeValuePassword(event) {
    if (this.state.password === '') {
      this.setState({
        emptyErr: true,
      });
    } else {
      this.setState({
        emptyErr: false,
      });
    }
  }

  changeValueConfirmPassword(event) {
    if (this.state.confirmpassword === '') {
      this.setState({
        emptyErrConfirm: true,
      });
    } else {
      this.setState({
        emptyErrConfirm: false,
      });
    }
  }

  confirmPassword(value, attribute, empty) {
    if (attribute === 'pwd' && value.length < 6) {
      this.setState({passwordLengthCheck: true});
      this.setState({password: value});
      if (value.length == 0) {
        this.setState({passwordLengthCheck: false});
      }
      this.confirmPasswordCallbackForPassword(attribute, value);
    } else if (attribute === 'pwd') {
      this.setState({passwordLengthCheck: false});
      this.setState({password: value});
      this.confirmPasswordCallbackForPassword(attribute, value);
    } else {
      this.confirmPasswordCallback(attribute, value);
    }
  }
  stateChange(value) {
    this.setState({
      selected2: value,
    });
    this.cityArray = [
      {
        key: 'AP',
        method: [{key: 'HYD', value: 'Hyderabad'}],
      },
      {
        key: 'MX',
        method: [{key: 'ECA', value: 'Ecatepec'}],
      },
      {
        key: 'LAZ',
        method: [{key: 'ROM', value: 'Rome'}],
      },
      {
        key: 'LOM',
        method: [{key: 'MIL', value: 'Milan'}],
      },
      {
        key: 'BP	',
        method: [{key: 'BIS', value: 'Bispham'}],
      },
    ];
    this.cityArray.forEach(valueArray => {
      if (valueArray.key === value) {
        this.cities = valueArray.method;
      }
    });
  }

  signOut() {
    Actions.login();
  }

  cityChange(value) {
    this.setState({
      selected3: value,
    });
  }
  dateConversion(todayTime) {
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return year + '-' + month + '-' + day;
  }

  onValueChange(value) {
    states = [];
    const Countries = [
      {
        key: 'IND',
        method: [
          {key: 'AP', value: 'Andhra Pradesh'},
          {key: 'MP', value: 'Madhya Pradesh'},
          {key: 'TG', value: 'Telangana'},
        ],
      },
      {
        key: 'US',
        method: [{key: 'MX', value: 'Mexico'}, {key: 'IN', value: 'Indiana'}],
      },
      {
        key: 'I',
        method: [{key: 'LAZ', value: 'Lazio'}, {key: 'LOM', value: 'Lombardy'}],
      },
      {
        key: 'UK',
        method: [
          {key: 'BP', value: 'Blackpool'},
          {key: 'D', value: 'Darlington'},
        ],
      },
    ];
    this.setState({
      selected1: value,
    });
    Countries.forEach(valueArray => {
      if (valueArray.key === value) {
        this.states = valueArray.method;
      }
    });
  }
  renderError(id) {
    const {inputs} = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
      //this.setState({ errorFree: true });
    }
    return null;
  }
  canada(province) {
    this.setState({
      canada: province,
    });
  }
  setDropdown(value) {
    this.setState({
      PickerSelectedVal: value,
    });
  }
  setDropdownGender(value) {
    this.setState({
      PickerSelectedValGender: value,
    });
  }
  confirmPasswordCallbackForPassword(attribute, value) {
    if (attribute === 'pwd' && this.state.confirmpassword != '') {
      if (this.state.confirmpassword === value) {
        this.setState({passwordCheckEqual: false});
      } else {
        this.setState({passwordCheckEqual: true});
      }
    } else if (this.state.confirmpassword == '') {
      this.setState({passwordCheckEqual: false});
    }
  }

  confirmPasswordCallback(attribute, value) {
    if (attribute === 'cpwd') {
      if (value.length == 0) {
        this.setState({passwordCheckEqual: false});
      } else {
        if (this.state.password === value) {
          this.setState({confirmpassword: value});
          this.setState({passwordCheckEqual: false});
        } else {
          this.setState({confirmpassword: value});
          this.setState({passwordCheckEqual: true});
        }
      }
    }
  }
  render() {
    const states = [];
    const cities = [];
    const Countries = [];

    return (
      <ScrollView>
        <View style={styles.container}>
          <Content>
            <Form>
              <Label style={{fontSize: 16, marginTop: 8}}>*Firstname</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your firstname"
                  type="text"
                  autoCapitalize="words"
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.onInputChange({id: 'firstname', value});
                  }}
                  onChange={event => this.changeValue(event)}
                />
                {this.renderError('firstname')}
                {this.state.showResults ? <Username /> : null}
              </Item>

              <Label style={{fontSize: 16, marginTop: 8}}>*Lastname</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your lastname"
                  autoCapitalize="words"
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.onInputChange({id: 'lastname', value});
                  }}
                  onChange={event => this.changeValue(event)}
                />
                {this.renderError('lastname')}
                {this.state.showResults ? <Username /> : null}
              </Item>

              <Label style={{fontSize: 14, marginTop: 8}}>*Email</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.onInputChange({id: 'email', value});
                  }}
                  onChange={event => this.changeValue(event)}
                />
                {this.renderError('email')}
                {this.state.showResults ? <Username /> : null}
              </Item>
              <Label style={{fontSize: 14, marginTop: 8}}>*Mobile Number</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your mobilenumber"
                  maxLength={10}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.onInputChange({id: 'phone', value});
                  }}
                />
                {this.renderError('phone')}
                {this.state.showPhoneErr ? <phoneNumber /> : null}
              </Item>

              <Label style={{fontSize: 14, marginTop: 8}}>*Password</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  secureTextEntry
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.confirmPassword(value, 'pwd', '');
                    this.onInputChange({id: 'password', value});
                  }}
                  onChange={event => this.changeValuePassword(event)}
                />
                {this.renderError('password')}

                {this.state.passwordLengthCheck ? <PasswordLength /> : null}
              </Item>

              <Label style={{fontSize: 14, marginTop: 8}}>
                *Confirm Password
              </Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Confirm password"
                  autoCapitalize="none"
                  secureTextEntry
                  style={{opacity: 0.6, fontSize: 16, paddingBottom: 1}}
                  onChangeText={value => {
                    this.confirmPassword(value, 'cpwd', '');
                    this.onInputChange({id: 'confirmPassword', value});
                  }}
                  onChange={event => this.changeValueConfirmPassword(event)}
                />
                {this.renderError('confirmPassword')}

                {this.state.passwordCheckEqual ? <PasswordEquality /> : null}
              </Item>

              <Button
                full
                rounded
                style={{
                  marginTop: 15,
                  marginLeft: 40,
                  marginRight: 40,
                  backgroundColor: '#00b0e6',
                }}
                onPress={this.signUp.bind(this)}>
                <Text style={{color: 'white'}}>Sign Up</Text>
              </Button>
              <Button
                full
                rounded
                style={{
                  marginTop: 15,
                  marginLeft: 40,
                  marginRight: 40,
                  backgroundColor: '#00b0e6',
                }}
                onPress={ips}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </Button>
            </Form>
          </Content>
        </View>
      </ScrollView>
    );
  }
  signUp() {
    this.setState({showResults: false, loading: true});
    this.getFormValidation();
    alert(JSON.stringify(this.state.inputs.firstname.value));
    // this.checkEmptyValues()
    if (
      this.state.inputs.firstname.errorLabel == null &&
      this.state.inputs.lastname.errorLabel == null &&
      this.state.inputs.email.errorLabel === null &&
      this.state.inputs.password.errorLabel === null &&
      this.state.inputs.confirmPassword.errorLabel === null
    ) {
      //       .then((res) => {
      //         this.setState({ loading: false });
      //         Actions.health({ uid: this.props.uid, dob: this.state.dateValueFormatted })
      //     })
      // } else {
      //     this.setState({ loading: false });
      // }

      // .then(res => {
      //   this.setState({loading: false});
      //   Actions.dd({
      //     uid: this.props.uid,
      //     dob: this.state.dateValueFormatted,
      //   });
      // });
      // fetch('http://192.168.0.16:2112/registration', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     firstName: '' + this.state.inputs.firstname.value,
      //     lastName: '' + this.state.inputs.lastname.value,
      //     phone: '' + this.state.inputs.phone.value,
      //     email: '' + this.state.inputs.email.value,
      //     password: '' + this.state.inputs.password.value,
      //     confirmPassword: '' + this.state.inputs.confirmPassword.value,
      //   }),
      // })
      //   .then(response => response.json())
      //   .then(responseJson => {
      //     // let knk = responseJson.response;
      //     // alert(knk);
      //     if (responseJson.response == 'Moble Number Alredy existed') {
      //       alert('Moble Number Alredy existed');
      //     } else if (responseJson.status == 200) {
      //       Actions.login();
      //     } else {
      //       alert('err');
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

      // this.setState({loading: true});
      Firebase.auth()
        .createUserWithEmailAndPassword(
          this.state.inputs.email.value,
          this.state.inputs.password.value,
        )

        .then(res => {
          this.setState({loading: false});
          var docRef = Firebase.firestore()
            .collection('DocFinder')
            .doc(this.props.uid)
            .collection('Indvidual-Doctor')
            .doc(this.props.uid);
          docRef.set({
            doogId: new Date().getTime(),
            firstname: this.state.inputs.firstname.value,
            lastname: this.state.inputs.lastname.value,
            email: this.state.inputs.email.value,
          });

          Actions.login();
        })

        .catch(error => {
          this.setState({loading: false});
          if (error.code == 'auth/email-already-in-use') {
            this.setState({showResults: true});
          }
        });
    } else {
      this.setState({loading: false});
    }
  }
}
export default SignupInd;

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  itemStyles: {
    marginLeft: 10,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  logo: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  text2: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  text3: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'blue',
  },

  text4: {
    fontSize: 15,
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 5,
    color: 'grey',
  },
  gridStyles: {
    margin: 15,
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  error: {
    position: 'absolute',
    bottom: -14,
    marginLeft: 10,
    alignItems: 'center',
    color: 'red',
    fontSize: 12,
  },
});
