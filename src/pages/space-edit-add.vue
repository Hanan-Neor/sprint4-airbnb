<template>
  <section class="add-space">
    <header class="add-space-header">
      <div class="logo"></div>
      <router-link to="/" class="exit-btn">Exit</router-link>
    </header>

    <form class="add-space-form full">
      <div class="welcome flex item" v-if="currentTab === 0">
        <div class="left-part"></div>
        <div class="right-part">
          <h1>Become a Host in 10 easy steps.</h1>
          <h2>Join us. We'll help you every step of the way</h2>
          <gradient-btn
            :text="'Let\'s go!'"
            @click.native="nextPrev(1)"
          ></gradient-btn>
        </div>
      </div>

      <div class="type flex item" v-if="currentTab === 1">
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
                id="radio8"
              />
              <label for="radio8">Farm</label>
            </li>
            <li>
              <input
                type="radio"
                value="chalet"
                v-model="spaceToEdit.type"
                id="radio9"
              />
              <label for="radio9">Chalet</label>
            </li>
            <li>
              <input
                type="radio"
                value="lighthouse"
                v-model="spaceToEdit.type"
                id="radio10"
              />
              <label for="radio10">Lighthouse</label>
            </li>
          </ul>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="location flex item" v-if="currentTab === 2">
        <div class="left-part">
          <h1>Where's your place located?</h1>
        </div>
        <div class="right-part">
          <div class="right-part-box">
            <h2>Enter your address</h2>
            <div class="address-container">
              <input
                type="text"
                placeholder="Address"
                v-model="spaceToEdit.loc.address"
              />
              <input
                type="text"
                placeholder="Country"
                v-model="spaceToEdit.loc.country"
              />
            </div>
          </div>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="capacity flex item" v-if="currentTab === 3">
        <div class="left-part">
          <h1>How many guests would you like to welcome?</h1>
        </div>
        <div class="right-part">
          <div class="capacity-box">
            <label for="capacity">Guests:</label>
            <div class="capacity-input">
              <div
                class="capacity-btn minus"
                @click="
                  spaceToEdit.capacity
                    ? spaceToEdit.capacity--
                    : spaceToEdit.capacity
                "
              >
                -
              </div>
              <input
                type="text"
                class="capacity-num"
                v-model="spaceToEdit.capacity"
              />
              <div class="capacity-btn plus" @click="spaceToEdit.capacity++">
                +
              </div>
            </div>
          </div>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="amenities flex item" v-if="currentTab === 4">
        <div class="left-part">
          <h1>Let guests know what your place has to offer</h1>
        </div>
        <div class="right-part">
          <div class="amenities-list">
            <div class="amenity">
              <input type="checkbox" id="tv" v-model="amenities.TV" />
              <label for="tv">TV</label>
            </div>
            <div class="amenity">
              <input type="checkbox" id="wifi" v-model="amenities.wifi" />
              <label for="wifi">wifi</label>
            </div>
            <div class="amenity">
              <input type="checkbox" id="bath" v-model="amenities.bath" />
              <label for="bath">Bath</label>
            </div>
            <div class="amenity">
              <input type="checkbox" id="kitchen" v-model="amenities.kitchen" />
              <label for="kitchen">Kitchen</label>
            </div>
            <div class="amenity">
              <input
                type="checkbox"
                id="free-parking"
                v-model="amenities.freeParking"
              />
              <label for="free-parking">Free parking</label>
            </div>
            <div class="amenity">
              <input
                type="checkbox"
                id="washing-machine"
                v-model="amenities.washingMachine"
              />
              <label for="washing-machine">Washing machine</label>
            </div>
            <div class="amenity">
              <input
                type="checkbox"
                id="smoke-alarm"
                v-model="amenities.smokeAlarm"
              />
              <label for="smoke-alarm">Smoke alarm</label>
            </div>
            <div class="amenity">
              <input type="checkbox" id="lockbox" v-model="amenities.lockbox" />
              <label for="lockbox">Lockbox</label>
            </div>
            <div class="amenity">
              <input
                type="checkbox"
                id="airConditioning"
                v-model="amenities.airConditioning"
              />
              <label for="airConditioning">Air conditioning</label>
            </div>
            <div class="amenity">
              <input
                type="checkbox"
                id="security-cameras"
                v-model="amenities.securityCameras"
              />
              <label for="security-cameras">Security cameras</label>
            </div>
          </div>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="imgs flex item" v-if="currentTab === 5">
        <div class="left-part">
          <h1>Next, let's add some photos of your place</h1>
        </div>
        <div class="right-part">
          <div class="right-part-content">
            <h2>Add at least 5 photos</h2>
            <div v-if="isLoading" class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div v-else class="imgs-upload">
              <label class="cover-photo">
                <img v-if="imgs[0]" :src="imgs[0]" alt="" />
                <div v-else class="img-icon"></div>
                <input type="file" id="imgUpload" @change="onUploadImg" />
              </label>
              <label>
                <img v-if="imgs[1]" :src="imgs[1]" alt="" />
                <div v-else class="img-icon"></div>

                <input
                  type="file"
                  name=""
                  id="imgUpload"
                  @change="onUploadImg"
                />
              </label>
              <label>
                <img v-if="imgs[2]" :src="imgs[2]" alt="" />
                <div v-else class="img-icon"></div>

                <input
                  type="file"
                  name=""
                  id="imgUpload"
                  @change="onUploadImg"
                />
              </label>
              <label>
                <img v-if="imgs[3]" :src="imgs[3]" alt="" />
                <div v-else class="img-icon"></div>

                <input
                  type="file"
                  name=""
                  id="imgUpload"
                  @change="onUploadImg"
                />
              </label>
              <label>
                <img v-if="imgs[4]" :src="imgs[4]" alt="" />
                <div v-else class="img-icon"></div>

                <input
                  type="file"
                  name=""
                  id="imgUpload"
                  @change="onUploadImg"
                />
              </label>
            </div>
          </div>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="name flex item" v-if="currentTab === 6">
        <div class="left-part">
          <h1>Let's give your place a name</h1>
        </div>
        <div class="right-part">
          <div class="right-part-content">
            <h2>Create your title</h2>
            <textarea v-model="spaceToEdit.name" maxlength="50" rows="4" />
          </div>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="description flex item" v-if="currentTab === 7">
        <div class="left-part">
          <h1>Now, let's describe your place</h1>
        </div>
        <div class="right-part">
          <div class="right-part-content">
            <h2>Create your description</h2>
            <textarea name="" id="" rows="4" v-model="spaceToEdit.description">
