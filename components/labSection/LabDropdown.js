
import React, { useState } from 'react';
import Image from "next/image";
import lab1 from "../../public/png/lab1.png"
import { Select } from "antd";
import ChangeLab from '../../components/changeLab/changeLab'
import Cookies from 'js-cookie';



const { Option } = Select;
const LabDropdown = ({ effectHasRun, guestIDValue, switchCartFunc, emptyCartFunc, setIsModalVisible, isModalVisible, myCart, singleLabsDetails, labsByCities, fetchSingleLabDetails }) => {

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [newSelectedValue, setNewSelectedValue] = useState(null);
    const auth = Cookies.get('Authorization')

    const handleSelectLocation = (value) => {
        setSelectedLocation(value);
        if (!myCart?.lab_cart?.length > 0) {
            fetchSingleLabDetails(value)
            if (!auth && guestIDValue) {
                switchCartFunc(value, guestIDValue);
            }
            else {
                switchCartFunc(value);
            }
        } else {
            setNewSelectedValue(value)
            Cookies.set("labId", value)
        }
        if (value !== singleLabsDetails?.[0]?.id) {
            setIsModalVisible(true);

        }
    }

    return (
        <>
            <div className='box_dropdown'>
                <>
                    <div className='selected_lab_inn'>
                        <Image src={effectHasRun === false && !myCart?.lab_cart?.length > 0 ? labsByCities?.[0]?.image  : myCart?.lab?.image ? myCart?.lab?.image : ''} width={24} height={24} />
                        <p className='lab-name'>{effectHasRun === false && !myCart?.lab_cart?.length > 0 ? labsByCities?.[0]?.lab_name : myCart?.lab?.lab_name}</p>
                    </div>
                    {/* <Select
                        className="ms-0 selectLocationselect box_selectoption"
                        showSearch
                        optionFilterProp="children"
                        value={singleLabsDetails?.[0]?.id}
                        onChange={handleSelectLocation}
                        defaultValue={effectHasRun !== false && singleLabsDetails?.[0]?.id ? singleLabsDetails?.[0]?.id : myCart?.lab?.id}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {labsByCities?.length > 0 ? labsByCities?.map((item) => (
                            <>
                                <Option key={item?.id} value={item?.id} className="hospital_lab">
                                    <div className="d-flex circularImageInactive1 align-items-center checkboxSelection">
                                        <span className='location_icon'><Image src={lab1} width={24} height={24} /></span>
                                        <p className="chooseLocations" ><span className='d-block d-lg-none d-sm-none'>Lab Selected</span> <span className='lab_mob_dropdown'>{item?.lab_name}</span></p>
                                    </div>
                                </Option>
                            </>

                        )) : null}
                    </Select> */}
                    <ChangeLab guestIDValue={guestIDValue} switchCartFunc={switchCartFunc} emptyCartFunc={emptyCartFunc} newSelectedValue={newSelectedValue} fetchSingleLabDetails={fetchSingleLabDetails} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
                </>
            </div>

        </>
    )
}


export default React.memo(LabDropdown)