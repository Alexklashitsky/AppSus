const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    // console.log('mail.bodyPreview:', mail.bodyPreview);

    return (
        <Link className="clean-link" to={`/mail/${mail.id}`}>
            <article className="mail-preview flex">
                <td className="from">  {mail.from}</td>
                <td className="subject"> {mail.subject}</td>
                <td className="bodyPreview"> {mail.bodyPreview}</td>



            </article>
        </Link>

    )
}