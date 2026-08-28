# Запуск и сборка

## Android

### Установка SDK и подготовка

В Android Studio в разделе `settings / Languages & Frameworks / Android SDK`:

- На вкладке **SDK Platforms** выбрать и установить нужные SDK
- На вкладке **SDK Tools** выбрать NDK (Side by side) v27.1.12297006

В файле `~/.zshrc` необходимо прописать следующие строки:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
```

Если на компьютере установлено несколько версий JDK, то нужна именно v17. В этом же файле добавить строку:

```
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

Открыть файл можно командой:

```shell
open ~/.zshrc
```

### Запуск в dev режиме

Для запуска с нужными настройками SDK и JDK необходимо применять файл переменных окружение командой:

```shell
source ~/.zshrc
```

_Во всех скриптах это команда прописана спереди_

Для запуска в dev режиме необходимо выполнить скрипт:

```
"android:dev": "source ~/.zshrc && expo run:android",
```

_При первом запуске будет долгая сборка, установка пакетов и прочее, последующие запуски будут быстрее_

Этот скрипт создаст папку `android`. Dev версия приложения будет лежать в папке `android/app/build/outputs/apk/debug/app-debug.apk`

Для отчистки кеша можно выполнить скрипт:

```
"android:clean": "source ~/.zshrc && cd android && ./gradlew clean && cd ..",
```

### Сборка релиза

#### Минификация проекта

В файле `android/app/build.gradle` настроить следующие параметры:

```
buildTypes {
    release {
        // ...
        minifyEnabled true
        shrinkResources true
        // ...
    }
}
```

В том же файле `android/app/build.gradle` добавить блок `splits`

```
android {
    // ...
    splits {
        abi {
            enable true
            reset()
            include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
            universalApk false // Отключаем создание универсального APK
        }
    }
}
```
