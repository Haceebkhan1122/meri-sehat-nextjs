import React, { useState } from 'react';
import { Col, Container, Form, Row, Nav, Tab, Button } from 'react-bootstrap';
import search1 from "../../public/png/search.png"
import Image from "next/image";

function SearchResult() {
    const [search, setSearch] = useState(''); // To track the selected name
    const [selectedName, setSelectedName] = useState(''); // To track the selected name
    const handleSearch = (e) => {
        setSearch(true);
        setSelectedName(false);
    };

    const handleSearchClose = (e) => {
        setSearch('')
        setSelectedName('');
    };
    return (
        <Form>




            {search === '' ? (
                <div>

                </div>
            ) : (
                <div className='search_box'>
                    <h6 className='mt-4 mb-4 '>Popular Tests</h6>
                    <div className='form_labs'>
                        <Row>dd
                            {/* <SingleTests /> */}
                        </Row>
                    </div>
                </div>
            )}
        </Form>
    );
}

export default SearchResult;
