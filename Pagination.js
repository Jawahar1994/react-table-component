import React from 'react';
import "./Pagination.css";

export default function Pagination(props) {

    const { currentPage, setPageHandler, entriesPerPage, totalEntries } = props;
    const pages = Math.ceil(totalEntries / entriesPerPage);
    const num_links = 4;

    const getPrevLinks = (links) => {
        if (currentPage > 1) {
            links.push({ 'page': 1, 'text': 'First', 'class': '' });
            links.push({ 'page': currentPage - 1, 'text': 'Prev', 'class': '' });
        }
    }

    const getNextLinks = (links) => {

        if (pages > 1) {
            var start = 1;
            var end = 1;
            if (pages <= num_links) {
                end = pages;
            } else {
                start = currentPage - Math.floor(num_links / 2);
                end = currentPage + Math.floor(num_links / 2);

                if (start < 1) {
                    end += Math.abs(start) + 1;
                    start = 1;
                }

                if (end > pages) {
                    start -= (end - pages);
                    end = pages;
                }
            }

            for (var i = start; i <= end; i++) {
                links.push({
                    'page': i,
                    'text': i,
                    'class': (currentPage === i ? 'active' : '')
                });
            }
        }
    } 

    const getLastLinks = (links) => {
        if (currentPage < pages) {
            links.push({ 'page': currentPage + 1, 'text': 'Next', 'class': '' });
            links.push({ 'page': pages, 'text': 'Last', 'class': '' });
        }
    }

    const getPageLiks = () => {

        var links = [];

        getPrevLinks(links);
        getNextLinks(links);
        getLastLinks(links);

        return (
            links.map((link, index) => {
                return <li key={index} className={link.class} data-page-id={link.page} onClick={() => setPageHandler(link.page)}><span>{link.text}</span></li>
            })
        )
    }

    return (
        <div className='table-pagination'>
            <div className="pagination-links">
                <ul className='pagination'>
                    {getPageLiks()}
                </ul>
            </div>
            <div className="pagination-text">
                <p> Showing {totalEntries ? ((currentPage - 1) * entriesPerPage) + 1 : 0} to {((currentPage - 1) * entriesPerPage) > (totalEntries - entriesPerPage) ? totalEntries : ((currentPage - 1) * entriesPerPage) + entriesPerPage} of {totalEntries} ({pages} Pages)</p>
            </div>
        </div>
    )
}