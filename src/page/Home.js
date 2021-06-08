import React, {useState, useRef} from 'react';
import Carousel from 'react-native-snap-carousel';

import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
  Modal,
} from 'react-native';
export default function Home(props) {
  const ref = useRef(null);
  const [index, setindex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const OnpressButton = image => {
    switch (index) {
      case 0:
        Linking.openURL('https://www.thelivingos.com/');
        break;
      case 1:
        Platform.OS == 'ios'
          ? Linking.openURL('maps://app?saddr=100+101&daddr=100+102')
          : Linking.openURL('google.navigation:q=100+101');
        break;
      case 2:
        setModalVisible(true);
        break;
    }
  };
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}
        onPress={() => OnpressButton(item.image)}>
        <ImageBackground style={{flex: 1}} source={item.image}>
          <Text style={{fontSize: 30}}>{item.title}</Text>
          <Text>{item.text}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'rebeccapurple', paddingTop: 50}}>
      <View
        style={{
          width: '100%',
          height: '50%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Carousel
          layout={'default'}
          ref={ref}
          data={[
            {
              title: 'Item 1',
              text: 'Text 1',
              image: require('../images/1.jpeg'),
            },
            {
              title: 'Item 2',
              text: 'Text 2',
              image: require('../images/2.jpeg'),
            },
            {
              title: 'Item 3',
              text: 'Text 3',
              image: require('../images/3.jpeg'),
            },
          ]}
          sliderWidth={300}
          itemWidth={300}
          renderItem={_renderItem}
          onBeforeSnapToItem={slideIndex => setindex(slideIndex)}
        />
      </View>
      <View style={{flex:1,alignItems:'center'}}>
        <TouchableOpacity
          style={{
            width: '80%',
            height: 30,
            backgroundColor: 'white',
            alignItems: 'center',
          }}
          onPress={()=>props.navigation.navigate('ListImage')}
          >
          <Text>ListImage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '80%',
            height: 30,
            backgroundColor: 'white',
            alignItems: 'center',
            marginTop:10
          }}
          onPress={()=>props.navigation.goBack()}
          >
          <Text>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={{width: '100%', height: '100%'}}
          onPress={() => setModalVisible(false)}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            source={require('../images/1.jpeg')}
          />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
