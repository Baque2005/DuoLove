#!/usr/bin/env node

/**
 * Script de verificación de configuración de Firebase
 * Ejecuta: node check-firebase-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verificando configuración de Firebase Authentication...\n');

let errors = [];
let warnings = [];
let success = [];

// 1. Verificar google-services.json
const googleServicesPath = path.join(
  __dirname,
  'android',
  'app',
  'google-services.json',
);
if (fs.existsSync(googleServicesPath)) {
  success.push('✅ google-services.json encontrado');

  try {
    const googleServices = JSON.parse(
      fs.readFileSync(googleServicesPath, 'utf8'),
    );
    const packageName =
      googleServices.client[0].client_info.android_client_info.package_name;

    if (packageName === 'com.duolovefresh') {
      success.push('✅ Package name correcto en google-services.json');
    } else {
      errors.push(
        `❌ Package name incorrecto: ${packageName} (esperado: com.duolovefresh)`,
      );
    }
  } catch (e) {
    errors.push('❌ Error al leer google-services.json');
  }
} else {
  errors.push('❌ google-services.json NO encontrado en android/app/');
}

// 2. Verificar src/config/firebase.ts
const firebaseConfigPath = path.join(__dirname, 'src', 'config', 'firebase.ts');
if (fs.existsSync(firebaseConfigPath)) {
  const content = fs.readFileSync(firebaseConfigPath, 'utf8');

  if (
    content.includes('TU_WEB_CLIENT_ID') ||
    content.includes('TU_API_KEY_AQUI')
  ) {
    warnings.push('⚠️  src/config/firebase.ts contiene valores de placeholder');
    warnings.push(
      '   Actualiza GOOGLE_WEB_CLIENT_ID, FACEBOOK_APP_ID y FACEBOOK_CLIENT_TOKEN',
    );
  } else {
    success.push('✅ src/config/firebase.ts configurado');
  }
} else {
  errors.push('❌ src/config/firebase.ts NO encontrado');
}

// 3. Verificar android/app/build.gradle
const buildGradlePath = path.join(__dirname, 'android', 'app', 'build.gradle');
if (fs.existsSync(buildGradlePath)) {
  const content = fs.readFileSync(buildGradlePath, 'utf8');

  if (content.includes('com.google.gms.google-services')) {
    success.push('✅ Plugin de Google Services aplicado en build.gradle');
  } else {
    errors.push('❌ Plugin de Google Services NO encontrado en build.gradle');
  }

  if (content.includes('facebook_app_id')) {
    if (content.includes('YOUR_FACEBOOK_APP_ID')) {
      warnings.push('⚠️  Facebook App ID es un placeholder en build.gradle');
    } else {
      success.push('✅ Facebook App ID configurado en build.gradle');
    }
  } else {
    errors.push('❌ Facebook App ID NO configurado en build.gradle');
  }
} else {
  errors.push('❌ android/app/build.gradle NO encontrado');
}

// 4. Verificar android/build.gradle
const rootBuildGradlePath = path.join(__dirname, 'android', 'build.gradle');
if (fs.existsSync(rootBuildGradlePath)) {
  const content = fs.readFileSync(rootBuildGradlePath, 'utf8');

  if (content.includes('google-services')) {
    success.push('✅ Dependencia de Google Services en android/build.gradle');
  } else {
    errors.push(
      '❌ Dependencia de Google Services NO encontrada en android/build.gradle',
    );
  }
} else {
  errors.push('❌ android/build.gradle NO encontrado');
}

// 5. Verificar AndroidManifest.xml
const manifestPath = path.join(
  __dirname,
  'android',
  'app',
  'src',
  'main',
  'AndroidManifest.xml',
);
if (fs.existsSync(manifestPath)) {
  const content = fs.readFileSync(manifestPath, 'utf8');

  if (content.includes('com.facebook.sdk.ApplicationId')) {
    success.push('✅ Meta-data de Facebook en AndroidManifest.xml');
  } else {
    errors.push(
      '❌ Meta-data de Facebook NO encontrada en AndroidManifest.xml',
    );
  }

  if (content.includes('com.facebook.FacebookActivity')) {
    success.push('✅ FacebookActivity declarada en AndroidManifest.xml');
  } else {
    errors.push('❌ FacebookActivity NO declarada en AndroidManifest.xml');
  }
} else {
  errors.push('❌ AndroidManifest.xml NO encontrado');
}

// 6. Verificar package.json
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const deps = packageJson.dependencies || {};

  const requiredPackages = {
    '@react-native-firebase/app': 'Firebase App',
    '@react-native-firebase/auth': 'Firebase Auth',
    '@react-native-google-signin/google-signin': 'Google Sign-In',
    'react-native-fbsdk-next': 'Facebook SDK',
  };

  Object.entries(requiredPackages).forEach(([pkg, name]) => {
    if (deps[pkg]) {
      success.push(`✅ ${name} instalado (${deps[pkg]})`);
    } else {
      errors.push(`❌ ${name} NO instalado (${pkg})`);
    }
  });
} else {
  errors.push('❌ package.json NO encontrado');
}

// 7. Verificar archivos de servicio
const authServicePath = path.join(
  __dirname,
  'src',
  'services',
  'authService.ts',
);
if (fs.existsSync(authServicePath)) {
  success.push('✅ authService.ts encontrado');
} else {
  errors.push('❌ authService.ts NO encontrado');
}

// 8. Verificar EmailAuthScreen
const emailAuthScreenPath = path.join(
  __dirname,
  'src',
  'screens',
  'EmailAuthScreen.tsx',
);
if (fs.existsSync(emailAuthScreenPath)) {
  success.push('✅ EmailAuthScreen.tsx encontrado');
} else {
  warnings.push('⚠️  EmailAuthScreen.tsx NO encontrado');
}

// Mostrar resultados
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (success.length > 0) {
  console.log('✅ ÉXITOS:\n');
  success.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  ADVERTENCIAS:\n');
  warnings.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

if (errors.length > 0) {
  console.log('❌ ERRORES:\n');
  errors.forEach(msg => console.log(`   ${msg}`));
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Resumen
const total = success.length + warnings.length + errors.length;
const percentage = ((success.length / total) * 100).toFixed(0);

console.log(
  `📊 RESUMEN: ${success.length}/${total} verificaciones pasadas (${percentage}%)\n`,
);

if (errors.length === 0 && warnings.length === 0) {
  console.log('🎉 ¡Configuración completa! Puedes compilar la app.\n');
  console.log('   Ejecuta: npm run android\n');
} else if (errors.length === 0) {
  console.log('✅ No hay errores críticos, pero revisa las advertencias.\n');
  console.log('📖 Consulta FIREBASE_SETUP.md para más detalles.\n');
} else {
  console.log('❌ Hay errores que debes corregir antes de compilar.\n');
  console.log('📖 Consulta FIREBASE_SETUP.md para instrucciones detalladas.\n');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

process.exit(errors.length > 0 ? 1 : 0);
