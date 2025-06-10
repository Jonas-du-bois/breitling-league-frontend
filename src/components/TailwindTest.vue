<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-center mb-8 font-italian-plate-no2 text-color-secondary-black">
      Tailwind CSS Integration Test
    </h1>
    
    <!-- Color Palette Test -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 font-italian-plate-no2 text-color-primary-blue-100">Custom Colors</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 bg-color-secondary-black text-white rounded-lg">
          <div class="font-italian-plate-no2 font-semibold">Secondary Black</div>
          <div class="text-sm">#000000</div>
        </div>
        <div class="p-4 bg-color-primary-blue-100 text-white rounded-lg">
          <div class="font-italian-plate-no2 font-semibold">Primary Blue</div>
          <div class="text-sm">#072C54</div>
        </div>
        <div class="p-4 bg-color-primary-yellow-100 text-color-secondary-black rounded-lg">
          <div class="font-italian-plate-no2 font-semibold">Primary Yellow</div>
          <div class="text-sm">#FFC72C</div>
        </div>
        <div class="p-4 bg-card-background-color-light border border-card-stroke-color rounded-lg">
          <div class="font-italian-plate-no2 font-semibold text-card-text-color-dark">Card Background</div>
          <div class="text-sm text-badge-label-color-light">#FFFFFF</div>
        </div>
      </div>
    </div>

    <!-- Typography Test -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 font-italian-plate-no2 text-color-primary-blue-100">Typography</h2>
      <div class="space-y-2">
        <div class="text-3xl font-semibold font-italian-plate-no2 text-card-text-color-dark">3XL Semibold - Italian Plate No2</div>
        <div class="text-xl font-normal font-italian-plate-no2 text-color-secondary-black">XL Normal - Italian Plate No2</div>
        <div class="text-lg font-semibold text-color-primary-yellow-100">LG Semibold - Default Font</div>
      </div>
    </div>

    <!-- Mini ChapterCard Preview -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 font-italian-plate-no2 text-color-primary-blue-100">ChapterCard Elements Test</h2>
      
      <!-- Time Booster Bar -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 font-italian-plate-no2">Time Booster Bar</h3>
        <div class="w-96 h-6 relative bg-color-primary-yellow-100 inline-flex justify-center items-center">
          <div class="inline-flex justify-start items-start">
            <span class="text-color-secondary-black text-xl font-semibold font-italian-plate-no2">08</span>
            <span class="text-color-secondary-black text-xl font-normal font-italian-plate-no2">D</span>
            <span class="text-color-secondary-black text-xl font-semibold font-italian-plate-no2"> 12</span>
            <span class="text-color-secondary-black text-xl font-normal font-italian-plate-no2">H</span>
            <span class="text-color-secondary-black text-xl font-semibold font-italian-plate-no2"> 24</span>
            <span class="text-color-secondary-black text-xl font-normal font-italian-plate-no2">M</span>
          </div>
          <!-- Bonus Multiplier Circle -->
          <div class="w-11 h-11 left-[47px] top-[-19px] absolute bg-color-primary-yellow-100 rounded-[100px] border border-color-secondary-black inline-flex justify-center items-center">
            <div class="text-color-secondary-black text-2xl font-semibold font-italian-plate-no2">x2</div>
          </div>
        </div>
      </div>

      <!-- Points Display -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 font-italian-plate-no2">Points Display</h3>
        <div class="inline-flex items-center gap-2">
          <span class="text-color-primary-yellow-100 text-3xl font-semibold font-italian-plate-no2">450'300</span>
          <span class="text-color-primary-blue-100 text-xl font-semibold font-italian-plate-no2"> pts left</span>
        </div>
      </div>

      <!-- Unit Card Sample -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 font-italian-plate-no2">Unit Card Sample</h3>
        <div class="h-52 p-4 bg-card-background-color-light shadow-[0px_0px_8px_0px_rgba(193,200,210,1.00)] outline outline-1 outline-offset-[-1px] outline-card-stroke-color inline-flex flex-col justify-end items-end gap-8 overflow-hidden w-48">
          <div class="w-32 justify-start text-card-text-color-dark text-xl font-semibold font-italian-plate-no2 uppercase">
            Sample Unit Title
          </div>
          <div class="justify-start">
            <span class="text-color-primary-yellow-100 text-xl font-semibold font-italian-plate-no2 uppercase">100'300 </span>
            <span class="text-color-primary-blue-100 text-xl font-semibold font-italian-plate-no2">pts left</span>
          </div>
          <div class="p-1 bg-color-secondary-grey-100 inline-flex justify-center items-center gap-1">
            <div class="w-4 h-4 relative overflow-hidden">
              <div class="w-2 h-2 left-[1.50px] top-[6.75px] absolute outline outline-2 outline-offset-[-1px] outline-icon-color-dark-default"></div>
            </div>
            <div class="justify-start text-badge-label-color-light text-[10px] font-normal font-italian-plate-no2">Badge Text</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Responsive Test -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 font-italian-plate-no2 text-color-primary-blue-100">Responsive Design Test</h2>
      <div class="w-96 md:w-80 lg:w-96 bg-card-background-color-light p-4 border border-card-stroke-color">
        <p class="font-italian-plate-no2">This container should be responsive: w-96 on large screens, w-80 on medium screens, w-96 on large screens.</p>
      </div>
    </div>

    <!-- Status Indicator -->
    <div class="text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        <span class="font-italian-plate-no2 text-green-800 font-semibold">Tailwind CSS is properly configured and working!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TailwindTest'
}
</script>
