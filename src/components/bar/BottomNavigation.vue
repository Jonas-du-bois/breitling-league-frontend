<template>
  <div class="bottom-navigation">
    <div class="navigation-container">      <!-- Success Tab -->
      <div 
        :data-state="activeTab === 'success' ? 'highlighted' : 'default'"
        class="nav-item"
        @click="$emit('navigate', 'success')"
      >
        <div class="nav-icon-container">
          <svg width="24" height="24" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.2288 3.64234L8.1414 5.495L10.1853 5.79036C10.3946 5.8206 10.4783 6.07783 10.3268 6.22543L8.8485 7.66589L9.1975 9.7013C9.2332 9.9097 9.0144 10.0686 8.8273 9.97L7.0001 9.0076L5.1728 9.97C4.98566 10.0686 4.76674 9.9096 4.80266 9.7011L5.1534 7.66589L3.67339 6.22553C3.52177 6.07798 3.60539 5.82061 3.81478 5.79036L5.8587 5.495L6.7713 3.64234C6.8648 3.45255 7.1354 3.45255 7.2288 3.64234ZM14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 8.907 0.76256 10.6359 1.99937 11.8983L2.0008 19.2502L2.00774 19.3547C2.08074 19.8973 2.71499 20.1927 3.18265 19.8634L6.9991 17.1757L10.8175 19.8635L10.907 19.918C11.3926 20.1706 11.9992 19.8221 11.9992 19.2502L12.0006 11.8983C13.2374 10.6359 14 8.907 14 7ZM10.4994 13.0639L10.4992 17.8051L7.4306 15.6452L7.3298 15.5853C7.0866 15.4657 6.7937 15.4857 6.5671 15.6453L3.5008 17.8047L3.50058 13.0639C4.53006 13.6592 5.7252 14 7 14C8.2748 14 9.4699 13.6592 10.4994 13.0639ZM1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7Z" 
                  :fill="activeTab === 'success' ? '#FFC72C' : '#09091A'"/>
          </svg>
        </div>
        <div class="nav-label" 
             :class="activeTab === 'success' ? 'text-color-primary-yellow-100' : 'text-color-secondary-black'">
          Success
        </div>
      </div>

      <!-- Docs Tab -->
      <div 
        :data-state="activeTab === 'docs' ? 'highlighted' : 'default'"
        class="nav-item"
        @click="$emit('navigate', 'docs')"
      >
        <div class="nav-icon-container">
          <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75 6C7.75 5.73478 7.85536 5.48043 8.04289 5.29289C8.23043 5.10536 8.48478 5 8.75 5H16.75C17.0152 5 17.2696 5.10536 17.4571 5.29289C17.6446 5.48043 17.75 5.73478 17.75 6V8C17.75 8.26522 17.6446 8.51957 17.4571 8.70711C17.2696 8.89464 17.0152 9 16.75 9H8.75C8.48478 9 8.23043 8.89464 8.04289 8.70711C7.85536 8.51957 7.75 8.26522 7.75 8V6ZM9.25 7.5H16.25V6.5H9.25V7.5Z" 
                  :fill="activeTab === 'docs' ? '#FFC72C' : '#09091A'"/>
            <path d="M4.75 4.5C4.75 3.83696 5.01339 3.20107 5.48223 2.73223C5.95107 2.26339 6.58696 2 7.25 2H18.75C19.0783 2 19.4034 2.06466 19.7067 2.1903C20.01 2.31594 20.2856 2.50009 20.5178 2.73223C20.7499 2.96438 20.9341 3.23998 21.0597 3.54329C21.1853 3.84661 21.25 4.1717 21.25 4.5V18.75C21.25 18.9489 21.171 19.1397 21.0303 19.2803C20.8897 19.421 20.6989 19.5 20.5 19.5H6.25C6.25 19.7652 6.35536 20.0196 6.54289 20.2071C6.73043 20.3946 6.98478 20.5 7.25 20.5H20.5C20.6989 20.5 20.8897 20.579 21.0303 20.7197C21.171 20.8603 21.25 21.0511 21.25 21.25C21.25 21.4489 21.171 21.6397 21.0303 21.7803C20.8897 21.921 20.6989 22 20.5 22H7.25C6.58696 22 5.95107 21.7366 5.48223 21.2678C5.01339 20.7989 4.75 20.163 4.75 19.5V4.5ZM6.25 18H19.75V4.5C19.75 4.23478 19.6446 3.98043 19.4571 3.79289C19.2696 3.60536 19.0152 3.5 18.75 3.5H7.25C6.98478 3.5 6.73043 3.60536 6.54289 3.79289C6.35536 3.98043 6.25 4.23478 6.25 4.5V18Z" 
                  :fill="activeTab === 'docs' ? '#FFC72C' : '#09091A'"/>
          </svg>
        </div>
        <div class="nav-label" 
             :class="activeTab === 'docs' ? 'text-color-primary-yellow-100' : 'text-color-secondary-black'">
          Docs
        </div>
      </div>      <!-- Playzone Tab -->
      <div 
        :data-state="activeTab === 'playzone' ? 'highlighted' : 'default'"
        class="nav-item"
        @click="$emit('navigate', 'playzone')"
      >
        <div class="nav-icon-container">
          <svg width="24" height="24" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.80826 0.507689C7.2793 0.243289 6.69852 0.201529 6.1698 0.302269L4.98717 0.527589C4.12539 0.691789 3.38365 1.24525 2.98331 2.02794C1.61632 4.70048 0.582692 6.8895 0.183992 8.7567C-0.227218 10.6826 0.0241826 12.3319 1.2632 13.8331C2.08481 14.8286 3.49285 14.6274 4.22669 13.797C4.78546 13.1647 5.42172 12.4325 6.04401 11.7109C6.45381 11.2357 7.04867 10.9623 7.67372 10.9623H12.3294C12.9545 10.9623 13.5493 11.2357 13.9591 11.7109C14.5814 12.4325 15.2177 13.1647 15.7764 13.797C16.5103 14.6274 17.9183 14.8286 18.7399 13.8331C19.9789 12.3319 20.2304 10.6826 19.8191 8.7567C19.4204 6.8895 18.3868 4.70048 17.0198 2.02794C16.6195 1.24525 15.8777 0.691789 15.016 0.527589L13.8333 0.302269C13.3046 0.201529 12.7238 0.243289 12.1949 0.507689C12.0512 0.579489 11.9039 0.65667 11.7554 0.73714C11.4002 0.92964 11.0191 1.03382 10.6424 1.03382H9.3607C8.984 1.03382 8.6029 0.92964 8.2477 0.73714C8.0992 0.65667 7.9519 0.579489 7.80826 0.507689ZM6.43715 1.70549C6.71249 1.65303 6.96637 1.68386 7.16957 1.78543C7.29676 1.84901 7.42995 1.91871 7.56709 1.99304C8.1066 2.28543 8.7198 2.46228 9.3607 2.46228H10.6424C11.2834 2.46228 11.8965 2.28543 12.436 1.99304C12.5732 1.91871 12.7064 1.84901 12.8336 1.78543C13.0368 1.68386 13.2906 1.65303 13.566 1.70549L14.7486 1.93082C15.1792 2.01286 15.5493 2.28983 15.7481 2.67844C17.1283 5.3769 18.0691 7.4017 18.4222 9.055C18.7627 10.6497 18.543 11.8276 17.6382 12.9239C17.5509 13.0297 17.4318 13.0792 17.2901 13.0728C17.1404 13.066 16.973 12.9939 16.8468 12.8511C16.2934 12.2248 15.6613 11.4974 15.0409 10.778C14.3613 9.99 13.3724 9.5338 12.3294 9.5338H7.67372C6.63075 9.5338 5.64183 9.99 4.96226 10.778C4.34182 11.4974 3.70972 12.2248 3.15628 12.8511C3.03013 12.9939 2.86276 13.066 2.713 13.0728C2.57138 13.0792 2.45225 13.0297 2.36491 12.9239C1.46011 11.8276 1.24047 10.6497 1.58097 9.055C1.93399 7.4017 2.87484 5.3769 4.25507 2.67844C4.45384 2.28983 4.82393 2.01286 5.25453 1.93082L6.43715 1.70549ZM10.0013 6.0004C10.5536 6.0004 11.0013 5.5527 11.0013 5.0004C11.0013 4.44814 10.5536 4.00043 10.0013 4.00043C9.4491 4.00043 9.0013 4.44814 9.0013 5.0004C9.0013 5.5527 9.4491 6.0004 10.0013 6.0004Z" 
                  :fill="activeTab === 'playzone' ? '#FFC72C' : '#09091A'"/>
          </svg>
        </div>
        <div class="nav-label" 
             :class="activeTab === 'playzone' ? 'text-color-primary-yellow-100' : 'text-color-secondary-black'">
          Playzone
        </div>
      </div>

      <!-- News Tab -->
      <div 
        :data-state="activeTab === 'news' ? 'highlighted' : 'default'"
        class="nav-item"
        @click="$emit('navigate', 'news')"
      >
        <div class="nav-icon-container">
          <svg width="24" height="24" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.6786 17.9244L11.2411 16.4123C11.3744 17.2925 10.9031 18.185 10.0458 18.5489C9.1885 18.9128 8.2192 18.6318 7.6786 17.9244ZM13.1113 0.093922C15.197 1.23347 16.7628 2.69659 17.793 4.48101C18.8232 6.26543 19.3075 8.353 19.2515 10.7291C19.2417 11.1432 18.8981 11.4709 18.484 11.4612C18.0699 11.4514 17.7421 11.1078 17.7519 10.6937C17.8016 8.5824 17.3804 6.76635 16.494 5.23101C15.6075 3.69566 14.2454 2.42285 12.3921 1.41027C12.0286 1.21167 11.8949 0.756002 12.0935 0.392502C12.2921 0.0290019 12.7478 -0.104678 13.1113 0.093922ZM3.96144 4.51547C6.82319 3.24134 10.1656 4.4461 11.5609 7.26099L11.6592 7.47041L12.9466 10.3623L14.6449 11.832C14.7376 11.9123 14.8179 12.0057 14.911 12.1568L14.9697 12.2711C15.2491 12.9024 14.9638 13.6407 14.3325 13.9201L4.00588 18.4902C3.84655 18.5607 3.67424 18.5972 3.5 18.5972C2.80964 18.5972 2.25 18.0375 2.25 17.3475L2.24892 15.0046L1.00654 12.2132C-0.306962 9.2631 1.01572 5.82699 3.96144 4.51547ZM2.3769 11.6032L3.74877 14.6855L3.74982 16.9632L13.3649 12.708L11.7122 11.2777L10.2953 8.0946L10.2103 7.91326C9.1789 5.83289 6.69847 4.93882 4.57154 5.88579C2.38205 6.86061 1.40056 9.4103 2.3769 11.6032ZM12.8737 3.69457C13.8407 4.22184 14.6157 4.9892 15.19 5.98387C15.7642 6.97855 16.0413 8.0334 16.0144 9.1345C16.0043 9.5486 15.6605 9.8761 15.2464 9.866C14.8323 9.8559 14.5048 9.512 14.5149 9.0979C14.5349 8.2763 14.3292 7.49294 13.8909 6.73387C13.4527 5.97481 12.8772 5.40494 12.1556 5.01151C11.792 4.81321 11.6579 4.35765 11.8562 3.99399C12.0545 3.63032 12.5101 3.49627 12.8737 3.69457Z" 
                  :fill="activeTab === 'news' ? '#FFC72C' : '#09091A'"/>
          </svg>
        </div>
        <div class="nav-label" 
             :class="activeTab === 'news' ? 'text-color-primary-yellow-100' : 'text-color-secondary-black'">
          News
        </div>
      </div>

      <!-- Profile Tab -->
      <div 
        :data-state="activeTab === 'profile' ? 'highlighted' : 'default'"
        class="nav-item"
        @click="$emit('navigate', 'profile')"
      >
        <div class="nav-icon-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" 
                  :stroke="activeTab === 'profile' ? '#FFC72C' : '#09091A'" 
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
                  :stroke="activeTab === 'profile' ? '#FFC72C' : '#09091A'" 
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="nav-label" 
             :class="activeTab === 'profile' ? 'text-color-primary-yellow-100' : 'text-color-secondary-black'">
          Profile
        </div>
      </div>    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNavigation',
  props: {
    activeTab: {
      type: String,
      default: 'playzone'
    }
  },
  emits: ['navigate']
}
</script>

