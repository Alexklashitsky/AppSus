
import { mailService } from "../../../services/mail.Service.js";

import { MailPreview } from "./MailPreview.jsx";

export function SentItemsList() {


    const sentItems = mailService.getInbox()
    console.log('sentItems:', sentItems);





    if (!sentItems.length) return <h3>The sent  item box is empty</h3>

    return (

        <section className="mail-list flex">
            <tr>{sentItems.map(mail => <MailPreview key={mail.id} mail={mail} />)}</tr>
        </section>
    )


}