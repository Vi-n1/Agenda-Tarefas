import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';

const LogoImage = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./assets/Logo.jpeg')}></Image>
        </View>
    );
};

export default LogoImage;