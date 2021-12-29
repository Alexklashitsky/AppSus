import { noteService } from "../apps/keep/services/note.service.js";
import { NotePreview } from "../apps/keep/cmps/note-preview.jsx";

export class MissKeep extends React.Component {
  state = {
    note: {
      type: "txt",
      info: {},
    },
    notes: null,
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes() {
    noteService.getNotesToShow().then((notes) => this.setState({ notes }));
  }

  handleChange = ({ target }) => {
    const field = target.name;
    // const field = this.state.note.info.txt;
    const value = target.value;
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        info: { ...prevState.note.info, [field]: value },
      },
    }));
  };

  addNote = () => {
    noteService
      .createNote(this.state.note)
      .then(() =>
        this.setState((prevState) => ({
          note: { ...prevState.note, info: {} },
        }))
      );
    this.loadNotes();
  };

  changeType = (type) => {
    this.setState((prevState) => ({ note: { ...prevState.note, type: type } }));
    console.log(this.state.note.type);
  };

  noteHead = () => {
    const { type } = this.state.note;
    return (
      <section className="note-add">
        <form >
          <textarea
            name={type}
            id="text"
            cols="80"
            rows="4"
            onChange={this.handleChange}
          ></textarea>
          <button onClick={this.addNote}>Add note</button>
        </form>
        <div className="note-type">
          <button onClick={() => this.changeType("txt")}>Text</button>
          <button onClick={() => this.changeType("todos")}>Todos</button>
          <button onClick={() => this.changeType("img")}>Image</button>
        </div>
      </section>
    );
  };

  onDeleteNote = (id) =>{
      noteService.deleteNote(id);
      this.loadNotes();

  }

  getNotes = () => {
    const { notes } = this.state;
    return notes.map(note => {
       return  (<div key={note.id} style={note.style} className="note">
        <NotePreview note={note} />
        <div className='note-edit'>
            <button onClick={()=>this.onDeleteNote(note.id)}>🗑️</button>
        </div>
        </div>)
    })
  };

  render() {
    console.log(123);
    const { notes } = this.state;
    console.log(this.state.note.info);

    if (!notes || notes.length === 0) {
      return (
        <React.Fragment>
          {this.noteHead()}
          <h2>No notes!</h2>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {this.noteHead()}
        <section className="notes-container">{this.getNotes()}</section>
      </React.Fragment>
    );
  }
}