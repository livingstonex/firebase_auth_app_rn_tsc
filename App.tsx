import { StatusBar } from 'expo-status-bar';
import React from 'react';
import './src/constants/firebase';
import { StyleSheet, Text, View } from 'react-native';
import MainStack from './src/navigation/mainNav';

export default function App() {
  return (
    <MainStack />
  );
}