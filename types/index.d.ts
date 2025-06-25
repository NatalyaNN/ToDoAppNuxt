// ~/types/index.d.ts
declare module '#app' {
   interface NuxtApp {
      $api: typeof globalThis.$fetch
   }
 }