import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Points from '@/components/Points';

export default function TabTwoScreen() {
  const {name,birth,gender,lifepath,attitude,generation,dayofbirth} = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}的生命靈數</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>出生日期:{birth}</Text>
      <View style={styles.marginTop}>
            <Points lifepath={lifepath} attitude={attitude} generation={generation} dayofbirth={dayofbirth}/>
        </View>
        
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  marginTop:{
    marginTop:30
  },
  
});
