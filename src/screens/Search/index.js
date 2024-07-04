import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import CustomPicker from '../../components/base/picker';
import api from '../../configs/api';
import Input from '../../components/base/input';

const Search = ({ navigation }) => {
  const [worker, setWorker] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    sort: '',
    sortBy: 'DESC'
  });

  const [searchInput, setSearchInput] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('');

  const getWorker = async () => {
    try {

      const res = await api.get(`/workers/`, {
        params: {
          limit: params.limit,
          page: params.page,
          search: params.search,
          sort: params.sort,
          sortBy: params.sortBy
        }
      });

      const { data } = res.data;
      setWorker(current => [...current, ...data])

      Toast.show({
        type: 'success',
        text1: res.data.status,
        text2: res.data.message
      });

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.message
      });
    }
  };

  useEffect(() => {
    getWorker();
  }, [params]);

  const renderLoader = () => {
    return <ActivityIndicator size="large" color="#5E50A1" />;
  };

  const loadMoreItem = () => {
    setParams(current => ({
      ...current,
      page: current.page + 1,
    }));
  };

  const handleSearch = () => {
    setWorker([]);
    setParams({ ...params, search: searchInput, sort: selectedSort, sortBy: selectedSortBy, page: 1 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 16, gap: 16, paddingBottom: 120 }}>
        <View style={styles.searchSortContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchInput}
            onChangeText={text => setSearchInput(text)}
          />
          <View style={{ witdh:'100%', flexDirection: 'row', gap: 5 }}>
            <CustomPicker
              selectedValue={selectedSort}
              onValueChange={(value) => setSelectedSort(value)}
              items={[
                { label: 'Sort', value: '' },
                { label: 'Sort by name', value: 'name' },
                { label: 'Sort by location', value: 'location' },
                { label: 'Sort by recent', value: 'created_at' },
              ]}
              placeholder="Sort"
            />
            <CustomPicker
              selectedValue={selectedSortBy}
              onValueChange={(value) => setSelectedSortBy(value)}
              items={[
                { label: 'Order', value: '' },
                { label: 'Ascending', value: 'ASC' },
                { label: 'Descending', value: 'DESC' },
              ]}
              placeholder="Order"
            />
            <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={worker}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(`worker-profile`, { id: item.id })} style={styles.card}>
              {item.photo ? <Image source={{ uri: item.photo }} style={styles.cardImage} /> : <Image source={require('../../assets/user-thumbnail.jpg')} style={styles.cardImage} />}
              <View style={{ gap: 4 }}>
                {item.name && <Text style={styles.cardName}>{item.name}</Text>}
                {item.position && <Text style={styles.cardJob}>{item.position}</Text>}
                {item.skills && <Text style={styles.cardSkills}>{item.skills.join(', ')}</Text>}
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      </View>
      <Toast />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    gap: 20,
    paddingTop: 40
  },
  searchSortContainer: {
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    gap: 5
  },
  searchInput: {
    width:'100%',
    height:48,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: '#5E50A1',
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#5E50A1',
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    gap: 20,
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardJob: {
    fontSize: 14,
  },
  cardLocation: {
    fontSize: 14,
  },
  cardSkills: {
    fontSize: 12,
    color: '#666',
  },
});