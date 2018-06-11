export default {

    name: 'data',

    colors: ['success', 'warning', 'info', 'secondary', 'danger', 'dark'],

    notes: [],

    init() {
        console.log("init called..");
        let notes = localStorage.getItem('notes');
        if (undefined == notes) {
            this.notes = [];
        } else {
            this.notes = JSON.parse(notes);
        }
    },
    addNote(note) {
        let obj = {};
        obj.note = note;
        obj.createDate = new Date();
        let colorIndex = (this.notes.length + 1) % (this.colors.length + 1);
        obj.color = this.colors[colorIndex > 0 ? --colorIndex : 0];
        this.notes.push(obj);
        localStorage.setItem('notes', JSON.stringify(this.notes));
    },

    getNotes() {
        return this.notes;
    },

    deleteNote(index) {
        this.notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}
