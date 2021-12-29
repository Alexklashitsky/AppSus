const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return (
        <Link className="clean-link" to={`/mail/${mail.id}`}>
            <article className="mail-preview">
                <p>{mail.from}</p>
                <p>{mail.subject}</p>
            </article>
        </Link>

    )
}