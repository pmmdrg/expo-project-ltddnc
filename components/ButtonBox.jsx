import { Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

import { backgroundColor, textColors } from '../assets/colors/colors';

const ButtonBox = ({
  icon,
  displayText,
  handlerText,
  handler,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        backgroundColor: backgroundColor.secondaryBackground,
        height: 80,
        width: 80,
        borderRadius: 10,
        alignItems: 'center',
      }}
      onPress={() => handler(handlerText)}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={textColors.primaryText}
        style={[{ backgroundColor: backgroundColor.secondaryBackground }]}
        icon={icon}
      />
      <Text
        style={{
          color: textColors.primaryText,
          textAlign: 'center',
          fontSize: 12,
        }}
      >
        {displayText}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonBox;
