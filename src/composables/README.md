# Composables - Breitling League

Ce dossier contient les composables Vue 3 pour faciliter l'utilisation des services API dans les composants.

## Composables Disponibles

### `useAuth`
Gestion de l'authentification avec état réactif.

**Utilisation :**
```javascript
import { useAuth } from '@/composables/useAuth';

export default {
  setup() {
    const { isAuthenticated, user, login, logout, loading, error } = useAuth();
    
    return {
      isAuthenticated,
      user,
      login,
      logout,
      loading,
      error
    };
  }
}
```

### `useApi`
Composable générique pour gérer les états de chargement et d'erreur des appels API.

**Utilisation :**
```javascript
import { useApi } from '@/composables/useApi';
import { chaptersService } from '@/services';

export default {
  setup() {
    const { execute, loading, error, data } = useApi();
    
    const loadChapters = () => {
      execute(() => chaptersService.getAll(), {
        successMessage: 'Chapitres chargés avec succès',
        errorMessage: 'Erreur lors du chargement des chapitres'
      });
    };
    
    return {
      loadChapters,
      loading,
      error,
      chapters: data
    };
  }
}
```

### `useApiList`
Spécialisé pour les listes avec pagination.

### `useNotifications`
Gestion complète des notifications avec état réactif et méthodes utilitaires.

### `useProgress`
Gestion de la progression utilisateur, statistiques et classements.

## Avantages

1. **Réactivité automatique** - Les états sont automatiquement mis à jour
2. **Gestion d'erreurs centralisée** - Cohérence dans la gestion des erreurs
3. **États de chargement** - Interface utilisateur responsive
4. **Réutilisabilité** - Code partagé entre composants
5. **Type safety** - Meilleure expérience de développement

## Bonnes Pratiques

1. **Import sélectif** - N'importez que ce dont vous avez besoin
2. **Gestion des erreurs** - Affichez toujours les erreurs à l'utilisateur
3. **Loading states** - Informez l'utilisateur des opérations en cours
4. **Cleanup** - Les composables gèrent automatiquement le nettoyage
