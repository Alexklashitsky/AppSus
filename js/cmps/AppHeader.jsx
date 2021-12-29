
const { NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {
    return (
        <header>
            <h1>
                AppSuss
            </h1>
            <section className="main-nav">
                <NavLink className="clean-link">home</NavLink>
                <NavLink className="clean-link" to="/mail" >Mail</NavLink>
                <NavLink className="clean-link" to="/keep" >Keep</NavLink>
                {/* <NavLink>misBooks</NavLink> */}

            </section>
        </header>
    )

}