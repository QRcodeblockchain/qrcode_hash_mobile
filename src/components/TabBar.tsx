import React, {useEffect, useRef} from 'react';
// import {
//   COLORS,
//   DEVICE_HEIGHT as height,
//   DEVICE_WIDTH as width,
//   ICONS,
// } from '../../common';
// import {AppIcon, AppText} from '../../components';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Text,
  Dimensions,
} from 'react-native';

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const TAB_BAR_WIDTH: number = width / 3;
const ANIMATED_PART_HEIGHT: number = 3;

const TabBar: React.FC<TabBarProps> = ({state, descriptors, navigation}) => {
  const animationHorizontalValue = useRef(new Animated.Value(0)).current;

  const animate = (index: number) => {
    Animated.spring(animationHorizontalValue, {
      toValue: index * TAB_BAR_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate(state.index);
  }, [state.index]);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.animatedWrapper}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              transform: [{translateX: animationHorizontalValue}],
            },
          ]}
        />
      </Animated.View>

      <View style={{flexDirection: 'row', width: 40}}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableWithoutFeedback
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              key={`${index}--${route.key}`}>
              <View style={styles.innerView}>
                {/* <AppIcon
                  name={label}
                  color={isFocused ? COLORS.main : COLORS.black}
                /> */}
                <Text
                  numberOfLines={1}
                  style={[styles.iconText, {color: 'grey'}]}>
                  {label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    backgroundColor: 'blue',
  },
  tabButton: {
    flex: 1,
  },
  innerView: {
    paddingVertical: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    width: TAB_BAR_WIDTH,
    textAlign: 'center',
  },
  animatedView: {
    width: TAB_BAR_WIDTH,
    height: ANIMATED_PART_HEIGHT,
    backgroundColor: 'grey',
  },
  animatedWrapper: {
    width: TAB_BAR_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
