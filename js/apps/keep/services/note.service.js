import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const noteService = {
    createNote,
    getNotesToShow,
    deleteNote,
    togglePinNote,
    saveNote
}


function createNote({ type, info }) {
    let note = {
        id: utilService.makeId(4),
        type,
        isPinned: false,
        info,
        style: {
            backgroundColor: '#fff'
        }
    }

    if (note.type === 'todos') {
        note.info.todos = note.info.todos.split(',');

    }
    let notes = load();

    if (!notes) {
        notes = [note]
    } else notes.unshift(note)

    save(notes)

    return Promise.resolve();


}

function getNotesToShow() {
    let notes = load();
    if (!notes || notes.length === 0) notes = demoData();


    return Promise.resolve(notes);
}

function deleteNote(id) {
    const notes = load();
    const idx = notes.findIndex(note => note.id === id);
    notes.splice(idx, 1);
    save(notes);
}

function togglePinNote(id) {
    const notes = load();
    const idx = notes.findIndex(note => note.id === id);
    notes[idx].isPinned = (notes[idx].isPinned) ? false : true;

    save(notes);
    return Promise.resolve();
}

function saveNote(note) {
    const notes = load();

    const idx = notes.findIndex(el => el.id === note.id);
    notes[idx].info = note.info;

    notes[idx].style = note.style;

    save(notes);
}



function load() {
    return storageService.loadFromStorage('notes');
}

function save(notes) {
    storageService.saveToStorage('notes', notes)
}


function demoData() {
    return [
        createNote({ type: 'txt', info: { txt: 'dont forget how to React!!' } }),
        createNote({ type: 'txt', info: { txt: 'Buy drinks for the weekend!!' } }),
        createNote({ type: 'src', info: { src: 'https://www.youtube.com/watch?v=U8aj-vFaiU8' } }),
        createNote({ type: 'img', info: { title: 'Dogs', img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*' } }),
        createNote({ type: 'img', info: { title: '💙❤️', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png' } }),
        createNote({ type: 'todos', info: { title: 'Dont forget:', todos: 'do this,Go there,Go to sleep,Fly' }, })

    ]
}