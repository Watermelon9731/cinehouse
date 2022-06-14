import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router";
import Header from "../../components/Header/Header";
import { USER_LOGIN } from "../../util/config";

export const UserTemplate = ({
    comp: Component,
    ...rest
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <Fragment>
            <Header />
            <Route {...rest} render={props => <Component {...props} />} />
        </Fragment>
    )
};