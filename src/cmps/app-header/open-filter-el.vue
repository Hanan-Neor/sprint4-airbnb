<template>
  <div
        class="open-filter-el start"
        
      >
      
        <!-- <div>start your search</div> -->
        <!-- <div class="filter-div">{{ buttonText }}</div> -->
        <div class="flex detailsInEl-container" v-if="detailsToShow" >
            <div class="detailsInEl " style="locationTextStyle" :class="{ clicked2: filterBy.location }">{{locationToShow}}</div>
            <span style="height:24px; background-color:#DDDDDD;width:1px;"></span>
            <div class="detailsInEl " style="dateTextStyle" :class="{ clicked2: filterBy.dates.startDate }">{{date1ToShow}}  {{date2ToShow}}</div>
            <span style="height:24px; background-color:#DDDDDD;width:1px;"></span>
            <div class="detailsInEl " style="guestsTextStyle" :class="{ clicked2: filterBy.numGuests }">{{guestsText}}</div>
        </div>
        <div class="filter-div starting-text" v-else>Start your search</div>
        <div class="filter-div-button">
          <div class="search-icon-container">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="
                display: block;
                fill: none;
                height: 12px;
                width: 12px;
                stroke: white;
                stroke-width: 4;
                overflow: visible;
              "
            >
              <g fill="none">
                <path
                  d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    data(){
        return{
            filterBy:{}
        }
    },
    computed:{
        guestsTextStyle(){
            return{
                'font-family': this.filterBy.numGuests ? 'inherit' : 'cereal-Light'
            }
        },
        dateTextStyle(){

        },
        locationTextStyle(){

        },


        locationToShow(){
    return this.filterBy.location? this.filterBy.location : 'Add location'
        },
            date1ToShow() {
      return this.filterBy.dates.startDate
        ? this.filterBy.dates.startDate.toLocaleDateString()+' - '
        : "Add dates";
    },
    date2ToShow() {
      return this.filterBy.dates.endDate
        ? this.filterBy.dates.endDate.toLocaleDateString()
        : "";
    },
    guestsText() {
      return this.filterBy.numGuests ? this.filterBy.numGuests+' Guests' : "Add guests";
    },


      detailsToShow(){
          // return 1
            // return this.filterBy.numGuests

          // if(this.filterBy.location)
          // return true
          // if(this.filterBy.dates.startDate)
          // return true
          // if(this.filterBy.location)
          // return true
          return(this.filterBy.location||this.filterBy.dates.startDate||this.filterBy.dates.endDate||this.filterBy.numGuests)
        //   return true
        // return if(this.filterBy.numGuests ||this.filterBy.dates.startDate ||this.filterBy.location)
      }  
      
    },
    created(){
        this.filterBy=this.$store.getters.filterBy
        console.log(this.filterBy);
    }

}
</script>

<style>

</style>