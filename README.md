# Quasar real time module

Quasar real time boot module

![enter image description here](https://i.imgur.com/PmdokJH.gif)

## How to use 

    <template>
	  ...
	  <div v-for="comment in comments" :key="coment.id">
	    <div> {{ comment.message }} </div>
	    <div> {{ timeComment[comment.id] || getDateTime(comment.id, comment.comment_date) }} </div>
	  </div>
	</template>
	
	<script>
	import getDateTime from 'boot/date'
	export default {
	  data () {
	    ...
	    timeComment: {}
	  },
	  methods: {
	    getDateTime: getDateTime('getDate', 'timeComment'),
	    ...
	  }
	  ...
	}
	</script>

## Description

*getDateTime(objUpdateInData, nameComponentMethod)*
parametr:
*objUpdateInData - update time object; 
nameComponentMethod - component method get time*; 
return value:
*function(id, unixTime)*; 
*id - id message (comment); 
unixTime - unix time, second*; 
return ->
time in format if time publish < 2 day else delta time and update time object in data component

## Dependencies

Quasar date utils
https://quasar.dev/quasar-utils/date-utils
