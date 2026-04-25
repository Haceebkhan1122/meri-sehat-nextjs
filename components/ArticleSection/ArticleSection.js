import React from "react";
import { Container } from "react-bootstrap";
import { HeadingDesc } from "../HeadingDesc";
import { SubSectionHeading } from "../SubSectionHeading";
import HeadingPolicyPages from '../../components/componentsUpdated/headingPolicyPages/HeadingPolicyPages'
// import './articleSection.css';
// import MiniHeart from "../../public/png/mini_heart.png";
// import Image from "next/image";
import { useRouter } from 'next/router';


function ArticleSection(props) {
  const { heading, desc, points = [] } = props;


  const router = useRouter()
const policyPage = router?.pathname == '/privacy-policy' || router?.pathname == '/terms-conditions';

  return (
    <section className="articleSection _mb-5">
      <Container>
        <div className={`${policyPage ? 'policyPage' : ''} content`}>
          {/* <Image src={MiniHeart} width={36} height={34} alt="Icon" className='min_heart_terms' /> */}
          {policyPage ?  <HeadingPolicyPages text={heading} /> :
          <SubSectionHeading text={heading} />
          }
          {/* */}

          <HeadingDesc text={desc} />
          <ul className="articleBullets">
            {points.map((point, index) => (
              //   TODO: replace this index with item id
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default ArticleSection;
