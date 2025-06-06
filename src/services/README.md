# Services API - Breitling League

Cette documentation décrit l'architecture des services API pour l'application Breitling League.

## Structure des Services

Les services sont organisés de manière modulaire, chaque service gérant un domaine spécifique de l'application :

### Services Disponibles

| Service | Description | Fichier |
|---------|-------------|---------|
| `authService` | Authentification (login, register, logout) | `auth.js` |
| `chaptersService` | Gestion des chapitres et unités | `chapters.js` |
| `discoveriesService` | Explorations de chapitres (théorie + quiz) | `discoveries.js` |
| `eventsService` | Événements spéciaux Breitling League | `events.js` |
| `lotteryTicketsService` | Tickets de loterie et bonus | `lotteryTickets.js` |
| `notificationsService` | Notifications utilisateur | `notifications.js` |
| `noveltiesService` | Nouveautés avec bonus temps limité | `novelties.js` |
| `progressService` | Progression et statistiques | `progress.js` |
| `quizService` | Sessions de quiz et réponses | `quiz.js` |
| `remindersService` | Quiz de révision automatiques | `reminders.js` |
| `userService` | Gestion du profil utilisateur | `user.js` |
| `weeklyChallengesService` | Défis hebdomadaires | `weeklyChallenges.js` |

## Utilisation

### Import des Services

#### Import individuel (recommandé)
```javascript
import { authService, chaptersService } from '@/services';

// Utilisation
const chapters = await chaptersService.getAll();
const user = await authService.getMe();
```

#### Import de l'objet complet
```javascript
import services from '@/services';

// Utilisation
const chapters = await services.chapters.getAll();
const user = await services.auth.getMe();
```

#### Import de l'instance axios de base
```javascript
import { api } from '@/services';

// Pour des requêtes personnalisées
const response = await api.get('/custom-endpoint');
```

### Exemples d'Utilisation

#### Authentification
```javascript
import { authService } from '@/services';

// Connexion
try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  
  // Stocker le token
  authService.setToken(response.data.token);
} catch (error) {
  console.error('Erreur de connexion:', error);
}

// Vérifier l'authentification
if (authService.isAuthenticated()) {
  const user = await authService.getMe();
}
```

#### Gestion des Chapitres
```javascript
import { chaptersService } from '@/services';

// Récupérer tous les chapitres
const chapters = await chaptersService.getAll();

// Récupérer un chapitre spécifique
const chapter = await chaptersService.getById(1);
```

#### Quiz et Progression
```javascript
import { quizService, progressService } from '@/services';

// Démarrer un quiz
const session = await quizService.start({
  chapter_id: 1,
  type: 'discovery'
});

// Soumettre les réponses
const result = await quizService.submit({
  session_id: session.data.id,
  answers: [
    { question_id: 1, choice_id: 2 },
    { question_id: 2, choice_id: 1 }
  ]
});

// Récupérer la progression
const progress = await progressService.getProgress();
```

#### Notifications
```javascript
import { notificationsService } from '@/services';

// Récupérer les notifications
const notifications = await notificationsService.getAll();

// Compter les non lues
const unreadCount = await notificationsService.getUnreadCount();

// Marquer comme lue
await notificationsService.markAsRead(notificationId);
```

## Configuration

### Variables d'Environnement

Assurez-vous que votre fichier `.env` contient :

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### Headers Automatiques

Tous les services incluent automatiquement :
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Requested-With: XMLHttpRequest`
- `Authorization: Bearer {token}` (si disponible)

## Gestion des Erreurs

Les services utilisent l'instance axios configurée qui inclut :
- Intercepteur pour ajouter automatiquement le token d'authentification
- Gestion automatique des erreurs 401 (non authentifié)
- Headers CORS appropriés

### Exemple de Gestion d'Erreur
```javascript
try {
  const response = await chaptersService.getAll();
  // Traiter la réponse
} catch (error) {
  if (error.response?.status === 401) {
    // Rediriger vers la page de connexion
    authService.removeToken();
    router.push('/login');
  } else if (error.response?.status === 404) {
    // Ressource non trouvée
    console.error('Chapitre non trouvé');
  } else {
    // Autres erreurs
    console.error('Erreur API:', error.message);
  }
}
```

## Bonnes Pratiques

1. **Toujours utiliser try/catch** pour la gestion des erreurs
2. **Vérifier l'authentification** avant les appels sensibles
3. **Utiliser les imports nommés** pour une meilleure lisibilité
4. **Stocker les tokens de manière sécurisée** (localStorage pour le MVP)
5. **Implémenter un loading state** pour les appels asynchrones

## Tests

Pour tester les services, vous pouvez utiliser des outils comme Postman avec la collection fournie ou créer des tests unitaires :

```javascript
// Exemple de test simple
describe('AuthService', () => {
  test('should login successfully', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const response = await authService.login(credentials);
    expect(response.data.token).toBeDefined();
  });
});
```
