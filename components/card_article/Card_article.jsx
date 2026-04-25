import React from 'react'
import styles from './card_article.module.scss';
import TrendingTickBtn from '../trendingTickBtn/TrendingTickBtn';
import AncherUnderUpdated from '../ancherUnderUpdated/AncherUnderUpdated';

const CardArticle = ({ text }) => {
    return (
        <div className={`${styles.card_wrappeee} card_wrappeee`}>
            <TrendingTickBtn text={"Fact Checked"} />
            <h3> {text} </h3>
            <AncherUnderUpdated href={""} text={"READ MORE"} />
        </div>
    )
}

export default CardArticle
