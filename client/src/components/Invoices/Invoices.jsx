import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const transactions = {
  thisMonth: [
    {
      icon: <FontAwesome name="spotify" size={20} color="#fff" />,
      name: 'Spotify',
      time: '10:00 am - Mar 26th 2023',
      amount: '$54.99',
    },
    {
      icon: <MaterialIcons name="design-services" size={20} color="#fff" />,
      name: 'Figma',
      time: '8:00 am - Mar 21th 2023',
      amount: '$8.99',
    },
    {
      icon: <FontAwesome name="shopping-bag" size={20} color="#fff" />,
      name: 'Online Shopping',
      time: '10:00 am - Mar 11th 2023',
      amount: '$132.00',
    },
    {
      icon: <FontAwesome name="home" size={20} color="#fff" />,
      name: 'AirBnB rent',
      time: '11:00 am - Mar 2th 2023',
      amount: '$548.99',
    },
  ],
  lastMonth: [
    {
      icon: <FontAwesome name="spotify" size={20} color="#fff" />,
      name: 'Spotify',
      time: '10:00 am - Feb 16th 2023',
      amount: '$54.99',
    },
  ],
};

export default function TransactionScreen() {
  return (
    <ScrollView className="flex-1 bg-black px-4 pt-6">
      {/* Balance */}
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-gray-300 text-sm">My Balance</Text>
          <Text className="text-white text-3xl font-bold">$8,822.89</Text>
          <Text className="text-green-500 text-xs mt-1">+0.08%</Text>
        </View>
        <TouchableOpacity className="bg-gray-800 p-2 rounded-full">
          <Text className="text-white text-sm">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Spending Bar */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-white text-sm">Spending March</Text>
          <Text className="text-gray-400 text-sm">$744.97</Text>
        </View>
        <View className="h-2 bg-gray-700 rounded-full flex-row overflow-hidden">
          <View className="w-[25%] bg-purple-500 rounded-l-full" />
          <View className="w-[15%] bg-cyan-400" />
          <View className="w-[10%] bg-white" />
        </View>
      </View>

      {/* This Month Transactions */}
      <Text className="text-white text-base font-semibold mb-2">This Month</Text>
      {transactions.thisMonth.map((tx, index) => (
        <View key={index} className="flex-row justify-between items-center bg-[#1c1c1e] p-4 rounded-xl mb-2">
          <View className="flex-row items-center space-x-3">
            <View className="bg-gray-800 p-2 rounded-full">{tx.icon}</View>
            <View>
              <Text className="text-white font-medium">{tx.name}</Text>
              <Text className="text-gray-400 text-xs">{tx.time}</Text>
            </View>
          </View>
          <Text className="text-white font-semibold">{tx.amount}</Text>
        </View>
      ))}

      {/* Last Month Transactions */}
      <Text className="text-white text-base font-semibold mb-2 mt-4">Last Month</Text>
      {transactions.lastMonth.map((tx, index) => (
        <View key={index} className="flex-row justify-between items-center bg-[#1c1c1e] p-4 rounded-xl mb-2">
          <View className="flex-row items-center space-x-3">
            <View className="bg-gray-800 p-2 rounded-full">{tx.icon}</View>
            <View>
              <Text className="text-white font-medium">{tx.name}</Text>
              <Text className="text-gray-400 text-xs">{tx.time}</Text>
            </View>
          </View>
          <Text className="text-white font-semibold">{tx.amount}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
