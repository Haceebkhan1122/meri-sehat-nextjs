import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticleWithShortDesc } from "../articleWithShortDesc";
import { SubSectionHeading } from "../SubSectionHeading";
import { ArticleItemLists } from "../articleItemLists";
import { URL } from "../constants";
// import './topReads.css';
// import i18n from '../../../i18n';

const articleImageLarge = "/png/article-large-new.png";
const articleImage1 = "/png/article-1.png";
const articleImage2 = "/png/article-2.png";
const articleImage3 = "/png/article-3.png";

const articlesData = [
  {
    image: articleImage1,
    status: [
      {
        statusText: "recomended",
        statusProgress: "recomended",
      },
    ],
    topic: "Make the Most of Your Safer-at-Home",
    topicDesc: "",
    btnText: "read more",
    link: URL.articleInnerPage,
  },
  {
    image: articleImage2,

    status: [
      {
        statusText: "fact checked",
        statusProgress: "fact",
      },
    ],
    topic: "A Letter from the Editor",
    topicDesc: "",
    btnText: "read more",
    link: URL.articleInnerPage,
  },
  {
    image: articleImage3,

    status: [
      {
        statusText: "Evidence Based",
        statusProgress: "evidence",
      },
    ],
    topic: "Make the Most of Your Safer-at-Home",
    topicDesc: "",
    btnText: "read more",
    link: URL.articleInnerPage,
  },
];

function TopReads(props) {
  const { widgetData = [], key } = props;

  const MostRead = {
    name: widgetData?.data?.articles?.[0].name,
    description: widgetData?.data?.articles?.[0].description,
  };

  // remove first index from articles
  const articles = widgetData?.data?.articles?.slice(1);

  return (
    <section
      key={key}
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="top_reads article  dynamic-widget"
    >
      <Container>
        <SubSectionHeading text={widgetData?.heading} />
        <Row>
          <Col md={7} className="pe-lg-0">
            <ArticleWithShortDesc
              image={articleImageLarge}
              topic={MostRead?.name}
              desc={MostRead?.description}
              btnText={i18n.t("read_more")}
              link={URL.articleInnerPage}
            />
          </Col>
          <Col md={5}>
            {articles?.map((article, index) => {
              const { description, name } = article;
              return (
                <ArticleItemLists
                  key={index}
                  status={articlesData[0].data?.status}
                  image={articlesData[0].image}
                  heading={name}
                  desc={articlesData[0].topicDesc}
                  btnText={articlesData[0].btnText}
                  link={articlesData[0].link}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default React.memo(TopReads);
