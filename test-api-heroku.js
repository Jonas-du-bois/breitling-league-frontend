/**
 * Script de test de l'API Breitling League sur Heroku
 * Pour valider les corrections apportées aux erreurs 500 d'authentification
 * 
 * Usage: node test-api-heroku.js
 */

import axios from 'axios';

// Configuration
const BASE_URL = 'https://backend-breitling-league-e1d83468309e.herokuapp.com/api';
const DEMO_CREDENTIALS = {
    email: 'lucas@example.com',
    password: 'password'
};

// Couleurs pour le terminal
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Instance axios configurée
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

class ApiTester {
    constructor() {
        this.token = null;
        this.results = {
            total: 0,
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async test(name, testFn) {
        this.results.total++;
        log(`\n🔍 Test: ${name}`, 'blue');
        
        try {
            await testFn();
            this.results.passed++;
            this.results.tests.push({ name, status: 'PASSED' });
            log(`✅ PASSED: ${name}`, 'green');
        } catch (error) {
            this.results.failed++;
            this.results.tests.push({ name, status: 'FAILED', error: error.message });
            log(`❌ FAILED: ${name}`, 'red');
            log(`   Erreur: ${error.message}`, 'red');
            
            // Afficher les détails de la réponse si disponible
            if (error.response) {
                log(`   Status: ${error.response.status}`, 'yellow');
                log(`   Data: ${JSON.stringify(error.response.data, null, 2)}`, 'yellow');
            }
        }
    }    async testHealthCheck() {
        log('Vérification de la santé de l\'API...', 'blue');
        
        // Tester avec l'endpoint login qui existe sûrement
        const response = await api.get('/login', { 
            timeout: 5000,
            validateStatus: (status) => status < 500 // Accepter 405 (Method Not Allowed) comme signe que l'API fonctionne
        });
        
        if (response.status >= 500) {
            throw new Error(`API en erreur serveur: ${response.status}`);
        }
        
        log('API accessible ✓', 'green');
    }

    async testLogin() {
        log('Test de connexion avec credentials de démo...', 'blue');
        
        const response = await api.post('/login', DEMO_CREDENTIALS);
        
        if (response.status !== 200) {
            throw new Error(`Login failed: ${response.status}`);
        }
        
        const data = response.data;
        
        if (!data.access_token && !data.token) {
            throw new Error('Aucun token dans la réponse de login');
        }
        
        // Stocker le token pour les tests suivants
        this.token = data.access_token || data.token;
        log(`Token reçu: ${this.token}`, 'green');

        return data;
    }

    async testAuthenticatedEndpoint(endpoint, method = 'GET', data = null) {
        if (!this.token) {
            throw new Error('Aucun token disponible - effectuer login d\'abord');
        }
        
        const config = {
            method,
            url: endpoint,
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        };
        
        if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
            config.data = data;
        }
        
        const response = await api.request(config);
        
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Endpoint ${endpoint} failed: ${response.status}`);
        }
        
        return response.data;
    }

    async testMeEndpoint() {
        log('Test de l\'endpoint /me...', 'blue');
        
        const data = await this.testAuthenticatedEndpoint('/me');
        
        if (!data.user && !data.id) {
            throw new Error('Données utilisateur manquantes dans la réponse');
        }
        
        log('Endpoint /me fonctionne ✓', 'green');
        return data;
    }

    async testUserEndpoint() {
        log('Test de l\'endpoint /user...', 'blue');
        
        const data = await this.testAuthenticatedEndpoint('/user');
        
        if (!data) {
            throw new Error('Aucune donnée retournée par /user');
        }
        
        log('Endpoint /user fonctionne ✓', 'green');
        return data;
    }

    async testProgressEndpoint() {
        log('Test de l\'endpoint /progress...', 'blue');
        
        const data = await this.testAuthenticatedEndpoint('/progress');
        
        if (!data) {
            throw new Error('Aucune donnée retournée par /progress');
        }
        
        log('Endpoint /progress fonctionne ✓', 'green');
        return data;
    }

    async testChaptersEndpoint() {
        log('Test de l\'endpoint /chapters...', 'blue');
        
        const data = await this.testAuthenticatedEndpoint('/chapters');
        
        if (!data) {
            throw new Error('Aucune donnée retournée par /chapters');
        }
        
        log('Endpoint /chapters fonctionne ✓', 'green');
        return data;
    }

    async testLogout() {
        log('Test de déconnexion...', 'blue');
        
        if (!this.token) {
            throw new Error('Aucun token pour la déconnexion');
        }
        
        const data = await this.testAuthenticatedEndpoint('/logout', 'POST');
        
        log('Déconnexion réussie ✓', 'green');
        return data;
    }

    async testDocumentationAccess() {
        log('Test d\'accès à la documentation Scribe...', 'blue');
        
        try {
            const response = await axios.get('https://backend-breitling-league-e1d83468309e.herokuapp.com/docs', {
                timeout: 10000,
                validateStatus: (status) => status === 200
            });
            
            if (response.status === 200 && response.data.includes('Scribe')) {
                log('Documentation Scribe accessible ✓', 'green');
            } else {
                throw new Error('Documentation ne contient pas le contenu attendu');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('Documentation non trouvée (404)');
            }
            throw error;
        }
    }

    printResults() {
        log('\n' + '='.repeat(60), 'bold');
        log('RÉSULTATS DU TEST DE L\'API', 'bold');
        log('='.repeat(60), 'bold');
        
        log(`\n📊 Statistiques:`, 'blue');
        log(`   Total: ${this.results.total}`);
        log(`   Réussis: ${this.results.passed}`, 'green');
        log(`   Échoués: ${this.results.failed}`, this.results.failed > 0 ? 'red' : 'green');
        
        if (this.results.failed > 0) {
            log(`\n❌ Tests échoués:`, 'red');
            this.results.tests
                .filter(test => test.status === 'FAILED')
                .forEach(test => {
                    log(`   - ${test.name}: ${test.error}`, 'red');
                });
        }
        
        const successRate = Math.round((this.results.passed / this.results.total) * 100);
        log(`\n🎯 Taux de réussite: ${successRate}%`, successRate >= 80 ? 'green' : 'red');
        
        if (this.results.failed === 0) {
            log('\n🎉 Tous les tests sont passés ! L\'API fonctionne correctement.', 'green');
        } else {
            log('\n⚠️ Certains tests ont échoué. Vérifiez les erreurs ci-dessus.', 'yellow');
        }
    }

    async runAllTests() {
        log('🚀 DÉMARRAGE DES TESTS DE L\'API BREITLING LEAGUE', 'bold');
        log(`🌐 Base URL: ${BASE_URL}`, 'blue');
        log(`📧 Email de test: ${DEMO_CREDENTIALS.email}`, 'blue');
        
        // Tests de base
        await this.test('Health Check API', () => this.testHealthCheck());
        await this.test('Documentation Scribe', () => this.testDocumentationAccess());
        
        // Tests d'authentification
        await this.test('Login avec credentials de démo', () => this.testLogin());
        
        // Tests des endpoints protégés (ceux qui causaient des erreurs 500)
        await this.test('Endpoint /me', () => this.testMeEndpoint());
        await this.test('Endpoint /user', () => this.testUserEndpoint());
        await this.test('Endpoint /progress', () => this.testProgressEndpoint());
        await this.test('Endpoint /chapters', () => this.testChaptersEndpoint());
        
        // Test de déconnexion
        await this.test('Logout', () => this.testLogout());
        
        this.printResults();
    }
}

// Fonction utilitaire pour vérifier les dépendances
function checkDependencies() {
    try {
        // axios is already imported as ES module
        return true;
    } catch (error) {
        log('❌ Erreur: axios n\'est pas installé.', 'red');
        log('📦 Installez-le avec: npm install axios', 'yellow');
        return false;
    }
}

// Point d'entrée principal
async function main() {
    if (!checkDependencies()) {
        process.exit(1);
    }
    
    const tester = new ApiTester();
    
    try {
        await tester.runAllTests();
        process.exit(tester.results.failed === 0 ? 0 : 1);
    } catch (error) {
        log(`\n💥 Erreur fatale: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    }
}

// Gestion des signaux pour un arrêt propre
process.on('SIGINT', () => {
    log('\n⚡ Test interrompu par l\'utilisateur', 'yellow');
    process.exit(1);
});

process.on('SIGTERM', () => {
    log('\n⚡ Test terminé par le système', 'yellow');
    process.exit(1);
});

// Démarrage automatique du script
main();

export { ApiTester, main };
