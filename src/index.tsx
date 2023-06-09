import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import { createTestItem, loadTestItem, loadTestList } from './model/test';
import Login from './pages/auth/Login';
import App from './pages/App';
import Reset from './pages/auth/Reset';
import Register from './pages/auth/Register';
import ErrorPage from './pages/util/Error';
import TestList from './pages/test/TestList';
import TestItem, { destroyTestItem } from './pages/test/TestItem';
import LobbyList from './pages/test/LobbyList';
import lobby from './model/lobby';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route
        path='/'
        element={<App />}
        errorElement={<ErrorPage />}
      >
        <Route errorElement={<ErrorPage />}>
          <Route
            path='test'
            element={<TestList />}
            loader={loadTestList}
            action={createTestItem}
          />
          <Route
            path='test/:id'
            element={<TestItem />}
            loader={loadTestItem}
            action={destroyTestItem}
          />
          <Route
            path='lobby'
            element={<LobbyList />}
          />
        </Route>
      </Route>
      <Route
        path='/auth'
        element={<Login />}
      />
      <Route
        path='/reset'
        element={<Reset />}
      />
      <Route
        path='/register'
        element={<Register />}
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div className="container">Loading...</div>}>
    <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
