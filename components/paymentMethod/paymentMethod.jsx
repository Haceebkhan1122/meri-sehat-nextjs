import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from './paymentMethod.module.css' 
import Image from "next/image";
 
import payment from '../../public/svg/payment.svg';
import card from '../../public/svg/card.svg';


const paymentMethod  = ({ topUpwallet }) => {
    return (
        <>
         <div className={`${styles.paymentBox} h-100`}>
            <div   className={`${styles.paymentMethod} d-flex`}>
                <Image src={payment} className="img-fluid"></Image>
                <h3 className={`${styles.paymentBoxheading}`}>Payment methods</h3>
            </div>
            
            {
            topUpwallet ? (
                <div className="showDivonClick">
                show div
                </div>
            ) : (
                <div className={`${styles.noPayment} pt-5 mt-4 text-center`}>
                <Image src={card} className="img-fluid" />
                <p className={`${styles.noCard}`}>No cards added</p>
                </div>
            )
            }
        </div>
         
        </>
      );
    };
    
    

export default paymentMethod;