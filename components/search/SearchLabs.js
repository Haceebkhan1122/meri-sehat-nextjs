import React, { useState } from 'react';
import { Col, Container, Form, Row, Nav, Tab, Button } from 'react-bootstrap';
import search1 from "../../public/png/search.png"
import Image from "next/image";

function SearchLabs() {
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


            <Form.Group className="position-relative"  >
                <Image src={search1} className='img-fluid searchIcon'></Image>
                <Form.Control type="search" placeholder="Search" className="searchfield" onClick={handleSearch} />
            </Form.Group>

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

export default SearchLabs;
