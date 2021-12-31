import { noteService } from "../services/note.service.js";


export function NotePreview({ note }) {
  return checkNote(note);
}

function checkNote(note) {
  switch (note.type) {
    case "txt":
      return <p > {note.info.txt}</p>;
    case "img":
      return (
        <React.Fragment>
          <h2>{note.info.title}</h2>
          <img src={note.info.img} />
        </React.Fragment>
      );

    case "todos":
      //   console.log(note.info.todos);
      return (
        <React.Fragment>
          <h2>{note.info.title}</h2>
          {note.info.todos.map((todo) => {
            return <h3>{todo}</h3>;
          })}
        </React.Fragment>
      );

      case"src":
        let src = note.info.src
        let idx = src.indexOf('=');
        let id = src.substring(idx+1,src.length+1);
      return(
          <div>

              <iframe width="250" height="200" src={`https://www.youtube.com/embed/${id}`} frameBorder="0"></iframe>
          </div>
      )
  }
}





// contentEditable="true" onBlur={()=>noteService.saveNote(note.id,this.value)}