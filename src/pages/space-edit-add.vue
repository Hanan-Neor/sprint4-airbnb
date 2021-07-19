<template>
  <section class="add-space">
    <form class="add-space-form full">
      <div class="welcome flex item">
        <div class="left-part">hi</div>
        <div class="right-part">
          <h1>Become a Host in 10 easy steps.</h1>
          <h2>Join us. We'll help you every step of the way</h2>
          <gradient-btn :text="'Let\'s go!'"></gradient-btn>
        </div>
      </div>

      <div class="welcome flex item">
        <div class="left-part">
          <h1>What kind of place will you host?</h1>
        </div>
        <div class="right-part">
          <ul class="type-list clear-list">
            <li>
              <input
                type="radio"
                value="home"
                v-model="spaceToEdit.type"
                id="radio1"
              />
              <label for="radio1">Home</label>
            </li>
            <li>
              <input
                type="radio"
                value="cabin"
                v-model="spaceToEdit.type"
                id="radio2"
              />
              <label for="radio2">Cabin</label>
            </li>
            <li>
              <input
                type="radio"
                value="villa"
                v-model="spaceToEdit.type"
                id="radio3"
              />
              <label for="radio3">Villa</label>
            </li>
            <li>
              <input
                type="radio"
                value="townhouse"
                v-model="spaceToEdit.type"
                id="radio4"
              />
              <label for="radio4">Townhouse</label>
            </li>
            <li>
              <input
                type="radio"
                value="bungalow"
                v-model="spaceToEdit.type"
                id="radio5"
              />
              <label for="radio5">Bangalow</label>
            </li>
            <li>
              <input
                type="radio"
                value="earth_house"
                v-model="spaceToEdit.type"
                id="radio6"
              />
              <label for="radio6">Earth House</label>
            </li>
            <li>
              <input
                type="radio"
                value="hut"
                v-model="spaceToEdit.type"
                id="radio7"
              />
              <label for="radio7">Hut</label>
            </li>
            <li>
              <input
                type="radio"
                value="farm"
                v-model="spaceToEdit.type"
                id="radio1"
              />
              <label for="radio1">Farm</label>
            </li>
            <li>
              <input
                type="radio"
                value="home"
                v-model="spaceToEdit.type"
                id="radio1"
              />
              <label for="radio1">Home</label>
            </li>
            <li>
              <input
                type="radio"
                value="home"
                v-model="spaceToEdit.type"
                id="radio1"
              />
              <label for="radio1">Home</label>
            </li>
          </ul>
        </div>
      </div>
    </form>
  </section>
  <!--<section class="space-edit-add app-main">
     <div class="popup-form">
      <h3>Edit/ add a space</h3>
      <form @submit.prevent="save">
        <label for="name">Space name</label>
        <input
          id="name"
          type="text"
          class="text-input"
          placeholder="name"
          v-model="spaceToEdit.type"
        />
        <input
          type="file"
          id="imgFiles"
          placeholder="upload photos"
          accept="image/*"
          multiple
        />
        <div class="label-container">
          <input
            class="num-input"
            id="price"
            type="number"
            step="0.01"
            min="0.00"
            placeholder="0.00"
            v-model="spaceToEdit.price"
            required
          />
          <label for="price">Price (in $)</label>
        </div>
        <input
          type="text"
          placeholder="description"
          v-model="spaceToEdit.description"
        />
        <div class="label-container">
          <input
            class="num-input"
            id="bedrooms"
            type="number"
            placeholder="0"
            min="0"
            v-model="spaceToEdit.bedrooms"
          />
          <label for="bedrooms">no. of bedrooms</label>
        </div>
        <div class="label-container">
          <input
            class="num-input"
            id="rooms"
            type="number"
            placeholder="0"
            min="0"
            v-model="spaceToEdit.rooms"
          />

          <label for="rooms">no. rooms</label>
        </div>
        <div class="label-container">
          <input
            class="num-input"
            id="beds"
            type="number"
            placeholder="0"
            min="0"
            v-model="spaceToEdit.beds"
          />
          <label for="beds">no. beds</label>
        </div>
        <div class="label-container">
          <input
            class="num-input"
            id="bathrooms"
            type="number"
            placeholder="0"
            min="0"
            v-model="spaceToEdit.bathrooms"
          />
          <label for="bathrooms">no. bathrooms</label>
        </div>
        <div class="label-container">
          <input
            class="num-input"
            id="sofas"
            type="number"
            placeholder="0"
            min="0"
            v-model="spaceToEdit.sofas"
          />
          <label for="sofas">no. sofas</label>
        </div>
        <div class="label-container">
          <input
            class="num-input"
            id="capacity"
            type="number"
            min="0"
            v-model="spaceToEdit.capacity"
          />
          <label for="capacity">capacity</label>
        </div>

        <div class="flex two-col">
          <div class="amenities">
            <div>
              <input type="checkbox" id="TV" name="TV" v-model="amenities.TV" />
              <label for="TV">TV</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="wifi"
                name="wifi"
                v-model="amenities.wifi"
              />
              <label for="wifi">wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="bath"
                name="bath"
                v-model="amenities.bath"
              />
              <label for="bath">bath</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="kitchen"
                name="kitchen"
                v-model="amenities.kitchen"
              />
              <label for="kitchen">kitchen</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="free_parking"
                name="free_parking"
                v-model="amenities.free_parking"
              />
              <label for="free_parking">free parking</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="washing_machine"
                name="washing_machine"
                v-model="amenities.washing_machine"
              />
              <label for="washing_machine">washing machine</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="smoke_alarm"
                name="smoke_alarm"
                v-model="amenities.smoke_alarm"
              />
              <label for="smoke_alarm">smoke alarm</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="lockbox"
                name="lockbox"
                v-model="amenities.lockbox"
              />
              <label for="lockbox">lockbox</label>
            </div>
            <div>
              <input type="checkbox" id="ac" name="ac" v-model="amenities.ac" />
              <label for="ac">ac</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="cameras"
                name="cameras"
                v-model="amenities.cameras"
              />
              <label for="cameras">security cameras</label>
            </div>
          </div>

          <div class="type">
            <div>
              <input
                type="radio"
                id="home"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="home"
              />
              <label for="home">home</label>
            </div>
            <div>
              <input
                type="radio"
                id="cabin"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="cabin"
              />
              <label for="cabin">cabin</label>
            </div>
            <div>
              <input
                type="radio"
                id="villa"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="villa"
              />
              <label for="villa">villa</label>
            </div>
            <div>
              <input
                type="radio"
                id="townhouse"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="townhouse"
              />
              <label for="townhouse">townhouse</label>
            </div>
            <div>
              <input
                type="radio"
                id="bungalow"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="bungalow"
              />
              <label for="bungalow">bungalow</label>
            </div>
            <div>
              <input
                type="radio"
                id="earth_house"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="earth_house"
              />
              <label for="earth_house">earth_house</label>
            </div>
            <div>
              <input
                type="radio"
                id="hut"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="hut"
              />
              <label for="hut">hut</label>
            </div>
            <div>
              <input
                type="radio"
                id="farm"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="farm"
              />
              <label for="farm">farm</label>
            </div>
            <div>
              <input
                type="radio"
                id="chalet"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="chalet"
              />
              <label for="chalet">chalet</label>
            </div>
            <div>
              <input
                type="radio"
                id="lighthouse"
                name="spaceType"
                v-model="spaceToEdit.type"
                value="lighthouse"
              />
              <label for="lighthouse">lighthouse</label>
            </div>
          </div>
        </div>
        <label for="country">country</label>
        <input
          type="text"
          id="country"
          class="text-input"
          placeholder="country"
          v-model="spaceToEdit.loc.country"
          required
        />
        <label for="address">address</label>
        <input
          type="text"
          id="address"
          class="text-input"
          placeholder="address"
          v-model="spaceToEdit.loc.address"
          required
        />

        <button>Save</button>
      </form>
      <button @click="goBack">back</button>
     </div>
  </section>  -->
