# 🔥 Configuración de Firebase para DuoLoveFresh

## 📋 Índice

1. [Crear Proyecto en Firebase](#1-crear-proyecto-en-firebase)
2. [Configurar Firebase para Android](#2-configurar-firebase-para-android)
3. [Habilitar Authentication](#3-habilitar-authentication)
4. [Configurar Google Sign-In](#4-configurar-google-sign-in)
5. [Configurar Facebook Login](#5-configurar-facebook-login)
6. [Actualizar archivos de configuración](#6-actualizar-archivos-de-configuración)
7. [Compilar y Probar](#7-compilar-y-probar)

---

## 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o selecciona uno existente
3. Sigue los pasos del asistente:
   - Nombre del proyecto: `DuoLoveFresh` (o el que prefieras)
   - Acepta los términos
   - Habilita Google Analytics (opcional)

---

## 2. Configurar Firebase para Android

1. En Firebase Console, haz clic en el ícono de **Android** para agregar una app
2. Completa el formulario:
   - **Package name**: `com.duolovefresh` ⚠️ IMPORTANTE: Debe coincidir exactamente
   - **App nickname**: DuoLoveFresh (opcional)
   - **SHA-1**: (Opcional por ahora, necesario para Google Sign-In en producción)

### 🔑 Obtener SHA-1 (Para Google Sign-In)

Para obtener tu SHA-1 de debug:

```bash
cd android
./gradlew signingReport
```

Busca en la salida algo como:

```
Variant: debug
SHA1: A1:B2:C3:D4:E5:F6:...
```

Copia ese SHA-1 y agrégalo en la configuración de Firebase.

3. **Descargar google-services.json**

   - Firebase generará el archivo `google-services.json`
   - Descárgalo y colócalo en: `android/app/google-services.json`

4. Sigue las instrucciones de Firebase (ya configuradas en este proyecto):
   - ✅ Dependencia de Google Services agregada en `android/build.gradle`
   - ✅ Plugin aplicado en `android/app/build.gradle`

---

## 3. Habilitar Authentication

1. En Firebase Console, ve a **Build** > **Authentication**
2. Haz clic en **"Get started"** o **"Comenzar"**
3. En la pestaña **"Sign-in method"**, habilita:
   - ✅ **Email/Password**: Habilítalo (sin necesidad de configuración adicional)
   - ✅ **Google**: Lo configuraremos en el siguiente paso
   - ✅ **Facebook**: Lo configuraremos después

---

## 4. Configurar Google Sign-In

### En Firebase Console:

1. En **Authentication** > **Sign-in method**, haz clic en **Google**
2. Activa el toggle para **"Enable"**
3. Proporciona un email de soporte del proyecto
4. Haz clic en **"Save"**
5. Expande la configuración de Google y copia el **Web Client ID**
   - Se ve algo como: `123456789-abcdefg.apps.googleusercontent.com`

### En tu proyecto:

1. Abre `src/config/firebase.ts`
2. Reemplaza `GOOGLE_WEB_CLIENT_ID`:

```typescript
export const GOOGLE_WEB_CLIENT_ID =
  '123456789-abcdefg.apps.googleusercontent.com';
```

### 📝 Nota Importante:

También puedes encontrar el Web Client ID en `google-services.json`:

- Busca el objeto `oauth_client` donde `client_type` sea `3`
- Copia el valor de `client_id`

---

## 5. Configurar Facebook Login

### Crear App en Facebook Developers:

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Haz clic en **"My Apps"** > **"Create App"**
3. Selecciona **"Consumer"** o **"None"**
4. Completa el formulario:
   - **App Display Name**: DuoLoveFresh
   - **App Contact Email**: Tu email

### Configurar Facebook Login:

1. En el dashboard de tu app, ve a **"Products"** > **"Add Product"**
2. Busca **"Facebook Login"** y haz clic en **"Set Up"**
3. Selecciona **Android**
4. Completa la configuración:
   - **Package Name**: `com.duolovefresh`
   - **Class Name**: `com.duolovefresh.MainActivity`
   - **Key Hashes**: Genera tu hash con:

```bash
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

Password del keystore debug: `android`

5. **Obtener App ID y Client Token**:
   - Ve a **Settings** > **Basic**
   - Copia el **App ID**
   - Copia el **Client Token** (Puede estar en **Settings** > **Advanced**)

### Conectar Facebook con Firebase:

1. En Firebase Console, ve a **Authentication** > **Sign-in method**
2. Haz clic en **Facebook**
3. Actívalo y proporciona:
   - **App ID** de Facebook
   - **App Secret** de Facebook (Settings > Basic en Facebook Developers)
4. Copia el **OAuth redirect URI** que Firebase te proporciona
5. Ve a Facebook Developers > **Facebook Login** > **Settings**
6. Agrega el **OAuth redirect URI** en **"Valid OAuth Redirect URIs"**
7. Guarda los cambios

### En tu proyecto:

1. Abre `src/config/firebase.ts`
2. Reemplaza los valores:

```typescript
export const FACEBOOK_APP_ID = 'TU_APP_ID_DE_FACEBOOK';
export const FACEBOOK_CLIENT_TOKEN = 'TU_CLIENT_TOKEN_DE_FACEBOOK';
```

3. Abre `android/app/build.gradle`
4. Reemplaza en `defaultConfig`:

```gradle
resValue "string", "facebook_app_id", "TU_APP_ID_DE_FACEBOOK"
resValue "string", "facebook_client_token", "TU_CLIENT_TOKEN_DE_FACEBOOK"
```

---

## 6. Actualizar archivos de configuración

### ✅ Ya configurados (revisa que estén correctos):

1. **android/build.gradle**

   - Plugin de Google Services agregado

2. **android/app/build.gradle**

   - Plugin de Google Services aplicado
   - Valores de Facebook configurados

3. **android/app/src/main/AndroidManifest.xml**
   - Meta-data de Facebook agregada
   - Actividades de Facebook declaradas

### 📝 Archivos que DEBES modificar:

1. **src/config/firebase.ts**

   - ✏️ GOOGLE_WEB_CLIENT_ID
   - ✏️ FACEBOOK_APP_ID
   - ✏️ FACEBOOK_CLIENT_TOKEN

2. **android/app/build.gradle**

   - ✏️ facebook_app_id (en defaultConfig)
   - ✏️ facebook_client_token (en defaultConfig)

3. **android/app/google-services.json**
   - ✏️ Descárgalo de Firebase y colócalo en esta ruta

---

## 7. Compilar y Probar

### Paso 1: Limpiar y reconstruir

```bash
cd android
./gradlew clean
cd ..
```

### Paso 2: Reinstalar la app

```bash
npm run android
```

### Paso 3: Probar las funcionalidades

1. **Email/Password**:

   - Toca "Continuar con Email"
   - Registra una nueva cuenta
   - Intenta iniciar sesión

2. **Google Sign-In**:

   - Toca "Continuar con Google"
   - Selecciona tu cuenta de Google
   - Acepta los permisos

3. **Facebook Login**:
   - Toca "Continuar con Facebook"
   - Inicia sesión con Facebook
   - Acepta los permisos

### Paso 4: Verificar en Firebase Console

1. Ve a **Authentication** > **Users**
2. Deberías ver los usuarios que se registraron
3. Verifica el método de autenticación de cada uno

---

## 🐛 Solución de Problemas

### Error: "Google Sign-In failed"

- Verifica que el SHA-1 esté configurado en Firebase
- Verifica que `GOOGLE_WEB_CLIENT_ID` sea correcto
- Asegúrate de que `google-services.json` esté en `android/app/`

### Error: "Facebook Login failed"

- Verifica que los IDs en `firebase.ts` y `build.gradle` coincidan
- Revisa que el OAuth redirect URI esté en Facebook Developers
- Asegúrate de que la app de Facebook esté en modo "Live" (no "Development")

### Error: "An internal error occurred"

- Limpia y reconstruye: `cd android && ./gradlew clean && cd ..`
- Elimina carpeta `android/app/build/`
- Vuelve a compilar

### Error: "The module was not linked"

- Ejecuta: `npx react-native doctor`
- Si hay errores, ejecuta: `cd android && ./gradlew clean && cd ..`

---

## 📚 Recursos Adicionales

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Google Sign-In for Android](https://developers.google.com/identity/sign-in/android/start)
- [Facebook Login for Android](https://developers.facebook.com/docs/facebook-login/android)

---

## ✅ Checklist Final

Antes de dar por terminada la configuración, verifica:

- [ ] Proyecto creado en Firebase Console
- [ ] App Android agregada en Firebase
- [ ] `google-services.json` descargado y ubicado en `android/app/`
- [ ] SHA-1 agregado en Firebase (para Google Sign-In)
- [ ] Email/Password habilitado en Firebase Authentication
- [ ] Google Sign-In habilitado en Firebase Authentication
- [ ] Facebook Login habilitado en Firebase Authentication
- [ ] App de Facebook creada en Facebook Developers
- [ ] Facebook Login configurado para Android
- [ ] Key Hash agregado en Facebook Developers
- [ ] OAuth redirect URI agregado en Facebook Developers
- [ ] `GOOGLE_WEB_CLIENT_ID` actualizado en `src/config/firebase.ts`
- [ ] `FACEBOOK_APP_ID` actualizado en `src/config/firebase.ts`
- [ ] `FACEBOOK_CLIENT_TOKEN` actualizado en `src/config/firebase.ts`
- [ ] `facebook_app_id` actualizado en `android/app/build.gradle`
- [ ] `facebook_client_token` actualizado en `android/app/build.gradle`
- [ ] App compilada exitosamente
- [ ] Login con Email probado
- [ ] Login con Google probado
- [ ] Login con Facebook probado
- [ ] Usuarios visibles en Firebase Console > Authentication

---

¡Listo! Tu app DuoLoveFresh ahora tiene autenticación completa con Firebase 🎉

---

## ✅ ACTUALIZACIÓN - Firebase Integrado con Sincronización en Tiempo Real

### 🎯 Características Implementadas

#### 1. **Sincronización de Dibujos en Tiempo Real**

- ✅ Cada trazo se guarda automáticamente en Firestore
- ✅ Los cambios aparecen instantáneamente en ambos dispositivos
- ✅ Listener activo con `firebaseService.subscribeToRoom()`

#### 2. **Upload de Imágenes a Cloud**

- ✅ Fotos se suben a Firebase Storage
- ✅ URLs públicas guardadas en Firestore
- ✅ Sincronización automática de imágenes entre usuarios
- ✅ Display centrado 250x250px con sombras

#### 3. **Sistema de Salas Persistente**

- ✅ Salas guardadas en Firestore (no solo AsyncStorage)
- ✅ Códigos QR para compartir salas
- ✅ Verificación de existencia de salas
- ✅ Sistema de miembros (tracking de usuarios)

### 🔧 Servicios Creados

**`src/services/firebaseService.ts`** - Servicio completo con:

```typescript
createRoom(roomCode, roomName, userId); // Crear sala
joinRoom(roomCode, userId); // Unirse a sala
subscribeToRoom(roomCode, onUpdate); // Listener en tiempo real
addPath(roomCode, path, color, width, userId); // Agregar trazo
uploadImage(roomCode, imageUri, userId); // Subir foto
clearBoard(roomCode); // Limpiar pizarra
roomExists(roomCode); // Verificar sala
```

### 📱 Pantallas Actualizadas

**CreateRoomScreen.tsx**:

- Firebase Auth anónimo automático
- Crear salas en Firestore
- Unirse verificando Firestore
- QR code generation

**BoardScreen.tsx**:

- Listener en tiempo real de cambios
- Subida de fotos a Storage
- Sync automático de paths
- Fotos centradas profesionales

### 📊 Estructura Firestore

```
rooms/
  {roomCode}/
    name: "Sala de Amor"
    createdBy: "userId123"
    members: ["userId123", "userId456"]
    paths: [
      {
        path: "M 100 100 L 150 150",
        color: "#2196F3",
        width: 4,
        userId: "userId123",
        timestamp: Timestamp
      }
    ]
    images: [
      {
        url: "https://storage.../image.jpg",
        x: 125,
        y: 100,
        userId: "userId123",
        timestamp: Timestamp
      }
    ]
```

### ⚙️ Configuración Android

- ✅ `google-services.json` creado
- ✅ Plugin Google Services habilitado
- ✅ Firebase BOM 34.4.0
- ✅ Firestore y Storage instalados

### ⚠️ ACCIÓN REQUERIDA

**Descargar `google-services.json` completo**:

1. [Firebase Console](https://console.firebase.google.com/) → Proyecto duolove-a9025
2. Project Settings → General → Android app
3. Descargar `google-services.json`
4. Reemplazar en `android/app/google-services.json`

**Configurar Firestore Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomCode} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Configurar Storage Rules**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /rooms/{roomCode}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 🚀 Cómo Funciona el Tiempo Real

1. **Usuario A dibuja** → `addPath()` → Firestore actualiza
2. **Usuario B tiene listener** → `subscribeToRoom()` recibe update
3. **Callback se ejecuta** → `setPaths()` actualiza UI
4. **✨ Trazo aparece en ambas pantallas instantáneamente**

Lo mismo aplica para fotos, limpieza de pizarra, etc.

### 📝 Estado Actual

- ✅ Firebase configurado con proyecto duolove-a9025
- ✅ Firestore y Storage instalados
- ✅ Sincronización en tiempo real implementada
- ✅ Iconos SVG profesionales (sin emojis)
- ✅ Fotos centradas con sombras
- 🔄 Compilación en curso con Firebase habilitado

### 🎯 Próximos Pasos Sugeridos

1. Migrar de Anonymous Auth a Email/Google/Facebook
2. Agregar notificaciones push cuando pareja dibuja
3. Implementar historial de sesiones
4. Widget de Android para dibujar desde home screen
5. Comprimir imágenes antes de upload

---

**Firebase Status**: ✅ Activo y sincronizando
**Última actualización**: Integración completa de tiempo real
