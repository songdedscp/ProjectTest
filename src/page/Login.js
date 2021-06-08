import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Text,
  Image
} from 'react-native';

const Login = props => {
  const inputPhonenumber = useRef(null);
  const inputPassword = useRef(null);
  const [phonenumberinput, setPhonenumber] = useState('');
  const [passwordinput, setPassword] = useState('');
  const [typePassword, setTypePassword] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const newErrors = {};
  const findFormErrors = () => {
    const {phone_number, password} = form;
    // const { value_room, food, rating, comment } = form;
    if (!phone_number || phone_number === '')
      newErrors.phone_number = 'กรุณากรอกอีเมล';
    if (!password || password === '') newErrors.password = 'กรุณากรอกรหัสผ่าน';
    return newErrors;
  };
  const Login = async e => {
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      props.navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
        <Image source={require('../images/login.png')} style={{width:150,height:150}}/>
      <View style={{width: '100%', marginTop: 27}}>
        <TextInput
          ref={inputPhonenumber}
          placeholder="อีเมล"
          placeholderTextColor="#FFF"
          keyboardType="number-pad"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 15,
            paddingLeft: 17,
            height: 50,
            color: 'white',
            fontSize: 15,
            borderWidth:
              errors.phone_number && errors.phone_number != '' ? 1 : 0,
            borderColor:
              errors.phone_number && errors.phone_number != '' ? 'red' : null,
          }}
          onChangeText={text => {
            setPhonenumber(text), setField('phone_number', text);
          }}
        />
        {errors.phone_number && errors.phone_number !== '' ? (
          <EmailExist textValid={errors.phone_number} />
        ) : null}
      </View>
      <View style={{width: '100%', justifyContent: 'center'}}>
        <TextInput
          ref={inputPassword}
          placeholder="รหัสผ่าน"
          placeholderTextColor="#FFF"
          secureTextEntry={typePassword}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 15,
            paddingLeft: 17,
            color: 'white',
            height: 50,
            marginTop:
              errors.phone_number && errors.phone_number != '' ? 0 : 10,
            fontSize: 15,
            borderWidth: errors.password && errors.password != '' ? 1 : 0,
            borderColor:
              errors.password && errors.password != '' ? 'red' : null,
          }}
          onChangeText={text => {
            setPassword(text), setField('password', text);
          }}
        />
        {errors.password && errors.password != '' ? (
          <EmailExist textValid={errors.password} />
        ) : null}
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 33,
          alignItems: 'center',
          height: 50,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#5d71da',
            justifyContent: 'center',
            paddingHorizontal: '5%',
            borderRadius: 20,
            flex: 1,
            width: '100%',
            alignItems: 'center',
          }}
          onPress={e => {
            Keyboard.dismiss();
            Login(e);
          }}>
          <Text style={{color: 'white', fontSize: 15, lineHeight: 21}}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const EmailExist = props => {
  return (
    <View style={styles.formtextValid}>
      <Text style={styles.textValid}>{props.textValid}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    alignItems:'center',
    marginTop:50
  },
  formtextValid: {
    margin: 2,
    width: '100%',
    height: 16,
    marginLeft: 17,
  },
  textValid: {
    color: '#ff0000',
    fontSize: 10,
  },
});
export default Login;
