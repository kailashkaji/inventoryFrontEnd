import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [oktoload, setOktoload] = useState(false);
  const isSuccess = useSelector(
    (state) => state.loginList.isSuccess,
    shallowEqual
  );
  const isError = useSelector((state) => state.loginList.isError, shallowEqual);

  useEffect(() => {
    console.log("aaa");
    if (isAuth.isAuthenticated === false && localStorage.access_token) {
      dispatch(ValidateAuth());
    } else if (isAuth.isAuthenticated === true && localStorage.access_token) {
      setOktoload(true);
    } else if (isAuth.isAuthenticated === false && !localStorage.access_token) {
      setOktoload(true);
    }
  }, [isAuth.isAuthenticated, isError]);

  useEffect(() => {
    if (!!isSuccess) {
      isAuth.authenticate(() => {
        setRedirectToReferrer(true);
      });
    }
  }, [isSuccess]);

  return (
    <Route {...rest}>
      {oktoload === true ? (
        isAuth.isAuthenticated === true ? (
          <div className="wrapper">
            {/*<Preloader />*/}
            <Header />
            <Menu />
            <Component />
            <Footer />
            <Controlsidebar />
          </div>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      ) : (
        <div className="wrapper">
          {/*<Preloader />*/}
          <Header />
          <Menu />
          <Component />
          <Footer />
          <Controlsidebar />
        </div>
      )}
    </Route>
  );
};

export default PrivateRoute;
