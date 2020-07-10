import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Pressable,
} from 'react-native'
import moment from 'moment'

const FAKE_THOUGHTS = [
  {
    id: '1',
    text: 'You should look at different things',
    date: moment('2020-06-15'),
  },
  {
    id: '2',
    text: 'What is my favorite thing to do?',
    date: moment('2020-07-10'),
  },
  {
    id: '3',
    text: 'Never shoot yourself in the foot you know',
    date: new Date(),
  },
]

function Thought({ thought }) {
  const [value, setValue] = useState('')
  const [displayFullDate, setDisplayFullDate] = useState(false)

  useEffect(() => {
    thought.text && thought.text.length > 0 && setValue(thought.text)
    thought.date
  }, [thought])

  const dateText = displayFullDate
    ? moment(thought.date).format('MM-DD-yyyy')
    : moment(thought.date).fromNow()

  return (
    <View style={styles.thoughtContainer}>
      <View style={styles.thoughtDateContainer}>
        <Text style={styles.thoughtDateText}>{dateText}</Text>
      </View>
      <TextInput
        style={styles.thoughtInput}
        value={value}
        onChangeText={(text) => setValue(text)}
        multiline={true}
        onFocus={() => setDisplayFullDate(true)}
        onBlur={() => setDisplayFullDate(false)}
      />
    </View>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.title}>Thoughts</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={FAKE_THOUGHTS}
        renderItem={({ item }) => <Thought thought={item} />}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const colors = {
  orange: '#ff934f',
  yellow: '#c2e812',
  green: '#91f5ad',
  white: '#ffffff',
  grey: '#bfcbc2',
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.green,
  },
  header: {
    padding: 10,
  },
  list: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontFamily: 'AvenirNext-Medium',
  },
  thoughtContainer: {
    width: '100%',
    marginBottom: 20,
  },
  thoughtDateContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  thoughtDateText: {
    color: colors.white,
    backgroundColor: colors.orange,
    paddingHorizontal: 5,
    paddingHorizontal: 10,
  },
  thoughtInput: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.white,
    minHeight: 40,
  },
})
