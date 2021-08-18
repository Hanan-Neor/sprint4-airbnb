<template>
          <div class="input-container username"  >
          <div class="label-container">
           <slot name="label"></slot>
          </div>
          <slot name="input"></slot>
        </div>
          <!-- <div class="input-container username" @click.prevent="userClicked" :class="{  filled: loginCred.username ,focused: isUserFocused, }"  >
          <div class="label-container">
            <label class="label" :class="{ focused: isUserFocused || loginCred.username}">Username</label>
          </div>
          <slot></slot>
        </div> -->

</template>

<script>
export default {

}
</script>

<style>

</style>