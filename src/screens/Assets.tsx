import React from 'react';
import {Text} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function Assets() {
  return (
    <Text>
      <MaterialCommunityIcons name="archive-outline" size={25} />
      Assets
    </Text>
  );
}