Get comfortable and enjoy plenty of extra room at this spacious place.</textarea
            >
          </div>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="price flex item" v-if="currentTab === 8">
        <div class="left-part">
          <h1>Now for the fun part—set your price</h1>
        </div>
        <div class="right-part">
          <div class="right-part-content">
            <div class="set-price">
              <button
                class="price-btn minus"
                @click="
                  spaceToEdit.price ? spaceToEdit.price-- : spaceToEdit.price
                "
              ></button>
              <input
                type="text"
                pattern="[0-9]*"
                v-model.number="spaceToEdit.price"
              />
              <button
                class="price-btn plus"
                @click="spaceToEdit.price++"
              ></button>
            </div>

            <p>per night</p>
            <gradient-btn @click.native="save" :text="'Save'"></gradient-btn>
          </div>
          <nav-btns-add-form
            :currentTab="currentTab"
            @nextPrev="nextPrev"
          ></nav-btns-add-form>
        </div>
      </div>

      <div class="steps">
        <span
          class="step"
          :class="{ active: currentTab === idx, finish: currentTab > idx }"
          v-for="idx of 8"
          :key="idx"
        ></span>
      </div>
    </form>

  </section>
</template>

<script>
import { spaceService } from './../services/space.service';
import { uploadImg } from './../services/img.service';
import { eventBusService } from './../services/event-bus.service';
import gradientBtn from '../cmps/gradient-btn.vue';
import navBtnsAddForm from '../cmps/nav-btns-add-form.vue';

export default {
  name: 'spaceEditAdd',
  data() {
    return {
      isLoading: false,
      currentTab: 0,
      spaceToEdit: spaceService.getEmptySpace(),
      amenities: {
        TV: false,
        wifi: false,
        bath: false,
        kitchen: false,
        'washing-machine': false,
        'free-parking': false,
        'smoke-alarm': false,
        lockbox: false,
        'air-conditioning': false,
        'security-cameras': false,
      },
      imgs: [],
    };
  },

  methods: {
    save() {
      // console.log('saving the form...', this.spaceToEdit);
      this.spaceToEdit.imgUrls = [...this.imgs];
      for (const [key, value] of Object.entries(this.amenities)) {
        if (value) this.spaceToEdit.amenities.push(key);
      }
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

    async onUploadImg(ev) {
      this.isLoading = true;
      try {
        const res = await uploadImg(ev);
        console.log(res);
        this.imgs.push(res.url);
      } catch (err) {
        console.log('cannot upload img', err);
      } finally {
        this.isLoading = false;
      }
    },

    nextPrev(diff) {
      this.currentTab += diff;
    },

    fixStepIndicator(n) {
      const items = document.querySelectorAll('.item');
      items.forEach((item) => {
        item.className = item.className.replace(' active', '');
      });
      items[n] += ' active';
    },
  },
  computed: {
    spaceId() {
      return this.$route.params.spaceId || '';
    },
  },
  created() {
    eventBusService.$emit('hideHeader');
    eventBusService.$emit('hideFooter');
    if (this.spaceId) {
      this.$store
        .dispatch({ type: 'getSpaceById', spaceId: this.spaceId })
        .then((space) => {
          this.spaceToEdit = JSON.parse(JSON.stringify(space));
        });
    }
  },

  destroyed() {
    eventBusService.$emit('showHeader');
    eventBusService.$emit('showFooter');
  },

  components: {
    gradientBtn,
    navBtnsAddForm,
  },
};
</script>
