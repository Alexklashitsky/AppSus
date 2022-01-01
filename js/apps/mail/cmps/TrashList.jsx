import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../../../services/mail.Service.js";
import { eventBusService } from "../../../services/event-bus.service.js";
import { MailPreviewForTrash } from "./MailPreviewForTrash.jsx";

export function TrashList({ mails }) {


    const trashMail = mailService.getTrash()



    // if (!mails.length) return <h3>The mail box is empty</h3>

    return (
        // <section className="trash-list flex ">
        //     {trashMail.map(mail => <MailPreviewForTrash key={mail.id} mail={mail} />)}

        // </section>

        <MailPreviewForTrash />
    )

}