import React, {useEffect, useState} from 'react';

import {View, Text, FlatList, SafeAreaView, Image,Dimensions} from 'react-native';
import axios from 'axios';
const widthWindow = Dimensions.get('window').width;
var tableWidthWant = 150;
var RECIPE_ITEM_HEIGHT = 150;
export default function ListImage() {
  const [data, setdata] = useState([]);
  const [numColumns, setNumColumn] = useState(0);
  const [paddingUse, setPaddingUse] = useState(0);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        setdata(res.data);
      })
      .catch(e => console.log(e));
    calcNumColumn();
  }, []);
  const calcNumColumn = () => {
    let paddingWant = 0;
    let numColumnCheck = Math.floor(widthWindow / tableWidthWant);
    let paddingCalc = numColumnCheck * 2 * paddingWant;
    if (tableWidthWant * numColumnCheck + paddingCalc > widthWindow) {
      numColumnCheck--;
    }
    let calcPaddingUse =
      (widthWindow - numColumnCheck * tableWidthWant) / numColumnCheck / 2;
    setNumColumn(numColumnCheck);
    setPaddingUse(calcPaddingUse);
  };
  const renderitem = ({item}) => {
    console.log(item.thumbnailUrl);
    return (
      <View style={{width: 150, height: 170}}>
        <Image
          source={{uri: item.thumbnailUrl}}
          style={{width: '100%', height: 150}}
        />
        <Text style={{padding:3}} numberOfLines={1}>{item.title}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={renderitem}
        numColumns={numColumns}
        key={numColumns}

      />
    </SafeAreaView>
  );
}
