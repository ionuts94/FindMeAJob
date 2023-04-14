import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useFetch } from '../../../hooks/userFetch';
import { COLORS, SIZES } from '../../../constants'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'

const Popularjobs = () => {
  const router = useRouter();
  const [fetchQ, setFetchQ] = useState({
    endpoint: 'search',
    query: {
      query: 'React developer',
      num_pages: 1
    }
  })
  const { data, isLoading, error } = useFetch(fetchQ.endpoint, fetchQ.query);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading
          ? <ActivityIndicator size='large' colors={COLORS.primary} />
          : error
            ? <Text>Something went wrong</Text>
            : <FlatList
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard
                  item={item}
                />
              )}
              keyExtractor={item => item?.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
        }
      </View>
    </View>
  )
}

export default Popularjobs