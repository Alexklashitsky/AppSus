export function NotePreview({note}) {
  return (
    <div style={note.style} className={note.info}>
      {checkNote(note)}
    </div>
  );
}

function checkNote(note) {
   
  switch (note.type) {
    case "note-txt":
      return <h2>{note.info.txt}</h2>;

    case "note-img":
      return (
        <React.Fragment>
          <h2>{note.info.title}</h2>
          <img src={note.info.url} />
        </React.Fragment>
      );

    case "note-todos":
      return (
        <React.Fragment>
          <h2>{note.info.label}</h2>
          {note.info.todos.map((todo) => {
            return <h3>{todo.txt}</h3>;
          })}
        </React.Fragment>
      );
  }
}
