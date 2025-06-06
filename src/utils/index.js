/**
 * Formatage des dates
 */
export function formatDate(date, options = {}) {
  if (!date) return '';
  
  const d = new Date(date);
  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options
  };
  
  return d.toLocaleDateString('fr-FR', defaultOptions);
}

/**
 * Formatage des dates avec heure
 */
export function formatDateTime(date) {
  return formatDate(date, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Formatage des scores
 */
export function formatScore(score) {
  if (typeof score !== 'number') return '0';
  return score.toLocaleString('fr-FR');
}

/**
 * Formatage des pourcentages
 */
export function formatPercentage(value, total) {
  if (!total || total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${Math.round(percentage)}%`;
}

/**
 * Formatage des durées
 */
export function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}min`;
  } else if (minutes > 0) {
    return `${minutes}min ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Formatage des nombres
 */
export function formatNumber(number, decimals = 0) {
  if (typeof number !== 'number') return '0';
  return number.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Capitalisation de la première lettre
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Calcul du temps relatif
 */
export function timeAgo(date) {
  if (!date) return '';
  
  const now = new Date();
  const diffTime = Math.abs(now - new Date(date));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'hier';
  if (diffDays < 7) return `il y a ${diffDays} jours`;
  if (diffDays < 30) return `il y a ${Math.ceil(diffDays / 7)} semaines`;
  if (diffDays < 365) return `il y a ${Math.ceil(diffDays / 30)} mois`;
  return `il y a ${Math.ceil(diffDays / 365)} ans`;
}
