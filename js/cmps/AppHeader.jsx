
const { NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {
    return (
        <header>
            <h1>
                AppSuss
            </h1>
            <section className="main-nav">
                <NavLink>home</NavLink>
                <NavLink to="/mail" >mail</NavLink>
                <NavLink to="/keep" >keeper</NavLink>
                {/* <NavLink>misBooks</NavLink> */}

            </section>
        </header>
    )

}