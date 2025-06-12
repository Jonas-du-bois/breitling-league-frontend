<template>
  <div class="list-group-demo">
    <div class="demo-header">
      <h1>List Components Demo</h1>
      <p>Complete list components based on component.txt specifications</p>
    </div>

    <!-- Chip List Section -->
    <div class="demo-section">
      <h2>🏷️ Chip List - Category Filter</h2>
      <div class="demo-container">
        <ChipList 
          :chips="chipData"
          @chip-click="handleChipClick"
        />
      </div>
      <div class="demo-info">
        <p><strong>Features:</strong> Horizontal scrollable chip list with click handling</p>
        <p><strong>Last action:</strong> {{ lastChipAction }}</p>
      </div>
    </div>

    <!-- Unit List Section -->
    <div class="demo-section">
      <h2>📦 Unit List - Course Units Grid</h2>
      <div class="demo-container">        <UnitList 
          :units="unitData"
          :show-see-more="true"
          :see-more-disabled="false"
          @unit-click="handleUnitClick"
          @learn-unit="handleLearnUnit"
          @quiz-unit="handleQuizUnit"
          @see-more-click="handleSeeMoreClick"
        />
      </div>
      <div class="demo-info">
        <p><strong>Features:</strong> Grid layout with unit cards and see more button</p>
        <p><strong>Last action:</strong> {{ lastUnitAction }}</p>
      </div>
    </div>

    <!-- Chapter List Section -->
    <div class="demo-section">
      <h2>📚 Chapter List - Course Chapters</h2>
      <div class="demo-container">
        <ChapterList 
          :chapters="chapterData"
          @chapter-click="handleChapterClick"
        />
      </div>
      <div class="demo-info">
        <p><strong>Features:</strong> Vertical list with time boosters and point tracking</p>
        <p><strong>Last action:</strong> {{ lastChapterAction }}</p>
      </div>
    </div>

    <!-- Technical Specifications -->
    <div class="demo-section">
      <h2>🔧 Technical Specifications</h2>
      <div class="specs-grid">
        <div class="spec-card">
          <h3>ChipList</h3>
          <ul>
            <li>Horizontal scrollable layout</li>
            <li>Click event handling</li>
            <li>Custom styling with exact colors</li>
            <li>Responsive design</li>
          </ul>
        </div>
        <div class="spec-card">
          <h3>UnitList</h3>
          <ul>
            <li>Fixed container dimensions (1017x480px)</li>
            <li>Uses existing UnitCard component</li>
            <li>See more button integration</li>
            <li>Grid layout with proper spacing</li>
          </ul>
        </div>
        <div class="spec-card">
          <h3>ChapterList</h3>
          <ul>
            <li>Vertical list layout (384px width)</li>
            <li>Uses existing ChapterCard component</li>
            <li>Time booster support</li>
            <li>Point tracking display</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Color Palette -->
    <div class="demo-section">
      <h2>🎨 Color Palette</h2>
      <div class="color-palette">
        <div class="color-swatch" style="background-color: #072C54;">
          <span>#072C54</span>
          <small>Primary Blue</small>
        </div>
        <div class="color-swatch" style="background-color: #09091A;">
          <span>#09091A</span>
          <small>Text Dark</small>
        </div>
        <div class="color-swatch" style="background-color: #76787B;">
          <span>#76787B</span>
          <small>Text Gray</small>
        </div>
        <div class="color-swatch" style="background-color: #9747FF;">
          <span>#9747FF</span>
          <small>Purple Accent</small>
        </div>
        <div class="color-swatch" style="background-color: #FFC72C;">
          <span>#FFC72C</span>
          <small>Primary Yellow</small>
        </div>
        <div class="color-swatch" style="background-color: #FFFFFF; border: 1px solid #ddd;">
          <span style="color: #000">#FFFFFF</span>
          <small style="color: #000">Background</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChipList from './ChipList.vue'
import UnitList from './UnitList.vue'
import ChapterList from './ChapterList.vue'

