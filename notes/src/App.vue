<template>
  <div id="app">
    <HeaderComponent/>
    <main>
        <b-container fluid class="gap">
          <b-row>
            <div class='col-md-3 col-sm-12'>
                <CreateNoteComponent/>
            </div>
            <div class='col-md-8 col-sm-12 gap'>
                <ListNotesComponent/>
            </div>
         </b-row>
        </b-container>
    </main>
    
  </div>
</template>

<script>
import HeaderComponent from './components/header/index.vue';
import FooterComponent from './components/footer/index.vue';
import CreateNoteComponent from './components/create-note/index.vue';
import ListNotesComponent from './components/list-notes/index.vue';

export default {
  name: 'App',
  components: {
     HeaderComponent, FooterComponent, CreateNoteComponent, ListNotesComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1px;
}

.gap{
margin-top: 10px
}
</style>
