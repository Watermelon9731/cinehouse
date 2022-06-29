import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { userLocalService, USER_LOGIN } from "../../util/config";

const CheckoutTemplate = ({
    comp: Component,
    ...rest
}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (!userLocalService.getUserInfor()) {
        return <Redirect to='/login' />
    }

    return (
            <Route {...rest} render={props => <Fragment>
                <Header />
                <Component {...props} />
                <Footer />
            </Fragment>} />
    )
};

export default CheckoutTemplate;