export default {
  name: 'ListGroup',
  components: {
    ChipList,
    UnitList,
    ChapterList
  },
  data() {
    return {
      lastChipAction: 'None',
      lastUnitAction: 'None',
      lastChapterAction: 'None',
      chipData: [
        { label: 'Category 1', status: 'default' },
        { label: 'Category 2', status: 'default' },
        { label: 'Category 3', status: 'default' },
        { label: 'Category 4', status: 'default' },
        { label: 'Category 5', status: 'default' }
      ],      unitData: [
        {
          id: 1,
          title: 'Breitling Heritage Fundamentals',
          name: 'Heritage Specialist',
          points: "25'300",
          badgeText: 'Certified',
          isLearned: true
        },
        {
          id: 2,
          title: 'Advanced Chronograph Technology',
          points: "87'450",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 3,
          title: 'Navitimer Navigation Systems',
          name: 'Navigation Expert',
          points: "45'200",
          badgeText: 'Certified',
          isLearned: true
        }
      ],
      chapterData: [
        {
          id: 1,
          title: 'Introduction to Vue.js',
          pointsLeft: "45'000",
          imageUrl: 'https://placehold.co/402x130/072C54/FFFFFF?text=Vue.js',
          showTime: true,
          timeLeft: { days: 8, hours: 12, minutes: 24 },
          bonusMultiplier: 'x2',
          withBooster: true,
          status: 'default',
          withHighlight: true
        },
        {
          id: 2,
          title: 'Component Architecture',
          pointsLeft: "38'500",
          imageUrl: 'https://placehold.co/402x130/FFC72C/000000?text=Components',
          showTime: true,
          timeLeft: { days: 5, hours: 8, minutes: 15 },
          bonusMultiplier: 'x3',
          withBooster: true,
          status: 'default',
          withHighlight: true
        },
        {
          id: 3,
          title: 'State Management',
          pointsLeft: "52'200",
          imageUrl: 'https://placehold.co/402x130/9747FF/FFFFFF?text=State',
          showTime: false,
          withBooster: false,
          status: 'default',
          withHighlight: true
        }
      ]
    }
  },
  methods: {
    handleChipClick(data) {
      this.lastChipAction = `Clicked "${data.chip.label}" (index: ${data.index})`;
      console.log('Chip clicked:', data);
    },    handleUnitClick(unit) {
      this.lastUnitAction = `Clicked unit "${unit.title}" (${unit.points} pts)`;
      console.log('Unit clicked:', unit);
    },
    handleLearnUnit(unit) {
      this.lastUnitAction = `Learn clicked for "${unit.title}"`;
      console.log('Learn unit:', unit);
    },
    handleQuizUnit(unit) {
      this.lastUnitAction = `Quiz clicked for "${unit.title}"`;
      console.log('Quiz unit:', unit);
    },
    handleSeeMoreClick() {
      this.lastUnitAction = 'See More button clicked';
      console.log('See more clicked');
    },
    handleChapterClick(chapter) {
      this.lastChapterAction = `Clicked chapter "${chapter.title}" (${chapter.pointsLeft} pts left)`;
      console.log('Chapter clicked:', chapter);
    }
  }
}
</script>

<style scoped>
.list-group-demo {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Italian Plate No2', sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #072C54 0%, #9747FF 100%);
  color: white;
  border-radius: 12px;
}

.demo-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: bold;
}

.demo-header p {
  margin: 0;
  font-size: 1.2rem;
  opacity: 0.9;
}

.demo-section {
  margin-bottom: 3rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
}

.demo-section h2 {
  margin: 0 0 1.5rem 0;
  color: #072C54;
  font-size: 1.8rem;
  font-weight: bold;
}

.demo-container {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px dashed #cbd5e0;
}

.demo-info {
  padding: 1rem;
  background: #e6fffa;
  border-radius: 4px;
  border-left: 4px solid #38b2ac;
}

.demo-info p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.spec-card {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fafafa;
}

.spec-card h3 {
  margin: 0 0 1rem 0;
  color: #072C54;
  font-size: 1.2rem;
  font-weight: bold;
}

.spec-card ul {
  margin: 0;
  padding-left: 1.2rem;
}

.spec-card li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
}

.color-palette {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.color-swatch {
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  color: white;
  font-weight: bold;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.color-swatch span {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.color-swatch small {
  font-size: 0.7rem;
  opacity: 0.8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .list-group-demo {
    padding: 1rem;
  }
  
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
  
  .color-palette {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
