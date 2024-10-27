document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm');
    const noteInput = document.getElementById('noteInput');
    const notesList = document.getElementById('notesList');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn'); // Get reference to clear history button

    // Load existing notes from localStorage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach((note, index) => {
            addNoteToDOM(note, index);
        });
    };

    // Add note to the DOM
    const addNoteToDOM = (note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${note} <button onclick="deleteNote(${index})">Delete</button>`;
        notesList.appendChild(li);
    };

    // Add note on form submission
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const noteContent = noteInput.value.trim();
        if (noteContent) {
            // Save note to localStorage
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(noteContent);
            localStorage.setItem('notes', JSON.stringify(notes));
            addNoteToDOM(noteContent, notes.length - 1);
            noteInput.value = ''; // Clear input
            noteInput.focus(); // Return focus to input
        }
    });

    // Delete note function
    window.deleteNote = function (index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1); // Remove the note from the array
        localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
        location.reload(); // Reload the page to reflect changes
    };

    // Download notes as a text file
    downloadBtn.addEventListener('click', () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const blob = new Blob([notes.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        a.click();
        URL.revokeObjectURL(url); // Clean up the URL object
    });

    // Clear history function
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all notes?")) {
            localStorage.removeItem('notes'); // Clear notes from localStorage
            notesList.innerHTML = ''; // Clear the displayed list
        }
    });

    // Load notes when the page is loaded
    loadNotes();
});
