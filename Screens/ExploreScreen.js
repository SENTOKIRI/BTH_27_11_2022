import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ExploreState } from '../context/Context'

const ExploreScreen = ({ navigation }) => {
    const { setCategory, setCountry, setSource } = ExploreState();

    const allCategories = [
        { id: '3', catg: 'general', img: 'https://static.thenounproject.com/png/2253047-200.png' },
        { id: '1', catg: 'business', img: 'https://static.thenounproject.com/png/2215883-200.png' },
        { id: '2', catg: 'entertainment', img: 'https://static.thenounproject.com/png/169025-200.png' },
        { id: '4', catg: 'health', img: 'https://static.thenounproject.com/png/1973982-200.png' },
        { id: '5', catg: 'science', img: 'https://static.thenounproject.com/png/3194352-200.png' },
        { id: '6', catg: 'sports', img: 'https://static.thenounproject.com/png/1694301-200.png' }
    ]

    const allCountries =
        [
            { id: '7', code: 'in', countryName: 'India' },
            { id: '8', code: 'au', countryName: 'Australia' },
            { id: '9', code: 'us', countryName: 'USA' },
            { id: '10', code: 'ru', countryName: 'Russia' },
            { id: '11', code: 'fr', countryName: 'France' },
            { id: '12', code: 'gb', countryName: 'UK' }
        ]

    const allSources =
        [
            { id: '13', code: 'bbc-news', sourceName: 'BBC News' },
            { id: '14', code: 'cnn', sourceName: 'CNN' },
            { id: '15', code: 'fox-news', sourceName: 'Fox News' },
        ]


    return (

        <View style={{ margin: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: '500', margin: 5 }}>Categories</Text>
            <ScrollView horizontal={true}>

                {allCategories.map((categories) => (
                    <View style={{ margin: 5, }} key={categories.id}>
                        <TouchableOpacity onPress={() => { setCategory(categories.catg); navigation.navigate('Home') }}>
                            <Image style={{ backgroundColor: 'red', alignSelf: 'center', width: 70, height: 70, borderRadius: 100, borderWidth: 1.6 }}
                                source={{ uri: categories.img }} />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center' }}>{categories.catg}</Text>
                    </View>
                ))
                }
            </ScrollView>

            <Text style={{ fontSize: 25, fontWeight: '500', margin: 5 }}>Country</Text>
            <ScrollView horizontal={true}>

                {allCountries.map((countries) => (
                    <View style={{ backgroundColor: 'black', width: 80, height: 80, margin: 5, borderRadius: 100, borderWidth: 1.6, justifyContent: 'center', alignContent: 'center' }} key={countries.id}>
                        <TouchableOpacity onPress={() => { setCountry(countries.code); navigation.navigate('Home') }}>
                            <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '500' }}>{countries.countryName}</Text>
                        </TouchableOpacity>

                    </View>
                ))
                }
            </ScrollView>

            <Text style={{ fontSize: 25, fontWeight: '500', margin: 5 }}>Sources</Text>
            <ScrollView horizontal={true}>

                {allSources.map((sources) => (
                    <View style={{ backgroundColor: 'white', width: 80, height: 80, margin: 5, borderRadius: 100, borderWidth: 1.6, justifyContent: 'center', alignContent: 'center' }} key={sources.id}>
                        <TouchableOpacity onPress={() => { setSource(sources.code); navigation.navigate('Home') }}>
                            <Text style={{ alignSelf: 'center', color: 'red', fontWeight: '500' }}>{sources.sourceName}</Text>
                        </TouchableOpacity>

                    </View>
                ))
                }
            </ScrollView>

        </View>
    )
}

export default ExploreScreen