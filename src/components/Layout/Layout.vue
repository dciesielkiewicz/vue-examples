<template>
  <Background>
    <Header />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col xs="12" sm="8" lg="6">
            <div class="pt-12 pb-8">
              <slot />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </Background>
</template>

<script lang="ts">
import { Background } from "../Background";
import { Header } from "../Header";

export default {
  name: "Layout",
  components: {
    Background,
    Header,
  },
};
</script>
