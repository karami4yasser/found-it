import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { COLORS, FONT_WEIGHT } from '../../styles/theme';

export default function Loading() {
  useEffect(() => {
    //The second parametre simply returns true. When it called, it prevents the default behavior of the back button press.
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Image source={require('../../assets/images/loading.gif')} style={{ width: 300, height: 300 }} />
      <Text style={{ color: COLORS.tertiary, fontWeight: FONT_WEIGHT.Semibold }}>Loading ...</Text>
    </View>
  );
}
