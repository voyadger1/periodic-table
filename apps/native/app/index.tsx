import { Alert, Platform } from 'react-native';
import WebView from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import { useRef } from 'react';

export default function Native() {
  const webViewRef = useRef(null);

  const notifyWebViewAboutAd = (reward: any) => {
    if (webViewRef.current) {
      // Внедряем и выполняем JavaScript-код на веб-странице
      // @ts-ignore
      webViewRef.current.injectJavaScript(`
        // Вызываем глобальную функцию, которая должна быть определена на веб-странице
        if (window.onAdCompleted) {
          window.onAdCompleted(${JSON.stringify(reward)});
        }
        true; // Эта строка необходима для корректной работы injectJavaScript на iOS
      `);
    }
  };

  const handleMessage = (event: any) => {
    try {
      // Сообщение приходит как строка, поэтому парсим JSON
      const message = JSON.parse(event.nativeEvent.data);

      // Проверяем тип действия
      if (message.type === 'SHOW_AD') {
        console.log('Получен запрос на показ рекламы');
        Alert.alert(
          'Подтверждение', // Заголовок
          `Вы уверены, что хотите посмотреть рекламу? ${__DEV__}`, // Сообщение
          [
            {
              text: 'Отмена',
              onPress: () => console.log('Действие отменено'),
              style: 'cancel',
            },
            {
              text: 'ОК',
              onPress: () => {
                // Здесь выполняется действие при подтверждении
                console.log('Действие подтверждено!');
                notifyWebViewAboutAd({ earned: true, amount: 10 });
              },
            },
          ],
          { cancelable: false } // (опционально) запрещает закрытие по нажатию вне диалога
        );
      }
    } catch (error) {
      console.error('Ошибка при обработке сообщения:', error);
    }
  };

  const getLocalWebPath = () => {
    // Для iOS файлы лежат в папке assets, доступной по file://
    if (Platform.OS === 'ios') {
      return `${FileSystem.Directory}assets/web/index.html`;
    } else if (Platform.OS === 'android') {
      // Для Android можно использовать asset:// или file://
      return 'file:///android_asset/web/index.html';
    }
    return '';
  };

  const getAppURI = () => {
    if (__DEV__) {
      return 'http://192.168.55.43:5173/';
    }
    return getLocalWebPath();
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: getAppURI() }}
      onMessage={handleMessage}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      mixedContentMode="always"
      originWhitelist={['*']}
      // Для отладки добавь обработчик ошибок
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
      onConsoleMessage={(event: any) => {
        console.log('WebView console:', event.message);
      }}
    />
  );
}
