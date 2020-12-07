import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Customization } from "../config/Customization";
import Screen from "../common/Screen";
import PickerItem from "./PickerItem";

function AppPicker({ icon, items, onSelectItem, selectedItem, placeholder }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={Customization.color.medium}
              style={styles.icon}
            />
          )}
          <Text style={styles.text}>
            {selectedItem ? selectedItem : placeholder}
          </Text>
          <MaterialCommunityIcons
            name='chevron-down'
            size={20}
            color={Customization.color.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Screen>
          <Button title='Close' onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: Customization.color.light,
                  marginLeft: 10,
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Customization.color.light,
    borderRadius: 20,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
