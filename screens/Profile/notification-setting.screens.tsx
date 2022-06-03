import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CenteredHeaderTitle} from '../../components/shared';
import {ScreenWrapper} from '../../components/shared/common/styles';

const NotificationSetting = () => {
  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CenteredHeaderTitle
          title="Notification Settings"
          addBackText={false}
          mode="primary"
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default NotificationSetting;
