import Link from "next/link";
import { TopicHeading } from "../TopicHeading";
import { HeadingDescSmall } from "../headingDescSmall";
import { HeadingDescVsmall } from "../headingDescVsmall";
import { Status } from "../status";
// import './articleWithShortDesc.css';
import { CustomPopOver } from "../customPopOver";
// import mixpanel from 'mixpanel-browser';
import Image from "next/image";
import { RightArrowWithBorder } from "../rightArrowWithBorder";
import img1 from "../../public/svg/only-arrow-right.svg";

function ArticleWithShortDesc(props) {
  const { image, topic, desc, link, btnText, type, label } = props;

  // const dispatch = useDispatch();
  // const userDetailsInfo = useSelector((state) => state.AuthReducer.user);

  const mixPanelTracking = () => {
    // mixpanel.track('Article Read More', {
    //     'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  return (
    <a href={link || ""}>
      <div className="card articleWithShortDesc cardWithHeaderImage boxShadowOnBox helloClasss">
        <div className="header_img img_box">
          <Image
            crossorigin="anonymous"
            src={image}
            alt="cardImage"
            width="758"
            height="340"
          />
        </div>
        <div className="card_body">
          {label && (
            <CustomPopOver
              trigger="hover"
              content={
                <HeadingDescVsmall
                  text={
                    <p
                      dangerouslySetInnerHTML={{
                        __html: label?.description,
                      }}
                    />
                  }
                />
              }
            >
              <Status text={label?.value} bgColor={label?.color} />
            </CustomPopOver>
          )}
          {/* <StatusList status={status} /> */}
          <TopicHeading text={topic} />
          <HeadingDescSmall text={desc} />
          {link && (
            <div className="btn_container">
              <RightArrowWithBorder />
              <button
                type="button"
                className="underline_ancer"
                onClick={mixPanelTracking}
              >
                {btnText || ""}

              </button>
            </div>
            // <div className="simple_btn d-flex align-items-center justify-content-center viewDoctorBtn col-lg-3 mt-4" onClick={mixPanelTracking}>
            //     <button type="button" className="underline_ancer text-white">
            //         {btnText || ''}
            //     </button>
            //     <Image
            //         src={img1}
            //         width={100}
            //         height={100}
            //         crossOrigin=""
            //         alt="right-arrow-border"
            //         className="arrow_right_border me-0 "
            //         crossorigin="anonymous"
            //     />
            // </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default ArticleWithShortDesc;
