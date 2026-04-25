import React, { useState } from 'react'
import AddCardWalletBalance from '../../components/addCardWallet/addCardWallet'



const AddCard = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <AddCardWalletBalance />
        </div>
    )
}

export default AddCard;
