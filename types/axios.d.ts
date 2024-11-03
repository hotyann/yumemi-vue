import axios from 'axios';

declare module '#app' {
  interface NuxtApp {
    $axios: typeof axios;
  }
}
