<script setup>
const isModalOpen = ref(false)



</script>

<template>
   <div>
     <button 
       class="floating-button"
     >
       <Icon class="plus-icon" name="material-symbols:add-2-rounded" />
     </button>
     <!-- @click="isModalOpen = true" -->
 
      <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
        <div class="modal-content">
         <slot/>
          <!--
            <div class="rounded-[5px] border-solid border-purple border pt-2.5 pr-[22px] pb-2.5 pl-[22px] flex flex-col gap-2.5 items-start justify-start relative">
              <div class="shrink-0 w-[66px] h-[18px] static">
                <div class="text-purple text-left font-['Kanit-Medium',_sans-serif] text-lg leading-none font-medium uppercase absolute left-[22px] top-2.5">
                  Cancel
                </div>
              </div>
            </div>
          -->
         <button class="close-button" @click="isModalOpen = false">×</button>
        </div>
      </div>
      
   </div>
 </template>
 
 <style scoped>
 
 .floating-button {
   position: fixed;
   bottom: 30px;
   right: 30px;
   width: 60px;
   height: 60px;
   border-radius: 50%;
   background-color: #6C63FF;
   color: white;
   border: none;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
   cursor: pointer;
   font-size: 24px;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 1000;
   transition: all 0.3s ease;
 }
 
 .floating-button:hover {
   background-color: #574eff;
   transform: scale(1.1);
 }
/* 
 .floating-button:hover {
  background-color: #3e8e41;
} */

 /* .floating-button:active {
  transform: scale(0.95);
} */
 
 .plus-icon {
   font-size: 32px;
   line-height: 1;
 }
 
 .modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1001;
 }
 
 .modal-content {
   background-color: white;
   padding: 30px;
   border-radius: 16px;
   max-width: 80%;
   max-height: 80%;
   overflow-y: auto;
   position: relative;
   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
 }
 
 .close-button {
   position: absolute;
   top: 10px;
   right: 10px;
   background: none;
   border: none;
   font-size: 24px;
   cursor: pointer;
   color: #666;
 }

 

 @media (max-width: 768px) {
  .floating-button {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }
}
 </style>