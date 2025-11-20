# 💕 DuoLoveFresh

Una aplicación React Native para parejas que quieren conectar, compartir y crear momentos especiales juntos.

## 📱 Características

### ✅ Implementadas

- **Onboarding**: 5 slides de presentación con diseño atractivo
- **Autenticación múltiple**:
  - 🔐 Email y contraseña (registro e inicio de sesión)
  - 🔍 Google Sign-In
  - 📘 Facebook Login
- **Pizarra compartida**: Espacio SVG para dibujar y compartir
- **Configuración**: Panel de ajustes personalizable
- **Navegación personalizada**: Sin dependencias de React Navigation

### 🚧 Próximamente

- Sincronización en tiempo real entre parejas
- Chat integrado
- Calendario compartido
- Galería de fotos
- Notificaciones push

## 🛠️ Stack Tecnológico

- **Framework**: React Native 0.73.0 (sin Expo)
- **Lenguaje**: TypeScript
- **Backend**: Firebase
  - Authentication (Email, Google, Facebook)
  - Firestore (próximamente)
  - Storage (próximamente)
- **Dependencias principales**:
  - `@react-native-firebase/app`
  - `@react-native-firebase/auth`
  - `@react-native-google-signin/google-signin`
  - `react-native-fbsdk-next`
  - `@react-native-async-storage/async-storage`
  - `react-native-svg`

## 📦 Configuración del Proyecto

### Build Tools

- AGP: 8.3.0
- Gradle: 8.4
- Kotlin: 1.8.0
- NDK: 25.1.8937393
- Min SDK: 21
- Target SDK: 34
- Compile SDK: 34

### Package

- **Package name**: `com.duolovefresh`
- **Bundle Identifier**: `com.duolovefresh` (iOS)

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 18
- Java JDK 17
- Android Studio (para Android)
- Xcode (para iOS, solo macOS)

### Pasos

1. **Clonar el repositorio**

```bash
git clone <tu-repositorio>
cd DuoLoveFresh
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar Firebase**

Sigue la guía completa en [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

**Resumen rápido**:

- Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
- Descarga `google-services.json` y colócalo en `android/app/`
- Configura Authentication (Email, Google, Facebook)
- Actualiza las credenciales en `src/config/firebase.ts`
- Actualiza los valores de Facebook en `android/app/build.gradle`

4. **Instalar pods de iOS** (solo macOS)

```bash
cd ios
pod install
cd ..
```

## 🏃‍♂️ Ejecutar la App

### Android

```bash
npm run android
```

O manualmente:

```bash
npx react-native run-android
```

### iOS (solo macOS)

```bash
npm run ios
```

O manualmente:

```bash
npx react-native run-ios
```

### Metro Bundler

Si el Metro Bundler no inicia automáticamente:

```bash
npm start
```

## 📂 Estructura del Proyecto

```
DuoLoveFresh/
├── android/                  # Código nativo Android
├── ios/                      # Código nativo iOS
├── src/
│   ├── assets/              # Imágenes, fuentes, etc.
│   ├── config/
│   │   └── firebase.ts      # Configuración de Firebase
│   ├── navigation/
│   │   └── MainTabNavigator.tsx
│   ├── screens/
│   │   ├── OnboardingScreen.tsx    # Pantalla de bienvenida
│   │   ├── LoginScreen.tsx         # Pantalla de login
│   │   ├── EmailAuthScreen.tsx     # Registro/Login con email
│   │   ├── MainApp.tsx             # Navegación principal
│   │   ├── BoardScreen.tsx         # Pizarra compartida
│   │   └── SettingsScreen.tsx      # Configuración
│   └── services/
│       └── authService.ts   # Servicio de autenticación
├── App.tsx                  # Componente raíz
├── index.js                 # Punto de entrada
└── package.json

```

## 🔑 Configuración de Firebase

### Archivos que debes modificar:

1. **src/config/firebase.ts**

```typescript
export const GOOGLE_WEB_CLIENT_ID =
  'tu-web-client-id.apps.googleusercontent.com';
export const FACEBOOK_APP_ID = 'tu-facebook-app-id';
export const FACEBOOK_CLIENT_TOKEN = 'tu-facebook-client-token';
```

2. **android/app/build.gradle**

```gradle
defaultConfig {
    // ...
    resValue "string", "facebook_app_id", "TU_FACEBOOK_APP_ID"
    resValue "string", "facebook_client_token", "TU_FACEBOOK_CLIENT_TOKEN"
}
```

3. **android/app/google-services.json**

- Descárgalo de Firebase Console y colócalo aquí

Ver guía completa: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## 🧪 Testing

```bash
npm test
```

## 🐛 Debugging

### Limpiar caché

```bash
# Limpiar caché de Metro
npx react-native start --reset-cache

# Limpiar build de Android
cd android
./gradlew clean
cd ..
```

### Logs en tiempo real

**Android**:

```bash
npx react-native log-android
```

**iOS**:

```bash
npx react-native log-ios
```

## 📱 Compilar para Producción

### Android

1. **Generar keystore** (solo la primera vez):

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configurar signing** en `android/app/build.gradle`

3. **Compilar AAB**:

```bash
cd android
./gradlew bundleRelease
```

El AAB estará en: `android/app/build/outputs/bundle/release/app-release.aab`

### iOS

1. Abre el proyecto en Xcode
2. Selecciona Generic iOS Device
3. Product > Archive
4. Distribuye a App Store Connect

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y confidencial.

## 👥 Autores

- Tu Nombre - Desarrollo inicial

## 🙏 Agradecimientos

- React Native community
- Firebase team
- Todos los contribuidores de las librerías utilizadas

---

Hecho con ❤️ para parejas que quieren mantenerse conectadas
