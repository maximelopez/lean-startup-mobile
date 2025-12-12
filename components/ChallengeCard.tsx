import { Text, View } from 'react-native';
import { shadows } from "../utils/shadows";

interface ChallengeCardProps {
  title: string;
  progress: number;
  status?: string;
  color?: string;
  finished?: boolean;
}

export default function ChallengeCard({
  title,
  progress,
  status = "En cours…",
  color = "#6C0FF2",
  finished = false,
}: ChallengeCardProps) {
  
  const percentage = Math.round(progress * 100);

  return (
    <View>
      <View className="w-full bg-white rounded-[15px] p-5 mb-6" style={shadows.custom}>
        <Text className="text-[2Opx] font-peachy mb-4">
          {title}
        </Text>

        <View className="flex-row items-center mb-4">

          {/* Icône circulaire */}
          <View
            className="w-[40px] h-[40px] rounded-full justify-center items-center"
            style={{ 
              backgroundColor: finished ? "#FFCF06" : "transparent",
              borderWidth: finished ? 0 : 3,
              borderColor: "#6C0FF2",
            }}
          >
            {finished && (
              <Text className="text-white text-[24px]">✓</Text>
            )}
            {!finished && (
              <View className="w-3 h-3 rounded-full bg-[#6C0FF2]" />
            )}
          </View>

          <View className="ml-4 flex-row items-center gap-[10px]">
            <Text className="text-[18px] font-bold">{percentage}%</Text>
            <Text className="text-gray-500 text-[14px]">{status}</Text>
          </View>
        </View>

        {/* Barre de progression */}
        <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </View>

      </View>
    </View>
  );
}
