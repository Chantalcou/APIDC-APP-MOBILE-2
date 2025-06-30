import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../navigation/routes';

export default function NotFoundScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen does not exist.</Text>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate(ROUTES.LANDING)}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: 'blue',
  },
});
