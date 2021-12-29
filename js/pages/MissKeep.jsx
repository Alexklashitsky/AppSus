import { noteService } from "../apps/keep/services/note.service.js";
import { NotePreview } from "../apps/keep/cmps/note-preview.jsx";

export class MissKeep extends React.Component {
  state = {
    note: {
      type: "note-txt",
      info: {
        txt: "",
      },
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
    console.log(this.state.note.info);
  };

  addNote = () => {
    noteService.createNote(this.state.note);
  };

  changeType = (type) => {
    this.setState((prevState) => ({ note: { ...prevState.note, type: type } }));
    
  };

  noteHead = () => {
    return (
      <section className="note-add">
        <textarea
          name="txt"
          id="text"
          cols="80"
          rows="4"
          onChange={this.handleChange}
        ></textarea>
        <button onClick={this.addNote}>Submit</button>
        <div className="note-type">
          <button onClick={() => this.changeType("note-txt")}>Text</button>
          <button onClick={() => this.changeType("note-todo")}>Todos</button>
          <button onClick={() => this.changeType("note-img")}>Image</button>
        </div>
      </section>
    );
  };

  getNotes = () => {
    const { notes } = this.state;
    return notes.map((note) => <NotePreview note={note} />);
  };

  render() {
    const { notes } = this.state;
    
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
