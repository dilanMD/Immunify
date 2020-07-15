import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

import {JITSI_SERVER, JITSI_ROOM} from '../constants/credentials';

const VideoCall = () => {
  // const onConferenceTerminated = (nativeEvent) => {
  //   console.log(nativeEvent);
  // };
  // const onConferenceJoined = (nativeEvent) => {
  //   console.log(nativeEvent);
  // };
  // const onConferenceWillJoin = (nativeEvent) => {
  //   console.log(nativeEvent);
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     const url = `${JITSI_SERVER}/deluxan03`;
  //     const userInfo = {
  //       displayName: 'Deluxan',
  //       email: 'deluxan_m@outlook.com',
  //       avatar: 'https:/gravatar.com/avatar/abc123',
  //     };
  //     JitsiMeet.call(url, userInfo);
  //   }, 1000);
  // }, []);

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       height: '100%',
  //       width: '100%',
  //     }}>
  //     <JitsiMeetView
  //       onConferenceTerminated={(e) => onConferenceTerminated(e)}
  //       onConferenceJoined={(e) => onConferenceJoined(e)}
  //       onConferenceWillJoin={(e) => onConferenceWillJoin(e)}
  //     />
  //   </View>
  // );

  return (
    <View style={{flex: 1}}>
      <WebView
        userAgent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0"
        source={{uri: `${JITSI_SERVER}/${JITSI_ROOM}`}}
        style={{flex: 1}}></WebView>
    </View>
  );
};

export default VideoCall;
