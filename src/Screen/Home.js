/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import {ParsedDate} from '../Utils/ParseDate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {FetchApi} from '../Utils/FetchApi';
import {Search} from '../Utils/Search';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      modalVisible: false,
      filter: 'URUTKAN',
    };
    this.arrayholder = [];
  }

  async componentDidMount() {
    await this.fetchData();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
   Alert.alert(
       '',
       'Tutup Aplikasi ?', [{
           text: 'Batal',
           onPress: () => console.log('Cancel Pressed'),
           style: 'cancel',
       }, {
           text: 'OK',
           onPress: () => BackHandler.exitApp(),
       } ], {
           cancelable: false,
       }
    );
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  fetchData = async () => {
    const response = await FetchApi('https://nextar.flip.id/frontend-test');
    this.setState({loading: true});
    if (response.success === true) {
      this.setState({
        data: response.result,
        filter: 'URUTKAN',
        loading: false,
      });
      this.arrayholder = response.result;
    } else {
      this.setState({loading: false});
    }
  }

  searchFilterFunction = (text) => {
    let dataFil = this.arrayholder;
    const newData = Search(text, dataFil);
    this.setState({
      data: newData,
    });
  };

  setFilter = (type, value, data, typeFilter) => {
    let dataSort = data;
    if (value === 'asc') {
      dataSort.sort((a, b) => {
        if (
          type === 'name'
            ? a.beneficiary_name < b.beneficiary_name
            : a.created_at < b.created_at
        ) {
          return -1;
        } else if (
          type === 'name'
            ? a.beneficiary_name > b.beneficiary_name
            : a.created_at > b.created_at
        ) {
          return 1;
        } else {
          return 0;
        }
      });
      this.setState({data: dataSort, modalVisible: false, filter: typeFilter});
    } else if (value === 'desc') {
      dataSort.sort((a, b) => {
        if (
          type === 'name'
            ? a.beneficiary_name > b.beneficiary_name
            : a.created_at > b.created_at
        ) {
          return -1;
        } else if (
          type === 'name'
            ? a.beneficiary_name < b.beneficiary_name
            : a.created_at < b.created_at
        ) {
          return 1;
        } else {
          return 0;
        }
      });
      this.setState({data: dataSort, modalVisible: false, filter: typeFilter});
    }
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  onRefresh() {
    this.setState({loading: true},() => {this.fetchData();});
}

  renderHeader = () => {
    return (
      <View style={styles.backgroundHeader}>
        <View
          style={styles.borderHeader}>
          <FontAwesome
            name="search"
            style={styles.iconSearch}
          />
          <TextInput
            placeholder="Cari nama, bank, atau nominal"
            lightTheme
            round
            onChangeText={(text) => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
          <TouchableOpacity
            onPress={() => this.setModalVisible(true)}
            style={styles.sorting}>
            <View style={styles.flexDirection}>
              <Text style={styles.textSorting}>{this.state.filter} </Text>
              <FontAwesome
                name="chevron-down"
                style={styles.iconSorting}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <View style={styles.flex}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}>
            <View style={styles.modal}>
              <View
                style={styles.popUp}>
                <Text>Urutkan</Text>
                <View>
                  <TouchableOpacity
                    style={styles.marginPopUp}
                    onPress={() =>
                      this.setFilter(
                        'name',
                        'asc',
                        this.state.data,
                        'Nama A-Z')
                    }>
                    <Text>Nama A-Z</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.marginPopUp}
                    onPress={() =>
                      this.setFilter(
                        'name',
                        'desc',
                        this.state.data,
                        'Nama Z-A',
                      )
                    }>
                    <Text>Nama Z-A</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.marginPopUp}
                    onPress={() =>
                      this.setFilter(
                        'date',
                        'asc',
                        this.state.data,
                        'Tgl Terbaru',
                      )
                    }>
                    <Text>Tanggal Terbaru</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.marginPopUp}
                    onPress={() =>
                      this.setFilter(
                        'date',
                        'desc',
                        this.state.data,
                        'Tgl Terlama',
                      )
                    }>
                    <Text>Tanggal Terlama</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View style={styles.backgroundFlatList}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Detail', {data: item})
                  }>
                  <View
                    style={styles.card}>
                    <View
                      style={{...styles.status,
                        backgroundColor:
                          `${item.status}` === 'SUCCESS'
                            ? '#50B885'
                            : '#EF6D3A',
                      }}
                    />
                    <View style={styles.marginCard}>
                      <Text style={styles.textBold}>
                        {item.sender_bank.toUpperCase()}
                        {'  '}
                        <FontAwesome name="arrow-right" />
                        {'  '}
                        {item.beneficiary_bank.toUpperCase()}
                      </Text>
                      <Text>{item.beneficiary_name.toUpperCase()}</Text>
                      <Text>
                        {'Rp. '}
                        {String(item.amount).replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1,',
                        )}{' '}
                        <Octicons name="primitive-dot" />{' '}
                        {ParsedDate(item.created_at)}
                      </Text>
                    </View>
                    <View
                      style={styles.borderStatus}>
                      {item.status === 'SUCCESS' ? (
                        <View
                          style={styles.success}>
                          <Text
                            style={styles.textSuccess}>
                            Berhasil
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={styles.pending}>
                          <Text style={styles.textPending}>
                            Pengecekan
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={this.renderHeader}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.loading}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundHeader : {
    backgroundColor: '#F5F9F8',
  },
  backgroundFlatList : {
    backgroundColor: '#F5F9F8',
  },
  flex : {
    flex: 1,
  },
  flexDirection : {
    flexDirection: 'row',
  },
  borderHeader:{
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    margin: '2%',
  },
  iconSearch:{
    color: 'grey',
    fontSize: 20,
    marginTop: '4%',
    marginLeft: '2%',
  },
  sorting:{
    marginLeft: 'auto',
    marginTop: '4%',
    marginBottom: '2%',
    marginRight: '3%',
  },
  iconSorting : {
    color: '#FC755D',
    fontSize: 15,
  },
  modal:{
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  popUp:{
    marginTop: '50%',
    marginBottom: '50%',
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBold : {
    fontWeight: 'bold',
  },
  textSorting : {
    color: '#FC755D',
  },
  textSuccess : {
    padding: '2%',
    color: 'white',
    fontWeight: 'bold',
  },
  textPending : {
    padding: '2%',
    fontWeight: 'bold',
  },
  marginPopUp : {
    margin: '10%',
  },
  marginCard : {
    margin: '2%',
  },
  borderStatus : {
    marginLeft: 'auto',
    marginRight: '5%',
    marginTop: '6%',
  },
  status : {
    width: '2%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  success : {
    backgroundColor: '#50B885',
    borderRadius: 10,
  },
  pending : {
    borderColor: '#EF6D3A',
    borderWidth: 2,
    borderRadius: 10,
  },
  card : {
    margin: '1%',
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default Home;
