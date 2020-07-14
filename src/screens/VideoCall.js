import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

import {JITSI_SERVER} from '../constants/credentials';

const VideoCall = () => {
  const onConferenceTerminated = (nativeEvent) => {};
  const onConferenceJoined = (nativeEvent) => {};
  const onConferenceWillJoin = (nativeEvent) => {};

  useEffect(() => {
    setTimeout(() => {
      const url = `${JITSI_SERVER}/deluxan03`;
      const userInfo = {
        displayName: 'Deluxan',
        email: 'deluxan_m@outlook.com',
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
      JitsiMeet.call(url, userInfo);
    }, 1000);
  }, []);

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <JitsiMeetView
        onConferenceTerminated={onConferenceTerminated}
        onConferenceJoined={onConferenceJoined}
        onConferenceWillJoin={onConferenceWillJoin}
        style={{flex: 1, height: '100%', width: '100%'}}
      />
    </View>
  );
};

export default VideoCall;
