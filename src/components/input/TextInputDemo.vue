<template>
  <div class="demo-app">
    <div class="demo-header">
      <h1>TextInput Group Demo</h1>
      <p>Interactive Vue 3 TextInput components with 4 visual variants</p>
    </div>
    
    <!-- Horizontal Group Display -->
    <div class="main-demo">
      <h2>🎯 Horizontal Layout - All Four Variants</h2>
      <TextInputGroup />
    </div>
    
    <!-- Individual Controls -->
    <div class="individual-demo">
      <h2>🔧 Individual Component Testing</h2>
      
      <div class="controls-section">
        <h3>Control Values:</h3>
        <div class="controls-grid">
          <div class="control-item">
            <label>Default Value:</label>
            <input v-model="defaultValue" type="text" placeholder="Type here..." />
          </div>
          <div class="control-item">
            <label>Selected Value:</label>
            <input v-model="selectedValue" type="text" />
          </div>
          <div class="control-item">
            <label>Correct Value:</label>
            <input v-model="correctValue" type="text" />
          </div>
          <div class="control-item">
            <label>Wrong Value:</label>
            <input v-model="wrongValue" type="text" />
          </div>
          <div class="control-item">
            <label>Points:</label>
            <input v-model="points" type="number" />
          </div>
        </div>
      </div>
      
      <div class="individual-inputs">
        <div class="input-row">
          <div class="input-demo">
            <h4>Default Input</h4>
            <TextInput 
              v-model="defaultValue"
              placeholder="Response"
              @input="handleInput('default', $event)"
            />
          </div>
          
          <div class="input-demo">
            <h4>Selected State</h4>
            <TextInput 
              v-model="selectedValue"
              :isSelected="true"
            />
          </div>
        </div>
        
        <div class="input-row">
          <div class="input-demo">
            <h4>Correct Answer</h4>
            <TextInput 
              v-model="correctValue"
              :isCorrectAnswer="true"
              :points="points"
            />
          </div>
          
          <div class="input-demo">
            <h4>Wrong Answer</h4>
            <TextInput 
              v-model="wrongValue"
              :isWrongAnswer="true"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Debug Info -->
    <div class="debug-section">
      <h3>🐛 Debug Information</h3>
      <div class="debug-grid">
        <div class="debug-item">
          <strong>Default Value:</strong> {{ defaultValue || '(empty)' }}
        </div>
        <div class="debug-item">
          <strong>Selected Value:</strong> {{ selectedValue || '(empty)' }}
        </div>
        <div class="debug-item">
          <strong>Correct Value:</strong> {{ correctValue || '(empty)' }}
        </div>
        <div class="debug-item">
          <strong>Wrong Value:</strong> {{ wrongValue || '(empty)' }}
        </div>
        <div class="debug-item">
          <strong>Points:</strong> {{ points }}
        </div>
        <div class="debug-item">
          <strong>Last Input:</strong> {{ lastInput || '(none)' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TextInput, TextInputGroup } from './index'

export default {
  name: 'TextInputDemo',
  components: {
    TextInput,
    TextInputGroup
  },
  data() {
    return {
      defaultValue: '',
      selectedValue: 'My Selected Response',
      correctValue: 'Correct Answer Text',
      wrongValue: 'Wrong Answer Text',
      points: 1500,
      lastInput: ''
    }
  },
  methods: {
    handleInput(type, value) {
      this.lastInput = `${type}: ${value}`
      console.log('Input changed:', { type, value })
    }
  }
}
</script>

<style scoped>
.demo-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Italian Plate No2', Arial, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 50px;
}

.demo-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #072C54;
  margin-bottom: 16px;
}

.demo-header p {
  font-size: 1.25rem;
  color: #666;
  line-height: 1.6;
}

.main-demo {
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.main-demo h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #072C54;
  margin-bottom: 30px;
  text-align: center;
}

.individual-demo {
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.individual-demo h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #072C54;
  margin-bottom: 30px;
  text-align: center;
}

.controls-section {
  margin-bottom: 40px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
}

.controls-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #072C54;
  margin-bottom: 20px;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-item label {
  font-weight: 600;
  color: #072C54;
  font-size: 14px;
}

.control-item input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Italian Plate No2', Arial, sans-serif;
  font-size: 14px;
}

.control-item input:focus {
  outline: none;
  border-color: #072C54;
  box-shadow: 0 0 0 2px rgba(7, 44, 84, 0.1);
}

.individual-inputs {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.input-row {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.input-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  min-width: 280px;
}

.input-demo h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #072C54;
  margin: 0;
}

.debug-section {
  background: #2d3748;
  color: white;
  border-radius: 16px;
  padding: 30px;
}

.debug-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.debug-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.debug-item {
  background: #4a5568;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
}

.debug-item strong {
  color: #68d391;
}

/* Responsive Design */
@media (max-width: 768px) {
  .demo-app {
    padding: 20px 10px;
  }
  
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .main-demo, .individual-demo {
    padding: 20px;
  }
  
  .input-row {
    flex-direction: column;
    align-items: center;
  }
  
  .input-demo {
    min-width: 100%;
    max-width: 350px;
  }
  
  .controls-grid {
    grid-template-columns: 1fr;
  }
  
  .debug-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<!-- 
  TEXTINPUT DEMO COMPONENT:
  
  This component demonstrates the TextInputGroup and individual TextInput components
  in an interactive environment where you can:
  
  ✅ See all 4 variants displayed horizontally via TextInputGroup
  ✅ Test individual TextInput components with real-time value updates
  ✅ Control the content and points values through input controls
  ✅ Monitor debug information to see how the components react
  
  FEATURES:
  - Live editing of component values
  - Interactive demonstration of all variants
  - Responsive design for mobile and desktop
  - Debug section for monitoring component state
  - Beautiful styling consistent with the component design
  
  USAGE:
  Import this component into your Vue app to test the TextInput functionality
-->
