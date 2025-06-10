<template>
  <div class="text-input-vertical-exact-group">
    <h2 class="group-title">TextInput Vertical Exact Variants (from input.txt)</h2>
    
    <!-- Horizontal Group Container -->
    <div class="horizontal-group">
      <!-- Default State -->
      <div class="variant-container">
        <h3 class="variant-label">Default</h3>
        <p class="variant-specs">White BG • Blue Outline • Black Text</p>
        <TextInputVerticalExact 
          v-model="defaultValue"
          placeholder="Response"
          :image-url="sampleImages.default"
          @click="handleClick('default', $event)"
        />
      </div>

      <!-- Selected State -->
      <div class="variant-container">
        <h3 class="variant-label">Selected</h3>
        <p class="variant-specs">Light Yellow BG (#FAF0C7) • Blue Outline • Black Text</p>
        <TextInputVerticalExact 
          v-model="selectedValue"
          :isSelected="true"
          :image-url="sampleImages.selected"
          @click="handleClick('selected', $event)"
        />
      </div>

      <!-- Correct Answer (Status True) -->
      <div class="variant-container">
        <h3 class="variant-label">Correct (Status True)</h3>
        <p class="variant-specs">Light Green BG (#ECFEF2) • Green Outline • Green Text + Points</p>
        <TextInputVerticalExact 
          v-model="correctValue"
          :isCorrectAnswer="true"
          :points="1000"
          :image-url="sampleImages.correct"
          @click="handleClick('correct', $event)"
        />
      </div>

      <!-- Wrong Answer (Status False) -->
      <div class="variant-container">
        <h3 class="variant-label">Wrong (Status False)</h3>
        <p class="variant-specs">Light Red BG (#FFEBE9) • Red Outline • Red Text • px-6 py-2.5</p>
        <TextInputVerticalExact 
          v-model="wrongValue"
          :isWrongAnswer="true"
          :image-url="sampleImages.wrong"
          @click="handleClick('wrong', $event)"
        />
      </div>
    </div>

    <!-- Technical Specifications -->
    <div class="technical-specs">
      <h3>🔧 Technical Specifications (from input.txt)</h3>
      <div class="specs-grid">
        <div class="spec-item">
          <h4>Correct (Status True)</h4>
          <ul>
            <li>Colors: #39A05D, #ECFEF2</li>
            <li>Padding: p-6 (24px all sides)</li>
            <li>Font: medium weight (500)</li>
            <li>Points: separate div</li>
          </ul>
        </div>
        <div class="spec-item">
          <h4>Wrong (Status False)</h4>
          <ul>
            <li>Colors: #B9473B, #FFEBE9</li>
            <li>Padding: px-6 py-2.5 (24px H, 10px V)</li>
            <li>Font: medium weight (500)</li>
            <li>No points display</li>
          </ul>
        </div>
        <div class="spec-item">
          <h4>Selected</h4>
          <ul>
            <li>Colors: #072C54, #09091A, #FAF0C7</li>
            <li>Padding: p-6 (24px all sides)</li>
            <li>Font: semibold weight (600)</li>
            <li>Blue outline</li>
          </ul>
        </div>
        <div class="spec-item">
          <h4>Default</h4>
          <ul>
            <li>Colors: #072C54, #09091A, #FFFFFF</li>
            <li>Padding: p-6 (24px all sides)</li>
            <li>Font: semibold weight (600)</li>
            <li>Blue outline</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Text-Only Mode Examples -->
    <div class="text-only-section">
      <h3>📝 Text-Only Mode</h3>
      <div class="text-only-grid">
        <div class="text-example">
          <label>Correct Text Only:</label>
          <TextInputVerticalExact 
            v-model="correctValue"
            :isCorrectAnswer="true"
            :showTextOnly="true"
          />
        </div>
        <div class="text-example">
          <label>Wrong Text Only:</label>
          <TextInputVerticalExact 
            v-model="wrongValue"
            :isWrongAnswer="true"
            :showTextOnly="true"
          />
        </div>
        <div class="text-example">
          <label>Selected Text Only:</label>
          <TextInputVerticalExact 
            v-model="selectedValue"
            :isSelected="true"
            :showTextOnly="true"
          />
        </div>
      </div>
    </div>

    <!-- Debug Information -->
    <div class="debug-info">
      <h3>🐛 Debug Info</h3>
      <p><strong>Clicks:</strong> {{ debugInfo.clicks }}</p>
      <p><strong>Last Action:</strong> {{ debugInfo.lastAction }}</p>
      <p><strong>Values:</strong></p>
      <ul>
        <li>Default: "{{ defaultValue }}"</li>
        <li>Selected: "{{ selectedValue }}"</li>
        <li>Correct: "{{ correctValue }}"</li>
        <li>Wrong: "{{ wrongValue }}"</li>
      </ul>
    </div>
  </div>
</template>

<script>
import TextInputVerticalExact from './TextInputVerticalExact.vue'

export default {
  name: 'TextInputVerticalExactGroup',
  components: {
    TextInputVerticalExact
  },
  data() {
    return {
      defaultValue: 'Default Response',
      selectedValue: 'Selected Response',
      correctValue: 'Correct Answer',
      wrongValue: 'Wrong Answer',
      sampleImages: {
        default: 'https://placehold.co/143x97/E5E7EB/9CA3AF?text=Default',
        selected: 'https://placehold.co/143x97/FAF0C7/D97706?text=Selected',
        correct: 'https://placehold.co/143x97/ECFEF2/39A05D?text=Correct',
        wrong: 'https://placehold.co/143x97/FFEBE9/B9473B?text=Wrong'
      },
      debugInfo: {
        clicks: 0,
        lastAction: 'none'
      }
    };
  },
  methods: {
    handleClick(variant, event) {
      this.debugInfo.clicks++;
      this.debugInfo.lastAction = `${variant} clicked`;
      console.log(`TextInputVerticalExact ${variant} clicked:`, event);
    }
  }
}
</script>

<style scoped>
.text-input-vertical-exact-group {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Italian Plate No2', sans-serif;
}

.group-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #072C54;
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #072C54, #39A05D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.horizontal-group {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.variant-container {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  min-width: 220px;
  max-width: 250px;
}

.variant-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.variant-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #072C54;
  margin-bottom: 8px;
}

.variant-specs {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.4;
  min-height: 40px;
}

.technical-specs {
  background: #f0f4f8;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
}

.technical-specs h3 {
  font-size: 1.5rem;
  color: #072C54;
  margin-bottom: 20px;
  text-align: center;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.spec-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.spec-item h4 {
  color: #072C54;
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.spec-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.spec-item li {
  color: #555;
  margin-bottom: 6px;
  padding-left: 16px;
  position: relative;
  font-size: 0.9rem;
}

.spec-item li:before {
  content: "▸";
  position: absolute;
  left: 0;
  color: #39A05D;
  font-weight: bold;
}

.text-only-section {
  background: #f9f9f9;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 40px;
}

.text-only-section h3 {
  font-size: 1.5rem;
  color: #072C54;
  margin-bottom: 20px;
  text-align: center;
}

.text-only-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.text-example {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.text-example label {
  display: block;
  font-weight: 600;
  color: #072C54;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.debug-info {
  background: #2d3748;
  color: white;
  border-radius: 16px;
  padding: 25px;
  font-family: 'Courier New', monospace;
}

.debug-info h3 {
  color: #68d391;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.debug-info p {
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.debug-info ul {
  list-style: none;
  padding-left: 20px;
  margin: 0;
}

.debug-info li {
  margin-bottom: 4px;
  font-size: 0.85rem;
  color: #cbd5e0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .horizontal-group {
    flex-direction: column;
    align-items: center;
  }
  
  .variant-container {
    width: 100%;
    max-width: 300px;
  }
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
  
  .text-only-grid {
    grid-template-columns: 1fr;
  }
  
  .group-title {
    font-size: 2rem;
  }
}
</style>

<!-- 
  TEXTINPUT VERTICAL EXACT GROUP - SHOWCASE FOR INPUT.TXT COMPONENTS:
  
  COMPONENT FEATURES:
  ✅ Displays all four exact variants from input.txt specifications
  ✅ Technical specifications section showing exact colors and padding
  ✅ Text-only mode examples
  ✅ Debug information for interaction tracking
  ✅ Responsive design for all screen sizes
  
  EXACT SPECIFICATIONS IMPLEMENTED:
  ✅ Correct (Status True): #39A05D, #ECFEF2, p-6, font-medium, points display
  ✅ Wrong (Status False): #B9473B, #FFEBE9, px-6 py-2.5, font-medium
  ✅ Selected: #072C54, #09091A, #FAF0C7, p-6, font-semibold  
  ✅ Default: #072C54, #09091A, #FFFFFF, p-6, font-semibold
  
  KEY DIFFERENCES FROM ORIGINAL COMPONENT:
  ✅ Selected state uses lighter yellow (#FAF0C7) instead of #F6E291
  ✅ Wrong answer uses different padding (px-6 py-2.5 vs p-6)
  ✅ Points display structure matches input.txt exactly
  ✅ All color values match input.txt specifications precisely
-->
