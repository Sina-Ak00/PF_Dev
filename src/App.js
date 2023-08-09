import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Routes from "./routes/routes";
import Foods from "./tables/menu/Foods";
import DailyPrice from "./forms/DailyPrice";
import AuthForTotal from "./forms/AuthForTotal";
import Order from "./tables/orders/Orders";
import * as Foodservices from "./services/FoodServices";
import HeaderAppBar from "./header/HeaderAppBar";
import Theme from "./controls/Theme";

import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
       <QueryClientProvider client={queryClient}>
      <Theme>
        <HeaderAppBar />
        <Route path="/createFood" exact>
          <Routes />
        </Route>
        <Route path="/order" exact>
          <Foods />
        </Route>
        <Route path="/bascket" exact>
          <Order menu={Foodservices.getAllFoods()} />
        </Route>
        <Route path="/Auth" exact>
          <AuthForTotal />
        </Route>
        <Route path="/TotalSell" exact>
          <DailyPrice />
        </Route>
        <Route exact path="/">
          <Redirect to="/bascket" />
        </Route>
      </Theme>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
