import {storageService} from '../../../services/storage.service.js';
import {utilService} from '../../../services/util.service.js';

export const noteService ={
    createNote,
    getNotesToShow
}



function createNote({type,info}){
    let note = {
        id:utilService.makeId(4),
        type,
        isPinned:false,
        info,
        style:{
            backgroundColor:'#00d'
        }
    }
    let notes = load();
    console.log(notes)
    if(!notes){
        notes = [note]
    }else notes.unshift(note)

    save(notes)

    return Promise.resolve();


}

function getNotesToShow(){
    const notes =load();
    
    return Promise.resolve(notes);
}




function load(){
    return storageService.loadFromStorage('notes');
}

function save(notes){
    storageService.saveToStorage('notes',notes)
}