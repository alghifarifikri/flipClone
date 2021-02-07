/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import image from '../Img/flip.png';
import {withNavigation} from 'react-navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    padding: 10,
  },
  title: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    margin: 10,
    fontSize: 15,
  },
  formItem: {
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#0000FF',
    borderRadius: 8,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textTransform: 'uppercase',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imagebg: {
    resizeMode: 'cover',
    opacity: 0.9,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
});

class SplashScreens extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 5000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={image}
          imageStyle={styles.imagebg}
        />
      </View>
    );
  }
}

const SplashScreen = withNavigation(SplashScreens);

export default SplashScreen;
