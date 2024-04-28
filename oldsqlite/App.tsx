import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {dataSource} from './src/Database';
import {experiment} from './src/Actions';

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    const connect = async () => {
      await dataSource.initialize();
    };

    connect();
  }, []);

  const makeExperiment = async (num: number) => {
    const result = await experiment(num);
    console.log(result);
    setText(result);
  };

  return (
    <SafeAreaView>
      <Button title="Experiment 1" onPress={() => makeExperiment(1)} />
      <Button title="Experiment 10" onPress={() => makeExperiment(10)} />
      <Button title="Experiment 10000" onPress={() => makeExperiment(10000)} />
      <Button
        title="Experiment 100000"
        onPress={() => makeExperiment(100000)}
      />
      <Text>{text}</Text>
    </SafeAreaView>
  );
}

export default App;
