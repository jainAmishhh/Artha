import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

export default function IntroScreen() {
  return (
    <View className="flex-1 bg-black justify-center items-center px-6">
      {/* Illustration */}
      <View className="mb-8">
        {/* Replace with actual SVG/Image if available */}
        <Image
          source={require('../assets/finance-illustration.png')} // Replace with your asset
          className="w-64 h-64"
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text className="text-white text-2xl font-bold text-center mb-2">
        Take <Text className="text-white font-extrabold">Control</Text> of Your{'\n'}Finances Today!
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-400 text-center text-sm mb-10">
        With our app, you can easily track your income and expenses, set financial goals, and make informed decisions about your money.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity className="flex-row items-center justify-between w-full bg-[#1c1c1e] px-5 py-4 rounded-full">
        <View className="bg-violet-600 p-2 rounded-full mr-3">
          <Feather name="arrow-right" size={20} color="#fff" />
        </View>
        <Text className="text-white flex-1 text-center text-base font-semibold">Get Started</Text>
        <Entypo name="lock" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
