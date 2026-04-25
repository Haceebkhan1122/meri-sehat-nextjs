import React from "react";
import bakhabar1 from "../../public/png/bakhabar1.png";
import bakhabar2 from "../../public/png/bakhabar2.png";
import bakhabar3 from "../../public/png/bakhabar3.png";
import navleft from "../../public/png/navleft.svg";
import navright from "../../public/png/navright.svg";
import pageimage2 from "../../public/png/pageimage2.png";
import headingsicon from "../../public/png/headingsicon.svg";
import subheadingicon from "../../public/png/subheadingicon.svg";
import c1 from "../../public/png/c1.png";
import c2 from "../../public/png/c2.png";
import c3 from "../../public/png/c3.png";
import c4 from "../../public/png/c4.jpg";
import c5 from "../../public/png/c5.jpg";
import c6 from "../../public/png/c6.jpg";
import aboutSex from "../../public/png/about-sex.jpg";
import ads from "../../public/png/ads.png";
import societalPressure from "../../public/png/societal-pressure.jpg";
import Tick from "../../public/png/tick_black.svg";
import buttonarrow from "../../public/png/buttonarrow.svg";
// import LogoNojawan from "../../public/png/logo_nojawan.png";
import AppStore from "../../public/png/App-Store.svg";
import GooglePlay from "../../public/png/Google-Play.svg";
import safeSex from "../../public/png/safe-sex.jpg";
import Cookies from "js-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Footer, Header } from "antd/lib/layout/layout";
import { MetaDataCustom } from "@/components/metaDataCustom";
import { bakhabarNoujawanEndpoint } from "@/utils/endpoints";
import API from "@/utils/httpService";
import Head from "next/head";
import Image from "next/image";

