import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { COLORS, icons, SIZES, Tabs, DefaultApplyLink } from '../../constants';
import { useFetch } from '../../hooks/userFetch';

function JobDetails() {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs[0]);

  const [fetchQ, setFetchQ] = useState({
    endpoint: 'job-details',
    query: {
      job_id: params.id,
    }
  })

  const { data, isLoading, error } = useFetch(fetchQ.endpoint, fetchQ.query);

  function onRefresh() {

  }

  function displayTabContent() {
    switch (activeTab) {
      case 'Qualifications':
        return <Specifics
          title='Qualifications'
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      case 'Responsibilities':
        return <Specifics
          title='Responsibilities'
          points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
      case 'About':
        return <JobAbout
          info={data[0].job_description ?? 'No data provided'}
        />
      default:
        break;
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension='60%'
            />
          )
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }
        >
          {isLoading
            ? <ActivityIndicator size='large' color={COLORS.primary} />
            : error
              ? <Text>Something went wrong</Text>
              : data.length === 0
                ? <Text>No data</Text>
                : <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                  <Company
                    companyLogo={data[0].employer_logo}
                    companyName={data[0].employer_name}
                    jobTitle={data[0].job_title}
                    location={data[0].job_country}
                  />
                  <JobTabs
                    tabs={Tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />

                  {displayTabContent()}
                </View>
          }
        </ScrollView>

        <JobFooter url={data[0]?.job_google_link ?? DefaultApplyLink} />
      </>

    </SafeAreaView>
  )
}

export default JobDetails