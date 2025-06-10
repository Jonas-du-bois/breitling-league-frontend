<template>
  <div class="table-group-demo">
    <!-- Header Section -->
    <div class="demo-header">
      <h1>📊 Table Components - Based on component.txt</h1>
      <p class="demo-description">
        Interactive demonstration of table components created from exact Figma specifications
      </p>
      
      <!-- Demo Stats -->
      <div class="demo-stats">
        <span class="stat-item">Total Clicks: {{ interactions.totalClicks }}</span>
        <span class="stat-item" v-if="interactions.lastAction">
          Last Action: {{ interactions.lastAction }}
        </span>
      </div>
    </div>

    <!-- Complete DataTable Demo -->
    <div class="demo-section">
      <h2>🏆 Complete Leaderboard Table</h2>
      <p class="section-description">
        Full table with header, current user highlighting, and player rankings
      </p>
      
      <div class="component-showcase">
        <DataTable 
          :players="samplePlayers"
          :current-user="currentUser"
          :show-current-user="true"
          @row-click="handleRowClick"
          @user-click="handleUserClick"
        />
      </div>

      <div class="tech-specs">
        <h4>Technical Specifications:</h4>
        <ul>
          <li>Fixed width table (384px)</li>
          <li>Current user highlighted with #FFC72C background</li>
          <li>Font: Italian_Plate_No2, text-xs</li>
          <li>Avatar placeholders (36x48px)</li>
          <li>Score formatting with apostrophes</li>
        </ul>
      </div>
    </div>

    <!-- Individual Components Demo -->
    <div class="demo-section">
      <h2>🧩 Individual Components</h2>
      
      <!-- Table Header -->
      <div class="component-demo">
        <h3>📋 Table Header</h3>
        <TableHeader />
      </div>

      <!-- Table Row Player -->
      <div class="component-demo">
        <h3>👤 Player Row (Default)</h3>
        <TableRowPlayer 
          :player="samplePlayers[0]"
          @row-click="handlePlayerRowClick"
        />
      </div>

      <!-- Table Row Current User -->
      <div class="component-demo">
        <h3>⭐ Current User Row</h3>
        <TableRowCurrentUser 
          :player="currentUser"
          @row-click="handleCurrentUserRowClick"
        />
      </div>

      <!-- Table Body -->
      <div class="component-demo">
        <h3>📊 Table Body (Multiple Rows)</h3>
        <TableBody 
          :players="samplePlayers.slice(0, 3)"
          :current-user="currentUser"
          @row-click="handleTableBodyClick"
        />
      </div>
    </div>

    <!-- Color Palette -->
    <div class="demo-section">
      <h2>🎨 Color Palette</h2>
      <div class="color-palette">
        <div class="color-swatch" style="background-color: #09091A;">
          <span>#09091A</span>
          <small>Text/Border Color</small>
        </div>
        <div class="color-swatch" style="background-color: #FFC72C;">
          <span>#FFC72C</span>
          <small>Current User Background</small>
        </div>
        <div class="color-swatch" style="background-color: rgba(9, 9, 26, 0.02);">
          <span>rgba(9, 9, 26, 0.02)</span>
          <small>Row Hover</small>
        </div>
      </div>
    </div>

    <!-- Usage Examples -->
    <div class="demo-section">
      <h2>💻 Usage Examples</h2>
      <div class="code-examples">
        <pre><code>&lt;DataTable 
  :players="playersData"
  :current-user="currentUserData"
  @row-click="handleRowClick"
/&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from './DataTable.vue'
import TableHeader from './TableHeader.vue'
import TableRowPlayer from './TableRowPlayer.vue'
import TableRowCurrentUser from './TableRowCurrentUser.vue'
import TableBody from './TableBody.vue'

export default {
  name: 'TableGroup',
  components: {
    DataTable,
    TableHeader,
    TableRowPlayer,
    TableRowCurrentUser,
    TableBody
  },
  data() {
    return {
      interactions: {
        totalClicks: 0,
        lastAction: ''
      },
      currentUser: {
        rank: '15',
        avatar: null,
        username: 'YourUsername',
        country: 'FR',
        score: 123456
      },
      samplePlayers: [
        {
          rank: '1',
          avatar: null,
          username: 'ProGamer2024',
          country: 'KR',
          score: 2456789
        },
        {
          rank: '2',
          avatar: null,
          username: 'SkillMaster',
          country: 'JP',
          score: 2234567
        },
        {
          rank: '3',
          avatar: null,
          username: 'TopPlayer',
          country: 'US',
          score: 1987654
        },
        {
          rank: '4',
          avatar: null,
          username: 'ChampionX',
          country: 'DE',
          score: 1765432
        },
        {
          rank: '5',
          avatar: null,
          username: 'EliteGamer',
          country: 'UK',
          score: 1543210
        },
        {
          rank: '6',
          avatar: null,
          username: 'MasterPlayer',
          country: 'CA',
          score: 1432109
        },
        {
          rank: '7',
          avatar: null,
          username: 'ProLevel',
          country: 'AU',
          score: 1321098
        }
      ]
    }
  },
  methods: {
    trackInteraction(action) {
      this.interactions.totalClicks++;
      this.interactions.lastAction = action;
      console.log(`Table Interaction: ${action}`);
    },
    
    handleRowClick(data) {
      this.trackInteraction(`Row clicked: ${data.player.username} (${data.type})`);
    },
    
    handleUserClick(user) {
      this.trackInteraction(`Current user clicked: ${user.username}`);
    },
    
    handlePlayerRowClick(player) {
      this.trackInteraction(`Player row clicked: ${player.username}`);
    },
    
    handleCurrentUserRowClick(player) {
      this.trackInteraction(`Current user row clicked: ${player.username}`);
    },
    
    handleTableBodyClick(data) {
      this.trackInteraction(`Table body click: ${data.player.username} (${data.type})`);
    }
  }
}
</script>

<style scoped>
.table-group-demo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 3rem;
}

.demo-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #09091A;
}

.demo-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.demo-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.stat-item {
  background: #f5f5f5;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: #09091A;
}

.demo-section {
  margin-bottom: 4rem;
  padding: 2rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
  background: white;
}

.demo-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #09091A;
}

.section-description {
  color: #666;
  margin-bottom: 2rem;
}

.component-showcase {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  padding: 2rem;
  background: #fafafa;
  border-radius: 0.5rem;
}

.component-demo {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  background: #fafafa;
}

.component-demo h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #09091A;
}

.tech-specs {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.tech-specs h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #09091A;
}

.tech-specs ul {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.tech-specs li {
  margin-bottom: 0.25rem;
  color: #555;
}

.color-palette {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.color-swatch {
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  color: white;
  position: relative;
}

.color-swatch span {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.color-swatch small {
  display: block;
  opacity: 0.9;
}

.code-examples {
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.code-examples pre {
  margin: 0;
  white-space: pre-wrap;
}

.code-examples code {
  color: #09091A;
  font-family: 'Courier New', monospace;
}

/* Responsive design */
@media (max-width: 768px) {
  .table-group-demo {
    padding: 1rem;
  }
  
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .demo-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .color-palette {
    grid-template-columns: 1fr;
  }
}
</style>