const BakhabarNojawanPage = (props) => {
  return (
    <>
      <MetaDataCustom metaData={props?.pageData} />
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          crossorigin="anonymous"
        />
      </Head>
      <header id="Header_Wrapper" class="py-sm-4 mt-4 mb-md-0 mb-2">
        <div
          id="Header_Container"
          class="d-flex justify-content-center align-items-center"
        >
          <div class="logo_container">
            {/* <Image
              width={180}
              height={100}
              class="logo_web w-100"
              src={LogoNojawan}
            /> */}
          </div>
        </div>
      </header>
      <div className="bakhabar_page">
        <div id="Main_Page_Wrapper">
          <div id="Page_Wrapper">
            <div className="page_container">
              <div id="Slider_Wrapper">
                <div className="slider_container">
                  <div
                    id="carouselExampleDark"
                    className="carousel carousel-dark slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div
                        className="carousel-item active"
                        data-bs-interval="10000"
                      >
                        {/* <Image
                          src={bakhabar1}
                          width={1520}
                          height={570}
                          className="d-block w-100"
                          alt="Bakhabar Noujawan"
                        /> */}
                        
                        <div className="carousel-caption d-none d-md-block caption-block-slider ">
                          <div className="container">
                            <h5 className="slide_heading text-start">
                              Bakhabar Noujawan
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item " data-bs-interval="10000">
                        <Image
                          src={bakhabar2}
                          width={1520}
                          height={570}
                          className="d-block w-100"
                          alt="Bakhabar Noujawan"
                        />
                        <div className="carousel-caption d-none d-md-block caption-block-slider ">
                          <div className="container">
                            <h5 className="slide_heading text-start">
                              Bakhabar Noujawan
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item " data-bs-interval="10000">
                        <Image
                          src={bakhabar3}
                          width={1520}
                          height={570}
                          className="d-block w-100"
                          alt="Bakhabar Noujawan"
                        />
                        <div className="carousel-caption d-none d-md-block caption-block-slider ">
                          <div className="container">
                            <h5 className="slide_heading text-start">
                              Bakhabar Noujawan
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container carouselballs position_relative">
                      <div className="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide-to="1"
                          aria-label="Slide 2"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide-to="2"
                          aria-label="Slide 3"
                        ></button>
                      </div>
                    </div>

                    <div className="container position_relative">
                      <div className="carouseltopButtons">
                        <button
                          className="carouselprev"
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide="prev"
                        >
                          <Image src={navleft} width={24} height={18} />
                        </button>
                        <button
                          className="carouselnext"
                          type="button"
                          data-bs-target="#carouselExampleDark"
                          data-bs-slide="next"
                        >
                          <Image src={navright} width={24} height={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="page_content_wrapper">
                <div className="page_content_container">
                  <div className="container-xxl">
                    <section id="main_image_page">
                      <div className="top_image_block">
                        <div className="page_image rounded-5 py-4">
                          <Image
                            src={pageimage2}
                            width={1296}
                            height={235}
                            className="w-100"
                          />
                        </div>
                      </div>
                    </section>

                    <section id="Heading_Block_Page">
                      <div className="heading_after_image py-4 my-4 mt-0 py-sm-5 my-sm-5 mt-sm-0  ">
                        <h3 className="medium_headings heading_modes h3_headings">
                          Bakhabar Noujawan – a platform to learn & gain
                          knowledge about various aspects of life that a young
                          adult may encounter, whether married or not.
                        </h3>
                      </div>
                    </section>

                    <section id="Category_Section">
                      <div className="category_wrap">
                        <div className="category_container">
                          <div className="sections_heading_block d-flex justify-content-between">
                            <div className="section_heading_primary">
                              <h2>Categories</h2>
                            </div>
                            <div className="view_all sections_view_all_cta">
                              <div className="cta_section_button">
                                <span>
                                  <Image
                                    src={headingsicon}
                                    width={37}
                                    height={37}
                                  />
                                </span>
                                <a
                                  href="https://bkn.aman.org.pk/collections"
                                  class="underline_ancer"
                                >
                                  View All
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="container cards_category_container py-2 pt-5 py-sm-5">
                            <div className="row justify-content-around mb-0 mb-sm-4">
                              <div className="col-md-4 mb-4 ">
                                <div className="card course-card h-100">
                                  <div class="image_hover_card">
                                    <a href="https://bkn.aman.org.pk/courses/family-planning-methods">
                                      <Image
                                        width={405}
                                        height={228}
                                        src={c1}
                                        className="card-img-top w-100"
                                        alt="Image 1"
                                      />
                                    </a>
                                  </div>
                                  <div className="card-body course-content">
                                    <h2 className="card-title course-heading mb-4">
                                      <a href="https://bkn.aman.org.pk/courses/family-planning-methods">
                                        Family Planning Methods
                                      </a>
                                    </h2>
                                    <h5 className="course-subtitle mb-2">
                                      <span>
                                        <Image
                                          width={15}
                                          height={13}
                                          src={subheadingicon}
                                        />
                                      </span>
                                      Course
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 mb-4">
                                <div className="card course-card h-100">
                                  <div class="image_hover_card">
                                    <a href="https://bkn.aman.org.pk/courses/natural-methods-of-family-planning">
                                      <Image
                                        width={405}
                                        height={228}
                                        src={c2}
                                        className="card-img-top w-100"
                                        alt="Image 2"
                                      />
                                    </a>
                                  </div>
                                  <div className="card-body course-content">
                                    <h2 className="card-title course-heading mb-4">
                                      <a href="https://bkn.aman.org.pk/courses/natural-methods-of-family-planning">
                                        Natural Methods of Family Planning
                                      </a>
                                    </h2>
                                    <h5 className="course-subtitle mb-2">
                                      <span>
                                        <Image
                                          width={15}
                                          height={13}
                                          src={subheadingicon}
                                        />
                                      </span>
                                      Course
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 mb-4">
                                <div className="card course-card h-100">
                                  <div class="image_hover_card">
                                    <a href="https://bkn.aman.org.pk/courses/modern-methods-of-family-planning">
                                      <Image
                                        width={405}
                                        height={228}
                                        src={c3}
                                        className="card-img-top w-100"
                                        alt="Image 3"
                                      />
                                    </a>
                                  </div>
                                  <div className="card-body course-content">
                                    <h2 className="card-title course-heading mb-4">
                                      <a href="https://bkn.aman.org.pk/courses/modern-methods-of-family-planning">
                                        Modern Methods of Family Planning
                                      </a>
                                    </h2>
                                    <h5 className="course-subtitle mb-2">
                                      <span>
                                        <Image
                                          width={15}
                                          height={13}
                                          src={subheadingicon}
                                        />
                                      </span>
                                      Course
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row justify-content-around">
                              <div className="col-md-4 mb-4">
                                <div className="card course-card h-100">
                                  <div class="image_hover_card">
                                    <a href="https://bkn.aman.org.pk/courses/module-on-emergency-contraception">
                                      <Image
                                        width={405}
                                        height={228}
                                        src={c4}
                                        className="card-img-top w-100"
                                        alt="Image 1"
                                      />
                                    </a>
                                  </div>
                                  <div className="card-body course-content">
                                    <h2 className="card-title course-heading mb-4">
                                      <a href="https://bkn.aman.org.pk/courses/module-on-emergency-contraception">
                                        Emergency Contraception
                                      </a>
                                    </h2>
                                    <h5 className="course-subtitle mb-2">
                                      <span>
                                        <Image
                                          width={15}
                                          height={13}
                                          src={subheadingicon}
                                        />
                                      </span>
                                      Course
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 mb-4">
                                <div className="card course-card h-100">
                                  <div class="image_hover_card">
                                    <a href="https://bkn.aman.org.pk/courses/addressing-side-effects-and-myths-misconceptions-of-family-planning">
                                      <Image
                                        width={405}
                                        height={228}
                                        src={c5}
                                        className="card-img-top w-100"
                                        alt="Image 2"
                                      />
                                    </a>
                                  </div>
                                  <div className="card-body course-content">
                                    <h2 className="card-title course-heading mb-4">
                                      <a href="https://bkn.aman.org.pk/courses/addressing-side-effects-and-myths-misconceptions-of-family-planning">
                                        Addressing Side Effects and Myths &
                                        Misconceptions of Family Planning
                                      </a>
                                    </h2>
                                    <h5 className="course-subtitle mb-2">
                                      <span>
                                        <Image
                                          width={15}
                                          height={13}
                                          src={subheadingicon}
                                        />
                                      </span>
                                      Course
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4 mb-4">
                                <div className="card course-card h-100">
                                  <div class="image_hover_card">
                                    <a href="https://bkn.aman.org.pk/courses/non-contraceptive-benefits-of-family-planning">
                                      <Image
                                        width={405}
                                        height={228}
                                        src={c6}
                                        className="card-img-top w-100"
                                        alt="Image 3"
                                      />
                                    </a>
                                  </div>
                                  <div className="card-body course-content">
                                    <h2 className="card-title course-heading mb-4">
                                      <a href="https://bkn.aman.org.pk/courses/non-contraceptive-benefits-of-family-planning">
                                        Non-Contraceptive Benefits of Family
                                        Planning
                                      </a>
                                    </h2>
                                    <h5 className="course-subtitle mb-2">
                                      <span>
                                        <Image
                                          width={15}
                                          height={13}
                                          src={subheadingicon}
                                        />
                                      </span>
                                      Course
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="Articles_Main_Wrapper" className="my-4">
                      <div id="articles_containers">
                        <div className="articles_block">
                          <div className="sections_heading_block d-flex justify-content-between">
                            <div className="section_heading_primary">
                              <h2>Articles</h2>
                            </div>

                            <div className="view_all sections_view_all_cta">
                              <div className="cta_section_button">
                                <span>
                                  <Image
                                    width={37}
                                    height={37}
                                    src={headingsicon}
                                  />
                                </span>
                                <a
                                  href="https://merisehat.pk/"
                                  class="underline_ancer"
                                >
                                  View All
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="big_Article ads_Section mt-5">
                            <div className="row">
                              <div className="col-sm-9">
                                <div className="article_block_area">
                                  <div className="article_img">
                                    <div class="image_hover_card bordercard">
                                      <a href="https://merisehat.pk/article/lets-talk-about-sex-baby-how-to-talk-to-your-partner-about-sex">
                                        <Image
                                          width={965}
                                          height={410}
                                          src={aboutSex}
                                          className="w-100"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="articleBigContent mt-4 pt-2">
                                    <a href="https://merisehat.pk/article/lets-talk-about-sex-baby-how-to-talk-to-your-partner-about-sex">
                                      <h2>
                                        Let’s Talk About Sex, Baby: How To Talk
                                        To Your Partner About Sex
                                      </h2>
                                    </a>
                                    <p className="mt-3">
                                      Talking to your partner about intercourse
                                      can feel very intimidating but it doesn’t
                                      have to be like that. Learn how you can
                                      openly communicate your needs with your
                                      partner.
                                      <br />
                                      <br />
                                      When you are living in a relatively
                                      conservative areas where anything that is
                                      related to intercourse or your genitals is
                                      on its own considered a taboo,
                                    </p>
                                    <div className="view_all sections_view_all_cta">
                                      <div className="cta_section_button">
                                        <span>
                                          <Image
                                            width={37}
                                            height={37}
                                            src={headingsicon}
                                          />
                                        </span>
                                        <a
                                          href="https://merisehat.pk/article/lets-talk-about-sex-baby-how-to-talk-to-your-partner-about-sex"
                                          class="underline_ancer"
                                        >
                                          Read More
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-3 mt-sm-0 mt-5">
                                <a href="https://getzpharma.com/product/core24/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat">
                                  <Image
                                    width={306}
                                    height={718}
                                    src={ads}
                                    className="w-100"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section
                      id="Articles_Loop_Wrapper "
                      className="mt-2 pt-2 mt-sm-5 pt-sm-5"
                    >
                      <div id="loop_Articles_Container">
                        <div className="loop_articles_block">
                          <div className="row">
                            <div className="col-sm-9">
                              <div className="article_loopmain_block">
                                <div className="row align-items-center">
                                  <div className="col-sm-5">
                                    <div class="image_hover_card">
                                      <a href="https://merisehat.pk/article/the-impact-of-societal-pressure-to-have-children-have-a-second-child">
                                        <Image
                                          width={388}
                                          height={407}
                                          src={societalPressure}
                                          className="w-100 leftbordr"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="col-sm-7">
                                    <div className="content_articleloopmain">
                                      <div className="trending_button mb-3 mt-4 ms-2 mt-sm-0 mb-sm-5 ms-sm-4">
                                        <span>
                                          <Image
                                            width={12}
                                            height={10}
                                            src={Tick}
                                            className="me-2"
                                          />
                                        </span>
                                        Expert Opinion
                                      </div>
                                      <div className="heading_loop_article  ps-3 pe-3 me-0 mb-3 ps-sm-4 pe-sm-5 me-sm-4 mb-sm-3">
                                        <a href="https://merisehat.pk/article/the-impact-of-societal-pressure-to-have-children-have-a-second-child">
                                          <h2>
                                            The Impact Of Societal Pressure{" "}
                                            <br />- To Have Children Or Have A
                                            Second Child
                                          </h2>
                                        </a>
                                        <p>
                                          “Khuskhabri kab suna rahay hou?” –
                                          “When are you telling us the good
                                          news?” The decision to have children,
                                          or to have a second child, is a deeply
                                          personal
                                        </p>
                                        <div className="view_all sections_view_all_cta">
                                          <div className="cta_section_button">
                                            <span>
                                              <Image
                                                width={37}
                                                height={37}
                                                src={headingsicon}
                                              />
                                            </span>
                                            <a
                                              href="https://merisehat.pk/article/the-impact-of-societal-pressure-to-have-children-have-a-second-child"
                                              class="underline_ancer"
                                            >
                                              Read More
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="articles_small_Points mt-5">
                                <div className="row">
                                  <div className="col-sm-4 mb-3 mb-sm-3">
                                    <div className="card_blocks_article colorsx1 h-100 p-4 rounded-3">
                                      <div
                                        className="trending_button"
                                        style={{ color: "#19B3B5" }}
                                      >
                                        <span>
                                          <Image
                                            width={12}
                                            height={10}
                                            src={Tick}
                                            className="me-2"
                                          />
                                        </span>
                                        Trending Now
                                      </div>
                                      <div className="heading_loop_article ">
                                        <a href="https://merisehat.pk/article/mom-where-do-babies-really-come-from">
                                          <h2>
                                            Mom, Where Do Babies Really Come
                                            From?
                                          </h2>
                                        </a>
                                      </div>
                                      <div className="view_all sections_view_all_cta">
                                        <div className="cta_section_button">
                                          <span>
                                            <Image
                                              width={37}
                                              height={37}
                                              src={headingsicon}
                                            />
                                          </span>
                                          <a
                                            href="https://merisehat.pk/article/mom-where-do-babies-really-come-from"
                                            class="underline_ancer"
                                          >
                                            Read More
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4 mb-3 mb-sm-3">
                                    <div className="card_blocks_article colorsx2 h-100 p-4 rounded-3">
                                      <div
                                        className="trending_button "
                                        style={{ color: "#326C5D" }}
                                      >
                                        <span>
                                          <Image
                                            width={12}
                                            height={10}
                                            src={Tick}
                                            className="me-2"
                                          />
                                        </span>
                                        Fact Checked
                                      </div>
                                      <div className="heading_loop_article ">
                                        <a href="https://merisehat.pk/article/how-your-menstrual-cycle-affects-your-mental-health">
                                          <h2>
                                            How Your Menstrual Cycle Affects
                                            Your Mental Health
                                          </h2>
                                        </a>
                                      </div>
                                      <div className="view_all sections_view_all_cta">
                                        <div className="cta_section_button">
                                          <span>
                                            <Image
                                              width={37}
                                              height={37}
                                              src={headingsicon}
                                            />
                                          </span>
                                          <a
                                            href="https://merisehat.pk/article/how-your-menstrual-cycle-affects-your-mental-health"
                                            class="underline_ancer"
                                          >
                                            Read More
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4 mb-5 mb-sm-3">
                                    <div className="card_blocks_article colorsx3 h-100 p-4 rounded-3">
                                      <div
                                        className="trending_button "
                                        style={{ color: "#263360" }}
                                      >
                                        <span>
                                          <Image
                                            width={12}
                                            height={10}
                                            src={Tick}
                                            className="me-2"
                                          />
                                        </span>
                                        Expert Opinion
                                      </div>
                                      <div className="heading_loop_article ">
                                        <a href="https://merisehat.pk/article/five-ways-to-focus-on-your-marriage-after-having-children">
                                          <h2>
                                            Five Ways To Focus On Your Marriage
                                            After Having Children
                                          </h2>
                                        </a>
                                      </div>
                                      <div className="view_all sections_view_all_cta">
                                        <div className="cta_section_button">
                                          <span>
                                            <Image
                                              width={37}
                                              height={37}
                                              src={headingsicon}
                                            />
                                          </span>
                                          <a
                                            href="https://merisehat.pk/article/five-ways-to-focus-on-your-marriage-after-having-children"
                                            class="underline_ancer"
                                          >
                                            Read More
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="article_loopmain_block">
                                <div className="row align-items-center flex-column ">
                                  <div className="col-sm-12 ">
                                    <div class="image_hover_card">
                                      <a href="https://merisehat.pk/article/how-to-practice-safe-sex">
                                        <Image
                                          width={306}
                                          height={360}
                                          src={safeSex}
                                          className="w-100 topbordr"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="col-sm-12">
                                    <div className="content_articleloopmain p-sm-4 px-2 py-4 ">
                                      <div className="trending_button mb-3">
                                        <span>
                                          <Image
                                            width={12}
                                            height={10}
                                            src={Tick}
                                            className="me-2"
                                          />
                                        </span>
                                        Fact Checked
                                      </div>
                                      <div className="heading_loop_article mb-3">
                                        <a href="https://merisehat.pk/article/how-to-practice-safe-sex">
                                          <h2>
                                            How To Practice <br />
                                            Safe Sex
                                          </h2>
                                        </a>
                                        <p>
                                          Safe(r) sex practices don’t just make
                                          you and your partner safe but they can
                                          also make the entire experience feel
                                          much better and carefree.
                                        </p>
                                        <div className="view_all sections_view_all_cta">
                                          <div className="cta_section_button">
                                            <span>
                                              <Image
                                                width={37}
                                                height={37}
                                                src={headingsicon}
                                              />
                                            </span>
                                            <a
                                              href="https://merisehat.pk/article/how-to-practice-safe-sex"
                                              class="underline_ancer"
                                            >
                                              Read More
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="banner_consult" className="pt-4">
                      <div
                        id="consultaion_banner"
                        className="px-2 pb-5 py-2  mt-2  px-sm-5 py-sm-5 rounded-5 mt-sm-4 mb-5"
                      >
                        <div className="bannerForConsulation">
                          <div className="row align-items-center">
                            <div className="col-sm-8">
                              <div className="consultheading py-4">
                                <h2 className="cons_primary_heading">
                                  Get professional help
                                </h2>
                                <h4 className="cons_sub_heading">
                                  Connect with some of the best consultants and
                                  doctors online now.
                                </h4>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="consult_cta_button">
                                <a
                                  className="consultant_btn d-flex w-100 justify-content-center py-3"
                                  href="https://merisehat.pk/doctor-now"
                                  type="submit"
                                >
                                  Consult Now
                                  <span className="arrowclass">
                                    <Image
                                      width={10}
                                      height={16}
                                      src={buttonarrow}
                                    />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                <section className="callToAction pb-0">
                  <div className="container-fluid px-0">
                    <div className="g-0 align-items-center row">
                      <div className="container"></div>
                      <div className="offset-lg-1 order-2 order-lg-1  col-lg-5 col-md-12">
                        <div>
                          <div className="section-med">
                            <h2
                              dir="auto"
                              className="text-initial fontSizeMobile fw-600 border-bottom-0 undefined"
                            >
                              Download the Meri Sehat App
                            </h2>
                          </div>
                          <div>
                            <h5 dir="auto" className="heading_desc ">
                              <div className="pt-4">
                                <p>
                                  Our SehatScan technology helps you stay on top
                                  of your health. Download our app today and
                                  measure your blood pressure, heart rate,
                                  oxygen saturation levels and more! No sensors
                                  needed: Our app works with your mobile phone
                                  camera.
                                </p>
                              </div>
                            </h5>
                          </div>
                          <div
                            className="mb-3 pt-4"
                            style={{ display: "inline-block" }}
                          >
                            <a target="_blank" href="https://apple.co/3P3v1BR">
                              <Image
                                width={100}
                                height={100}
                                src={AppStore}
                                alt="logo"
                                className="img-fluid me-3 btn-apple"
                              />
                            </a>
                            <a
                              target="_blank"
                              href="https://play.google.com/store/apps/details?id=pk.merisehat.app"
                            >
                              <Image
                                width={100}
                                height={100}
                                src={GooglePlay}
                                alt="logo"
                                className="img-fluid btn-apple"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="offset-lg-1 order-2 order-lg-1 col-lg-5 col-md-12">
                        <div>
                          <img
                            crossorigin="anonymous"
                            src="https://ms-images.s3.ap-southeast-1.amazonaws.com/call-to-action/ywGfppLT9W4Wjnqo4MPXZ0TiQRzFIq7U3s2vyEJK.webp"
                            alt="bloodpressure"
                            className="w-100 hk_call_action"
                            width="633"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Layouts> */}
    </>
  );
};

export const getServerSideProps = async ({ locale }) => {
  const langChecker = Cookies.get("lang");
  const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;

  try {
    const response = await API.get(bakhabarNoujawanEndpoint, {
      headers: {
        platform: "web",
        locale: apiLocale,
      },
    });

    let pageData = response?.data;

    if (response?.code === 200) {
      return {
        props: {
          pageData,
          ...(await serverSideTranslations(locale, ["common"])),
        },
      };
    } else {
      return { props: { pageData: {} } };
    }
  } catch (error) {
    return { props: { pageData: {} } };
  }
};

export default BakhabarNojawanPage;
