import { ElementType, Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { MainLayout } from '../layouts/main'
import { AuthGuard, GuestGuard, RoleGuard } from './guards'
import { Loader } from '@/components/UI'
import '@/scss/styles.scss'

function Router() {
  return (
    <Routes>
      <Route
        path='auth'
        element={
          <GuestGuard>
            <MainLayout />
          </GuestGuard>
        }
      >
        <Route index path='login' element={<Login />} />
        <Route index path='registration' element={<Registration />} />
      </Route>

      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path='/events' element={<Events />} />
        <Route path='/events/:slug' element={<Event />} />
      </Route>

      <Route
        path='/'
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        <Route
          path='/users'
          element={
            <RoleGuard roles={['admin']}>
              <Users />
            </RoleGuard>
          }
        />

        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/update' element={<UpdateProfile />} />

        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/create' element={<CreateCategory />} />
        <Route path='/categories/edit/:id' element={<EditCategory />} />

        <Route path='/events/create' element={<CreateEvent />} />
        <Route path='/events/edit/:id' element={<EditEvent />} />
      </Route>

      <Route path='*'>
        <Route path='404' element={<PageNotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Route>
    </Routes>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<Loader full />}>
      <Component {...props} />
    </Suspense>
  )
}

const Login = Loadable(lazy(() => import('../pages/auth/Login')))
const Registration = Loadable(lazy(() => import('../pages/auth/Registration')))
const Home = Loadable(lazy(() => import('../pages/home/Home')))

const Profile = Loadable(lazy(() => import('../pages/profile/Profile')))
const UpdateProfile = Loadable(lazy(() => import('../pages/profile/UpdateProfile')))

const Categories = Loadable(lazy(() => import('../pages/categories/Categories')))
const CreateCategory = Loadable(lazy(() => import('../pages/categories/CreateCategory')))
const EditCategory = Loadable(lazy(() => import('../pages/categories/EditCategory')))

const Events = Loadable(lazy(() => import('../pages/events/Events')))
const Event = Loadable(lazy(() => import('../pages/events/Event')))
const CreateEvent = Loadable(lazy(() => import('../pages/events/CreateEvent')))
const EditEvent = Loadable(lazy(() => import('../pages/events/EditEvent')))

const Users = Loadable(lazy(() => import('../pages/users/Users')))
const PageNotFound = Loadable(lazy(() => import('../pages/PageNotFound')))

export default Router
