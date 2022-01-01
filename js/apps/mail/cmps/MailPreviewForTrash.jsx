const { Link } = ReactRouterDOM
import { mailService } from "../../../services/mail.Service.js"

// export function MailPreviewForTrash({ mail }) {
// console.log('mail.bodyPreview:', mail.bodyPreview);

export class MailPreviewForTrash extends React.Component {

    state = { mails: null }

    componentDidMount() {
        this.loadMails()
    }

    loadMails() {
        const mails = mailService.getTrash()
        set

    }

    render() {

        return (
            // <Link className="clean-link" to={`/mail/${mail.id}`}>
            //     <article className="mail-preview flex">
            //         <div className="from">{mail.from}</div>
            //         <div className="subject">{mail.subject}</div>
            //         <div className="bodyPreview">{mail.bodyPreview}</div>
            //         <img className="bin icon" onClick="" src="img\icons\bin.png" />
            //     </article>
            // </Link>




            //  <img className="bin icon" src="img\icons\bin.png" /> 






        )
    }

}