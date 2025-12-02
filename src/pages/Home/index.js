import React from 'react';
import { View, ImageBackground } from 'react-native';

import LogoImage from '../../components/LogoImage';
import LogoName from '../../components/LogoName';
import ListClients from '../../components/ListClients';
import styles from './styles';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/background.jpg')} style={styles.background} />
            <LogoImage />
            <LogoName />
            <ListClients />
        </View>
    );
}

export default Home;