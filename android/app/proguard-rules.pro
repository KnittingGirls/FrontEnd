# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# OkHttp 및 Okio 관련 보호
-keep class okhttp3.** { *; }
-keep class okio.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**

# React Native fetch 및 네이티브 모듈 보호
-keep class com.facebook.react.modules.network.** { *; }
-keep class com.facebook.react.modules.core.** { *; }

# JavaScriptInterface 보호
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Add any project specific keep options here:
# expo-file-system
-keep class expo.modules.filesystem.** { *; }
# expo-sharing
-keep class expo.modules.sharing.** { *; }