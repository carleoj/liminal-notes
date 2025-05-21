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
  </section>
</template>

<script>
export default {
  name: "NotesList",
  data() {
    return {
      notes: [
        { id: 1, title: "School Tips", content: "Always pay attention to the adviser." },
        { id: 2, title: "Grocery List", content: "Apples, Bananas, Milk, Bread" },
        { id: 3, title: "Project Ideas", content: "Build a note app like Google Keep." },
        { id: 4, title: "Reminder", content: "Call John about Vue project." },
        { id: 5, title: "Quote", content: "Simplicity is the soul of efficiency." },
        { id: 6, title: "Goals", content: "Learn Vue 3 Composition API" },
      ],
      selectedNote: null,
    };
  },
  methods: {
    openModal(note) {
      this.selectedNote = note;
    },
    closeModal() {
      this.selectedNote = null;
    },
    truncate(text, length) {
      return text.length > length ? text.slice(0, length) + "..." : text;
    },
  },
};
</script>

<style scoped>
.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  padding: 13.2rem;
  background-color: #f5f5f5;
}

.note-card {
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
</style>
