import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { Property } from '@/types'

export default function RecommendedCard({ property }: { property: Property }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-row bg-white rounded-2xl mb-3 mx-5 overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
      }}
      onPress={() => router.push(`/(root)/property/${property.id}`)}
    >
      {/* Image */}
      <Image
        source={{ uri: property.images[0] }}
        className="w-28 h-28"
        resizeMode="cover"
      />

      {/* Info */}
      <View className="flex-1 p-3 justify-between">
        <View>
          <Text className="text-gray-900 font-semibold text-sm" numberOfLines={1}>
            {property.title}
          </Text>
          <Text className="text-gray-400 text-xs mt-1" numberOfLines={1}>
            {property.location}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-blue-600 font-bold text-sm">
            ₹{property.price?.toLocaleString()}
          </Text>
          <View className="flex-row gap-2">
            <Text className="text-gray-400 text-xs">{property.bedrooms} bd</Text>
            <Text className="text-gray-400 text-xs">{property.bathrooms} ba</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}