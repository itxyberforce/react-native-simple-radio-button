import { StyleSheet,FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect, useContext, useCallback } from 'react';
import { router ,useFocusEffect} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ProfilesContext } from '@/components/ProfilesContext';

export default function TabThreeScreen() {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }
  let[profiles, setProfiles]=useState([{"key":"0","name":"profiletemplate","birth":"2000-01-25","gender":"M","lifepath":1,"attitude":8,"generation":2,"dayofbirth":7}]);
  
  const save = async(value:any)=>{
    
    try {
      const saveprofiles = JSON.stringify(value)
      await AsyncStorage.setItem("profiles",saveprofiles);
      load();
    }catch(err){
      console.log('asyn err');
    }
  }
  const load = async()=>{
    try {
      let loadprofiles= await AsyncStorage.getItem("profiles")

      if(loadprofiles!==null){
        console.log('loaded profile'+loadprofiles);
        profiles=JSON.parse(loadprofiles)
        setProfiles(profiles);
      }else{
        console.log('no save found');
      }
    }catch(err){
      console.log('asyn err');
    }
  }
  useEffect(()=>{
    
  },[]);

  useFocusEffect(
    useCallback(()=>{
      console.log('profiles focused')
      load();
    
    },[])
  )

  
 
  const profile=(itemid:any)=>{
    var index = profiles.findIndex(i => i.key === itemid)

    //console.log(index);

    router.push({
      pathname:"/two",
      params:{
        name:profiles[index].name,
        birth:profiles[index].birth,
        gender:profiles[index].gender,
        lifepath:profiles[index].lifepath,
        attitude:profiles[index].attitude,
        generation:profiles[index].generation,
        dayofbirth:profiles[index].dayofbirth}
    })
    
  }

  const remove=(itemid:any)=>{
    var index = profiles.findIndex(i => i.key === itemid)
    console.log("key "+itemid+"is: index"+index);

    //console.log("before delete id:"+itemid+", "+JSON.stringify(profiles))
    
    profiles.splice(index,1)

    //console.log("after delete:"+JSON.stringify(profiles))

    setProfiles(profiles);
    save(profiles);
  }
    
  
  return (
    
    <View style={styles.container}>
      
        <FlatList style={styles.list}
          data={profiles}
          renderItem={({ item }) =>(
            <TouchableOpacity onPress={()=>profile(item.key)} >
              <View style={styles.item}>
                <View style={styles.row}>
                  <View  style={styles.lifeblock}>
                    <Text style={styles.profilelife}>{item.lifepath}</Text>
                  </View>
                  <View  style={styles.othersblock}>
                    <Text style={styles.profileothers}>{item.attitude}</Text>
                    <Text style={styles.profileothers}>{item.generation}</Text>
                    <Text style={styles.profileothers}>{item.dayofbirth}</Text>
                  </View>
                  
                </View>
                <View  style={styles.detailsblock}>
                  <Text style={styles.profilename}>{item.name}</Text>
                  <Text style={styles.profilebirth}>{item.birth}</Text>
                </View>
                
                <TabBarIcon  name="edit" color="#ccc" />
                <View style={styles.space}></View>
                <TouchableOpacity onPress={()=>remove(item.key)} >
                  <TabBarIcon  name="trash" color="#ccc" />
                </TouchableOpacity>  
              </View>
            </TouchableOpacity>
          ) }
        />
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor:'#111540',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  space:{
    width:'5%',
  },
  
  list: {
    width:'100%',
    
  },
  item:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    backgroundColor:'#111533',
    flexDirection: 'row',
    padding:20,
    marginTop:10,
    //borderColor:'#bbb',
    //borderWidth:1,
    //borderStyle:'dashed',
    borderRadius:10
  },
  row:{
    backgroundColor:'#111540',
    flexDirection: 'row',
  },
  profilename:{
    color:'white',
    fontSize:15,
  },
  profilebirth:{
    color:'white',
    fontSize:15,
  },
  profilelife:{
    color:'white',
    fontSize:20,
    padding:5,
  },
  profileothers:{
    color:'white',
    fontSize:8,
    padding:1,
  },
  lifeblock:{
    width:40,
    backgroundColor:'#336699',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
  othersblock:{
    marginLeft:5,
    width:15,
    backgroundColor:'#666',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
  },
  detailsblock:{
    marginLeft:'8%',
    width:'60%',
    backgroundColor:'#111533',
  },
  text:{
    color:'white',
  },
});