<style scoped>
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px 16px 0 0;
}

.navigation-container {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px 20px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
  min-width: 60px;
  flex: 1;
  max-width: 80px;
}

.nav-item:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.nav-item[data-state="highlighted"]:hover {
  background: rgba(255, 199, 44, 0.1);
}

.nav-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  min-width: 24px;
}

.nav-label {
  font-family: "Italian Plate No2", sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
}

/* Icon and text styling */
.nav-icon-container svg {
  transition: all 0.3s ease;
}

.nav-item[data-state="highlighted"] .nav-icon-container svg {
  transform: scale(1.1);
}

/* Text color variants */
.text-color-secondary-black {
  color: var(--color-secondary-black, #000000);
}

.text-color-primary-yellow-100 {
  color: var(--color-primary-yellow-100, #FFC72C);
}

/* Active state styling */
.nav-item[data-state="highlighted"] {
  opacity: 1;
}

.nav-item[data-state="highlighted"] .nav-icon-container {
  background: rgba(255, 199, 44, 0.1);
  border-radius: 8px;
  padding: 4px;
}

.nav-item[data-state="default"] {
  opacity: 0.7;
}

.nav-item[data-state="default"]:hover {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 480px) {
  .navigation-container {
    padding: 0 12px;
  }
  
  .nav-item {
    min-width: 50px;
    max-width: 70px;
    padding: 6px 8px;
  }
  
  .nav-label {
    font-size: 11px;
  }
  
  .indicator-bar {
    width: 120px;
    height: 3px;
  }
}

@media (max-width: 360px) {
  .navigation-container {
    padding: 0 8px;
  }
  
  .nav-item {
    min-width: 45px;
    max-width: 60px;
    padding: 4px 6px;
    gap: 6px;
  }
  
  .nav-label {
    font-size: 10px;
  }
  
  .indicator-bar {
    width: 100px;
  }
}

/* Large screens - center the navigation with max width */
@media (min-width: 768px) {
  .bottom-navigation {
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    max-width: 400px;
    border-radius: 16px;
    margin-bottom: 20px;
  }
  
  .navigation-container {
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>
