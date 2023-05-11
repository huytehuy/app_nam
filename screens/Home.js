import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Block, theme, Text } from "galio-framework";
import querystring from 'querystring';
import { Card, Button } from "../components";
import articles from "../constants/articles";
import { Ionicons } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import {  ImageBackground} from 'react-native';
import Image from '../smh.jpg'
import { TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
const { width } = Dimensions.get("screen");

function Home() {
  // const
  // renderArticles = () => {
  const [lightstatus, setlightstatus] = useState(null);
  const [lightsensor, setlightsensor] = useState(null);
  const [temperature, settemperature] = useState(null);
  const [isOn, setIsOn] = useState(null);
  const [fan, setFan] = useState(null);
  const [fanisOn, setFanisOn] = useState(null);
  const [title, setTitle] = useState('hello');
  const [content, setContent] = useState('hi');

  useEffect(() => {
    const interval = setInterval(() => {
      const API_link = `https://io.adafruit.com/api/v2/thoanh/feeds/button1`
      const headers = new Headers({
        'X-AIO-Key': 'aio_BBNQ830HaITyXTweXq5MnhwWZDnt'
      });
      // fetch('https://randomuser.me/api/')
      //   .then(response => response.json())
      //   .then(data => setData(data['results'][0]['name']['first']+ data['results'][0]['name']['last']))
      //   .catch(error => console.error(error));
      fetch(API_link, {
        method: 'GET',
        headers: headers
      })
        .then(response => response.json())
        .then(lightstatus => { setlightstatus(lightstatus['last_value']), setIsOn(lightstatus['last_value'] == 1 ? true : false) });
      fetch('https://io.adafruit.com/api/v2/thoanh/feeds/lightsensor', {
        method: 'GET',
        headers: headers
      })
        .then(response => response.json())
        .then(lightsensor => { setlightsensor(lightsensor['last_value']) });
      fetch('https://io.adafruit.com/api/v2/thoanh/feeds/button2', {
        method: 'GET',
        headers: headers
      })
        .then(response => response.json())
        .then(fan => { setFan(fan['last_value']), setFanisOn(fan['last_value'] == 1 ? true : false) });
      fetch('https://io.adafruit.com/api/v2/thoanh/feeds/temperature', {
        method: 'GET',
        headers: headers
      })
        .then(response => response.json())
        .then(temperature => { settemperature(temperature['last_value']) });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const sendDataToServer = async () => {
    const postData = { title: 'Example Title', content: 'Example Content' };
  
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        // Handle successful submission
        console.log('Data sent successfully');
      } else {
        throw new Error('Error occurred');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.articles}
    >
      <View style={{ justifyContent: 'space-around', width: '100%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '109%' }}>
          <View style={styles.box}>
            <Icon name="lightbulb" size={30} color='white' />
            <Text style={{ color: 'white' }}>{lightsensor}</Text>
            <ToggleSwitch
              isOn={isOn}
              onColor="green"
              offColor="red"
              // label="Example label"
              labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={(value) => { console.log(isOn); handleToggleSwitch(value); }}
            />
          </View>
          <View style={styles.box}>
            <Icon name="fan" size={30} color='white' />
            <Text style={{ color: 'white' }}>Fan</Text>
            <ToggleSwitch
              isOn={fanisOn}
              onColor="green"
              offColor="red"
              // label="Example label"
              labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={(value) => { console.log(isOn); handleToggleSwitch(value); }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, width: '109%' }}>
          <View style={styles.box}>
            <Icon name="user-lock" size={30} color='white' />
            <Text style={{ color: 'white' }}>Face-id</Text>
            <ToggleSwitch
              isOn={isOn}
              onColor="green"
              offColor="red"
              // label="Example label"
              labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={(value) => { console.log(isOn); handleToggleSwitch(value); }}
            />
          </View>
          <View style={styles.box}>
            <Icon name="temperature-high" size={30} color='white' />
            <Text style={{ color: 'white' }}>Temperature</Text>
            <Text style={{ color: 'white' }}>{temperature}'C</Text>
            
            {/* <ToggleSwitch
              isOn={isOn}
              onColor="green"
              offColor="red"
              // label="Example label"
              labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={(value) => { console.log(isOn); handleToggleSwitch(value); }}
            /> */}

            {/* <AdafruitIOData /> */}
          </View>
        </View>
        <TouchableOpacity style={{backgroundColor:'coral',color:'white',height:40,justifyContent:"center",alignItems:"center",borderRadius:10}} onPress={sendDataToServer}>
        <Text>hello</Text>
        </TouchableOpacity>
        {/* <View>
            <AdafruitIOData />
          </View> */}
      </View>




      {/* <Block flex>
        <Card item={articles[0]} horizontal />
          <Block flex row>
            <Card
              item={articles[1]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block> */}
    </ScrollView>
  );
  // };

  // render() {
  //   return (
  //     <Block flex center style={styles.home}>
  //       {this.renderArticles()}
  //     </Block>
  //   );
  // }
}
// const AdafruitIOData = ({ username, activeKey, feedName }) => {
// const [data, setData] = useState(null);
// const [data1, setData1] = useState(null);

// useEffect(() => {
//   const interval = setInterval(() => {
//     const API_link=`https://io.adafruit.com/api/v2/huytehuy/feeds/light.status-light`
//     const headers = new Headers({
//       'X-AIO-Key': 'aio_Karz66uj65kmBLuaVHXubntgt9dt'
//     });
//     // fetch('https://randomuser.me/api/')
//     //   .then(response => response.json())
//     //   .then(data => setData(data['results'][0]['name']['first']+ data['results'][0]['name']['last']))
//     //   .catch(error => console.error(error));
//     fetch(API_link, {
//       method: 'GET',
//       headers: headers
//     })
//       .then(response => response.json())
//       .then(data => {setData(data['last_value']),setIsOn(data['last_value']=="ON"?true:false)});
//     fetch('https://io.adafruit.com/api/v2/huytehuy/feeds/light.value-light', {
//         method: 'GET',
//         headers: headers
//       })
//         .then(response => response.json())
//         .then(data1 => {setData1(data1['last_value'])});
//   }, 1000);
//   return () => clearInterval(interval);
// }, []);

//   return (
//     <View>
//       {data ? (
//         <>
//           <Text>{data}</Text>
//           <Text>{data1}</Text>
//           {/* <Text>Created at: {data1}</Text> */}
//         </>
//       ) : (
//         <Text></Text>
//       )}
//     </View>
//   );
// };






const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'

  },
  box: {
    height: 170,
    width: 140,
    backgroundColor: '#7f85f9',
    borderRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: "center",

  },
  boxred: {
    backgroundColor: 'red'
  },
  // imageBackground: {
  //   flex: 1, // Make the image cover the entire screen
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default Home;
