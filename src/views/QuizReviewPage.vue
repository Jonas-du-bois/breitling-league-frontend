<template>
  <div class="quiz-review-page">
    <!-- Results Section -->
    <div class="results-container">
      <h1 class="results-title">Results</h1>
      <div class="score-display">
        <span class="score-text">Your Score</span>
        <span class="score-value">{{ userScore }}/{{ totalScore }}</span>
      </div>
    </div>

    <!-- Leaderboard Section -->
    <div class="leaderboard-container">
      <DataTable class="leaderboard-table">        <template #header>
          <TableHeader>
            <th class="rank-column">Rank</th>
            <th class="name-column">Name</th>
            <th class="country-column">Country</th>
            <th class="score-column">Score</th>
          </TableHeader>
        </template>
        <template #body>
          <TableBody>            <TableRowCurrentUser
              v-if="currentUserRank <= 3"
              :rank="currentUserRank"
              :name="currentUser.name"
              :country="currentUser.country || '###'"
              :score="currentUser.score"
            />            <TableRowPlayer
              v-for="player in topPlayers"
              :key="player.id"
              :rank="player.rank"
              :name="player.name"
              :country="player.country || '###'"
              :score="player.score"
            />
            <TableRowCurrentUser
              v-if="currentUserRank > 3"
              :rank="currentUserRank"
              :name="currentUser.name"
              :country="currentUser.country || '###'"
              :score="currentUser.score"
            />
          </TableBody>
        </template>
      </DataTable>
    </div>    <!-- Return Button -->
    <div class="button-container">
      <FilledButton 
        label="Go to Playground"
        variant="primary"
        @click="goToPlayground"
      />
    </div>
  </div>
</template>

<script>
import { FilledButton } from '../components/button'
import { DataTable, TableBody, TableHeader, TableRowPlayer, TableRowCurrentUser } from '../components/table'
import { progressAPI } from '../services/api.js'

export default {
  name: 'QuizReviewPage',
  components: {
    FilledButton,
    DataTable,
    TableBody,
    TableHeader,
    TableRowPlayer,
    TableRowCurrentUser
  },
  data() {
    return {
      userScore: 0,
      totalScore: 0,
      topPlayers: [],
      currentUser: {},
      currentUserRank: null,
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.fetchLeaderboard()
  },
  methods: {
    async fetchLeaderboard() {
      this.loading = true
      this.error = null
      try {
        // Fetch leaderboard from backend
        const leaderboardRes = await progressAPI.getLeaderboard(10)
        this.topPlayers = leaderboardRes.data.players || []
        // Fetch current user ranking (assume userId is available via auth or props)
        const userId = this.$route.params.userId || (this.$store && this.$store.state.user && this.$store.state.user.id)
        if (userId) {
          const userRankRes = await progressAPI.getUserRanking(userId)
          this.currentUser = userRankRes.data.user
          this.currentUserRank = userRankRes.data.rank
          this.userScore = userRankRes.data.user.score
          this.totalScore = leaderboardRes.data.totalScore || 0
        }
      } catch (error) {
        this.error = 'Failed to load leaderboard.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    goToPlayground() {
      this.$router.push({ name: 'Playzone' })
    }
  }
}
</script>

<style scoped>
.quiz-review-page {
  min-height: 100vh;
  background-color: #072C54;
  font-family: 'Italian Plate No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Results Section */
.results-container {
  text-align: center;
  margin-bottom: 40px;
}

.results-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.score-display {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.score-text {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.score-value {
  color: #FFC72C;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Leaderboard Section */
.leaderboard-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
}

.leaderboard-table {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #000000;
}

.leaderboard-table th {
  color: #FF6B35;
  font-weight: 700;
}

.leaderboard-table td {
  color: #000000;
}

.rank-column {
  width: 80px;
  text-align: center;
  color: #FF6B35;
  font-weight: 600;
}

.name-column {
  flex: 1;
  text-align: left;
  padding-left: 20px;
  color: #000000;
}

.country-column {
  width: 100px;
  text-align: center;
  color: #FF6B35;
  font-weight: 600;
}

.score-column {
  width: 120px;
  text-align: center;
  color: #FF6B35;
  font-weight: 600;
}

/* Button Section */
.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-review-page {
    padding: 15px;
  }
  
  .results-title {
    font-size: 2rem;
  }
  
  .score-value {
    font-size: 1.5rem;
  }
  
  .leaderboard-container {
    max-width: 100%;
  }
  
  .name-column {
    padding-left: 15px;
  }
}

@media (max-width: 480px) {
  .results-title {
    font-size: 1.8rem;
  }
  
  .score-display {
    padding: 15px 20px;
  }
  
  .score-value {
    font-size: 1.3rem;
  }
}
</style>
