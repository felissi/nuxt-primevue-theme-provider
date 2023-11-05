<template>
  <div class="card flex justify-content-center">
    <Calendar v-model="date">
      <template #date="slotProps">
        <strong
          v-if="slotProps.date.day > 10 && slotProps.date.day < 15"
          style="text-decoration: line-through"
          >{{ slotProps.date.day }}</strong
        >
        <template v-else>{{ slotProps.date.day }}</template>
      </template>
    </Calendar>
    <div class="card flex justify-content-center">
      <Dropdown
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        placeholder="Select a City"
        class="w-full md:w-14rem"
      />
    </div>
  </div>
  <div class="card flex flex-wrap justify-content-center gap-3">
    <div class="flex align-items-center">
      <Checkbox
        v-model="pizza"
        inputId="ingredient1"
        name="pizza"
        value="Cheese"
      />
      <label for="ingredient1" class="ml-2"> Cheese </label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        v-model="pizza"
        inputId="ingredient2"
        name="pizza"
        value="Mushroom"
      />
      <label for="ingredient2" class="ml-2"> Mushroom </label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        v-model="pizza"
        inputId="ingredient3"
        name="pizza"
        value="Pepper"
      />
      <label for="ingredient3" class="ml-2"> Pepper </label>
    </div>
    <div class="flex align-items-center">
      <Checkbox
        v-model="pizza"
        inputId="ingredient4"
        name="pizza"
        value="Onion"
      />
      <label for="ingredient4" class="ml-2"> Onion </label>
    </div>
  </div>
  <InputSwitch v-model="checked" />
  <Button>qweqwe</Button>
  <Message severity="success">Success Message</Message>
  <Message severity="info">Info Message</Message>
  <Message severity="warn">Warning Message</Message>
  <Message severity="error">Error Message</Message>
</template>

<script setup>
// import "primevue/resources/themes/lara-light-indigo/theme.css";
// import "./mytheme.css";
import "./theme/mytheme.scss";
import { ref } from "vue";
import Calendar from "primevue/calendar";
useHead({
  style: [
    {
      innerHTML: `:root {
        --test-color: #123123;
        --test-radius: 12px;
        --test-checkbox-radius: 30px;
      }`,
    },
  ],
});

const date = ref();

const selectedCity = ref();
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);
const pizza = ref();
const checked = ref(false);
</script>
