import { ref, computed, onMounted } from 'vue';
import { notificationsService } from '@/services';
import { useApi } from '@/composables/useApi';

/**
 * Composable pour gérer les notifications utilisateur
 * @returns {Object} État et méthodes pour les notifications
 */
export function useNotifications() {
  const { execute, loading, error } = useApi();
  
  const notifications = ref([]);
  const unreadCount = ref(0);

  /**
   * Récupère toutes les notifications
   */
  const fetchNotifications = async () => {
    const data = await execute(() => notificationsService.getAll());
    notifications.value = data.data || [];
    return data;
  };

  /**
   * Récupère le nombre de notifications non lues
   */
  const fetchUnreadCount = async () => {
    const data = await execute(() => notificationsService.getUnreadCount());
    unreadCount.value = data.count || 0;
    return data;
  };

  /**
   * Marque une notification comme lue
   * @param {number} notificationId - ID de la notification
   */
  const markAsRead = async (notificationId) => {
    await execute(() => notificationsService.markAsRead(notificationId));
    
    // Mettre à jour localement
    const notification = notifications.value.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
  };

  /**
   * Marque toutes les notifications comme lues
   */
  const markAllAsRead = async () => {
    const unreadNotifications = notifications.value.filter(n => !n.read);
    
    for (const notification of unreadNotifications) {
      await markAsRead(notification.id);
    }
  };

  /**
   * Notifications non lues (calculé)
   */
  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read)
  );

  /**
   * Notifications lues (calculé)
   */
  const readNotifications = computed(() => 
    notifications.value.filter(n => n.read)
  );

  /**
   * Indique s'il y a des notifications non lues
   */
  const hasUnreadNotifications = computed(() => unreadCount.value > 0);

  // Charger les notifications au montage du composable
  onMounted(() => {
    fetchNotifications();
    fetchUnreadCount();
  });

  return {
    // État
    notifications,
    unreadCount,
    loading,
    error,
    
    // États calculés
    unreadNotifications,
    readNotifications,
    hasUnreadNotifications,
    
    // Méthodes
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead
  };
}
