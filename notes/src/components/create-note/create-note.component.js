import DataService from '../../service/data.service.js';

export default {
    name: 'create-note',
    components: {

    },
    props: [],
    data() {
        console.log(DataService.test);
        return {
            form: {
                note: ''
            }
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            DataService.addNote(this.form.note);
            this.onReset(evt);
        },
        onReset(evt) {
            evt.preventDefault();
            /* Reset our form values */
            this.form.note = '';

        }
    }
}
