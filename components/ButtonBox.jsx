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
        width: 'auto',
        borderRadius: 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 15
      }}
      onPress={() => handler(handlerText)}
      disabled={loading}
    >
      <Avatar.Icon
        size={60}
        color={textColors.primaryText}
        style={[{ backgroundColor: backgroundColor.secondaryBackground }]}
        icon={icon}
      />
      <Text
        style={{
          color: textColors.primaryText,
          textAlign: 'center',
          fontSize: 18,
        }}
      >
        {displayText}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonBox;
