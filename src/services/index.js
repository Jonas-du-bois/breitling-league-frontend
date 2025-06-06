// Services API pour l'application Breitling League
// Importation centralisée de tous les services

import api from '@/services/api';
import authService from '@/services/auth';
import chaptersService from '@/services/chapters';
import discoveriesService from '@/services/discoveries';
import eventsService from '@/services/events';
import lotteryTicketsService from '@/services/lotteryTickets';
import notificationsService from '@/services/notifications';
import noveltiesService from '@/services/novelties';
import progressService from '@/services/progress';
import quizService from '@/services/quiz';
import rankService from '@/services/rankService';
import remindersService from '@/services/reminders';
import userService from '@/services/user';
import weeklyChallengesService from '@/services/weeklyChallenges';

/**
 * Export centralisé de tous les services API
 * Utilisation recommandée :
 * 
 * import { authService, chaptersService, ... } from '@/services';
 * 
 * ou pour l'instance axios de base :
 * 
 * import { api } from '@/services';
 */
export {
  api,
  authService,
  chaptersService,
  discoveriesService,
  eventsService,
  lotteryTicketsService,
  notificationsService,
  noveltiesService,
  progressService,
  quizService,
  rankService,
  remindersService,
  userService,
  weeklyChallengesService
};

/**
 * Export par défaut d'un objet contenant tous les services
 * Utilisation alternative :
 * 
 * import services from '@/services';
 * services.authService.login(credentials);
 */
export default {
  api,
  auth: authService,
  chapters: chaptersService,
  discoveries: discoveriesService,
  events: eventsService,
  lotteryTickets: lotteryTicketsService,
  notifications: notificationsService,
  novelties: noveltiesService,
  progress: progressService,
  quiz: quizService,
  ranks: rankService,
  reminders: remindersService,
  user: userService,
  weeklyChallenges: weeklyChallengesService
};
