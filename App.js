import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  AsyncStorage,
  LogBox} from 'react-native';
import { Ionicons,MaterialIcons } from "@expo/vector-icons"
import { useEffect,useState } from 'react';

export default function App() {

  const [task,setTask]=useState([])
  const [newtask,setNewtask]=useState("")
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

  async function addTask(){

    if(newtask==""){
    return
    }

    const search = task.filter(task=>task==newtask)

    if(search.length!=0){
      Alert.alert("Atenção","Nome da tarefa repetido!")
      return
    }

    setTask([... task,newtask])
    setNewtask("")
    Keyboard.dismiss()
  }

  async function removeTask(item){
    setTask(task.filter(task=>task!=item))
  }

  useEffect(()=> {
    async function carregardados() {
      const task = await AsyncStorage.getItem("task")
      if(task){
        setTask(JSON.parse(task))
      }
    }
    carregardados()
  },[])

  useEffect(()=>{
    async function salvadados(){
      AsyncStorage.setItem("task",JSON.stringify(task))
    }
    salvadados()
  },[task])

  return (
  <>
    <View style={styles.container}>

      <View style={styles.body}>
      <FlatList 
      flat={styles.flat}
      data={task}
      keyExtractor={item=>item.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>(

      <View style={styles.containerView}>
      <Text style={styles.texto}>{item}</Text>
      <TouchableOpacity onPress={()=>removeTask(item)}>
        <MaterialIcons
        name='delete-forever'
        size={25}
        color="#f54c75"
        />
      </TouchableOpacity>
      </View>
    
    )}
      />
      <StatusBar style="auto" />
      </View>

      <View style={styles.form}>
      <TextInput 
      style={styles.input}
      placeholderTextColor="#999"
      autoCorrect={true}
      placeholder="Adicione uma tarefa"
      maxLength={25}
      onChangeText={text=>setNewtask(text)}
      value={newtask}
      />
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-add" size={25} color="#fff" onPress={()=>addTask()}/>
      </TouchableOpacity>
    </View>

    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:20,
    paddingVertical:20,
    marginTop:20
  },
  body:{
    flex:1
  },
  form:{
    padding:0,
    height:60,
    justifyContent:"center",
    alignSelf:"stretch",
    flexDirection:"row",
    paddingTop:13,
    borderTopWidth:1,
    borderColor:"#eee"
  },
  input:{
    flex:1,
    height:50,
    backgroundColor:"#eee",
    borderRadius:12,
    paddingVertical:5,
    paddingHorizontal:10,
    borderWidth:1,
    borderColor:"#eee"
  },
  button:{
    height:50,
    width:50,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#1c6cce",
    borderRadius:16,
    marginLeft:10
  },
  flat:{
    flex:1,
    marginTop:5
  },
  containerView:{
    marginBottom:15,
    padding:15,
    borderRadius:16,
    backgroundColor:"#eee",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderWidth:1,
    borderColor:"#eee"
  },
  texto:{
    fontSize:15,
    color:"#333",
    fontWeight:"bold",
    marginTop:4,
    textAlign:"center"
  }  
})