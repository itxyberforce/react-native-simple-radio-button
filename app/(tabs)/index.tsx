import { Button,StyleSheet,TextInput,Pressable,Platform, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Text, View } from '@/components/Themed';
import { ProfilesContext } from '@/components/ProfilesContext';
import {createContext} from "react";
import React, { useState,useCallback, useEffect ,useContext} from 'react';

import RadioForm from 'react-native-simple-radio-button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CommonActions, useNavigation } from '@react-navigation/native'
import {NavigationContainer} from '@react-navigation/native';
import { Link, Tabs, router, useFocusEffect } from 'expo-router';
import { ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function TabOneScreen() {
  
  let [Test,setTest] = useState("abc");
  

  let[profiles, setProfiles]=useState([{"key":"0","name":"profiletemplate","birth":"2000-01-25","gender":"M","lifepath":1,"attitude":8,"generation":2,"dayofbirth":7}]);

  const loadusecontext = () =>{
    console.log("useCotext profiles:"+profiles);
  }
  
  const save = async(value:any)=>{
    
    try {
      const saveprofiles = JSON.stringify(value)
      await AsyncStorage.setItem("profiles",saveprofiles);
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
      }else{
        console.log('no save found');
      }
    }catch(err){
      console.log('asyn err');
    }
  }
  useEffect(()=>{
    load();
  });
 
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [name, setname] = useState('1');
  const [birth, setBirth] = useState('');
  const genders =[
    {label:"男", value:"M"},
    {label:"女", value:"F"},
    {label:"其他", value:"O"},
  ]
  const [gender, setGender] = useState(0);
  const [lifepath,setLifepath] = useState(0);
  const [attitude,setAttitude] = useState(0);
  const [generation,setGeneration] = useState(0);
  const [dayofbirth,setDayofbirth] = useState(0);
  

  useFocusEffect(
    useCallback(()=>{
      console.log('index focused')
      //setDate(new Date());
      //setname("chi")
    
    },[])
  )


  const toggleDatepicker = () =>{
    setShowPicker(!showPicker);
  };
  const onChange = ({type}: any, selectedDate: any) =>{
    if(type =="set"){
      let currentDate = selectedDate;
      setDate(currentDate);
      if(Platform.OS==="android"){
        toggleDatepicker(); 
        currentDate=currentDate.toISOString().split('T')[0]
        setBirth(currentDate);
        
        
        let cal_lifepath=0;
        let cal_attitude=0;
        let cal_generation=0;
        let cal_dayofbirth=0;

        function firstDigit(n:number){ 
            n /= 10; 
            return Math.floor(n); 
        } 

        function lastDigit(n:number){ 
            return Math.floor(n % 10); 
        } 
  
        //lifepath calculation
        for(let i=0;i<=9;i++){
          if(i!=4 && i!=7){
            cal_lifepath+=Number(currentDate.split("")[i]);
          }
        }
  
        if(cal_lifepath<10||cal_lifepath==11||cal_lifepath==22||cal_lifepath==33){
          setLifepath(cal_lifepath);
        }else{
          cal_lifepath=firstDigit(cal_lifepath)+lastDigit(cal_lifepath);
          if(cal_lifepath<10){
            setLifepath(cal_lifepath);
          }else{
            setLifepath(firstDigit(cal_lifepath)+lastDigit(cal_lifepath));
          }
        }
        
        //attitude calculation
        for(let i=5;i<=9;i++){
          if(i!=7){
            cal_attitude+=Number(currentDate.split("")[i]);
          }
        }

        if(cal_attitude<10){
          setAttitude(cal_attitude);
        }else{
          cal_attitude=firstDigit(cal_attitude)+lastDigit(cal_attitude);
          if(cal_attitude<10){
            setAttitude(cal_attitude);
          }else{
            setAttitude(firstDigit(cal_attitude)+lastDigit(cal_attitude));
          }
        }

        //generation calculation
        for(let i=0;i<=3;i++){
          cal_generation+=Number(currentDate.split("")[i]);
        }

        if(cal_generation<10){
          setGeneration(cal_generation);
        }else{
          cal_generation=firstDigit(cal_generation)+lastDigit(cal_generation);
          if(cal_generation<10){
            setGeneration(cal_generation);
          }else{
            setGeneration(firstDigit(cal_generation)+lastDigit(cal_generation));
          }
        }

        //dayofbirth calculation
        for(let i=8;i<=9;i++){
          cal_dayofbirth+=Number(currentDate.split("")[i]);
        }

        if(cal_dayofbirth<10){
          setDayofbirth(cal_dayofbirth);
        }else{
          setDayofbirth(firstDigit(cal_dayofbirth)+lastDigit(cal_dayofbirth));
        }


        
        //console.log(lifepath);
      }
    }else{
      toggleDatepicker();
    }
  }



  const addprofile=()=>{

    //let profilesCount;
    //profilesCount=profiles.length.toString();

    let randomKey= Math.floor(Math.random() *1000000000).toString();
    
    const getGenderIndex=(genderstring:string)=> {
      return genders.findIndex(obj => obj.value === genderstring);
    }

    
    
    profiles.push({key:randomKey,name:name,birth:birth,gender:gender.toString(),lifepath:lifepath,attitude:attitude,generation:generation,dayofbirth:dayofbirth})
    setProfiles(profiles);
    save(profiles);
    router.push({
      pathname:"/two",
      params:{
        name:name,
        birth:birth,
        gender:gender,
        lifepath:lifepath,
        attitude:attitude,
        generation:generation,
        dayofbirth:dayofbirth}
    })

        console.log(profiles);

  }
  


  return (
    
      <View style={styles.container}>
        
          <Text style={styles.title}>新增檔案</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.row}>
            <View style={styles.leftcol}>
              <Text style={styles.h1}>出生日期</Text>
              {showPicker &&(
                <DateTimePicker 
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  
                  
                />
              )}
            </View>
            <View style={styles.rightcol}>
              {!showPicker &&(
              <Pressable onPress={toggleDatepicker}>
                <TextInput 
                  style={styles.input}
                  value={birth}
                  onChangeText={setBirth}
                  editable={false}
                  
                />
              </Pressable>
              )}
            </View>  
            </View>
            <View style={styles.row}>
              <View style={styles.leftcol}>
                <Text style={styles.h1}>性別</Text>
              </View>
              <View style={styles.rightcol}>
                <RadioForm 
                  
                  radio_props={genders} 
                  //initial={gender}
                  onPress={(gender)=>setGender(gender)}
                  //labelHorizontal={false}
                  formHorizontal
                  animation ={false}
                  //labelColor='#fff'
                  //buttonColor='#fff'
                  
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftcol}>
                <Text style={styles.h1}>名字</Text>
              </View>
              <View style={styles.rightcol}>
                <TextInput 
                  style={styles.input}
                  onChangeText={newText => setname(newText)}
                  placeholder='請輸入名字'
                  placeholderTextColor="#999" 
                />
                
              </View>
            </View>
            <View style={styles.marginTop}>
              <Pressable
                
                onPress={addprofile} 
              
              >
                {({ pressed }) => (
                  <Text style={styles.btn}>確認</Text>
                )}
              </Pressable>
            </View>
            

          
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  marginTop:{
    marginTop:30
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color:'white',
  },
  h1: {
    fontSize: 20,
    //fontWeight: 'bold',
    color:'white',
  },
  h2: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    color:"white",
  },
  input: {
    fontSize: 20,
    width:'100%',
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    
  },
  btn: {
    fontSize: 18,
    padding: 10,
    color: 'white',
    backgroundColor: '#3399ff',
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    
    width:'80%',
    flexDirection: 'row',
  },
  leftcol:{
    width:'40%'
  },
  rightcol:{
    width:'60%'
  },
  
});
