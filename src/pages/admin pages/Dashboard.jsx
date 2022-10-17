import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import PropertItem from '../../components/admin/PropertItem';
import Helmet from '../../components/Helemet';


const Dashboard = () => {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn){
            navigate('/admin/login');
        }
        else if (!currentUser.isAdmin) {
            navigate('/');
        }
    }, [navigate, currentUser.isAdmin, isLoggedIn]);

    
    return (
        <Helmet title="Dashboard">
            <div className="my-4 mx-5 ">
                <PropertItem />
            </div>
        </Helmet>
    )
}

export default Dashboard