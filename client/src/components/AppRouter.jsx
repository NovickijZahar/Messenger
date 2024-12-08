import { Routes, Route, Navigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../consts';
import {authRoutes, adminRoutes, publicRoutes } from '../routes';
import { useContext } from 'react';
import { Context } from '..';

const AppRouter = () => {

    const { user } = useContext(Context);

    return (<div>
        <Routes>
            {/* {user.user.role === 'admin' && adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )} */}
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    </div>)
}

export default AppRouter;