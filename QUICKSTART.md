# 🚀 Inicio Rápido - DuoLoveFresh

## ⚡ Configuración Express (15 minutos)

### Paso 1: Verificar Estado Actual

```bash
npm run check-firebase
```

Este comando te mostrará qué falta configurar.

---

### Paso 2: Configurar Firebase (Obligatorio)

#### A. Crear Proyecto Firebase

1. Ve a https://console.firebase.google.com/
2. Haz clic en **"Agregar proyecto"**
3. Nombre: `DuoLoveFresh`
4. Sigue el asistente

#### B. Agregar App Android

1. En Firebase Console, haz clic en ícono **Android**
2. Package name: `com.duolovefresh`
3. **Descargar `google-services.json`**
4. **Colocar en**: `android/app/google-services.json`

#### C. Habilitar Authentication

1. Firebase Console → **Authentication** → **Get started**
2. Sign-in method → Habilitar:
   - ✅ Email/Password
   - ✅ Google
   - ✅ Facebook (opcional por ahora)

---

### Paso 3: Configurar Google Sign-In

#### Obtener Web Client ID:

**Opción 1 - Desde google-services.json**:

```bash
# Busca en google-services.json:
"oauth_client": [
  {
    "client_id": "ESTE_ES_TU_WEB_CLIENT_ID.apps.googleusercontent.com",
    "client_type": 3
  }
]
```

**Opción 2 - Desde Firebase Console**:

1. Authentication → Sign-in method → Google → Configuración del SDK web

#### Actualizar código:

Abre `src/config/firebase.ts` y reemplaza:

```typescript
export const GOOGLE_WEB_CLIENT_ID =
  'TU_WEB_CLIENT_ID_AQUI.apps.googleusercontent.com';
```

---

### Paso 4: Compilar y Probar

```bash
# Limpiar build anterior
cd android
./gradlew clean
cd ..

# Compilar e instalar
npm run android
```

---

## ✅ Checklist Mínimo para Funcionar

- [ ] `google-services.json` en `android/app/`
- [ ] Email/Password habilitado en Firebase Console
- [ ] Google Sign-In habilitado en Firebase Console
- [ ] `GOOGLE_WEB_CLIENT_ID` actualizado en `src/config/firebase.ts`
- [ ] App compilada con `npm run android`

---

## 🧪 Probar Funcionalidades

### 1. Login con Email

1. Toca **"Continuar con Email"**
2. Toca **"Regístrate"**
3. Ingresa email y contraseña
4. Toca **"Crear Cuenta"**
5. ✅ Deberías entrar a la app

### 2. Login con Google

1. Cierra sesión si estás logueado
2. Toca **"Continuar con Google"**
3. Selecciona tu cuenta Google
4. ✅ Deberías entrar a la app

---

## 🔧 Configuración Opcional (Facebook)

Si quieres habilitar Facebook Login:

### 1. Crear App en Facebook

1. https://developers.facebook.com/
2. Crear app → Tipo: **Consumer**
3. Agregar producto: **Facebook Login**

### 2. Configurar Android

1. Package name: `com.duolovefresh`
2. Key hash:

```bash
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

Password: `android`

### 3. Obtener Credenciales

1. Settings → Basic → **App ID**
2. Settings → Advanced → **Client Token**

### 4. Actualizar Código

**src/config/firebase.ts**:

```typescript
export const FACEBOOK_APP_ID = 'TU_APP_ID';
export const FACEBOOK_CLIENT_TOKEN = 'TU_CLIENT_TOKEN';
```

**android/app/build.gradle** (en defaultConfig):

```gradle
resValue "string", "facebook_app_id", "TU_APP_ID"
resValue "string", "facebook_client_token", "TU_CLIENT_TOKEN"
```

### 5. Conectar con Firebase

1. Firebase Console → Authentication → Sign-in method → Facebook
2. Ingresa **App ID** y **App Secret** de Facebook
3. Copia el **OAuth redirect URI**
4. Facebook Developers → Facebook Login → Settings
5. Pega el URI en **Valid OAuth Redirect URIs**

---

## 📱 Comandos Útiles

```bash
# Verificar configuración
npm run check-firebase

# Compilar
npm run android

# Ver logs
npx react-native log-android

# Limpiar caché
npm start -- --reset-cache

# Limpiar build
cd android && ./gradlew clean && cd ..
```

---

## 🐛 Problemas Comunes

### Error: "google-services.json not found"

**Solución**: Descarga el archivo de Firebase Console y colócalo en `android/app/`

### Error: "Google Sign-In failed"

**Solución**:

1. Verifica que `GOOGLE_WEB_CLIENT_ID` sea correcto
2. El archivo `google-services.json` debe estar en `android/app/`
3. Limpia y reconstruye: `cd android && ./gradlew clean && cd ..`

### Error: "Email already in use"

**Solución**: El email ya está registrado, usa "Iniciar Sesión" en vez de "Crear Cuenta"

### App no compila

**Solución**:

```bash
# Limpiar todo
cd android
./gradlew clean
cd ..
rm -rf node_modules
npm install
npm run android
```

---

## 📚 Documentación Completa

- **FIREBASE_SETUP.md** - Guía detallada de Firebase
- **ROADMAP.md** - Próximas funcionalidades
- **CHANGELOG.md** - Resumen de cambios
- **README.md** - Documentación del proyecto

---

## 🎯 Próximos Pasos Después de Configurar

1. ✅ Implementar Firestore para base de datos
2. ✅ Sistema de vinculación de parejas (códigos de sala)
3. ✅ Pizarra compartida funcional con SVG
4. ✅ Chat en tiempo real
5. ✅ Persistencia de sesión mejorada

Ver **ROADMAP.md** para más detalles.

---

## ✨ Estado Actual

```
📦 Dependencias: ✅ Instaladas
🔧 Configuración Android: ✅ Lista
🔑 Firebase Auth: ⚠️  Pendiente configuración
📱 Compilación: ✅ Lista para probar
```

**Tiempo estimado para estar funcional**: 15-20 minutos

---

¡Listo para comenzar! 🚀

Ejecuta `npm run check-firebase` para ver qué falta configurar.
