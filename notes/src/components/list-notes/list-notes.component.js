import DataService from '../../service/data.service.js';

export default {
    name: 'list-notes',
    components: {},
    props: [],
    data() {
        let notes = DataService.getNotes();

        return {
            notes: notes
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        deleteNote(index) {
            DataService.deleteNote(index);
        }
    }
}
