const notesContainer = document.getElementById("noir");
const addNoteButton = notesContainer.querySelector(".add-notes");

getNotes().forEach((note) => {
  const noteElement = createNotes(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-zetrei") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-zetrei", JSON.stringify(notes));
}

function createNotes(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNotes(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you want to delete ?");
    if (doDelete) {
      deleteNotes(id, element);
    }
  });
  return element;
}

function updateNotes(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = newContent;
  saveNotes(notes);
}

function addNote() {
  const notes = getNotes();
  const noteOject = {
    id: Math.floor(Math.random() * 100000),
    content: "Empty Sticky Note",
  };

  const noteElement = createNotes(noteOject.id, noteOject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  existingNotes.push(noteOject);
  saveNotes(notes);
}

function deleteNotes(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}
