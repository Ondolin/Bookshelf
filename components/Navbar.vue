<template>
  <section>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <h1 class="title is-hidden-touch">Bücherregal</h1>
          <h1 class="title is-5 is-hidden-desktop">Bücherregal</h1>
        </nuxt-link>

        <a class="navbar-burger" role="button"
           aria-label="menu" aria-expanded="false">
          <span class="is-below"></span>
          <span class="is-below"></span>
          <span class="is-below"></span>
        </a>
      </div>

      <!--<div class="navbar-menu">
        <div class="navbar-end">
          <nuxt-link class="navbar-item" to="/">Home</nuxt-link>
          <nuxt-link class="navbar-item" to="/videos">Videos</nuxt-link>
          <nuxt-link class="navbar-item" v-if="isAdmin" to="/admin">Admin</nuxt-link>
          <div class="navbar-item">
            <button class="button is-success">Google Sign-In</button>
          </div>
        </div>
      </div>-->
    </nav>
  </section>
</template>
