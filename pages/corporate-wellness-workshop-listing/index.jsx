import React, { useEffect, useState, useRef } from 'react'
import BannerCwpListingDetail from '../../components/componentsUpdated/cwpworkshopListing/bannerCwpListingDetail/BannerCwpListingDetail'
import WorkshopListingTabs from '../../components/componentsUpdated/cwpworkshopListing/workshopListingTabs/WorkshopListingTabs'
import { cwpWorkshopListing, cwpWorkshopListingSearch } from '../../utils/endpoints'
import { APIV3 } from "@/utils/httpService";
import { useRouter } from 'next/router';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import { addTranslation } from "@/store/translationSlice";
import Cookies from "js-cookie";
import Loader from '../../components/Loader';

export default function index(props) {
    const { _nextI18Next } = props;
    const router = useRouter();
    const [workShops, setWorkShops] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState("");
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [allWorkshopListener, setAllWorkshopListener] = useState(false);
    const timeoutRef = useRef(null);
    const [debounceTimeout] = useState(500); // Adjust debounce time (in milliseconds)
    const dispatch = useDispatch();
    const isFirstRender = useRef(true);
    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
    const [loading, setLoading] = useState(false);

    // set i18 language state
    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);

    useEffect(() => {
        const urlParams = router.query;

        // Get values from URL query
        const pageFromUrl = urlParams.page ? parseInt(urlParams.page, 10) : 1;
        const catFromUrl = urlParams.cat || 'all';

        // Update state with URL values
        if (currentPage !== pageFromUrl) {
            setCurrentPage(pageFromUrl); // Set currentPage to the value from query.page
        }

        if (catFromUrl !== 'all' && selectedCategoryId !== catFromUrl) {
            setSelectedCategoryId(catFromUrl); // Set selectedCategoryId to the value from query.cat if it's not "all"
        }

        // Call the API with the values from the URL
        getWorkShopSearch();
    }, []); // Run only when the URL query changes

    // change pagination
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    };

    // handle search function
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    // workshops search api function
    const getWorkShopSearch = async () => {
        try {
            setLoading(true);
            let params = {};
            let query = {};

            // Handle search state (used only for API, not added to URL)
            if (search) {
                params.name = search; // Use search for API request
                // Don't add `cat` to query if `search` has value
            } else {
                // If there's no search, we add `cat` to the URL query
                query.cat = selectedCategoryId || 'all'; // Use selectedCategoryId or default to 'all'
            }

            // Handle selectedCategoryId (if no search, use selectedCategoryId for `cat`)
            if (!search && selectedCategoryId) {
                params.category_id = selectedCategoryId;
            }

            // Handle currentPage
            if (currentPage) {
                params.page = currentPage;
                query.page = currentPage;
            } else {
                // Default to page 1 if not provided
                params.page = 1;
                query.page = 1;
            }

            // Ensure query sequence: page -> cat
            const orderedQuery = {
                page: query.page,
            };

            if (!search) {
                orderedQuery.cat = query.cat; // `cat` is included only when `search` is absent
            }

            // Construct query string for API call
            const queryString = new URLSearchParams(params).toString();
            const response = await APIV3.get(`${cwpWorkshopListingSearch}?${queryString}`);

            if (response?.status == 200) {
                window.scrollTo(0, 0);
                setLoading(false);

                const calculatedTotalPages = Math.ceil(
                    response?.data?.data?.workshops?.total / response?.data?.data?.workshops?.per_page
                );

                // Update the URL with ordered query (page -> cat)
                router.push({
                    pathname: `/corporate-wellness-workshop-listing`,
                    query: orderedQuery,
                });

                // Update state
                setTotalPages(calculatedTotalPages);
                setWorkShops(response?.data?.data);
                if (selectedCategoryId == "") {
                    setAllWorkshopListener(true);
                } else {
                    setAllWorkshopListener(false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Call API on the first page load and handle dynamic updates
    useEffect(() => {
        const urlParams = router.query;

        // If `page` or `cat` is missing, set default values
        if (!urlParams.page || !urlParams.cat) {
            router.replace({
                pathname: `/corporate-wellness-workshop-listing`,
                query: {
                    page: 1,
                    cat: 'all',
                },
            });
            getWorkShopSearch(); // Initial call on first load
        } else {
            // Reset `currentPage` to 1 when `search` changes
            if (search && currentPage !== 1) {
                setCurrentPage(1); // Set currentPage to 1 on new search
            }

            let query = { page: currentPage };

            if (search) {
                // If `search` is present, do not include `cat` in the query
            } else {
                // If `search` is not present, use `selectedCategoryId` or default to 'all'
                query.cat = selectedCategoryId || 'all';
            }

            // Update the URL with the new query
            router.push({
                pathname: `/corporate-wellness-workshop-listing`,
                query: query,
            });

            // Handle debounced API call
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // Clear any existing timer
            }

            timeoutRef.current = setTimeout(() => {
                if (!isFirstRender.current) {
                    getWorkShopSearch(); // Trigger the API call after debounce
                }
            }, debounceTimeout);
        }

        // Cleanup on component unmount or when dependencies change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // Clear timer on cleanup
            }
            isFirstRender.current = false; // Mark the first render as complete
        };
    }, [search, selectedCategoryId, currentPage]);


    useEffect(() => {
        if (selectedCategoryId) {
            setAllWorkshopListener(false)
        } else {
            setAllWorkshopListener(true)
        }
    }, [selectedCategoryId])

    return (
        <>
            {loading && (
                <> <Loader /></>
            )}
            <div className='workshopwellnessListingpage'>
                <BannerCwpListingDetail search={search} handleSearch={handleSearch} />
                <WorkshopListingTabs setAllWorkshopListener={setAllWorkshopListener} selectedCategoryId={selectedCategoryId} setCurrentPage={setCurrentPage} allWorkshopListener={allWorkshopListener} setSearch={setSearch} setSelectedCategoryId={setSelectedCategoryId} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} totalPages={totalPages} currentPage={currentPage} handlePageClick={handlePageClick} workShops={workShops} />
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { locale } = context;

    const langChecker = Cookies.get("lang");
    const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;
    let response;
    try {
        context.res.setHeader(
            "Cache-Control",
            "public, s-maxage=600, stale-while-revalidate=600"
        );
        response = await APIV3.get(`${cwpWorkshopListing}?page=1&cat=all`, {
            headers: {
                platform: "web",
                locale: apiLocale,
            },
        });

        let cwpWorkshop = response?.data?.data;
        return {
            props: {
                cwpWorkshop,
                ...(await serverSideTranslations(locale, ["common"])),
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                cwpWorkshop: [],
            },
        };
    }
};
