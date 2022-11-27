import { View, Text, Button, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SingleNews from '../components/SingleNews'
import { ExploreState } from '../context/Context'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { authentication } from '../firebase/firebase-config';
import { signOut } from 'firebase/auth';

const NewsScreen = ({ navigation }) => {
  const [headings, setHeadings] = useState([])
  const value = true;
  const { category, country, source, userId, setUserId } = ExploreState();
  const BASE_URL = "https://saurav.tech/NewsAPI/"

  const logout = async () => {
    await signOut(authentication);
    setUserId('')
    navigation.navigate('Login')
    
  }

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`${BASE_URL}/top-headlines/category/${category}/${country}.json`);
      setHeadings(res.data.articles)
    }

    fetch();

  }, [category]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${BASE_URL}/top-headlines/category/${category}/${country}.json`);
      setHeadings(res.data.articles)
    }

    getData();

  }, [country]);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${BASE_URL}/everything/${source}.json`);
      setHeadings(res.data.articles)
    }

    getData();

  }, [source]);
  return (
    <ScrollView>
      <View>
        {
          userId ? <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button
              title="Explore"
              onPress={() =>
                navigation.navigate('Explore')
              }
            />
            <Button
              title="Saved"
              onPress={() =>
                navigation.navigate('Saved')
              }
            />
            <Button
              title="Logout"
              onPress={logout}
            />
          </View>
            :
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button
                title="Explore"
                onPress={() =>
                  navigation.navigate('Explore')
                }
              />
              <Button
                title="Log In"
                onPress={() =>
                  navigation.navigate('Login')
                }
              />
            </View>

        }
      </View>
      {
        headings.map((heading) => (
          <SingleNews key={uuidv4()} heading={heading} value={value} />
        ))
      }
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'red',
  },
});

export default NewsScreen