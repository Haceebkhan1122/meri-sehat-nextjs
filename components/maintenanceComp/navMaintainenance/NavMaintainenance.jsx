import React from 'react'
import styles from './navMaintainenance.module.scss';
import Image from 'next/image';
import logoMeri from '/public/png/new-images/logoMeri.png';

const NavMaintainenance = () => {
    return (
        <div className={styles.wraperNav}>
            <Image src={logoMeri} alt='' className='img-fluid' />
        </div>
    )
}

export default NavMaintainenance