</template>

<script>
import { spaceService } from './../services/space.service';
import gradientBtn from '../cmps/gradient-btn.vue';

export default {
  name: 'spaceEditAdd',
  data() {
    return {
      spaceToEdit: spaceService.getEmptySpace(),
      amenities: {
        TV: false,
        wifi: false,
        bath: false,
        kitchen: false,
        washing_machine: false,
        free_parking: false,
        smoke_alarm: false,
        lockbox: false,
        ac: false,
        cameras: false,
      },
    };
  },

  methods: {
    save() {
      console.log('saving the form...', this.spaceToEdit);
      this.$store
        .dispatch({ type: 'saveSpace', space: this.spaceToEdit })
        .then((savedSpace) => {
          this.$router.push('/space');
          //   showMsg("space added/ removed");
        })
        .catch((err) => {
          console.log('cannot save space', err);
          // showMsg('cannot save space')
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    spaceId() {
      return this.$route.params.spaceId || '';
    },
  },
  created() {
    if (this.spaceId) {
      this.$store
        .dispatch({ type: 'getSpaceById', spaceId: this.spaceId })
        .then((space) => {
          this.spaceToEdit = JSON.parse(JSON.stringify(space));
        });
    }
  },

  components: {
    gradientBtn,
  },
};
</script>
