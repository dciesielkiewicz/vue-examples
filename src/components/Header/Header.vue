<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="isMenuOpened = !isMenuOpened"
        aria-label="Toggle menu"
      />
    </v-app-bar>
    <v-navigation-drawer
      app
      aria-label="Navigation menu"
      temporary
      v-model="isMenuOpened"
    >
      <div class="pt-4">
        <v-list nav>
          <v-list-item-group>
            <v-list-item
              link
              :to="HOME_PATH"
              @click.stop="isMenuOpened = false"
            >
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              :to="TODO_PATH"
              @click.stop="isMenuOpened = false"
            >
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Todo</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { HOME_PATH, TODO_PATH } from "@/router/paths";

interface IData {
  HOME_PATH: string;
  isMenuOpened: boolean;
  TODO_PATH: string;
}

export default {
  name: "Header",
  data(): IData {
    return {
      HOME_PATH,
      isMenuOpened: false,
      TODO_PATH,
    };
  },
};
</script>
