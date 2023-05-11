import React from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import {  ImageBackground,View,Text} from 'react-native';
import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';
import BottomTabNavigator from './navigationbottom';

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  // async componentDidMount() {
  //   Font.loadAsync({
  //     'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
  //     'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
  //   });

  //   this.setState({ fontLoaded: true });
  // }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
        </NavigationContainer>
        // <NavigationContainer>
            
            
          );
        
        
      //   <BottomTabNavigator />
      // </NavigationContainer>
      
    }
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
    });

    this.setState({ fontLoaded: true });
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}



// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://192.168.1.202:3000/users');
//         setData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <Text>Loading data...</Text>;
//   }

//   if (error) {
//     console.log('An error occurred: {error.message}')
//     return(<>
//     <Text>Hello</Text>
//         <Text>An error occurred: {error.message}</Text>
//     </>
        
//     )
    
//   }

//   return (
//     <View>
//       <Text>Data:</Text>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => 
//         <View>
//         <Text>{item.name}</Text>
//         <Text>{item.email}</Text>
//         </View>
// }
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// export default App;

// import React from "react";
// // import { Text } from "react-native";
// import { WebView } from 'react-native-webview';


// export default function App(){
//   return(
//     <WebView source={{ uri: 'https://faceid.huytehuy.cloud/' }} style={{ flex: 1 }} />
//   )
// }