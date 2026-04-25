import React, { useState } from 'react';
import { Form, } from 'react-bootstrap'
// import { DatePicker } from 'react-responsive-datepicker'

const CheckoutDateField = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleDateChange = (e) => {
        e.preventDefault();
        setDate(e.target.value);
        setChanged(true);
    };


    return (
        <>
            {/* <DatePicker
                isOpen={isOpen}
                // onClose={() => setIsOpen(false)}
                defaultValue={new Date(2022, 8, 8)}
                minDate={new Date(2022, 10, 10)}
                maxDate={new Date(2023, 0, 10)}
                headerFormat='D, M d'
            /> */}
            <Form.Control
                type="text"
                name="dob"
                value={date}
                placeholder="Select Date"
                onChange={(e) => handleDateChange(e)}
                onFocus={() => {
                    setIsOpen(true)
                }}

            />

        </>
    )
}


export default CheckoutDateField