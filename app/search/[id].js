import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import { useFetch } from '../../hooks/userFetch'
import styles from '../../styles/search'

const JobSearch = () => {
  const params = useSearchParams();
  const router = useRouter()

  const [fetchQ, setFetchQ] = useState({
    endpoint: 'search',
    query: {
      query: params.id,
      page: 1
    }
  })

  const { data, isLoading, error } = useFetch(fetchQ.endpoint, fetchQ.query);

  const handlePagination = (direction) => {
    if (direction === 'left' && fetchQ?.query?.page > 1) {
      setFetchQ(currentQ => ({
        ...currentQ,
        query: {
          ...currentQ.query,
          page: currentQ.query.page - 1
        }
      }))
    } else if (direction === 'right') {
      setFetchQ(currentQ => ({
        ...currentQ,
        query: {
          ...currentQ.query,
          page: currentQ.query.page + 1
        }
      }))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : error && (
                <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}

        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{fetchQ?.query?.page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default JobSearch