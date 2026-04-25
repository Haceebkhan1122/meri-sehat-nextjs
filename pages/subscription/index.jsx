import React, { useEffect } from 'react'
import Subscription from '../../components/subscription/Subscription'
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '@/store/userSlice';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';


const SubscriptionPage = () => {
    const dispatch = useDispatch();
    let userDetails = useSelector((state) => state.user.userData);

    const router = useRouter();

    const autherization = Cookies.get('Authorization');
    useEffect(() => {
    
        if(!autherization){
            window.location.href = "/phone-number";
        }
    }, [])

    useEffect(() => {
        dispatch(fetchUser());
    }, [])

    return (
        <>
            <Subscription userDetails={userDetails} />
        </>
    )
}

export default SubscriptionPage
