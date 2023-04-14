import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useFetch } from '../../../hooks/userFetch';
import { COLORS, SIZES } from '../../../constants'
import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'

const Nearbyjobs = () => {
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
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading
          ? <ActivityIndicator size='large' colors={COLORS.primary} />
          : error
            ? <Text>Something went wrong</Text>
            : data?.map(job => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
              />
            ))
        }
      </View>
    </View>
  )
}

export default Nearbyjobs;