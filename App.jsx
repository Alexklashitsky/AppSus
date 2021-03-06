import { AppHeader } from "./js/cmps/AppHeader.jsx";
import { MisterMail } from "./js/apps/mail/pages/MisterMail.jsx";
import { MissKeep } from "./js/pages/MissKeep.jsx";
import { MailDetails } from "./js/apps/mail/pages/MailDetails.jsx";
import { HomePage } from "./js/pages/app-home.jsx";

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
            <Route component={MisterMail} path="/mail" />
            <Route component={MissKeep} path="/keep" />
            <Route component={HomePage} path="/" />

          </Switch>
        </main>
      </section>
    </Router>
  );
}
