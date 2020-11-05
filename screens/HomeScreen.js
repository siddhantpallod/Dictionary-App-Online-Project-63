import * as React from 'react';
import {
    Text,
    View,
    Stylesheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            text : '',
            definitions = [],
        }
    }

    getWord=(word)=>{
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json"

        return fetch(url)
        .then((data) => {
            if(data.status === 200){
                return data.json
            }
            else {
                return null
            }
        })

        .then((response)=>{

            var responseObject = response
            // var word = responseObject.word
            // var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
            if(responseObject){
                var wordData = responseObject.definitions[0]
                var definition = wordData.description
                var lexicalCategory = wordData.wordType

                this.setState({
                    "word" : this.state.text,
                    "definition" : definition,
                    "lexicalCategory" : lexicalCategory
                })
            }
            else{
                this.setState({
                    "word" : this.state.text,
                    "definition" : "NOT FOUND"
                })
            }
        })
    }

    render(){
        return(
            <View>
            <TextInput 
            style = {styles.inputBox}
            onChangeText = {text => {
                this.setState({
                    text : text,
                    isSearchPressed : false,
                    word : "Loading...",
                    lexicalCategory : '',
                    exapmles = [],
                    definition : ""                   
                })
            }}
        value = {this.state.text}
        />

        <TouchableOpacity 
        style = {styles.searchButton}>
        onPress = { () =>{
            this.setState({isSearchPressed : true})
            this.getWord(this.state.text)
        }}
            
        </TouchableOpacity>

        </View>
        )
    }
}