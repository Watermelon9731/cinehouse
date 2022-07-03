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
import CheckoutTemplate from './templates/CheckoutTemplate/CheckOutTemplate';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history} >
      <Loading />
      <VideoModal />
      <Switch>

        <HomeTemplate exact path='/home' comp={Home} />

        <HomeTemplate exact path='/detail/:id' comp={Detail} />

        <UserTemplate exact path='/login' comp={Login} />
        <UserTemplate exact path='/register' comp={Register} />

        <AdminDashboardTemplate path='/admin' exact comp={AdminDashboard} />
        <AdminDashboardTemplate path='/admin/userlist/addnew' exact comp={AddNewUser} />
        <AdminDashboardTemplate path='/admin/userlist/:name' exact comp={EditUserInfor} />
        <AdminDashboardTemplate path='/admin/movielist' exact comp={MovieManager} />
        <AdminDashboardTemplate path='/admin/movielist/showing' exact comp={ShowingMovie} />
        <AdminDashboardTemplate path='/admin/movielist/upcoming' exact comp={UpcomingMovie} />
        <AdminDashboardTemplate path='/admin/movielist/addnew' exact comp={AddNewMovie} />
        <AdminDashboardTemplate path='/admin/movielist/edit/:id' exact comp={EditMovieDetail} />
        <AdminDashboardTemplate path='/admin/showtime/:id/:name' exact comp={EditMovieShowtime} />
        <AdminDashboardTemplate path='/admin/booking/:name' exact comp={BookingHistory} />
        <AdminDashboardTemplate path='/admin/booking/:name/:id' exact comp={TicketDetail} />
        <AdminDashboardTemplate path='/admin/account' exact comp={Account} />

        <UserDashboardTemplate path='/user' exact comp={UserDashboard} />
        <UserDashboardTemplate path='/user/profile' exact comp={Profile} />
        <UserDashboardTemplate path='/user/booking/:id' exact comp={TicketDetail} />

        <CheckoutTemplate path='/checkout/:id' exact comp={Checkout} />
        {/* Default page */}
        <HomeTemplate path='/' exact comp={Home} />

        {/* <Suspense fallback={<h1 className='text-center text-6xl font-bold'>Đợi mình tí ...</h1>}>
          <CheckoutTemplateLazy path='/checkout/:id' exact comp={Checkout} />
        </Suspense> */}

        
      </Switch>
    </Router>
  );
}

export default App;
