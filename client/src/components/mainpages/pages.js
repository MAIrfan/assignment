import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../../globalState";
import Login from "./auth/login";
import Register from "./auth/register";
import NotFound from "./notfound/notFound";
import Articles from "./articles/articles";
import Header from "./header/header";
import CreateArticle from "./createarticle/createArticle";
import EditUser from "./edituser/editUser";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return (
    <>
      {isLogged ? <Header /> : ""}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/create_article"
          component={isLogged ? CreateArticle : Login}
        />
        <Route
          exact
          path="/edit_article/:id"
          component={isLogged ? CreateArticle : Login}
        />
        <Route exact path="/edit_user/:id" component={EditUser} />
        <Route exact path="/" component={isLogged ? Articles : Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
};

export default Pages;
