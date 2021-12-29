export function NotePreview({ note }) {
  return checkNote(note);
}

function checkNote(note) {
  switch (note.type) {
    case "txt":
      return <p> {note.info.txt}</p>;

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
          {/* <h2>{note.info.label}</h2> */}
          {note.info.todos.map((todo) => {
            return <h3>{todo}</h3>;
          })}
        </React.Fragment>
      );
  }
}
