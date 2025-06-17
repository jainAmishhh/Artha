import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const pieData = [
    { name: 'Housing', amount: 965, color: '#7b61ff', legendFontColor: '#fff', legendFontSize: 12 },
    { name: 'Food', amount: 300, color: '#2ed8ff', legendFontColor: '#fff', legendFontSize: 12 },
    { name: 'Saving', amount: 200, color: '#ddd', legendFontColor: '#fff', legendFontSize: 12 },
  ];

  return (
    <ScrollView className="flex-1 bg-black px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mt-4 mb-2">
        <View className="flex-row items-center space-x-3">
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=32' }} className="w-10 h-10 rounded-full" />
          <View>
            <Text className="text-white font-medium">Hi, Arip!</Text>
            <Text className="text-gray-400 text-sm">Monthly Budget</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-gray-800 px-4 py-2 rounded-full">
          <Text className="text-white text-sm">My Balance</Text>
        </TouchableOpacity>
      </View>

      {/* Planned Expenses */}
      <View className="bg-[#1c1c1e] rounded-2xl p-4 mb-6">
        <Text className="text-white text-xl font-bold">$1,475.00</Text>
        <Text className="text-green-500 text-xs mt-1">$32 Left to budget</Text>

        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={150}
          chartConfig={{
            color: () => `#fff`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="10"
          center={[10, 0]}
          absolute
          hasLegend={false}
        />
      </View>

      {/* Expense Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
        <View className="bg-[#7b61ff] rounded-xl p-4 mr-3 w-36">
          <Text className="text-white font-semibold text-lg">$965.00</Text>
          <Text className="text-white text-xs mt-1">Housing</Text>
          <Text className="text-white text-[10px] mt-1">61%</Text>
        </View>
        <View className="bg-[#2ed8ff] rounded-xl p-4 mr-3 w-36">
          <Text className="text-black font-semibold text-lg">$300.00</Text>
          <Text className="text-black text-xs mt-1">Food</Text>
          <Text className="text-black text-[10px] mt-1">19%</Text>
        </View>
        <View className="bg-white rounded-xl p-4 w-36">
          <Text className="text-black font-semibold text-lg">$200.00</Text>
          <Text className="text-black text-xs mt-1">Saving</Text>
          <Text className="text-black text-[10px] mt-1">13%</Text>
        </View>
      </ScrollView>

      {/* Income */}
      <View className="mb-6">
        <Text className="text-white text-lg mb-3">My Income</Text>
        <View className="flex-row justify-between">
          <View className="bg-[#1c1c1e] rounded-xl p-4 w-[48%]">
            <Text className="text-white text-sm mb-1">Salary</Text>
            <Text className="text-white font-bold text-xl">$1,500.00</Text>
          </View>
          <View className="bg-[#1c1c1e] rounded-xl p-4 w-[48%]">
            <Text className="text-white text-sm mb-1">Interest</Text>
            <Text className="text-white font-bold text-xl">$240.00</Text>
          </View>
        </View>
      </View>

      {/* Bottom Tabs */}
      <View className="flex-row justify-around bg-[#1c1c1e] rounded-2xl py-3 mb-10">
        <TouchableOpacity className="items-center">
          <FontAwesome name="spotify" size={20} color="white" />
          <Text className="text-white text-xs mt-1">$54.99</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FontAwesome name="figma" size={20} color="white" />
          <Text className="text-white text-xs mt-1">$8.99</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FontAwesome name="shopping-bag" size={20} color="white" />
          <Text className="text-white text-xs mt-1">$132</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
