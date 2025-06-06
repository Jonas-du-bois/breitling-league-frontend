# Système d'Alias @ - Breitling League

Ce document explique comment utiliser les alias de chemins (`@`) configurés dans le projet pour simplifier les imports.

## Configuration

### Vite (vite.config.js)
```javascript
resolve: {
  alias: {
    '@': resolve(__dirname, 'src'),
    '@components': resolve(__dirname, 'src/components'),
    '@services': resolve(__dirname, 'src/services'),
    '@composables': resolve(__dirname, 'src/composables'),
    '@assets': resolve(__dirname, 'src/assets'),
    '@views': resolve(__dirname, 'src/views'),
    '@router': resolve(__dirname, 'src/router'),
    '@store': resolve(__dirname, 'src/store'),
    '@utils': resolve(__dirname, 'src/utils'),
    '@types': resolve(__dirname, 'src/types')
  }
}
```

### JavaScript Config (jsconfig.json)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"],
      "@composables/*": ["src/composables/*"],
      // ... autres alias
    }
  }
}
```

## Alias Disponibles

| Alias | Chemin réel | Utilisation |
|-------|-------------|-------------|
| `@` | `src/` | Racine du code source |
| `@components` | `src/components/` | Composants Vue |
| `@services` | `src/services/` | Services API |
| `@composables` | `src/composables/` | Composables Vue 3 |
| `@assets` | `src/assets/` | Assets statiques |
| `@views` | `src/views/` | Pages/Vues |
| `@router` | `src/router/` | Configuration du routeur |
| `@store` | `src/store/` | Store Pinia/Vuex |
| `@utils` | `src/utils/` | Utilitaires |
| `@types` | `src/types/` | Définitions TypeScript |

## Exemples d'Utilisation

### Avant (chemins relatifs)
```javascript
// ❌ Chemins relatifs complexes
import AuthService from '../../../services/auth';
import { useAuth } from '../../composables/useAuth';
import Button from '../../../components/ui/Button.vue';
import { formatDate } from '../../../utils/date';
```

### Après (alias @)
```javascript
// ✅ Chemins clairs avec alias
import { authService } from '@/services';
import { useAuth } from '@/composables';
import Button from '@/components/ui/Button.vue';
import { formatDate } from '@/utils/date';
```

## Cas d'Usage Spécifiques

### Services API
```javascript
// Import de services individuels
import { authService, chaptersService } from '@/services';

// Import de l'instance axios
import { api } from '@/services';

// Import de tous les services
import services from '@/services';
```

### Composables
```javascript
// Import de composables individuels
import { useAuth, useApi } from '@/composables';

// Import spécifique
import { useAuth } from '@/composables/useAuth';
```

### Composants
```javascript
// Dans un composant Vue
import HeaderComponent from '@/components/layout/Header.vue';
import { Button, Modal } from '@/components/ui';
```

### Assets
```javascript
// Images et styles
import logo from '@/assets/images/logo.png';
import '@/assets/styles/global.css';
```

### Utils
```javascript
// Fonctions utilitaires
import { formatCurrency, formatDate } from '@/utils';
import { validateEmail } from '@/utils/validation';
```

## Structure des Imports Recommandée

### Dans un composant Vue typique :
```javascript
<script>
// 1. Imports Vue/Vue Router/Pinia
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 2. Imports de composables (@ en premier)
import { useAuth, useApi } from '@/composables';

// 3. Imports de services
import { authService, chaptersService } from '@/services';

// 4. Imports de composants
import BaseButton from '@/components/ui/BaseButton.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

// 5. Imports d'utilitaires
import { formatDate } from '@/utils';

export default {
  name: 'MonComposant',
  components: {
    BaseButton,
    LoadingSpinner
  },
  setup() {
    // ...
  }
}
</script>
```

## Avantages

### 1. **Lisibilité**
- Chemins plus courts et plus clairs
- Pas de `../../../` compliqués
- Intention claire sur l'origine du module

### 2. **Maintenabilité**
- Déplacement de fichiers plus facile
- Pas de mise à jour manuelle des chemins relatifs
- Refactoring simplifié

### 3. **Expérience Développeur**
- Auto-complétion améliorée dans VS Code
- Navigation rapide vers les fichiers
- Moins d'erreurs de frappe

### 4. **Cohérence**
- Style d'import uniforme dans toute l'équipe
- Standards clairs pour l'organisation du code

## Bonnes Pratiques

### ✅ À faire
```javascript
// Utilisez l'alias le plus spécifique
import { useAuth } from '@/composables/useAuth';

// Groupez les imports par type
import { ref } from 'vue';
import { useAuth } from '@/composables';
import { authService } from '@/services';

// Préférez les imports nommés quand possible
import { authService, chaptersService } from '@/services';
```

### ❌ À éviter
```javascript
// N'utilisez pas de chemins relatifs pour traverser des dossiers
import { useAuth } from '../../../composables/useAuth';

// Évitez les imports par défaut quand des exports nommés existent
import services from '@/services';
const { authService } = services; // Préférez l'import nommé direct
```

## Configuration IDE

### VS Code
Le fichier `jsconfig.json` permet à VS Code de :
- Fournir l'auto-complétion pour les alias
- Naviguer rapidement vers les fichiers (Ctrl+Click)
- Afficher les erreurs d'import
- Suggérer les imports automatiquement

### Extensions Recommandées
- **Path Intellisense** : Auto-complétion des chemins
- **Auto Rename Tag** : Renommage automatique des balises
- **Vetur** ou **Volar** : Support Vue.js avancé

## Migration

Si vous avez du code existant avec des chemins relatifs, voici un script pour faciliter la migration :

```bash
# Remplacer les imports relatifs par des alias
find src -name "*.vue" -o -name "*.js" | xargs sed -i "s|from '../services/|from '@/services/|g"
find src -name "*.vue" -o -name "*.js" | xargs sed -i "s|from '../composables/|from '@/composables/|g"
find src -name "*.vue" -o -name "*.js" | xargs sed -i "s|from '../components/|from '@/components/|g"
```

## Dépannage

### Problème : "Module not found"
1. Vérifiez que le fichier `jsconfig.json` est à la racine
2. Redémarrez VS Code
3. Vérifiez que l'alias est bien configuré dans `vite.config.js`

### Problème : Auto-complétion ne fonctionne pas
1. Vérifiez la configuration dans `jsconfig.json`
2. Redémarrez le serveur de développement
3. Vérifiez que l'extension Volar/Vetur est activée
