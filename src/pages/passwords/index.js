import { useEffect, useState } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import useStorage from '../../hooks/useStorage'
import {PasswordItem} from './components/passwordItem'


export function Passwords() {
    const [listPasswords, setListPasswords] = useState([])
    const focused = useIsFocused()
    const {getItem, removeItem} = useStorage()

    useEffect(() => {
        async function loadPassword(){
            const passwords = await getItem('@pass')
            setListPasswords(passwords)
        }

        loadPassword()
    }, [focused])

    function handleDeletePassword(item){
        console.log(item)
    }

    return (
        <SafeAreaView style = {{flex:1}}>
            <View style = {styles.header}>
                <Text style = {styles.title}>Minhas senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    style = {{flex:1, paddingTop: 14}}
                    data={listPasswords}
                    keyExtractor={(item) => String(item)}
                    renderItem={({item}) => <PasswordItem data={item} removePassword={() => handleDeletePassword(item)}/>}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor : '#392de9',
        padding:14,
        paddingTop:58
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14
    }
})