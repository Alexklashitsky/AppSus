import { noteService } from "../apps/keep/services/note.service.js";
import { NotePreview } from "../apps/keep/cmps/note-preview.jsx";

export class MissKeep extends React.Component {
  state = {
    note: {
      type: "txt",
      info: {},
    },
    notes: null,
    hover: true,
    hoverId: "",
    noteEdit: "",
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

  addNote = (ev) => {
    const { type } = this.state.note.info;
    console.log(type);
    ev.preventDefault();
    noteService.createNote(this.state.note);
    //   .then(() =>
    //     this.setState((prevState) => ({
    //       note: { ...prevState.note, info: {...prevState.note.info,[type]:''} },
    //     }))
    //   );
    this.resetForm();
    this.loadNotes();
  };

  changeType = (type) => {
    this.setState((prevState) => ({ note: { ...prevState.note, type: type } }));
    console.log(this.state.note.type);
  };

  resetForm = () => {
    const type = this.state.note.type;
    var note;
    if (type === "txt") {
      note = {
        type: type,
        info: { [type]: "" },
      };
    } else {
      note = {
        type: type,
        info: { [type]: "", title: "" },
      };
    }
    this.setState({ note });
  };

  checkPlaceHolder = (type) => {
    switch (type) {
      case "txt":
        return "Enter whats on your mind...";
      case "img":
        return "Enter image URL...";
      case "todos":
        return "Enter todos with comma...";
      case "src":
        return "Enter Youtube URL...";
    }
  };

  noteHead = () => {
    const { type } = this.state.note;
    const value = this.state.note.info[type];
    let title = type !== "txt" ? this.state.note.info.title : "";
    console.log(value);
    return (
      <section className="note-add">
        <form onSubmit={this.addNote}>
          <input
            name={type}
            type="text"
            id="text"
            cols="80"
            rows="4"
            placeholder={this.checkPlaceHolder(type)}
            onChange={this.handleChange}
            value={value}
          ></input>
          {type === "todos" || type === "img" ? (
            <input
              name="title"
              type="text"
              placeholder="Title:"
              value={title}
              onChange={this.handleChange}
            ></input>
          ) : (
            ""
          )}
          <button>➕</button>
        </form>
        <div className="note-type">
          <button title="Text" onClick={() => this.changeType("txt")}>
            <img src="./img/icons/a.png" />
          </button>
          <button title="Todos" onClick={() => this.changeType("todos")}>
            &#9776;
          </button>
          <button title="Image" onClick={() => this.changeType("img")}>
            <img src="./img/icons/img.png" />
          </button>
          <button title="video" onClick={() => this.changeType("src")}>
            <img src="./img/icons/video.png" />
          </button>
        </div>
      </section>
    );
  };

  onDeleteNote = (id) => {
    noteService.deleteNote(id);
    this.loadNotes();
  };

  hover = (id) => {
    //   let hover = this.state.hover ? false : true;
    //   console.log(hover);
    let hoverId = id;
    this.setState({ hoverId });
  };

  handleKey = ({ key }) => {
    var { noteEdit } = this.state;

    if (key.length === 1) {
      noteEdit += key;
      this.setState({ noteEdit });
    } else if (key === "Backspace") {
      let length = noteEdit.length;
      noteEdit = noteEdit.substring(0, length - 1);
      console.log(noteEdit);
      this.setState({ noteEdit });
    }
  };

  handleFocus = (note) => {
    const noteEdit =
      note.type === "txt" ? note.info.txt : note.info.todos.toString();
    this.setState({ noteEdit });
  };

  onSaveNote = (note) => {
    let type = note.type;
    note.info[type] = this.state.noteEdit;
    noteService.saveNote(note);
  };

  onChangecolor = (note, color) => {
    note.style = { backgroundColor: color };
    console.log(note.style.backgroundColor);
    noteService.saveNote(note, color);
  };

  getNotes = () => {
    const { notes } = this.state;
    const { hover } = this.state;
    const { hoverId } = this.state;
    console.log(hoverId);
    return notes.map((note) => {
      console.log(note);
      return !note.isPinned ? (
        <div
          contentEditable="true"
          onFocus={() => this.handleFocus(note)}
          onKeyUp={this.handleKey}
          onBlur={() => this.onSaveNote(note)}
          key={note.id}
          style={note.style}
          onMouseEnter={() => this.hover(note.id)}
          onMouseLeave={() => this.hover("")}
          className="note"
        >
          <NotePreview note={note} />
          <div
            className={
              hover === true && hoverId === note.id
                ? "note-edit show"
                : "note-edit"
            }
          >
            <div>
              <button onClick={() => this.onDeleteNote(note.id)}>🗑️</button>
              <button onClick={() => this.onPinNote(note.id)}>📌</button>
            </div>
            <div className="colors">
              <button
                className="color pink"
                onClick={() => this.onChangecolor(note, "#ffaebc")}
              ></button>
              <button
                className="color white"
                onClick={() => this.onChangecolor(note, "#fff")}
              ></button>
              <button
                className="color green"
                onClick={() => this.onChangecolor(note, "#b4f8c8")}
              ></button>
              <button
                className="color blue"
                onClick={() => this.onChangecolor(note, "#a0e7e5")}
              ></button>
            </div>
          </div>
        </div>
      ) : (
        ""
      );
    });
  };

  getPinnedNotes = () => {
    const { notes } = this.state;
    const { hover } = this.state;
    const { hoverId } = this.state;
    return notes.map((note) => {
      return note.isPinned ? (
        <div
          contentEditable="true"
          onFocus={() => this.handleFocus(note)}
          onKeyUp={this.handleKey}
          onBlur={() => this.onSaveNote(note)}
          key={note.id}
          style={note.style}
          onMouseEnter={() => this.hover(note.id)}
          onMouseLeave={() => this.hover("")}
          className="note"
        >
          <NotePreview note={note} />
          <div
            className={
              hover === true && hoverId === note.id
                ? "note-edit show"
                : "note-edit"
            }
          >
            <div>

            <button onClick={() => this.onDeleteNote(note.id)}>🗑️</button>
            <button onClick={() => this.onPinNote(note.id)}>📌</button>
            </div>
            <div className="colors">
              <button
                className="color pink"
                onClick={() => this.onChangecolor(note, "#ffaebc")}
              ></button>
              <button
                className="color white"
                onClick={() => this.onChangecolor(note, "#fff")}
              ></button>
              <button
                className="color green"
                onClick={() => this.onChangecolor(note, "#b4f8c8")}
              ></button>
              <button
                className="color blue"
                onClick={() => this.onChangecolor(note, "#a0e7e5")}
              ></button>
            </div>
          </div>
        </div>
      ) : (
        ""
      );
    });
  };

  onPinNote = (id) => {
    noteService.togglePinNote(id).then(this.loadNotes());
  };

  render() {
    console.log(123);
    const { notes } = this.state;
    console.log(this.state.note.info);

    if (!notes || notes.length === 0) {
      return (
        <React.Fragment>
          {this.noteHead()}
          <h2>No notes try adding some...</h2>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {this.noteHead()}
        <h2 className="pinned-title">Pinned notes📌</h2>
        <section className="notes-container pinned">
          {this.getPinnedNotes()}
        </section>
        <h2 className="pinned-title">All notes🗒️</h2>
        <section className="notes-container">{this.getNotes()}</section>
      </React.Fragment>
    );
  }
}
