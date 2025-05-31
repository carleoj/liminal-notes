<template>
  <section class="notes-grid">
    <div
      v-for="note in notes"
      :key="note.id"
      class="note-card"
      @click="openModal(note)"
    >
      <h3>{{ note.title }}</h3>
      <p>{{ truncate(note.content, 60) }}</p>
    </div>

    <!-- Modal -->
    <div v-if="selectedNote" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ selectedNote.title }}</h2>
        <p>{{ selectedNote.content }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>

    <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddModal">
      <div class="modal">
        <h2>New Note</h2>
        <input v-model="newNote.title" placeholder="Title" />
        <textarea v-model="newNote.content" placeholder="Content"></textarea>
        <button @click="addNote">Add</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>

    <button class="add-button" @click="showAddModal = true">+</button>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: "NotesList",
  data() {
    return {
      notes: [],
      selectedNote: null,
      showAddModal: false,
      newNote: {
        title: '',
        content: ''
      }
    };
  },
  mounted(){
    this.fetchAllNotes()
  },
  methods: {
    async fetchAllNotes() {
      try{
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found, please login.");
        const res = await axios.get(`http://localhost:3000/api/getNotesById`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
        this.notes = res.data.data
      }
      catch(error){
        console.error('Fetch error:', error)
      }
    },
    openModal(note) {
      this.selectedNote = note;
    },
    closeModal() {
      this.selectedNote = null;
      this.showAddModal = false;
    },
    truncate(text, length) {
      if (!text) return '';
      return text.length > length ? text.slice(0, length) + "..." : text;
    },
    async addNote() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found, please login.");

        const payload = {
          title: this.newNote.title,
          content: this.newNote.content,
        };

         await axios.post('http://localhost:3000/api/addNewNote', payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        this.newNote.title = '';
        this.newNote.content = '';
        this.showAddModal = false;

        await this.fetchAllNotes(); // Refresh the notes list
      } catch (error) {
        console.error('Add note error:', error);
      }
    }
  },
};

</script>

<style scoped>
.notes-grid {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  padding: 10rem;
  border: 1px solid black;
  background-color: rgb(240, 241, 201);
}

.note-card {
  border: 1px solid black;
  background-color: #fff27b;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  word-wrap: break-word;
  transition: transform 0.2s;
  cursor: pointer;
}

.note-card:hover {
  transform: translateY(-4px);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
}

.modal button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #1565c0;
}

p {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.add-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: rgb(47, 157, 91);
  color: white;
  border: none;
  font-size: 2rem;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 1100;
}

.add-button:hover {
  background-color: rgb(33, 130, 72);
}


</style>
