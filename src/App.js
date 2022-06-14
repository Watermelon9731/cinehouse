import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history';
import { Switch, Router } from 'react-router-dom';
import { Suspense, lazy } from 'react'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import { AdminDashboardTemplate } from './templates/AdminDashboardTemplate/AdminDashboardTemplate.js';
import { UserDashboardTemplate } from './templates/UserDashboardTemplate/UserDashboardTemplate.js';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import MovieManager from './pages/AdminDashboard/MovieManager/MovieManager';
import AddNewMovie from './pages/AdminDashboard/MovieManager/AddNewMovie/AddNew';
import EditUserInfor from './pages/AdminDashboard/EditUserInfor/EditUserInfor'
import EditMovieDetail from './pages/AdminDashboard/MovieManager/EditMovieDetail/EditMovieDetail';
import EditMovieShowtime from './pages/AdminDashboard/MovieManager/EditMovieShowtime/EditMovieShowtime';
import Account from './pages/AdminDashboard/Account/Account';
import AddNewUser from './pages/AdminDashboard/AddNewUser/AddNewUser';
import BookingHistory from './pages/AdminDashboard/BookingHistory/BookingHistory';
import TicketDetail from './pages/AdminDashboard/BookingHistory/TicketDetail/TicketDetail';
import VideoModal from './components/VideoModal/VideoModal';
import ShowingMovie from './pages/AdminDashboard/MovieManager/ShowingMovie/ShowingMovie';
import UpcomingMovie from './pages/AdminDashboard/MovieManager/UpcomingMovie/UpcomingMovie';
import Profile from './pages/UserDashboard/Profile/Profile';

const CheckoutTemplateLazy = lazy(() => import('./templates/CheckoutTemplate/CheckOutTemplate'))

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history} >
      <Loading />
      <VideoModal />
      <Switch>
        {/* Default page */}
        <HomeTemplate exact path={'/'} comp={Home} />
        
        <HomeTemplate exact path={'/home'} comp={Home} />
        <HomeTemplate exact path={'/detail/:id'} comp={Detail} />
        
        <UserTemplate exact path={'/login'} comp={Login} />
        <UserTemplate exact path={'/register'} comp={Register} />

        <AdminDashboardTemplate exact path={'/admin'} comp={AdminDashboard} />
        <AdminDashboardTemplate exact path={'/admin/userlist/addnew'} comp={AddNewUser} />
        <AdminDashboardTemplate exact path={'/admin/userlist/:name'} comp={EditUserInfor} />
        <AdminDashboardTemplate exact path={'/admin/movielist'} comp={MovieManager} />
        <AdminDashboardTemplate exact path={'/admin/movielist/showing'} comp={ShowingMovie} />
        <AdminDashboardTemplate exact path={'/admin/movielist/upcoming'} comp={UpcomingMovie} />
        <AdminDashboardTemplate exact path={'/admin/movielist/addnew'} comp={AddNewMovie} />
        <AdminDashboardTemplate exact path={'/admin/movielist/edit/:id'} comp={EditMovieDetail} />
        <AdminDashboardTemplate exact path={'/admin/showtime/:id/:name'} comp={EditMovieShowtime} />
        <AdminDashboardTemplate exact path={'/admin/booking/:name'} comp={BookingHistory} />
        <AdminDashboardTemplate exact path={'/admin/booking/:id'} comp={TicketDetail} />
        <AdminDashboardTemplate exact path={'/admin/account'} comp={Account} />

        <UserDashboardTemplate exact path={'/user'} comp={UserDashboard} />
        <UserDashboardTemplate exact path={'/user/profile'} comp={Profile} />

        <Suspense fallback={<h1 className='text-center text-6xl font-bold'>Đợi mình tí ...</h1>}>
          <CheckoutTemplateLazy exact path={'/checkout/:id'} comp={Checkout} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
