import { AppHeader } from "./js/cmps/AppHeader.jsx";
import { MisterMail } from "./js/apps/mail/pages/MisterMail.jsx";
import { MissKeep } from "./js/pages/MissKeep.jsx";
import { MailDetails } from "./js/apps/mail/pages/MailDetails.jsx";
import { Compose } from "./js/apps/mail/pages/compose.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route component={MailDetails} path="/mail/:mailId" />
            {/* <Route component={Compose} path="/compose" /> */}
            <Route component={MisterMail} path="/mail" />
            <Route component={MissKeep} path="/keep" />

          </Switch>
        </main>
      </section>
    </Router>
  );
}
