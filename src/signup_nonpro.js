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
  Textarea,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown';
import {validationService} from './validation/service';

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
class SignupGrp extends Component {
  static navigationOptions = {
    title: 'Sign-Up Nonprofit',
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

      flex: 0.8,
      fontSize: 20,
      TextColor: 'white',
      color: 'white',
      textAlign: 'center',
      TextColor: '#fff',
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
        country: {
          type: 'generic',
          value: '',
          errorLabel: '',
        },
        address: {
          type: 'generic',
          value: '',
          errorLabel: '',
        },
        city: {
          type: 'generic',
          value: '',
          errorLabel: '',
        },
        state: {
          type: 'generic',
          value: '',
          errorLabel: '',
        },
        zip: {
          type: 'generic',
          value: '',
          errorLabel: '',
        },
      },
    };
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
              <Label style={{fontSize: 16}}>*NonProfitName</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter NonProfitName"
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
              <Label style={{fontSize: 16, marginTop: 8}}>*ContactName</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your ContactName"
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

              <Label style={{fontSize: 14, marginTop: 8}}>*UserId</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your UserId"
                  autoCapitalize="none"
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
                  marginBottom: 12,
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
                  placeholder="Confirm Password"
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

              <Label style={{fontSize: 16, color: 'black', marginTop: 6}}>
                *Address1
              </Label>

              <Grid
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Col>
                  <Textarea
                    placeholder="Enter your address"
                    placeholderTextColor="#cccccc"
                    autoCapitalize="words"
                    style={{
                      marginBottom: 20,
                      padding: 3,
                      fontSize: 22,
                      fontWeight: 'bold',
                    }}
                    rowSpan={4}
                    onChangeText={value => {
                      this.onInputChange({id: 'address', value});
                    }}
                  />
                </Col>
                {this.renderError('address')}
              </Grid>
              <Label style={{fontSize: 16, color: 'black', marginTop: 6}}>
                *Address2
              </Label>

              <Grid
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Col>
                  <Textarea
                    placeholder="Enter your address"
                    placeholderTextColor="#cccccc"
                    autoCapitalize="words"
                    style={{
                      marginBottom: 20,
                      padding: 3,
                      fontSize: 22,
                      fontWeight: 'bold',
                    }}
                    rowSpan={4}
                    onChangeText={value => {
                      this.onInputChange({id: 'address', value});
                    }}
                  />
                </Col>
                {this.renderError('address')}
              </Grid>
              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 8,
                  marginTop: 8,
                }}>
                {/* <Label style={{ paddingBottom: 3, fontSize: 14, }}>Country</Label> */}
                <Picker
                  itemTextStyle={{fontSize: 15, color: 'black'}}
                  activeItemTextStyle={{fontSize: 18, fontWeight: 'bold'}}
                  selectedValue={this.state.PickerSelectedVal}
                  onValueChange={value => {
                    this.setDropdown(value);
                    this.onInputChange({id: 'country', value});
                  }}>
                  <Picker.Item label="Select Country" />
                  <Picker.Item
                    label="India"
                    value="India"
                    style={{padding: 3, fontSize: 22, fontWeight: 'bold'}}
                  />
                  <Picker.Item label="USA" value="USA" />
                  <Picker.Item label="China" value="China" />
                  <Picker.Item label="Russia" value="Russia" />
                  <Picker.Item label="United Kingdom" value="United Kingdom" />
                  <Picker.Item label="France" value="France" />
                </Picker>
                {this.renderError('country')}
              </Item>

              <Label style={{fontSize: 14, color: 'black'}}>*City</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your city"
                  placeholderTextColor="#cccccc"
                  style={{
                    padding: 1,
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginLeft: 8,
                  }}
                  onChangeText={value => {
                    this.onInputChange({id: 'city', value});
                  }}
                />
                {this.renderError('city')}
              </Item>
              <Label style={{fontSize: 14, color: 'black'}}>*State</Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your state"
                  placeholderTextColor="#cccccc"
                  autoCapitalize="characters"
                  maxLength={10}
                  style={{
                    padding: 1,
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginLeft: 8,
                  }}
                  onChangeText={value => {
                    this.onInputChange({id: 'state', value});
                  }}
                />
                {this.renderError('state')}
              </Item>

             
              <Label style={{paddingBottom: 1, fontSize: 14, color: 'black'}}>
                *Zip Code
              </Label>

              <Item
                regular
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  marginBottom: 14,
                }}>
                <Input
                  placeholder="Enter your zipcode"
                  placeholderTextColor="#cccccc"
                  minLength={5}
                  maxLength={6}
                  keyboardType="numeric"
                  style={{padding: 1, fontSize: 22, fontWeight: 'bold'}}
                  onChangeText={value => {
                    this.onInputChange({id: 'zip', value});
                  }}
                />
                {this.renderError('zip')}
              </Item>

              <Label style={{fontSize: 14, color: 'black'}}>*Type</Label>

<Item
  regular
  style={{
    borderColor: 'grey',
    borderWidth: 0.5,
    marginBottom: 14,
  }}>
  <Input
    placeholder="Enter your city"
    placeholderTextColor="#cccccc"
    style={{
      padding: 1,
      fontSize: 22,
      fontWeight: 'bold',
      marginLeft: 8,
    }}
    onChangeText={value => {
      this.onInputChange({id: 'city', value});
    }}
  />
  {this.renderError('city')}
</Item>

<Label style={{fontSize: 14, color: 'black'}}>*Description</Label>

<Item
  regular
  style={{
    borderColor: 'grey',
    borderWidth: 0.5,
    marginBottom: 14,
  }}>
  <Input
    placeholder="Enter your city"
    placeholderTextColor="#cccccc"
    style={{
      padding: 1,
      fontSize: 22,
      fontWeight: 'bold',
      marginLeft: 8,
    }}
    onChangeText={value => {
      this.onInputChange({id: 'city', value});
    }}
  />
  {this.renderError('city')}
</Item>
              <Button
                full
                rounded
                style={{
                  marginTop: 18,
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
    // this.checkEmptyValues()
    if (
      this.state.inputs.firstname.errorLabel == null &&
      this.state.inputs.lastname.errorLabel == null &&
      this.state.inputs.email.errorLabel === null &&
      this.state.inputs.password.errorLabel === null &&
      this.state.inputs.confirmPassword.errorLabel === null &&
      this.state.inputs.city.errorLabel == null &&
      this.state.inputs.state.errorLabel == null &&
      this.state.inputs.address.errorLabel == null &&
      this.state.inputs.zip.errorLabel == null &&
      this.state.inputs.country.errorLabel == null
    ) {
      Actions.login();
      // this.setState({ loading: true });
      //     Firebase.auth().createUserWithEmailAndPassword(this.state.inputs.email.value, this.state.inputs.password.value)
      //         .then((res) => {
      //             this.setState({ loading: false });
      //             Actions.login()
      //         }).catch((error) => {
      //             this.setState({ loading: false });
      //             if (error.code == 'auth/email-already-in-use') {
      //                 this.setState({ showResults: true });
      //             }
      //         })
      // }else{
      this.setState({loading: false});
    }
  }
}
export default SignupGrp;

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
