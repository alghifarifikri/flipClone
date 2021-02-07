/* eslint-disable prettier/prettier */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ParsedDate} from '../Utils/ParseDate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Detail({}) {
  const route = useRoute();
  const navigation = useNavigation();
  const detail = route.params.data || {};
  const [val] = useState(detail);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.textBold}>ID TRANSAKSI: #{val.id}{' '}</Text>
        <MaterialCommunityIcons name="content-copy" style={styles.iconCopy} />
      </View>
      <View style={styles.line} />
      <View style={styles.secondHeader}>
        <Text style={styles.textBold}>DETAIL TRANSAKSI</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.close}>
          <Text
            style={styles.textClose}>
            Tutup
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondLine} />
      <View style={styles.paddingView}>
        <Text style={styles.textBank}>
          {val.sender_bank.toUpperCase()}
          {'  '}
          <FontAwesome name="arrow-right" />
          {'  '}
          {val.beneficiary_bank.toUpperCase()}
        </Text>
        <View style={styles.card}>
          <View style={styles.flex}>
            <Text style={styles.textBold}>
              {val.beneficiary_name.toUpperCase()}
            </Text>
            <Text>{val.account_number}</Text>
          </View>
          <View style={styles.textRight}>
            <Text style={styles.textBold}>NOMINAL</Text>
            <Text>
              {'Rp. '}
              {String(val.amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.flex}>
            <Text style={styles.textBold}>BERITA TRANSFER</Text>
            <Text>{val.remark}</Text>
          </View>
          <View style={styles.textRight}>
            <Text style={styles.textBold}>KODE UNIK</Text>
            <Text>
              {val.unique_code}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View>
            <Text style={styles.textBold}>TANGGAL DIBUAT</Text>
            <Text>{ParsedDate(val.created_at)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header : {
    padding: '5%',
    flexDirection: 'row',
  },
  line : {
    height: 1,
    width: '100%',
    backgroundColor: '#DBDFDD',
  },
  secondLine : {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
  secondHeader : {
    padding: '5%',
    flexDirection: 'row',
  },
  close : {
    fontWeight: 'bold',
    marginLeft: 'auto',
    color: '#FC755D',
    marginRight: '2%',
  },
  textClose:{
    color: '#FC755D',
    fontWeight: 'bold',
  },
  iconCopy:{
    color: '#FC755D',
    fontSize: 22,
  },
  paddingView:{
    padding: '5%',
  },
  textBank : {
    fontWeight: 'bold',
    paddingBottom: '5%',
  },
  flex:{
    flex: 2,
  },
  textBold : {
    fontWeight: 'bold',
  },
  textRight : {
    marginLeft: 'auto',
    flex: 1,
  },
  card : {
    flexDirection: 'row',
    paddingBottom: '5%',
  },
});

export default Detail;
