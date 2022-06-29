import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";


// export const HomeTemplate = (props) => {
//     const { Component, ...restProps } = props;

//     return <Route {...restProps} render={(propsRoute) => {

//         return (
//         <Fragment>
//             <h1>Đây là homepage</h1>
//             <Component {...propsRoute} />
//         </Fragment>
//         )

//     }} />
// }

export const HomeTemplate = ({
    comp: Component,
    ...rest
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <Route {...rest} render={(props) => {
            return (
                <Fragment>
                    <Header />
                    <Component {...props} />
                    <Footer />
                </Fragment>
            )
        }} />
    );
}