const { Link } = ReactRouterDOM
import { eventBusService } from "../../../services/event-bus.service.js";
import { mailService } from "../../../services/mail.Service.js";
export class MailFolders extends React.Component {




    onClickFolder = (folder) => {
        // eventBusService.emit('open-folder', folder)
        // console.log('hi');
        // console.log('date:', folder);
        mailService.setFolder(folder)
        this.props.setFolder(folder)

        if (folder === 'trash') {
            // console.log('trash');
            eventBusService.emit('open-trash', true)

        }
        else eventBusService.emit('open-trash', false)




        // let test = folderName
        // console.log('test:', test);

    }
    render() {
        return (
            <section className="mail-folders flex">
                <button className="btn" onClick={() => this.onClickFolder('inbox')} >inbox</button>
                <button className="btn" onClick={() => this.onClickFolder('market')} >marked</button>
                <button className="btn" onClick={() => this.onClickFolder('sent items')} >sent</button>
                <button className="btn" onClick={() => this.onClickFolder('impotent')} >impotent</button>
                <button className="btn" onClick={() => this.onClickFolder('drafts')} >drafts</button>
                <button className="btn" onClick={() => this.onClickFolder('spam')} >spam</button>
                <button className="btn" onClick={() => this.onClickFolder('trash')} >trash</button>
            </section>

        )
    }
}


{/* <button className="btn" onClick={this.onClickFolder()} ></button> */ }
